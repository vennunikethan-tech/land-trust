"""
Land & Property Routes.
Provides endpoints for querying, retrieving, and searching land records.
"""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, status
from ..schemas.land import Land
from ..services.land_service import LandService

router = APIRouter(prefix="/lands")


@router.get(
    "",
    response_model=List[Land],
    summary="List All Land Records",
    description="Retrieve all registered demo land records with optional pagination limits.",
)
async def list_lands(
    limit: int = Query(default=100, ge=1, le=500, description="Max number of records to return"),
    offset: int = Query(default=0, ge=0, description="Offset index for pagination"),
) -> List[Land]:
    """Retrieve all available land records."""
    records = LandService.get_all_lands(limit=limit, offset=offset)
    return [Land(**item) for item in records]


@router.get(
    "/search",
    response_model=List[Land],
    summary="Search Land Records",
    description="Query land records by survey number, village, mandal, district, or land type.",
)
async def search_lands(
    survey_number: Optional[str] = Query(None, description="Cadastral survey number (e.g. 123/4, 204/3)"),
    village: Optional[str] = Query(None, description="Revenue village name (e.g. Shamshabad, Madhapur)"),
    mandal: Optional[str] = Query(None, description="Revenue mandal (e.g. Rajendranagar, Serilingampally)"),
    district: Optional[str] = Query(None, description="District name (e.g. Rangareddy, Hyderabad)"),
    land_type: Optional[str] = Query(None, description="Land classification filter"),
    status: Optional[str] = Query(None, description="Verification status filter"),
) -> List[Land]:
    """Search land records matching specified query filters."""
    matches = LandService.search_lands(
        survey_number=survey_number,
        village=village,
        mandal=mandal,
        district=district,
        land_type=land_type,
        status=status,
    )
    return [Land(**item) for item in matches]


@router.get(
    "/{land_id}",
    response_model=Land,
    summary="Get Land Record by ID",
    description="Retrieve full details for a specific land record by Land Trust ID or Survey Number.",
)
async def get_land_by_id(land_id: str) -> Land:
    """Retrieve a single land record by ID."""
    record = LandService.get_land_by_id(land_id=land_id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Land record '{land_id}' was not found in the Land Trust repository.",
        )
    return Land(**record)
