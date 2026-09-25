"""
Health Check Route.
GET /api/health
"""

from fastapi import APIRouter
from ..schemas.land import HealthResponse

router = APIRouter()


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="API Health Check",
    description="Returns the operational status and service identifier of the Land Trust backend.",
)
async def check_health() -> HealthResponse:
    """Returns the operational status of the service."""
    return HealthResponse(
        status="ok",
        service="Land Trust API",
    )
