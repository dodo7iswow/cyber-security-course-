"""
Booking API Endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
from ..core.database import get_db
from ..models.booking import Booking, BookingStatus, Payment, PaymentStatus
from ..models.user import User
from ..models.salon import Salon
from ..models.service import Service
from ..integrations.moncash import moncash_client

router = APIRouter()


@router.post("/create")
async def create_booking(
    service_id: int,
    booking_date: datetime,
    customer_id: int,
    staff_id: int = None,
    customer_notes: str = None,
    db: Session = Depends(get_db),
):
    """
    Create a new booking and initiate payment
    """
    # Get service details
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    if not service.is_active:
        raise HTTPException(status_code=400, detail="Service is not available")

    # Get salon details
    salon = db.query(Salon).filter(Salon.id == service.salon_id).first()
    if not salon or not salon.is_active:
        raise HTTPException(status_code=400, detail="Salon is not available")

    # Calculate end time
    end_time = booking_date + timedelta(minutes=service.duration_minutes)

    # Create booking
    booking = Booking(
        customer_id=customer_id,
        salon_id=salon.id,
        service_id=service_id,
        staff_id=staff_id,
        booking_date=booking_date,
        end_time=end_time,
        duration_minutes=service.duration_minutes,
        customer_notes=customer_notes,
        status=BookingStatus.PENDING,
    )

    db.add(booking)
    db.flush()  # Get booking ID without committing

    # Calculate payment amounts
    total_amount = service.price
    platform_fee = total_amount * salon.commission_rate
    vendor_amount = total_amount - platform_fee

    # Create payment record
    payment = Payment(
        booking_id=booking.id,
        amount=total_amount,
        platform_fee=platform_fee,
        vendor_amount=vendor_amount,
        status=PaymentStatus.PENDING,
    )

    db.add(payment)
    db.commit()
    db.refresh(booking)

    # Create MonCash payment
    try:
        moncash_payment = await moncash_client.create_payment(
            amount=total_amount,
            order_id=f"BOOKING-{booking.id}",
            description=f"{service.name} at {salon.name}",
        )

        # Update payment with transaction details
        payment.transaction_id = moncash_payment.get("payment_token")
        db.commit()

        return {
            "booking_id": booking.id,
            "payment": {
                "amount": total_amount,
                "payment_url": moncash_payment.get("payment_url"),
                "payment_token": moncash_payment.get("payment_token"),
            },
            "service": {
                "name": service.name,
                "duration": service.duration_minutes,
            },
            "salon": {
                "name": salon.name,
                "address": salon.address,
            },
            "booking_date": booking_date.isoformat(),
        }

    except Exception as e:
        # Rollback on payment failure
        db.delete(payment)
        db.delete(booking)
        db.commit()
        raise HTTPException(
            status_code=500,
            detail=f"Payment creation failed: {str(e)}"
        )


@router.post("/{booking_id}/confirm-payment")
async def confirm_payment(
    booking_id: int,
    transaction_id: str,
    db: Session = Depends(get_db),
):
    """
    Confirm payment and process vendor payout
    """
    # Get booking and payment
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    payment = booking.payment
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    # Verify payment with MonCash
    is_valid = await moncash_client.verify_payment(transaction_id)
    if not is_valid:
        payment.status = PaymentStatus.FAILED
        db.commit()
        raise HTTPException(status_code=400, detail="Payment verification failed")

    # Update payment status
    payment.status = PaymentStatus.COMPLETED
    payment.paid_at = datetime.utcnow()
    payment.transaction_id = transaction_id

    # Update booking status
    booking.status = BookingStatus.CONFIRMED
    db.commit()

    # Process vendor payout (instant transfer to salon owner)
    salon = booking.salon
    owner = salon.owner

    if owner.moncash_number and owner.moncash_verified:
        try:
            payout = await moncash_client.transfer_to_vendor(
                amount=payment.vendor_amount,
                receiver_number=owner.moncash_number,
                description=f"Payout for booking #{booking.id}",
            )

            payment.payout_status = "completed"
            payment.payout_transaction_id = payout.get("transaction_id")
            payment.payout_completed_at = datetime.utcnow()
            db.commit()

        except Exception as e:
            # Log payout failure but don't fail the booking
            payment.payout_status = "failed"
            db.commit()
            print(f"Payout failed: {str(e)}")

    return {
        "status": "success",
        "booking_id": booking.id,
        "payment_status": payment.status,
        "payout_status": payment.payout_status,
    }


@router.get("/{booking_id}")
async def get_booking(
    booking_id: int,
    db: Session = Depends(get_db),
):
    """Get booking details"""
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return {
        "id": booking.id,
        "status": booking.status,
        "booking_date": booking.booking_date.isoformat(),
        "service": {
            "name": booking.service.name,
            "price": booking.service.price,
        },
        "salon": {
            "name": booking.salon.name,
            "address": booking.salon.address,
        },
        "payment": {
            "status": booking.payment.status if booking.payment else None,
            "amount": booking.payment.amount if booking.payment else None,
        },
    }
