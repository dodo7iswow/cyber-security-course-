"""
Service Models
"""

from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from ..core.database import Base


class ServiceCategory(str, enum.Enum):
    """Service category types"""
    HAIRCUT = "haircut"
    STYLING = "styling"
    COLORING = "coloring"
    BRAIDING = "braiding"
    NAILS = "nails"
    MAKEUP = "makeup"
    FACIAL = "facial"
    MASSAGE = "massage"
    WAXING = "waxing"
    OTHER = "other"


class Service(Base):
    """Services offered by salons"""

    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    salon_id = Column(Integer, ForeignKey("salons.id"), nullable=False)

    # Service Details
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(Enum(ServiceCategory), nullable=False)

    # Pricing
    price = Column(Float, nullable=False)  # Price in HTG (Haitian Gourdes)
    currency = Column(String, default="HTG")

    # Duration
    duration_minutes = Column(Integer, nullable=False)  # Service duration

    # Media
    image = Column(String, nullable=True)

    # Status
    is_active = Column(Boolean, default=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    salon = relationship("Salon", back_populates="services")
    bookings = relationship("Booking", back_populates="service")
