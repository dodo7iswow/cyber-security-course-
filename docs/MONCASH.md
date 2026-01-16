# MonCash Integration Guide

This document explains how MonCash payment integration works in BeautyBook Haiti.

## What is MonCash?

MonCash is Haiti's leading mobile money service by Digicel. It allows customers to:
- Pay for services using their mobile phone
- Transfer money instantly
- Send and receive payments

## How It Works in BeautyBook

### 1. Customer Books a Service

```
Customer → Selects Salon & Service → Creates Booking → Redirected to MonCash Payment
```

### 2. Payment Flow

1. Customer creates booking for a service (e.g., Haircut - 500 HTG)
2. Backend calculates:
   - Total Amount: 500 HTG
   - Platform Fee (10%): 50 HTG
   - Vendor Amount: 450 HTG

3. MonCash payment is created via API
4. Customer is redirected to MonCash to complete payment
5. Customer enters MonCash PIN to authorize payment

### 3. Instant Payout to Salon Owner

Once payment is confirmed:
1. Booking status changes to "CONFIRMED"
2. Backend automatically transfers vendor amount (450 HTG) to salon owner's MonCash account
3. Salon owner receives money INSTANTLY in their MonCash wallet
4. Platform keeps commission (50 HTG)

## API Implementation

### Create Payment

```python
from app.integrations.moncash import moncash_client

# Create payment request
payment = await moncash_client.create_payment(
    amount=500.00,  # Amount in HTG
    order_id="BOOKING-123",
    description="Haircut at Beauty Luxe"
)

# Returns:
# {
#     "payment_token": "abc123...",
#     "payment_url": "https://moncashbutton.digicelgroup.com/payment/abc123"
# }
```

### Verify Payment

```python
# Check if payment was successful
is_paid = await moncash_client.verify_payment(
    transaction_id="TRX-456"
)

if is_paid:
    # Update booking to confirmed
    booking.status = "CONFIRMED"
```

### Transfer to Vendor

```python
# Send money to salon owner
payout = await moncash_client.transfer_to_vendor(
    amount=450.00,  # Vendor's cut
    receiver_number="50931234567",  # Salon owner's MonCash number
    description="Payout for booking #123"
)
```

## Setup Instructions

### 1. Get MonCash API Credentials

1. Visit [MonCash Business Portal](https://moncashbutton.digicelgroup.com/Moncash-business/)
2. Create a business account
3. Complete verification process
4. Get your:
   - `CLIENT_ID`
   - `CLIENT_SECRET`

### 2. Configure Environment Variables

Add to `.env` file:

```bash
MONCASH_CLIENT_ID=your_client_id_here
MONCASH_CLIENT_SECRET=your_secret_here
MONCASH_MODE=sandbox  # Use sandbox for testing
```

### 3. Testing in Sandbox Mode

MonCash provides a sandbox environment for testing:

**Sandbox Base URL:**
```
https://sandbox.moncashbutton.digicelgroup.com
```

**Test Credentials:**
- Use test MonCash numbers provided by Digicel
- Payments won't use real money
- All API calls work the same as production

### 4. Going to Production

When ready to launch:

```bash
MONCASH_MODE=production
```

Production base URL will automatically be used:
```
https://moncashbutton.digicelgroup.com
```

## Payment States

| State | Description | Next Action |
|-------|-------------|-------------|
| `PENDING` | Payment created, waiting for customer | Customer needs to pay |
| `PROCESSING` | Payment being verified | Wait for confirmation |
| `COMPLETED` | Payment successful | Process payout |
| `FAILED` | Payment failed or cancelled | Cancel booking |

## Payout States

| State | Description |
|-------|-------------|
| `pending` | Waiting to process payout |
| `completed` | Money transferred to vendor |
| `failed` | Transfer failed, needs retry |

## Commission Structure

Default platform commission: **10%**

Example:
- Service Price: 500 HTG
- Platform Fee: 50 HTG (10%)
- Vendor Receives: 450 HTG (90%)

Commission can be customized per salon in the database:

```python
salon.commission_rate = 0.15  # 15% commission
```

## MonCash Phone Number Format

MonCash uses Haitian phone numbers in format:

```
509XXXXXXXX  # 11 digits total
```

Examples:
- 50931234567
- 50937894561

## Error Handling

### Common Errors

**1. Invalid Credentials**
```json
{
    "error": "invalid_client",
    "message": "Client authentication failed"
}
```
**Solution:** Check your CLIENT_ID and CLIENT_SECRET

**2. Insufficient Balance**
```json
{
    "error": "insufficient_funds",
    "message": "Customer has insufficient balance"
}
```
**Solution:** Ask customer to top up their MonCash account

**3. Invalid Phone Number**
```json
{
    "error": "invalid_receiver",
    "message": "Receiver number is invalid"
}
```
**Solution:** Verify phone number format (509XXXXXXXX)

## Security Best Practices

1. **Never expose credentials** in client-side code
2. **Always verify payments** on the backend before confirming bookings
3. **Use HTTPS** for all API calls
4. **Store transaction IDs** for audit trail
5. **Implement retry logic** for failed payouts
6. **Log all transactions** for reconciliation

## Testing Checklist

- [ ] Create payment in sandbox
- [ ] Complete payment flow
- [ ] Verify payment confirmation
- [ ] Test payout to vendor
- [ ] Test failed payment scenario
- [ ] Test insufficient balance
- [ ] Test invalid credentials
- [ ] Verify commission calculation

## Support

**MonCash Support:**
- Email: business@moncashbutton.com
- Phone: +509 XXXX-XXXX
- Portal: https://moncashbutton.digicelgroup.com/Moncash-business/

**Documentation:**
- API Docs: https://sandbox.moncashbutton.digicelgroup.com/docs/api

## Webhook Integration (Future)

MonCash supports webhooks for automatic payment notifications:

```python
@app.post("/webhooks/moncash")
async def moncash_webhook(payload: dict):
    # Verify webhook signature
    # Update payment status
    # Trigger payout
    pass
```

This allows automatic payment confirmation without manual verification.
