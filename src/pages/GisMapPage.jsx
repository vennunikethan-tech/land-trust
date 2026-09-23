import React from 'react';
import { useSearchParams } from 'react-router-dom';
import GISMap from '../components/gis/GISMap';
import { Layers, Info, MapPin, Globe2 } from 'lucide-react';

export default function GisMapPage() {
  const [searchParams] = useSearchParams();
  const initialParcelId = searchParams.get('parcel') || searchParams.get('survey');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Citizen Portal</span>
            <span>/</span>
            <span className="text-emerald-700 font-semibold">GIS Map</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-900">
            Cadastral GIS Map Canvas
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive Leaflet cadastral map with georeferenced boundaries, land use zoning, and regulatory buffer overlays.
          </p>
        </div>

        {/* Phase 2 Interactive Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold self-start sm:self-auto">
          <Globe2 size={14} className="text-emerald-600" />
          <span>Phase 2: Leaflet & GeoJSON Cadastral Engine</span>
        </div>
      </div>

      {/* Interactive GIS Leaflet Map Component */}
      <GISMap
        initialParcelId={initialParcelId}
        title="CADASTRAL GIS MAP"
        subtitle="Mandal: Serilingampally & Rajendranagar • OGC Compliant Cadastral Grid"
      />

      {/* Information & Key Instruction Card for SIH Judges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
          <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Interactive Parcel Inspector</span>
          </h4>
          <p className="text-slate-500 leading-relaxed">
            Click any polygon on the map canvas (e.g. Survey 123/4, 204/3) to inspect ownership, legal status, and coordinates.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
          <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>7-Layer Geographic Stack</span>
          </h4>
          <p className="text-slate-500 leading-relaxed">
            Toggle Cadastral Parcels, Land Use, Roads, Buildings, Water Bodies, Utilities, and Section 22-A Restrictions.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
          <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Phase 2 PostGIS Architecture</span>
          </h4>
          <p className="text-slate-500 leading-relaxed">
            The SVG vector coordinates and layer controls are structured to cleanly bind with Leaflet, MapLibre GL, and GeoJSON in Phase 2.
          </p>
        </div>
      </div>
    </div>
  );
}
