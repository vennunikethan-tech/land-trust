import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap, useMapEvents } from 'react-leaflet';
import { 
  Search, 
  Layers, 
  MapPin, 
  Compass, 
  Maximize2, 
  Crosshair, 
  Info, 
  ShieldCheck, 
  X, 
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import parcelsGeoJson from '../../data/parcels.geojson';
import ParcelLayer from './ParcelLayer';
import AuxiliaryLayers from './AuxiliaryLayers';
import PropertyPopup from './PropertyPopup';
import MapLegend from './MapLegend';
import ParcelInfoDrawer from './ParcelInfoDrawer';
import { mockProperties } from '../../data/properties';

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
  title = "CADASTRAL GIS REPOSITORY",
  subtitle = "Interactive Cadastral GIS (SIH26014 Digital Public Infrastructure)",
  className = "",
}) {
  // Layer toggles
  const [layers, setLayers] = useState({
    cadastral: true,
    roads: true,
    landUse: true,
    waterBodies: true,
    buildings: true,
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
  const [showLegend, setShowLegend] = useState(true);
  const [mouseCoords, setMouseCoords] = useState("17.4475° N, 78.3885° E");

  // Initial default map center & bounds
  const defaultCenter = [17.4475, 78.3885];
  const defaultZoom = 15;

  // Find parcel feature helper
  const findParcelFeature = (idOrSurvey) => {
    if (!idOrSurvey) return null;
    const q = idOrSurvey.trim().toLowerCase();
    return parcelsGeoJson.features.find((f) => {
      const p = f.properties;
      return (
        p.propertyId?.toLowerCase() === q ||
        p.surveyNumber?.toLowerCase() === q ||
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

  // Handle external or prop-driven parcel focus (e.g. ?parcel=PROP-HYD-002)
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
        {/* Title Badge */}
        <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-3 pointer-events-auto">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <div>
            <h2 className="text-sm font-bold font-display tracking-tight text-slate-900 flex items-center gap-1.5">
              <span>{title}</span>
              <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                Leaflet GIS
              </span>
            </h2>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Top Right Utilities */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 shadow-md flex items-center gap-2 text-xs font-semibold transition-colors"
          >
            <Layers size={15} className="text-emerald-600" />
            <span className="hidden sm:inline">{showSidebar ? 'Hide Controls' : 'Show Controls'}</span>
          </button>

          <button
            onClick={handleResetView}
            className="bg-white/95 backdrop-blur-md p-2 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 shadow-md transition-colors"
            title="Reset Map Center"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Collapsible Left Control Sidebar (Search + Layers + Legend) */}
      {showSidebar && (
        <div className="absolute top-20 left-4 z-20 w-72 sm:w-80 max-h-[calc(100%-110px)] overflow-y-auto space-y-3 pointer-events-auto animate-fade-in">
          {/* Quick Search Panel */}
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
                <span>Map Layer Stack</span>
              </span>
              <span className="text-[10px] text-slate-400">5 Layers</span>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={layers.cadastral}
                    onChange={() => handleToggleLayer('cadastral')}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-semibold text-slate-800 text-[11px]">Cadastral Parcels</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Active</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={layers.roads}
                    onChange={() => handleToggleLayer('roads')}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="font-semibold text-slate-800 text-[11px]">Roads & Arterials</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={layers.waterBodies}
                    onChange={() => handleToggleLayer('waterBodies')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-semibold text-slate-800 text-[11px]">Water Bodies & GO 111 FTL</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={layers.landUse}
                    onChange={() => handleToggleLayer('landUse')}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="font-semibold text-slate-800 text-[11px]">Master Plan Land Use</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={layers.buildings}
                    onChange={() => handleToggleLayer('buildings')}
                    className="rounded text-slate-700 focus:ring-slate-500"
                  />
                  <span className="font-semibold text-slate-800 text-[11px]">Building Footprints</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-slate-700"></span>
              </label>
            </div>
          </div>

          {/* Map Legend */}
          {showLegend && <MapLegend />}
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
        {/* OpenStreetMap Base Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors • SIH 2026 Land Trust'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Zoom controls at bottom right */}
        <ZoomControl position="bottomright" />

        {/* Auxiliary Layers: Roads, Water Bodies, Land Use, Buildings */}
        <AuxiliaryLayers layers={layers} />

        {/* Primary Cadastral Parcel GeoJSON Layer */}
        {layers.cadastral && (
          <ParcelLayer
            selectedParcel={selectedParcel}
            onSelectParcel={handleSelectParcelFromMap}
          />
        )}

        {/* Interactive Popup on Parcel Click */}
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

      {/* Floating Property Info Drawer (Bottom Right or Side Panel on Selection) */}
      {selectedParcel && (
        <div className="absolute top-20 right-4 z-20 max-h-[85%] overflow-y-auto pointer-events-auto">
          <ParcelInfoDrawer
            parcel={selectedParcel}
            onClose={() => setSelectedParcel(null)}
          />
        </div>
      )}

      {/* Live Coordinate Display at Bottom Left */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-xs pointer-events-none">
        <Crosshair size={13} className="text-emerald-600" />
        <span className="font-mono text-[11px] text-slate-800">{mouseCoords}</span>
        <span className="text-slate-300">|</span>
        <span className="text-[10px] text-slate-500 font-medium">EPSG:4326 (WGS 84)</span>
      </div>
    </div>
  );
}
