# BeautyBook Haiti 🇭🇹

A modern appointment booking platform for beauty salons in Haiti with integrated MonCash payments.

## Features

- 🎨 **Liquid Glass UI** - Beautiful iOS-inspired glassmorphism design
- 💰 **MonCash Integration** - Instant payments to service providers
- 📱 **Cross-Platform** - iOS & Android with React Native
- 💈 **Beauty Services** - Salons, barbershops, nail services, and more
- ⚡ **Real-time Booking** - Instant appointment confirmations
- 🔐 **Secure Payments** - PCI-compliant payment processing

## Tech Stack

### Mobile App
- **React Native** with Expo
- **TypeScript** for type safety
- **React Native Reanimated** for smooth animations
- **Expo Blur** for glassmorphism effects
- **React Navigation** for routing
- **React Query** for data fetching
- **Zustand** for state management

### Backend
- **Python 3.11+**
- **FastAPI** for high-performance APIs
- **PostgreSQL** for database
- **SQLAlchemy** ORM
- **Pydantic** for validation
- **JWT** authentication
- **MonCash API** integration
- **Stripe** (optional backup payment)

## Project Structure

```
.
├── mobile/                 # React Native mobile app
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── screens/       # App screens
│   │   ├── navigation/    # Navigation setup
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom hooks
│   │   ├── store/         # State management
│   │   └── theme/         # Design tokens & themes
│   ├── app.json
│   ├── package.json
│   └── tsconfig.json
│
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Pydantic schemas
│   │   ├── services/     # Business logic
│   │   ├── core/         # Config, security, utils
│   │   └── integrations/ # MonCash, notifications
│   ├── alembic/          # Database migrations
│   ├── requirements.txt
│   └── main.py
│
└── docs/                 # Documentation
    ├── API.md
    ├── MONCASH.md
    └── DEPLOYMENT.md
```

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+
- Expo CLI
- MonCash API credentials

### Mobile App Setup

```bash
cd mobile
npm install
npx expo start
```

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## MonCash Integration

The app integrates with MonCash API for payments:
- Instant payment processing
- Automatic vendor payouts
- Transaction history
- Refund handling

See [docs/MONCASH.md](docs/MONCASH.md) for detailed integration guide.

## Development

### Mobile Development
```bash
# iOS
npx expo run:ios

# Android
npx expo run:android

# Web (for testing)
npx expo start --web
```

### Backend Development
```bash
# Run with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run tests
pytest

# Database migrations
alembic upgrade head
```

## Environment Variables

### Mobile (.env)
```
API_URL=http://localhost:8000
MONCASH_CLIENT_ID=your_client_id
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@localhost/beautybook
SECRET_KEY=your_secret_key
MONCASH_CLIENT_ID=your_client_id
MONCASH_CLIENT_SECRET=your_client_secret
MONCASH_MODE=sandbox  # or production
```

## Contributing

This is a private project for the Haiti market.

## License

Proprietary - All Rights Reserved
