import { api } from './api';
import { mockProperties } from '../data/properties';

/**
 * Normalizes property objects to ensure full compatibility with the existing React UI
 * while consuming backend FastAPI snake_case and camelCase payloads.
 */
function normalizeProperty(item) {
  if (!item) return null;
  const localMatch = mockProperties.find(
    (p) => p.id === item.id || p.surveyNumber === item.survey_number || p.propertyId === item.property_id
  );

  return {
    ...(localMatch || {}),
    ...item,
    id: item.id || localMatch?.id,
    surveyNumber: item.survey_number || item.surveyNumber || localMatch?.surveyNumber,
    propertyId: item.property_id || item.propertyId || localMatch?.propertyId,
    area: item.land_area || item.area || localMatch?.area,
    landType: item.land_type || item.landType || localMatch?.landType,
    verificationStatus:
      item.verification_status || item.status || item.verificationStatus || localMatch?.verificationStatus,
    village: item.village || localMatch?.village,
    mandal: item.mandal || localMatch?.mandal,
    district: item.district || localMatch?.district,
    coordinates:
      item.coordinates ||
      (item.latitude && item.longitude ? `${item.latitude}° N, ${item.longitude}° E` : localMatch?.coordinates),
    ownership: item.ownership || localMatch?.ownership || { ownerName: item.owner_name || 'Simulated Demo Record' },
    statusReason: item.status_reason || item.statusReason || localMatch?.statusReason,
  };
}

/**
 * Land Records Service (SIH26014 - Phase 3A)
 * Connects frontend views to FastAPI endpoints (`/api/lands`, `/api/lands/{id}`, `/api/lands/search`)
 * with graceful fallback to local dataset if backend is offline.
 */
export const landService = {
  // Get all properties from FastAPI
  getAllProperties: async () => {
    try {
      const data = await api.getLands();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(normalizeProperty);
      }
    } catch (err) {
      console.warn('[LandService] FastAPI unavailable, using local mock dataset:', err.message);
    }
    return Promise.resolve([...mockProperties]);
  },

  // Get property by ID from FastAPI
  getPropertyById: async (id) => {
    try {
      const data = await api.getLandById(id);
      if (data) {
        return normalizeProperty(data);
      }
    } catch (err) {
      console.warn(`[LandService] FastAPI lookup for '${id}' unavailable, using local mock dataset:`, err.message);
    }
    const property = mockProperties.find((p) => p.id === id || p.surveyNumber === id);
    return Promise.resolve(property || null);
  },

  // Search properties with filters from FastAPI
  searchProperties: async ({ surveyNumber, district, mandal, village }) => {
    try {
      const data = await api.searchLands({ surveyNumber, district, mandal, village });
      if (Array.isArray(data) && data.length > 0) {
        return data.map(normalizeProperty);
      }
    } catch (err) {
      console.warn('[LandService] FastAPI search unavailable, using local search fallback:', err.message);
    }

    let results = [...mockProperties];

    if (surveyNumber && surveyNumber.trim()) {
      const q = surveyNumber.trim().toLowerCase();
      results = results.filter(
        (p) => p.surveyNumber.toLowerCase().includes(q) || p.propertyId.toLowerCase().includes(q)
      );
    }

    if (district && district.trim()) {
      results = results.filter((p) => p.district.toLowerCase() === district.trim().toLowerCase());
    }

    if (mandal && mandal.trim()) {
      results = results.filter((p) => p.mandal.toLowerCase() === mandal.trim().toLowerCase());
    }

    if (village && village.trim()) {
      results = results.filter((p) => p.village.toLowerCase() === village.trim().toLowerCase());
    }

    return Promise.resolve(results);
  },

  // Get properties for the current citizen (mocked user properties)
  getCitizenProperties: async () => {
    try {
      const all = await landService.getAllProperties();
      return all.slice(0, 3);
    } catch (err) {
      return Promise.resolve(mockProperties.slice(0, 3));
    }
  },
};

export default landService;
