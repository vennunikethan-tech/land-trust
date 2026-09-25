"""API Routes Package for Land Trust"""
from .health import router as health_router
from .lands import router as lands_router
from .parcels import router as parcels_router

__all__ = ["health_router", "lands_router", "parcels_router"]
