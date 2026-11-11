"""SQLAlchemy declarative base used by all future models."""

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Base class that future SQLAlchemy models will inherit from."""
