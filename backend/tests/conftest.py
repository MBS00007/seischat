"""Shared test configuration."""

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture
def client() -> TestClient:
    """Create a test client without requiring a live database."""

    return TestClient(app)
