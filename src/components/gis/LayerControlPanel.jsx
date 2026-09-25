import React from 'react';
import { Layers } from 'lucide-react';

export default function LayerControlPanel({ layers, onToggleLayer, onToggleAll }) {
  const layerDefs = [
    { id: 'cadastral', label: 'Cadastral Parcels', color: 'bg-emerald-500', desc: 'DGPS Boundary Polygons' },
    { id: 'surveyNumbers', label: 'Survey Numbers', color: 'bg-sky-500', desc: 'Centroid Survey No. Badges' },
    { id: 'roads', label: 'Roads & Access', color: 'bg-amber-500', desc: 'Panchayat & Arterial Grid' },
    { id: 'buildings', label: 'Buildings & Footprints', color: 'bg-slate-700', desc: 'Approved Structures' },
    { id: 'waterBodies', label: 'Water Bodies & FTL', color: 'bg-cyan-500', desc: 'Lake Buffers (GO 111)' },
    { id: 'landUse', label: 'Land Use (Zoning)', color: 'bg-purple-500', desc: 'Master Plan Master Zones' },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-3.5 shadow-lg text-xs space-y-2.5">
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <div className="flex items-center gap-1.5 text-slate-800">
          <Layers size={13} className="text-emerald-600" />
          <h4 className="font-bold text-[11px] uppercase tracking-wider">GIS Layer Stack</h4>
        </div>
        <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
          Vector Overlays
        </span>
      </div>

      <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-0.5">
        {layerDefs.map((layer) => {
          const isChecked = !!layers[layer.id];
          return (
            <label
              key={layer.id}
              className={`flex items-start gap-2.5 p-2 rounded-xl text-xs cursor-pointer transition-colors border ${
                isChecked
                  ? 'bg-slate-50 border-slate-200/80 text-slate-900'
                  : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggleLayer(layer.id)}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${layer.color}`}></span>
                  <span className="font-semibold text-xs leading-none">{layer.label}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 leading-tight">{layer.desc}</p>
              </div>
            </label>
          );
        })}
      </div>

      {onToggleAll && (
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <button
            type="button"
            onClick={() => onToggleAll(true)}
            className="text-emerald-700 font-semibold hover:underline"
          >
            Select All
          </button>
          <span className="text-slate-300">•</span>
          <button
            type="button"
            onClick={() => onToggleAll(false)}
            className="text-slate-500 hover:underline"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
