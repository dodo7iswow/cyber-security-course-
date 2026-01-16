"""
Booking and Payment Models
"""

from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from ..core.database import Base


class BookingStatus(str, enum.Enum):
    """Booking status types"""
    PENDING = "pending"  # Waiting for payment
    CONFIRMED = "confirmed"  # Payment received
    IN_PROGRESS = "in_progress"  # Service is being performed
    COMPLETED = "completed"  # Service completed
    CANCELLED = "cancelled"  # Booking cancelled
    NO_SHOW = "no_show"  # Customer didn't show up


class PaymentStatus(str, enum.Enum):
    """Payment status types"""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"


class Booking(Base):
    """Booking/Appointment model"""

    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)

    # References
    customer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    salon_id = Column(Integer, ForeignKey("salons.id"), nullable=False)
    service_id = Column(Integer, ForeignKey("services.id"), nullable=False)
    staff_id = Column(Integer, ForeignKey("staff.id"), nullable=True)

    # Booking Details
    booking_date = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=False)
    duration_minutes = Column(Integer, nullable=False)

    # Status
    status = Column(Enum(BookingStatus), default=BookingStatus.PENDING, nullable=False)

    # Notes
    customer_notes = Column(Text, nullable=True)
    salon_notes = Column(Text, nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    cancelled_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    customer = relationship("User", foreign_keys=[customer_id], back_populates="bookings_as_customer")
    salon = relationship("Salon", back_populates="bookings")
    service = relationship("Service", back_populates="bookings")
    staff_member = relationship("Staff", back_populates="bookings")
    payment = relationship("Payment", back_populates="booking", uselist=False)


class Payment(Base):
    """Payment model"""

    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"), nullable=False, unique=True)

    # Amount Details
    amount = Column(Float, nullable=False)  # Total amount in HTG
    platform_fee = Column(Float, nullable=False)  # Platform commission
    vendor_amount = Column(Float, nullable=False)  # Amount to vendor

    # Payment Provider
    payment_provider = Column(String, default="moncash")
    transaction_id = Column(String, nullable=True, unique=True)  # MonCash transaction ID

    # Status
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING, nullable=False)

    # Vendor Payout
    payout_status = Column(String, default="pending")  # pending, completed, failed
    payout_transaction_id = Column(String, nullable=True)
    payout_completed_at = Column(DateTime(timezone=True), nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    paid_at = Column(DateTime(timezone=True), nullable=True)
    refunded_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    booking = relationship("Booking", back_populates="payment")
