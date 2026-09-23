import React from 'react';
import GisMapPlaceholder from '../components/gis/GisMapPlaceholder';
import { ShieldAlert, Map, AlertTriangle, Layers } from 'lucide-react';

export default function OfficerGisPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Officer Portal</span>
            <span>/</span>
            <span className="text-amber-600 font-semibold">GIS Monitoring</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-900">
            GIS Encroachment & Cadastral Monitoring Station
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Spatial analysis cockpit for revenue officers, zoning enforcement, and DGPS drone boundaries.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl text-xs font-semibold">
            <AlertTriangle size={14} className="text-rose-600" />
            <span>2 Active Buffer Violations Detected</span>
          </div>
        </div>
      </div>

      {/* GIS Canvas */}
      <GisMapPlaceholder
        title="REVENUE GIS MONITORING DESK"
        subtitle="Active Enforcement Zone: Serilingampally Division (CORS & Drone Survey Network)"
      />
    </div>
  );
}
