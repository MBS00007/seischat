"""Application health endpoints."""

from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
def health_check() -> dict[str, str]:
    """Report that the HTTP application is running."""

    return {"status": "ok"}
