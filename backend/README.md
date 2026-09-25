# Land Trust — FastAPI Backend (SIH26014 • Phase 3A)

Backend REST API foundation for **Land Trust: An Integrated GIS-based Digital Public Infrastructure for Land Governance**.

Built with **Python FastAPI** and **Pydantic**, providing RESTful services for querying georeferenced land records, cadastral survey numbers, ownership verification statuses, and GeoJSON polygon boundaries.

---

## 📁 Backend Project Structure

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app initialization, CORS middleware & route mounts
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── health.py        # GET /api/health
│   │   ├── lands.py         # GET /api/lands, GET /api/lands/{id}, GET /api/lands/search
│   │   └── parcels.py       # GET /api/parcels (GeoJSON FeatureCollection)
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── land.py          # Pydantic models (Land, LandResponse, HealthResponse, etc.)
│   ├── services/
│   │   ├── __init__.py
│   │   └── land_service.py  # Business logic & data retrieval abstraction
│   └── data/
│       ├── __init__.py
│       └── mock_land_data.py# 10 distributed synthetic demo land records & parcels
├── requirements.txt         # FastAPI, Uvicorn, Pydantic dependencies
└── README.md                # Backend setup, execution & API guide
```

---

## 🚀 Quickstart Guide

### 1. Create a Python Virtual Environment

From the project root or `backend` folder:

```bash
cd backend
python -m venv .venv
```

**Activate the virtual environment:**
* **Windows (PowerShell):**
  ```powershell
  .venv\Scripts\Activate.ps1
  ```
* **Windows (Command Prompt):**
  ```cmd
  .venv\Scripts\activate.bat
  ```
* **macOS / Linux:**
  ```bash
  source .venv/bin/activate
  ```

### 2. Install Requirements

```bash
pip install -r requirements.txt
```

### 3. Start the FastAPI Server

Run Uvicorn in development mode with hot-reload enabled:

```bash
uvicorn app.main:app --reload --port 8000
```

Alternatively:
```bash
python -m app.main
```

The server will be available at:
* **Base URL:** [http://localhost:8000](http://localhost:8000)
* **Root Endpoint:** [http://localhost:8000/](http://localhost:8000/)

---

## 📖 API Documentation (Swagger & ReDoc)

FastAPI automatically generates interactive, self-documenting API specifications:

* **Interactive Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
  * Try out requests, view parameter schemas, and inspect real-time responses.
* **ReDoc Clean Reference:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health check | None |
| `GET` | `/api/lands` | List all registered land records | `limit`, `offset` |
| `GET` | `/api/lands/search` | Search lands by criteria | `survey_number`, `village`, `mandal`, `district`, `land_type`, `status` |
| `GET` | `/api/lands/{land_id}` | Retrieve single land record | Path param: `land_id` or `survey_number` |
| `GET` | `/api/parcels` | OGC GeoJSON polygon boundaries | None |

### Example Queries:
* Health: `curl http://localhost:8000/api/health`
* All Lands: `curl http://localhost:8000/api/lands`
* Search by Survey Number: `curl "http://localhost:8000/api/lands/search?survey_number=123/4"`
* Search by Village: `curl "http://localhost:8000/api/lands/search?village=Shamshabad"`
* Get by Property ID: `curl http://localhost:8000/api/lands/PROP-HYD-001`
* Get GeoJSON Parcels: `curl http://localhost:8000/api/parcels`

---

## 💻 Running the React Frontend

In a separate terminal window from the project root (`d:/SIH/land-trust`):

```bash
# Start Vite development server
npm run dev
```

* **Frontend URL:** [http://localhost:5173](http://localhost:5173)

---

## 🔄 How the Frontend Communicates with the Backend

1. **Environment Configuration:**
   The frontend reads `VITE_API_BASE_URL` from `.env` (defaults to `http://localhost:8000`).
2. **API Client (`src/services/api.js`):**
   Encapsulates standard `fetch` HTTP calls to `/api/health`, `/api/lands`, `/api/lands/{id}`, `/api/lands/search`, and `/api/parcels`.
3. **Data Service (`src/services/landService.js`):**
   Connects the existing UI components (`SearchLandPage`, `LandProfilePage`, `CitizenDashboard`, `OfficerRecordsPage`) to the FastAPI backend.
   * *Graceful Fallback:* If the FastAPI backend is offline or unreachable, `landService.js` automatically falls back to local data without disrupting the user experience or throwing fatal errors.
4. **CORS Middleware:**
   FastAPI's `CORSMiddleware` in `backend/app/main.py` explicitly allows cross-origin requests from `http://localhost:5173`.

---

## 🔮 Phase 3B Roadmap (Future Database Integration)

* Connect `LandService` to PostgreSQL using SQLAlchemy / AsyncPG.
* Implement PostGIS spatial extension for spatial queries (`ST_Contains`, `ST_Intersects`, `ST_AsGeoJSON`).
* Ingest official cadastral vector datasets into PostGIS geometry tables.
* Implement automated discrepancy detection engine comparing drone survey boundaries with revenue deeds.
