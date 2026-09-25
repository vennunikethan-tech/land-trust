/**
 * Land Trust GIS Map Provider Configuration
 * 
 * Configures legitimate tile providers with required attributions
 * for Street Map and Satellite Imagery.
 *
 * Environment variables:
 * - VITE_SATELLITE_MAP_API_KEY: Optional API key / token for satellite provider
 * - VITE_SATELLITE_MAP_PROVIDER: Provider selector ('esri' | 'maptiler')
 */

const SATELLITE_API_KEY = import.meta.env.VITE_SATELLITE_MAP_API_KEY || '';
const SATELLITE_PROVIDER = (import.meta.env.VITE_SATELLITE_MAP_PROVIDER || 'esri').toLowerCase();

export const BASE_MAP_TYPES = {
  STREET: 'street',
  SATELLITE: 'satellite',
};

export const BASE_MAPS = {
  [BASE_MAP_TYPES.STREET]: {
    id: BASE_MAP_TYPES.STREET,
    name: 'Street Map',
    label: 'Street Map',
    sublabel: 'OpenStreetMap Carto Vector',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors • SIH 2026 Land Trust',
    maxZoom: 19,
    minZoom: 3,
  },
  [BASE_MAP_TYPES.SATELLITE]: {
    id: BASE_MAP_TYPES.SATELLITE,
    name: 'Satellite Imagery',
    label: 'Satellite',
    sublabel: SATELLITE_PROVIDER === 'maptiler' ? 'MapTiler Satellite' : 'Esri World Imagery (High-Res)',
    url:
      SATELLITE_PROVIDER === 'maptiler' && SATELLITE_API_KEY
        ? `https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${SATELLITE_API_KEY}`
        : `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}${
            SATELLITE_API_KEY ? `?token=${SATELLITE_API_KEY}` : ''
          }`,
    attribution:
      SATELLITE_PROVIDER === 'maptiler' && SATELLITE_API_KEY
        ? '&copy; <a href="https://www.maptiler.com/" target="_blank" rel="noopener noreferrer">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
        : 'Tiles &copy; <a href="https://www.esri.com/" target="_blank" rel="noopener noreferrer">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 19,
    minZoom: 3,
  },
};

export function getBaseMapConfig(type = BASE_MAP_TYPES.STREET) {
  return BASE_MAPS[type] || BASE_MAPS[BASE_MAP_TYPES.STREET];
}
