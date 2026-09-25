"""
Land Trust FastAPI Application (SIH26014 - Phase 3A).
Digital Public Infrastructure for Unified Land Records & Cadastral Governance.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.health import router as health_router
from .routes.lands import router as lands_router
from .routes.parcels import router as parcels_router

app = FastAPI(
    title="Land Trust REST API",
    description=(
        "Backend REST API for Land Trust (SIH26014).\n\n"
        "Provides digital public infrastructure endpoints for querying georeferenced land records, "
        "survey numbers, ownership verifications, and OGC-compliant GeoJSON cadastral boundaries."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Enable CORS for communication with React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers under /api prefix
app.include_router(health_router, prefix="/api", tags=["System & Health"])
app.include_router(lands_router, prefix="/api", tags=["Land Records"])
app.include_router(parcels_router, prefix="/api", tags=["Cadastral Parcels"])


@app.get("/", tags=["Root"], summary="API Root")
async def root():
    """Root endpoint welcoming developers and redirecting to interactive Swagger docs."""
    return {
        "project": "Land Trust — Unified GIS-Based Digital Public Infrastructure for Land Governance",
        "sih_problem": "SIH26014",
        "phase": "Phase 3A (FastAPI Backend Foundation)",
        "docs": "/docs",
        "redoc": "/redoc",
        "endpoints": {
            "health": "/api/health",
            "lands": "/api/lands",
            "search": "/api/lands/search?survey_number=123/4",
            "parcels": "/api/parcels",
        },
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
