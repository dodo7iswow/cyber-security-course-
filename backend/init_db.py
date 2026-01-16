"""
Initialize database tables
"""

from app.core.database import Base, engine
from app.models import user, salon, service, booking

print("Creating database tables...")

# Create all tables
Base.metadata.create_all(bind=engine)

print("✓ Database tables created successfully!")
print("✓ Database: beautybook.db")
print("\nYou can now start the server with:")
print("  uvicorn app.main:app --reload")
