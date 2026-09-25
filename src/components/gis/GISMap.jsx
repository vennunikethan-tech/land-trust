import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap, useMapEvents } from 'react-leaflet';
import { 
  Search, 
  Layers, 
  MapPin, 
  Globe2, 
  Map as MapIcon, 
  Crosshair, 
  X, 
  RotateCcw,
  CheckCircle2,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import parcelsGeoJson from '../../data/parcels.geojson';
import ParcelLayer from './ParcelLayer';
import AuxiliaryLayers from './AuxiliaryLayers';
import PropertyPopup from './PropertyPopup';
import MapLegend from './MapLegend';
import ParcelInfoDrawer from './ParcelInfoDrawer';
import { mockProperties } from '../../data/properties';
import { BASE_MAP_TYPES, BASE_MAPS, getBaseMapConfig } from '../../config/mapConfig';

// Internal controller component for programmatic map pan/zoom & coordinate tracking
function MapEventsController({ onMouseMoveCoords, flyTarget }) {
  const map = useMap();

  useMapEvents({
    mousemove(e) {
      if (onMouseMoveCoords) {
        const lat = e.latlng.lat.toFixed(4);
        const lng = e.latlng.lng.toFixed(4);
        onMouseMoveCoords(`${lat}° N, ${lng}° E`);
      }
    },
  });

  useEffect(() => {
    if (flyTarget) {
      if (flyTarget.bounds) {
        map.flyToBounds(flyTarget.bounds, {
          maxZoom: 17,
          padding: [50, 50],
          duration: 1.2,
        });
      } else if (flyTarget.center) {
        map.flyTo(flyTarget.center, flyTarget.zoom || 16, {
          duration: 1.2,
        });
      }
    }
  }, [flyTarget, map]);

  return null;
}

export default function GISMap({
  initialParcelId = null,
  initialBaseMap = BASE_MAP_TYPES.SATELLITE,
  title = "CADASTRAL GIS REPOSITORY",
  subtitle = "Interactive Cadastral GIS (SIH26014 Digital Public Infrastructure)",
  className = "",
}) {
  // Base map selection: 'street' | 'satellite'
  const [baseMap, setBaseMap] = useState(initialBaseMap);

  // Independent layer stack toggles
  const [layers, setLayers] = useState({
    cadastral: true,
    surveyNumbers: true,
    roads: false,
    buildings: false,
    waterBodies: false,
    landUse: false,
  });

  // Selected parcel & popup state
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [popupPos, setPopupPos] = useState(null);
  const [flyTarget, setFlyTarget] = useState(null);

  // In-map search query
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // UI Panel visibility toggles
  const [showSidebar, setShowSidebar] = useState(true);
  const [mouseCoords, setMouseCoords] = useState("17.3630° N, 78.3660° E");

  // Initial default regional map center & zoom overview
  const defaultCenter = [17.363, 78.366];
  const defaultZoom = 12;

  // Active base map configuration
  const currentBaseMap = useMemo(() => getBaseMapConfig(baseMap), [baseMap]);

  // Find parcel feature helper with exact-then-partial search
  const findParcelFeature = (idOrSurvey) => {
    if (!idOrSurvey) return null;
    const q = idOrSurvey.trim().toLowerCase();
    
    // 1. Exact match on propertyId or surveyNumber
    const exact = parcelsGeoJson.features.find((f) => {
      const p = f.properties;
      return (
        p.propertyId?.toLowerCase() === q ||
        p.surveyNumber?.toLowerCase() === q
      );
    });
    if (exact) return exact;

    // 2. Partial match fallback
    return parcelsGeoJson.features.find((f) => {
      const p = f.properties;
      return (
        p.propertyId?.toLowerCase().includes(q) ||
        p.surveyNumber?.toLowerCase().includes(q)
      );
    });
  };

  // Convert GeoJSON polygon coordinates to Leaflet LatLng bounds
  const getFeatureBounds = (feature) => {
    if (!feature?.geometry?.coordinates?.[0]) return null;
    const ring = feature.geometry.coordinates[0];
    const lats = ring.map((c) => c[1]);
    const lngs = ring.map((c) => c[0]);
    return [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)],
    ];
  };

  const getFeatureCenter = (feature) => {
    if (!feature?.geometry?.coordinates?.[0]) return defaultCenter;
    const ring = feature.geometry.coordinates[0];
    const avgLat = ring.reduce((sum, c) => sum + c[1], 0) / ring.length;
    const avgLng = ring.reduce((sum, c) => sum + c[0], 0) / ring.length;
    return [avgLat, avgLng];
  };

  // Handle external or prop-driven parcel focus (e.g. ?parcel=PROP-HYD-002 or ?survey=123/4)
  useEffect(() => {
    if (initialParcelId) {
      const feat = findParcelFeature(initialParcelId);
      if (feat) {
        selectAndCenterParcel(feat);
      }
    }
  }, [initialParcelId]);

  const selectAndCenterParcel = (feature) => {
    if (!feature) return;
    const props = feature.properties;
    const center = getFeatureCenter(feature);
    const bounds = getFeatureBounds(feature);

    // Merge with full mockProperties for rich drawer information
    const richProp = mockProperties.find(
      (p) => p.id === props.propertyId || p.surveyNumber === props.surveyNumber
    );

    setSelectedParcel({ ...props, ...(richProp || {}) });
    setPopupPos(center);
    setFlyTarget({ bounds, center });
  };

  const handleSelectParcelFromMap = (properties, center, bounds) => {
    const richProp = mockProperties.find(
      (p) => p.id === properties.propertyId || p.surveyNumber === properties.surveyNumber
    );
    setSelectedParcel({ ...properties, ...(richProp || {}) });
    setPopupPos(center);
  };

  const handleResetView = () => {
    setSelectedParcel(null);
    setPopupPos(null);
    setFlyTarget({ center: defaultCenter, zoom: defaultZoom });
  };

  // Filtered search suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return parcelsGeoJson.features.filter((f) => {
      const p = f.properties;
      return (
        p.surveyNumber.toLowerCase().includes(q) ||
        p.propertyId.toLowerCase().includes(q) ||
        p.owner.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const handleToggleLayer = (layerName) => {
    setLayers((prev) => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  return (
    <div className={`relative w-full h-[650px] lg:h-[750px] rounded-2xl overflow-hidden border border-slate-300 bg-[#eef2f6] shadow-md select-none flex flex-col font-sans ${className}`}>
      
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Title Badge & Active Base Map Status */}
        <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-3 pointer-events-auto">
          <div className={`w-3 h-3 rounded-full ${baseMap === BASE_MAP_TYPES.SATELLITE ? 'bg-cyan-500 animate-pulse' : 'bg-emerald-500'}`}></div>
          <div>
            <h2 className="text-sm font-bold font-display tracking-tight text-slate-900 flex items-center gap-2">
              <span>{title}</span>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                baseMap === BASE_MAP_TYPES.SATELLITE 
                  ? 'bg-cyan-100 text-cyan-800 border border-cyan-200' 
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}>
                {baseMap === BASE_MAP_TYPES.SATELLITE ? 'Satellite Base' : 'Street Base'}
              </span>
            </h2>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Top Right Controls: Quick Base Map Switcher + Sidebar Toggle + Reset */}
        <div className="flex items-center gap-2 pointer-events-auto">
          
          {/* Quick Base Map Switcher Pill */}
          <div className="bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200 shadow-md flex items-center gap-1 text-xs">
            <button
              type="button"
              id="basemap-toggle-street"
              onClick={() => setBaseMap(BASE_MAP_TYPES.STREET)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                baseMap === BASE_MAP_TYPES.STREET
                  ? 'bg-[#0f2744] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Switch to Street Map"
            >
              <MapIcon size={13} />
              <span>Street</span>
            </button>
            <button
              type="button"
              id="basemap-toggle-satellite"
              onClick={() => setBaseMap(BASE_MAP_TYPES.SATELLITE)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                baseMap === BASE_MAP_TYPES.SATELLITE
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Switch to Satellite Imagery"
            >
              <Globe2 size={13} />
              <span>Satellite</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowSidebar(!showSidebar)}
            className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 shadow-md flex items-center gap-2 text-xs font-semibold transition-colors"
          >
            <SlidersHorizontal size={14} className="text-emerald-600" />
            <span className="hidden sm:inline">{showSidebar ? 'Hide Controls' : 'Show Controls'}</span>
          </button>

          <button
            type="button"
            onClick={handleResetView}
            className="bg-white/95 backdrop-blur-md p-2 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 shadow-md transition-colors"
            title="Reset Map Center"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Collapsible Left Control Sidebar (Base Map + Search + Layers + Legend) */}
      {showSidebar && (
        <div className="absolute top-20 left-4 z-20 w-72 sm:w-80 max-h-[calc(100%-110px)] overflow-y-auto space-y-3 pointer-events-auto animate-fade-in pr-0.5">
          
          {/* Base Map Selector Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-3.5 shadow-lg text-xs space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="font-bold uppercase tracking-wider text-[11px] text-slate-700 flex items-center gap-1.5">
                <Globe2 size={13} className="text-emerald-600" />
                <span>Base Map Options</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                Selectable
              </span>
            </div>

            {/* Base Map Radio Style Buttons */}
            <div className="space-y-1.5">
              <label
                onClick={() => setBaseMap(BASE_MAP_TYPES.STREET)}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                  baseMap === BASE_MAP_TYPES.STREET
                    ? 'bg-emerald-50/80 border-emerald-500 text-slate-900 font-semibold shadow-xs'
                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    baseMap === BASE_MAP_TYPES.STREET
                      ? 'border-emerald-600 bg-emerald-600'
                      : 'border-slate-400 bg-white'
                  }`}>
                    {baseMap === BASE_MAP_TYPES.STREET && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    )}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Street Map</div>
                    <div className="text-[10px] text-slate-500">OpenStreetMap Carto Vector</div>
                  </div>
                </div>
                <MapIcon size={14} className={baseMap === BASE_MAP_TYPES.STREET ? 'text-emerald-600' : 'text-slate-400'} />
              </label>

              <label
                onClick={() => setBaseMap(BASE_MAP_TYPES.SATELLITE)}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                  baseMap === BASE_MAP_TYPES.SATELLITE
                    ? 'bg-emerald-50/80 border-emerald-500 text-slate-900 font-semibold shadow-xs'
                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    baseMap === BASE_MAP_TYPES.SATELLITE
                      ? 'border-emerald-600 bg-emerald-600'
                      : 'border-slate-400 bg-white'
                  }`}>
                    {baseMap === BASE_MAP_TYPES.SATELLITE && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    )}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Satellite Imagery</div>
                    <div className="text-[10px] text-slate-500">{currentBaseMap.sublabel}</div>
                  </div>
                </div>
                <Globe2 size={14} className={baseMap === BASE_MAP_TYPES.SATELLITE ? 'text-emerald-600' : 'text-slate-400'} />
              </label>
            </div>
          </div>

          {/* Quick Search & Fly Panel */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-3.5 shadow-lg text-xs space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="font-bold uppercase tracking-wider text-[11px] text-slate-700 flex items-center gap-1.5">
                <Search size={13} className="text-emerald-600" />
                <span>Search & Fly to Parcel</span>
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                placeholder="Search Survey No. (e.g. 123/4, 204/3)..."
                className="w-full pl-8 pr-7 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 bg-white"
              />
              <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchResults(false);
                  }}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700"
                >
                  <X size={13} />
                </button>
              )}

              {/* Autocomplete Dropdown */}
              {showSearchResults && searchSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-slate-200 shadow-xl max-h-52 overflow-y-auto z-50 divide-y divide-slate-100">
                  {searchSuggestions.map((feat) => {
                    const p = feat.properties;
                    return (
                      <button
                        key={p.propertyId}
                        type="button"
                        onClick={() => {
                          selectAndCenterParcel(feat);
                          setShowSearchResults(false);
                          setSearchQuery(`Survey ${p.surveyNumber}`);
                        }}
                        className="w-full text-left p-2.5 hover:bg-slate-50 transition-colors flex items-start justify-between gap-2"
                      >
                        <div>
                          <p className="font-bold text-slate-900 text-xs">Survey {p.surveyNumber}</p>
                          <p className="text-[10px] text-slate-500">{p.village} • {p.owner}</p>
                        </div>
                        <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          {p.area}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Layer Control Panel */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-3.5 shadow-lg text-xs space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="font-bold uppercase tracking-wider text-[11px] text-slate-700 flex items-center gap-1.5">
                <Layers size={13} className="text-emerald-600" />
                <span>Map Layers</span>
              </span>
              <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                Overlays
              </span>
            </div>

            <div className="space-y-1.5">
              {/* Cadastral Parcels */}
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={layers.cadastral}
                    onChange={() => handleToggleLayer('cadastral')}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-800 text-[11px]">Cadastral Parcels</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Active</span>
              </label>

              {/* Survey Numbers */}
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={layers.surveyNumbers}
                    onChange={() => handleToggleLayer('surveyNumbers')}
                    className="rounded text-sky-600 focus:ring-sky-500 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-800 text-[11px]">Survey Numbers</span>
                </div>
                <span className="text-[10px] font-semibold text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded">Labels</span>
              </label>

              {/* Roads */}
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={layers.roads}
                    onChange={() => handleToggleLayer('roads')}
                    className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-800 text-[11px]">Roads</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              </label>

              {/* Buildings */}
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={layers.buildings}
                    onChange={() => handleToggleLayer('buildings')}
                    className="rounded text-slate-700 focus:ring-slate-500 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-800 text-[11px]">Buildings</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-slate-700"></span>
              </label>

              {/* Water Bodies */}
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={layers.waterBodies}
                    onChange={() => handleToggleLayer('waterBodies')}
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-800 text-[11px]">Water Bodies</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              </label>

              {/* Land Use */}
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={layers.landUse}
                    onChange={() => handleToggleLayer('landUse')}
                    className="rounded text-purple-600 focus:ring-purple-500 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-800 text-[11px]">Land Use</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              </label>
            </div>
          </div>

          {/* Map Legend */}
          <MapLegend baseMap={baseMap} />
        </div>
      )}

      {/* Main Interactive Leaflet MapContainer */}
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        zoomControl={false}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        {/* Layer 1: Selectable Base Tile Layer (Street or Satellite) */}
        <TileLayer
          key={`basemap-${baseMap}`}
          url={currentBaseMap.url}
          attribution={currentBaseMap.attribution}
          maxZoom={currentBaseMap.maxZoom}
          minZoom={currentBaseMap.minZoom}
        />

        {/* Zoom controls at bottom right */}
        <ZoomControl position="bottomright" />

        {/* Layer 2: Auxiliary Layers (Roads, Water Bodies, Land Use, Buildings) */}
        <AuxiliaryLayers layers={layers} />

        {/* Layer 3: Primary Cadastral Parcel GeoJSON Boundaries + Survey Numbers */}
        {layers.cadastral && (
          <ParcelLayer
            baseMap={baseMap}
            showSurveyNumbers={layers.surveyNumbers}
            selectedParcel={selectedParcel}
            onSelectParcel={handleSelectParcelFromMap}
          />
        )}

        {/* Layer 4: Interactive Popup on Parcel Click */}
        {selectedParcel && popupPos && (
          <PropertyPopup
            parcel={selectedParcel}
            position={popupPos}
            onClose={() => setPopupPos(null)}
          />
        )}

        {/* Map Events & Programmatic Controller */}
        <MapEventsController
          onMouseMoveCoords={setMouseCoords}
          flyTarget={flyTarget}
        />
      </MapContainer>

      {/* Floating Property Info Drawer (Side Panel on Selection) */}
      {selectedParcel && (
        <div className="absolute top-20 right-4 z-20 max-h-[85%] overflow-y-auto pointer-events-auto">
          <ParcelInfoDrawer
            parcel={selectedParcel}
            onClose={() => setSelectedParcel(null)}
          />
        </div>
      )}

      {/* Live Coordinate & Base Map Indicator at Bottom Left */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-xs pointer-events-none">
        <Crosshair size={13} className="text-emerald-600" />
        <span className="font-mono text-[11px] text-slate-800">{mouseCoords}</span>
        <span className="text-slate-300">|</span>
        <span className="text-[10px] text-slate-600 font-medium">
          {baseMap === BASE_MAP_TYPES.SATELLITE ? '🛰️ Satellite Imagery' : '🗺️ Street Map'}
        </span>
        <span className="text-slate-300">|</span>
        <span className="text-[10px] text-slate-500 font-medium">EPSG:4326</span>
      </div>
    </div>
  );
}
