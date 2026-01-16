"""
BeautyBook Haiti - FastAPI Main Application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Appointment booking platform for beauty salons in Haiti",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "moncash_mode": settings.MONCASH_MODE,
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


# Import and include routers
# from .api import auth, users, salons, services, bookings, payments
# app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
# app.include_router(users.router, prefix="/api/users", tags=["users"])
# app.include_router(salons.router, prefix="/api/salons", tags=["salons"])
# app.include_router(services.router, prefix="/api/services", tags=["services"])
# app.include_router(bookings.router, prefix="/api/bookings", tags=["bookings"])
# app.include_router(payments.router, prefix="/api/payments", tags=["payments"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
