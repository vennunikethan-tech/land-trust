"""
Pydantic Schemas for Land Trust (SIH26014) Phase 3A.
Defines clean request and response models with proper type hints.
"""

from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    """Health check response schema."""
    status: str = Field(default="ok", example="ok")
    service: str = Field(default="Land Trust API", example="Land Trust API")


class LandBase(BaseModel):
    """Core land property attributes."""
    id: str = Field(..., description="Unique Land Trust property identifier, e.g. PROP-HYD-001")
    survey_number: str = Field(..., description="Cadastral survey number, e.g. 123/4")
    owner_name: str = Field(..., description="Simulated demo owner name")
    village: str = Field(..., description="Revenue village name")
    mandal: str = Field(..., description="Revenue mandal/sub-district")
    district: str = Field(..., description="District name")
    land_area: str = Field(..., description="Recorded land area, e.g. 2.5 Acres")
    land_type: str = Field(..., description="Classification: Farm Land, Agricultural, Residential, Commercial, Mixed Use")
    status: str = Field(..., description="Governance status: Verified, Warning, Issue, Pending")
    latitude: float = Field(..., description="WGS84 centroid latitude")
    longitude: float = Field(..., description="WGS84 centroid longitude")
    verification_status: str = Field(..., description="Institutional verification status")


class Land(LandBase):
    """Detailed Land model including optional nested institutional records."""
    property_id: Optional[str] = Field(None, description="Government digital parcel identifier")
    state: Optional[str] = Field("Telangana", description="State name")
    coordinates: Optional[str] = Field(None, description="Formatted coordinate string")
    status_reason: Optional[str] = Field(None, description="Audit notes or discrepancy explanation")
    
    # Nested institutional information (optional for lightweight endpoints, present in detail)
    ownership: Optional[Dict[str, Any]] = None
    cadastral: Optional[Dict[str, Any]] = None
    registration: Optional[Dict[str, Any]] = None
    tax: Optional[Dict[str, Any]] = None
    restrictions: Optional[Dict[str, Any]] = None

    class Config:
        populate_by_name = True


class LandResponse(BaseModel):
    """Single land response wrapper."""
    success: bool = True
    data: Land


class LandListResponse(BaseModel):
    """List of land records response wrapper."""
    success: bool = True
    total: int
    lands: List[Land]


class LandSearchResponse(BaseModel):
    """Search query response wrapper."""
    query: Optional[str] = None
    total: int
    results: List[Land]


class ParcelFeature(BaseModel):
    """GeoJSON Feature representation of a parcel."""
    type: str = "Feature"
    properties: Dict[str, Any]
    geometry: Dict[str, Any]


class ParcelFeatureCollection(BaseModel):
    """GeoJSON FeatureCollection suitable for GIS map ingestion."""
    type: str = "FeatureCollection"
    name: Optional[str] = "LandTrust_Distributed_Demo_Parcels"
    features: List[ParcelFeature]
