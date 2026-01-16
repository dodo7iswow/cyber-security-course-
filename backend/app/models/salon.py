"""
Salon/Business Models
"""

from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base


class Salon(Base):
    """Beauty salon/business model"""

    __tablename__ = "salons"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Basic Info
    name = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=True)

    # Location
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    department = Column(String, nullable=False)  # Haiti departments
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    # Media
    cover_image = Column(String, nullable=True)
    logo_image = Column(String, nullable=True)

    # Business Hours (JSON or separate model)
    business_hours = Column(Text, nullable=True)  # JSON string

    # Rating & Stats
    rating = Column(Float, default=0.0)
    total_reviews = Column(Integer, default=0)
    total_bookings = Column(Integer, default=0)

    # Payment
    commission_rate = Column(Float, default=0.10)  # 10% platform fee

    # Status
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    owner = relationship("User", back_populates="salons")
    services = relationship("Service", back_populates="salon", cascade="all, delete-orphan")
    staff = relationship("Staff", back_populates="salon", cascade="all, delete-orphan")
    bookings = relationship("Booking", back_populates="salon")


class Staff(Base):
    """Staff members at a salon"""

    __tablename__ = "staff"

    id = Column(Integer, primary_key=True, index=True)
    salon_id = Column(Integer, ForeignKey("salons.id"), nullable=False)

    # Personal Info
    name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    profile_image = Column(String, nullable=True)
    bio = Column(Text, nullable=True)

    # Specialties
    specialties = Column(Text, nullable=True)  # JSON array of service types

    # Availability (JSON or separate model)
    schedule = Column(Text, nullable=True)  # JSON string

    # Status
    is_active = Column(Boolean, default=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    salon = relationship("Salon", back_populates="staff")
    bookings = relationship("Booking", back_populates="staff_member")
