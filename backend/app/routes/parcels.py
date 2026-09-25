"""
Parcel & Cadastral GIS Routes.
Provides GeoJSON endpoint for frontend map ingestion.
"""

from typing import Dict, Any
from fastapi import APIRouter
from ..services.land_service import LandService

router = APIRouter(prefix="/parcels")


@router.get(
    "",
    summary="Get GeoJSON Parcels",
    description="Retrieve cadastral parcel polygon boundaries formatted as standard GeoJSON FeatureCollection.",
)
async def get_parcels() -> Dict[str, Any]:
    """Return parcel boundaries suitable for Leaflet or MapLibre GIS map rendering."""
    return LandService.get_parcels_geojson()
