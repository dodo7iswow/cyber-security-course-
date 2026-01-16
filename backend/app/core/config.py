"""
Application Configuration
"""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # App Settings
    APP_NAME: str = "BeautyBook Haiti"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost/beautybook"

    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # MonCash Configuration
    MONCASH_CLIENT_ID: str
    MONCASH_CLIENT_SECRET: str
    MONCASH_MODE: str = "sandbox"  # sandbox or production
    MONCASH_BASE_URL: str = "https://sandbox.moncashbutton.digicelgroup.com"

    # CORS Settings
    CORS_ORIGINS: list = [
        "http://localhost:3000",
        "http://localhost:19006",  # Expo web
        "exp://localhost:19000",   # Expo app
    ]

    # File Upload
    MAX_UPLOAD_SIZE: int = 5 * 1024 * 1024  # 5MB
    UPLOAD_DIR: str = "uploads"

    # Email (for notifications)
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: Optional[int] = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
