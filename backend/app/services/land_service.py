"""
Land Service Layer (SIH26014).
Encapsulates land data retrieval and search logic.
In Phase 3A: Queries MOCK_LANDS.
In Phase 3B: Connects cleanly to SQLAlchemy/AsyncPG with PostgreSQL & PostGIS.
"""

from typing import List, Optional, Dict, Any
from ..data.mock_land_data import MOCK_LANDS, MOCK_PARCELS_GEOJSON


class LandService:
    """Service class handling land records, search queries, and cadastral spatial data."""

    @staticmethod
    def get_all_lands(limit: int = 100, offset: int = 0) -> List[Dict[str, Any]]:
        """Retrieve all registered demo land records."""
        return MOCK_LANDS[offset : offset + limit]

    @staticmethod
    def get_land_by_id(land_id: str) -> Optional[Dict[str, Any]]:
        """
        Retrieve a single land record by ID or Survey Number.
        Matches case-insensitively against:
        1. Unique Land Trust ID (e.g. PROP-HYD-001)
        2. Survey Number (e.g. 123/4)
        3. Property ID (e.g. TS-RR-SER-MAD-001234)
        """
        if not land_id:
            return None
        q = land_id.strip().lower()
        for item in MOCK_LANDS:
            if (
                item.get("id", "").lower() == q
                or item.get("survey_number", "").lower() == q
                or item.get("property_id", "").lower() == q
            ):
                return item
        return None

    @staticmethod
    def search_lands(
        survey_number: Optional[str] = None,
        village: Optional[str] = None,
        mandal: Optional[str] = None,
        district: Optional[str] = None,
        land_type: Optional[str] = None,
        status: Optional[str] = None,
    ) -> List[Dict[str, Any]]:
        """
        Search land records by multiple optional filter criteria.
        Supports partial matching on survey number and case-insensitive matching on location fields.
        """
        results = MOCK_LANDS

        if survey_number and survey_number.strip():
            q = survey_number.strip().lower()
            results = [
                p for p in results
                if q in p.get("survey_number", "").lower()
                or q in p.get("id", "").lower()
                or q in p.get("property_id", "").lower()
            ]

        if village and village.strip():
            v = village.strip().lower()
            results = [p for p in results if v == p.get("village", "").lower()]

        if mandal and mandal.strip():
            m = mandal.strip().lower()
            results = [p for p in results if m == p.get("mandal", "").lower()]

        if district and district.strip():
            d = district.strip().lower()
            results = [p for p in results if d == p.get("district", "").lower()]

        if land_type and land_type.strip():
            lt = land_type.strip().lower()
            results = [p for p in results if lt in p.get("land_type", "").lower()]

        if status and status.strip():
            st = status.strip().lower()
            results = [p for p in results if st == p.get("status", "").lower() or st == p.get("verification_status", "").lower()]

        return results

    @staticmethod
    def get_parcels_geojson() -> Dict[str, Any]:
        """
        Retrieve parcel polygon boundaries in standard GeoJSON format for the GIS map.
        In Phase 3B, this will execute ST_AsGeoJSON against PostGIS geometry tables.
        """
        return MOCK_PARCELS_GEOJSON
