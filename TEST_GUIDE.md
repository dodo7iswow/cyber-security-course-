# Testing BeautyBook Haiti in Virtual Environments

## Quick Test: Backend API

### Start the Backend Server

```bash
cd /home/user/cyber-security-course-/backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Test in Browser

Open these URLs in your browser:

1. **Root Endpoint:**
   ```
   http://localhost:8000
   ```
   You should see:
   ```json
   {
     "app": "BeautyBook Haiti",
     "version": "1.0.0",
     "status": "running",
     "moncash_mode": "sandbox"
   }
   ```

2. **Health Check:**
   ```
   http://localhost:8000/health
   ```
   You should see:
   ```json
   {
     "status": "healthy"
   }
   ```

3. **Interactive API Documentation:**
   ```
   http://localhost:8000/docs
   ```
   This opens **Swagger UI** where you can test all API endpoints interactively!

---

## Option 2: Mobile App in Browser (Expo Web) 🖥️

This runs your React Native app as a web app in your browser!

### Start Expo Web

```bash
cd /home/user/cyber-security-course-/mobile
npx expo start --web
```

This will:
- Compile the app for web
- Open automatically in your browser at `http://localhost:19006`
- Show the liquid glass UI design in your browser!

**Note:** Some native features won't work on web, but you can see the beautiful UI!

---

## Option 3: iOS Simulator (Mac Only) 📱

### Requirements
- macOS
- Xcode installed

### Run iOS Simulator

```bash
cd /home/user/cyber-security-course-/mobile
npx expo start
# Press 'i' when the QR code appears
```

This launches the iOS Simulator with your app running like a real iPhone!

---

## Option 4: Android Emulator 🤖

### Requirements
- Android Studio installed
- Android emulator configured

### Run Android Emulator

```bash
cd /home/user/cyber-security-course-/mobile

# Start Android emulator first (or use Android Studio)
emulator -avd <your_avd_name>

# Then start Expo
npx expo start
# Press 'a' when the QR code appears
```

---

## Option 5: Docker Container (Isolated Environment) 🐳

### Create Backend Docker Container

Create `backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Run in Docker

```bash
cd backend

# Build image
docker build -t beautybook-backend .

# Run container
docker run -p 8000:8000 beautybook-backend
```

Access at: `http://localhost:8000`

---

## Option 6: Test with API Client Tools 🔧

### Using curl (Command Line)

```bash
# Test root endpoint
curl http://localhost:8000/

# Test health
curl http://localhost:8000/health

# Create a booking (example)
curl -X POST http://localhost:8000/api/bookings/create \
  -H "Content-Type: application/json" \
  -d '{
    "service_id": 1,
    "customer_id": 1,
    "booking_date": "2026-01-20T14:00:00"
  }'
```

### Using Postman or Insomnia

1. Download [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/)
2. Import API endpoints:
   - `GET http://localhost:8000/`
   - `GET http://localhost:8000/health`
   - `POST http://localhost:8000/api/bookings/create`

---

## Option 7: Cloud Development Environment ☁️

### GitHub Codespaces

1. Push your code to GitHub
2. Click "Code" → "Codespaces" → "Create codespace"
3. Run the app in the cloud browser!

### Replit

1. Import your project to [Replit](https://replit.com)
2. Configure to run FastAPI
3. Test in the embedded browser

---

## Recommended Testing Workflow 🚀

### 1. Start Backend (Terminal 1)
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Test API Documentation
Open: `http://localhost:8000/docs`

This gives you an **interactive playground** to test all endpoints!

### 3. Start Mobile Web (Terminal 2)
```bash
cd mobile
npx expo start --web
```

Open: `http://localhost:19006`

### 4. View Both Side-by-Side
- Left side: API docs at `localhost:8000/docs`
- Right side: Mobile app at `localhost:19006`

---

## Virtual Testing Checklist ✅

- [ ] Backend API responds at `http://localhost:8000`
- [ ] Health check returns `{"status":"healthy"}`
- [ ] API docs open at `http://localhost:8000/docs`
- [ ] Mobile app loads in browser
- [ ] Liquid glass UI components display correctly
- [ ] Can navigate the home screen
- [ ] Gradient backgrounds render properly

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or use different port
uvicorn app.main:app --port 8001
```

### Can't Access from Other Devices
```bash
# Find your IP address
ip addr show  # Linux
ifconfig      # Mac

# Start with your IP
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Update mobile/.env
API_URL=http://YOUR_IP:8000
```

### Expo Web Not Loading
```bash
# Clear cache
npx expo start --clear

# Or use web specifically
npx expo start --web
```

---

## Next Steps

1. **Test the API**: Use the Swagger UI at `/docs`
2. **View Mobile UI**: Run Expo web to see the liquid glass design
3. **Add Sample Data**: Create test salons and services
4. **Test Booking Flow**: Create a booking through the API
5. **Customize Design**: Change colors and see updates instantly

Enjoy testing your beautiful BeautyBook Haiti app! 🇭🇹✨
