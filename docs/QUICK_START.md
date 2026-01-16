# Quick Start Guide

Get BeautyBook Haiti running in 10 minutes!

## Prerequisites

Before starting, make sure you have:

- [x] Node.js 18+ installed
- [x] Python 3.11+ installed
- [x] PostgreSQL 14+ installed
- [x] Expo CLI (`npm install -g expo-cli`)
- [x] MonCash API credentials (get from [MonCash Business Portal](https://moncashbutton.digicelgroup.com/Moncash-business/))

## Step 1: Clone & Setup

```bash
cd cyber-security-course-

# Install mobile dependencies
cd mobile
npm install
cd ..

# Install backend dependencies
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

## Step 2: Database Setup

```bash
# Create PostgreSQL database
createdb beautybook

# Or using psql:
psql -U postgres
CREATE DATABASE beautybook;
\q
```

Update database URL in `backend/.env`:
```
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/beautybook
```

## Step 3: Configure Environment Variables

### Backend Environment

Create `backend/.env`:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your MonCash credentials:

```bash
# MonCash Credentials
MONCASH_CLIENT_ID=your_actual_client_id
MONCASH_CLIENT_SECRET=your_actual_secret
MONCASH_MODE=sandbox

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/beautybook

# Security (generate a random secret)
SECRET_KEY=your-super-secret-random-key-here
```

**Generate a secure SECRET_KEY:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Mobile Environment

Create `mobile/.env`:

```bash
cd ../mobile
echo 'API_URL=http://localhost:8000' > .env
```

## Step 4: Initialize Database

```bash
cd backend

# Activate virtual environment
source venv/bin/activate  # Windows: venv\Scripts\activate

# Initialize Alembic (database migrations)
alembic init alembic

# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

## Step 5: Start the Backend

```bash
# Make sure you're in backend/ directory
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate

# Start FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

Test the API:
```bash
curl http://localhost:8000/health
```

## Step 6: Start the Mobile App

Open a new terminal:

```bash
cd mobile

# Start Expo
npx expo start
```

You'll see a QR code. You can:

- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator
- Scan QR code with Expo Go app on your phone

## Step 7: Test the App

1. The app should open with the beautiful liquid glass UI
2. You'll see the home screen with:
   - Glassmorphism cards
   - Featured salons
   - Service categories

## Next Steps

### Add Sample Data

Create a Python script to add test salons:

```python
# backend/seed_data.py
from app.core.database import SessionLocal
from app.models.user import User, UserRole
from app.models.salon import Salon
from app.models.service import Service, ServiceCategory

db = SessionLocal()

# Create a test vendor
vendor = User(
    email="salon@test.com",
    phone="50931234567",
    full_name="Test Salon Owner",
    role=UserRole.VENDOR,
    hashed_password="hashed_password_here",
    moncash_number="50931234567",
    moncash_verified=True,
)
db.add(vendor)
db.flush()

# Create a test salon
salon = Salon(
    owner_id=vendor.id,
    name="Beauty Luxe",
    description="Premium beauty salon in Pétion-Ville",
    phone="50931234567",
    address="123 Rue Example",
    city="Pétion-Ville",
    department="Ouest",
)
db.add(salon)
db.flush()

# Create services
service = Service(
    salon_id=salon.id,
    name="Women's Haircut",
    description="Professional haircut and styling",
    category=ServiceCategory.HAIRCUT,
    price=500.00,
    duration_minutes=60,
)
db.add(service)

db.commit()
print("Sample data created!")
```

Run it:
```bash
cd backend
python seed_data.py
```

### Customize the Design

Edit colors in `mobile/src/theme/colors.ts`:

```typescript
primary: {
    500: '#FF0062', // Change to your brand color
}
```

### Test MonCash Payments

1. Create a booking
2. Get redirected to MonCash sandbox
3. Complete payment with test credentials
4. See instant payout to salon owner

## Troubleshooting

### Backend won't start

**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Database connection error

**Error:** `could not connect to server: Connection refused`

**Solution:**
```bash
# Make sure PostgreSQL is running
sudo service postgresql start  # Linux
brew services start postgresql  # macOS
```

### Mobile app won't connect to backend

**Error:** Network request failed

**Solution:**
- Make sure backend is running on port 8000
- Update `mobile/.env` with correct API_URL
- On physical device, use your computer's IP instead of localhost:
  ```
  API_URL=http://192.168.1.100:8000
  ```

### Expo build errors

**Solution:**
```bash
cd mobile
rm -rf node_modules
npm install
npx expo start --clear
```

## Production Deployment

See [docs/DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment guide.

## Getting Help

- Check [docs/API.md](./API.md) for API documentation
- Read [docs/MONCASH.md](./MONCASH.md) for MonCash integration
- Review code examples in `mobile/src/screens/`

## Happy Building! 🇭🇹

You now have a fully functional appointment booking platform with:

✅ Beautiful liquid glass UI
✅ MonCash payment integration
✅ Instant vendor payouts
✅ Cross-platform mobile app
✅ High-performance FastAPI backend

Start customizing it for your needs!
