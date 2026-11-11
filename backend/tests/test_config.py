"""Tests for environment-backed settings."""

from app.core.config import Settings


def test_settings_support_environment_values(monkeypatch) -> None:
    monkeypatch.setenv("DATABASE_URL", "postgresql+psycopg://example")
    monkeypatch.setenv("APP_ENVIRONMENT", "test")
    monkeypatch.setenv("FRONTEND_ORIGIN", "http://test.example")

    settings = Settings()

    assert settings.database_url == "postgresql+psycopg://example"
    assert settings.app_environment == "test"
    assert settings.frontend_origin == "http://test.example"
