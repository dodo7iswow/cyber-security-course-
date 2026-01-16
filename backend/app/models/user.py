"""
User Models
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from ..core.database import Base


class UserRole(str, enum.Enum):
    """User role types"""
    CUSTOMER = "customer"
    VENDOR = "vendor"
    ADMIN = "admin"


class User(Base):
    """User model for both customers and service providers"""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.CUSTOMER, nullable=False)

    # Profile
    profile_image = Column(String, nullable=True)
    bio = Column(String, nullable=True)

    # MonCash Integration (for vendors)
    moncash_number = Column(String, nullable=True)  # MonCash phone number
    moncash_verified = Column(Boolean, default=False)

    # Status
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    email_verified = Column(Boolean, default=False)
    phone_verified = Column(Boolean, default=False)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    salons = relationship("Salon", back_populates="owner")
    bookings_as_customer = relationship(
        "Booking", foreign_keys="Booking.customer_id", back_populates="customer"
    )
