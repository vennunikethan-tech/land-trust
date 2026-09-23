import React, { useState } from 'react';
import { 
  Compass, 
  Plus, 
  Minus, 
  Maximize2, 
  Crosshair, 
  Map as MapIcon, 
  Info, 
  Layers,
  AlertTriangle
} from 'lucide-react';
import LayerControlPanel from './LayerControlPanel';
import ParcelInfoDrawer from './ParcelInfoDrawer';
import { mockProperties } from '../../data/properties';

export default function GisMapPlaceholder({ title = "GIS MAP", subtitle }) {
  const [layers, setLayers] = useState({
    cadastral: true,
    landUse: true,
    roads: true,
    buildings: true,
    waterBodies: true,
    utilities: true,
    restrictions: true,
  });

  const [selectedParcel, setSelectedParcel] = useState(mockProperties[0]);
  const [zoomLevel, setZoomLevel] = useState(16);
  const [mouseCoords, setMouseCoords] = useState("17.4485° N, 78.3908° E");
  const [showLayerPanel, setShowLayerPanel] = useState(true);

  const handleToggleLayer = (id) => {
    setLayers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleAll = (val) => {
    setLayers({
      cadastral: val,
      landUse: val,
      roads: val,
      buildings: val,
      waterBodies: val,
      utilities: val,
      restrictions: val,
    });
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;
    const lat = (17.4400 + (1 - yRatio) * 0.02).toFixed(4);
    const lon = (78.3800 + xRatio * 0.03).toFixed(4);
    setMouseCoords(`${lat}° N, ${lon}° E`);
  };

  // Mock parcel vector definitions with geographic styles
  const parcels = [
    {
      id: "PROP-HYD-001",
      surveyNo: "123/4",
      d: "M 220,140 L 410,150 L 390,320 L 200,300 Z",
      center: { x: 305, y: 220 },
      fill: "fill-emerald-500/25 hover:fill-emerald-500/40",
      stroke: "stroke-emerald-600",
      status: "Verified",
      prop: mockProperties[0],
    },
    {
      id: "PROP-HYD-002",
      surveyNo: "204/3",
      d: "M 410,150 L 590,170 L 560,340 L 390,320 Z",
      center: { x: 490, y: 240 },
      fill: "fill-amber-500/25 hover:fill-amber-500/40",
      stroke: "stroke-amber-600 stroke-dashed",
      status: "Warning (Mismatch)",
      prop: mockProperties[1],
    },
    {
      id: "PROP-HYD-003",
      surveyNo: "45/2A",
      d: "M 200,300 L 390,320 L 360,470 L 170,440 Z",
      center: { x: 280, y: 380 },
      fill: "fill-blue-500/25 hover:fill-blue-500/40",
      stroke: "stroke-blue-600",
      status: "Verified",
      prop: mockProperties[2],
    },
    {
      id: "PROP-HYD-004",
      surveyNo: "88/1B",
      d: "M 560,340 L 730,350 L 700,500 L 530,480 Z",
      center: { x: 630, y: 420 },
      fill: "fill-rose-500/30 hover:fill-rose-500/50",
      stroke: "stroke-rose-600",
      status: "Issue (Encroachment)",
      prop: mockProperties[3],
    },
    {
      id: "PROP-HYD-005",
      surveyNo: "156/A",
      d: "M 390,320 L 560,340 L 530,480 L 360,470 Z",
      center: { x: 460, y: 400 },
      fill: "fill-purple-500/25 hover:fill-purple-500/40",
      stroke: "stroke-purple-600",
      status: "Verified",
      prop: mockProperties[4],
    },
  ];

  return (
    <div className="relative w-full h-[620px] lg:h-[720px] rounded-2xl overflow-hidden border border-slate-300 bg-[#eef2f6] shadow-inner select-none flex flex-col">
      {/* Top Bar inside Map */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 shadow-md flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <div>
            <h2 className="text-sm font-bold font-display tracking-tight text-slate-900 flex items-center gap-1.5">
              <span>{title}</span>
              <span className="text-[10px] uppercase font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                DGPS Georeferenced
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              {subtitle || "Interactive Cadastral Canvas (SIH26014 Digital Public Infrastructure)"}
            </p>
          </div>
        </div>

        {/* Future Backend Readiness Banner */}
        <div className="hidden sm:flex items-center gap-2 bg-[#0b192c]/90 backdrop-blur-md text-slate-200 px-3 py-2 rounded-xl text-xs border border-slate-700 shadow-md">
          <Info size={14} className="text-emerald-400 shrink-0" />
          <span>Vector parcel mesh ready for Phase 2 PostGIS & Leaflet integration</span>
        </div>
      </div>

      {/* Main Interactive Vector SVG Map Canvas */}
      <div 
        className="w-full h-full relative cursor-crosshair parcel-grid-pattern overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <svg
          viewBox="0 0 900 600"
          className="w-full h-full object-cover transition-all duration-300"
          style={{ transform: `scale(${zoomLevel / 16})` }}
        >
          <defs>
            {/* Water pattern */}
            <pattern id="water-wave" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 0 10 Q 5 5, 10 10 T 20 10" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.6"/>
            </pattern>
            {/* Restricted hatch pattern */}
            <pattern id="hatch-red" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="10" stroke="#f43f5e" strokeWidth="2" opacity="0.4" />
            </pattern>
          </defs>

          {/* LAYER 5: Water Bodies (FTL & Catchment) */}
          {layers.waterBodies && (
            <g id="layer-water">
              <path
                d="M 620,0 Q 690,120 780,240 T 900,320 L 900,0 Z"
                fill="#e0f2fe"
                stroke="#38bdf8"
                strokeWidth="2"
              />
              <path
                d="M 620,0 Q 690,120 780,240 T 900,320 L 900,0 Z"
                fill="url(#water-wave)"
              />
              <text x="730" y="80" fill="#0284c7" fontSize="12" fontWeight="700" letterSpacing="2">
                HIMAYAT SAGAR BUFFER (FTL)
              </text>
            </g>
          )}

          {/* LAYER 7: Restrictions (GO 111 / Sec 22-A Buffer) */}
          {layers.restrictions && (
            <g id="layer-restrictions">
              <path
                d="M 600,280 L 850,300 L 810,540 L 560,520 Z"
                fill="url(#hatch-red)"
                stroke="#e11d48"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text x="630" y="470" fill="#be123c" fontSize="10" fontWeight="bold">
                ⚠️ SEC 22-A PROHIBITED ZONE
              </text>
            </g>
          )}

          {/* LAYER 3: Roads & Access Corridor */}
          {layers.roads && (
            <g id="layer-roads">
              {/* Outer Ring Road Express Line */}
              <path
                d="M 50,520 L 850,560"
                stroke="#64748b"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M 50,520 L 850,560"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="8 6"
              />
              <text x="120" y="550" fill="#ffffff" fontSize="9" fontWeight="bold">
                OUTER RING ROAD SERVICE SECTOR (24m)
              </text>

              {/* Panchayat 12m Arterial */}
              <path
                d="M 400,50 L 370,550"
                stroke="#94a3b8"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <text x="385" y="100" fill="#334155" fontSize="8" fontWeight="bold" transform="rotate(86 385 100)">
                MADHAPUR MAIN LINK ROAD
              </text>
            </g>
          )}

          {/* LAYER 4: Buildings & Footprints */}
          {layers.buildings && (
            <g id="layer-buildings">
              <rect x="250" y="190" width="40" height="30" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
              <rect x="240" y="340" width="55" height="40" rx="3" fill="#93c5fd" stroke="#2563eb" strokeWidth="1" />
              <rect x="420" y="380" width="45" height="35" rx="3" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
            </g>
          )}

          {/* LAYER 6: Utilities & Grids */}
          {layers.utilities && (
            <g id="layer-utilities">
              <line x1="180" y1="120" x2="180" y2="480" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" />
              <circle cx="180" cy="200" r="4" fill="#4f46e5" />
              <circle cx="180" cy="350" r="4" fill="#4f46e5" />
              <text x="120" y="215" fill="#4338ca" fontSize="8" fontWeight="bold">HT Electrical Feeder</text>
            </g>
          )}

          {/* LAYER 1: Cadastral Parcels (Interactive click) */}
          {layers.cadastral && (
            <g id="layer-cadastral">
              {parcels.map((parcel) => {
                const isSelected = selectedParcel?.surveyNumber === parcel.surveyNo;
                return (
                  <g key={parcel.id} className="cursor-pointer" onClick={() => setSelectedParcel(parcel.prop)}>
                    <path
                      d={parcel.d}
                      className={`${parcel.fill} ${parcel.stroke} transition-all duration-200 ${
                        isSelected ? 'stroke-[3.5] stroke-[#0b192c] fill-blue-500/40 filter drop-shadow-md' : 'stroke-2'
                      }`}
                    />
                    {/* Survey No Label */}
                    <g transform={`translate(${parcel.center.x}, ${parcel.center.y})`}>
                      <rect
                        x="-38"
                        y="-12"
                        width="76"
                        height="24"
                        rx="6"
                        fill={isSelected ? "#0b192c" : "rgba(255,255,255,0.92)"}
                        stroke={isSelected ? "#38bdf8" : "#94a3b8"}
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill={isSelected ? "#ffffff" : "#0f172a"}
                        fontSize="11"
                        fontWeight="700"
                        fontFamily="Inter, sans-serif"
                      >
                        Sy. {parcel.surveyNo}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          )}
        </svg>

        {/* Legend / Overlay Badge */}
        <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 shadow-md text-[11px] flex items-center gap-3">
          <span className="font-semibold text-slate-700">Parcels:</span>
          <span className="flex items-center gap-1 text-emerald-700 font-medium">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span> Verified
          </span>
          <span className="flex items-center gap-1 text-amber-700 font-medium">
            <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block"></span> Mismatch
          </span>
          <span className="flex items-center gap-1 text-rose-700 font-medium">
            <span className="w-2.5 h-2.5 rounded bg-rose-500 inline-block"></span> Restricted
          </span>
        </div>

        {/* Coordinate & Scale Bar at bottom right */}
        <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-1.5 text-xs text-slate-600 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 shadow-md">
          <div className="font-mono text-[11px] text-slate-800 flex items-center gap-1">
            <Crosshair size={12} className="text-emerald-600" />
            <span>{mouseCoords}</span>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-slate-200 text-[10px] text-slate-500">
            <span>Scale: 1 : 2,500</span>
            <div className="w-14 h-1.5 bg-slate-800 rounded-sm"></div>
            <span>100m</span>
          </div>
        </div>
      </div>

      {/* Floating Layer Control Panel (Top Right) */}
      <div className="absolute top-4 right-4 z-30 flex flex-col items-end gap-2">
        <button
          onClick={() => setShowLayerPanel(!showLayerPanel)}
          className="bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 shadow-md flex items-center gap-2 text-xs font-semibold"
          title="Toggle Layers Panel"
        >
          <Layers size={16} className="text-emerald-600" />
          <span>{showLayerPanel ? 'Hide Layers' : 'Show Layers'}</span>
        </button>

        {showLayerPanel && (
          <LayerControlPanel
            layers={layers}
            onToggleLayer={handleToggleLayer}
            onToggleAll={handleToggleAll}
          />
        )}
      </div>

      {/* Floating Selected Parcel Info Drawer (Left Side on Selection) */}
      {selectedParcel && (
        <div className="absolute top-20 left-4 z-30 max-h-[85%] overflow-y-auto">
          <ParcelInfoDrawer
            parcel={selectedParcel}
            onClose={() => setSelectedParcel(null)}
          />
        </div>
      )}

      {/* Map Control Tools (Zoom, Reset) */}
      <div className="absolute bottom-20 right-4 z-20 flex flex-col gap-1 bg-white rounded-xl border border-slate-200 p-1 shadow-md">
        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 2, 22))}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          title="Zoom In"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 2, 12))}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          title="Zoom Out"
        >
          <Minus size={16} />
        </button>
        <button
          onClick={() => setZoomLevel(16)}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          title="Reset Zoom"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
}
