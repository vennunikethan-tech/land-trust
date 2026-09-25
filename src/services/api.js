/**
 * Land Trust REST API Client (SIH26014 - Phase 3A)
 * Connects React Frontend to Python FastAPI Backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Helper to build full endpoint URL and perform fetch with timeout.
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(`API Error ${response.status} (${response.statusText}): ${errorBody}`);
  }

  return response.json();
}

export const api = {
  /**
   * Health check endpoint: GET /api/health
   */
  checkHealth: async () => {
    return apiRequest('/api/health');
  },

  /**
   * List all land records: GET /api/lands
   */
  getLands: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.limit) query.append('limit', params.limit);
    if (params.offset) query.append('offset', params.offset);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return apiRequest(`/api/lands${qs}`);
  },

  /**
   * Get single land record: GET /api/lands/{id}
   */
  getLandById: async (id) => {
    if (!id) return null;
    return apiRequest(`/api/lands/${encodeURIComponent(id)}`);
  },

  /**
   * Search lands by criteria: GET /api/lands/search
   */
  searchLands: async ({ surveyNumber, village, mandal, district, landType, status } = {}) => {
    const query = new URLSearchParams();
    if (surveyNumber && surveyNumber.trim()) query.append('survey_number', surveyNumber.trim());
    if (village && village.trim()) query.append('village', village.trim());
    if (mandal && mandal.trim()) query.append('mandal', mandal.trim());
    if (district && district.trim()) query.append('district', district.trim());
    if (landType && landType.trim()) query.append('land_type', landType.trim());
    if (status && status.trim()) query.append('status', status.trim());

    const qs = query.toString() ? `?${query.toString()}` : '';
    return apiRequest(`/api/lands/search${qs}`);
  },

  /**
   * Get GeoJSON parcel boundaries: GET /api/parcels
   */
  getParcels: async () => {
    return apiRequest('/api/parcels');
  },
};

export default api;
