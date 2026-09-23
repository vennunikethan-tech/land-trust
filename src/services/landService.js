import { mockProperties } from '../data/properties';

/**
 * Land Records Service
 * Abstracts land data retrieval. In Phase 2, these mock queries
 * will be replaced by FastAPI endpoints querying PostgreSQL/PostGIS.
 */
export const landService = {
  // Get all properties
  getAllProperties: async () => {
    return Promise.resolve([...mockProperties]);
  },

  // Get property by ID
  getPropertyById: async (id) => {
    const property = mockProperties.find((p) => p.id === id || p.surveyNumber === id);
    return Promise.resolve(property || null);
  },

  // Search properties with filters
  searchProperties: async ({ surveyNumber, district, mandal, village }) => {
    let results = [...mockProperties];

    if (surveyNumber && surveyNumber.trim()) {
      const q = surveyNumber.trim().toLowerCase();
      results = results.filter((p) => p.surveyNumber.toLowerCase().includes(q) || p.propertyId.toLowerCase().includes(q));
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
    // Returns 3 primary properties owned/tracked by the demo citizen
    return Promise.resolve(mockProperties.slice(0, 3));
  },
};
