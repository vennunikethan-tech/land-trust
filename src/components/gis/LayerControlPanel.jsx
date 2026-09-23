import React from 'react';
import { Layers, Eye, EyeOff } from 'lucide-react';

export default function LayerControlPanel({ layers, onToggleLayer, onToggleAll }) {
  const layerDefs = [
    { id: 'cadastral', label: 'Cadastral Parcels', color: 'bg-emerald-500', desc: 'DGPS Boundary Polygons' },
    { id: 'landUse', label: 'Land Use (Zoning)', color: 'bg-purple-500', desc: 'Master Plan Master Zones' },
    { id: 'roads', label: 'Roads & Access', color: 'bg-amber-500', desc: 'Panchayat & Arterial Grid' },
    { id: 'buildings', label: 'Buildings & Footprints', color: 'bg-blue-500', desc: 'Approved Structures' },
    { id: 'waterBodies', label: 'Water Bodies & FTL', color: 'bg-cyan-500', desc: 'Lake Buffers (GO 111)' },
    { id: 'utilities', label: 'Utilities & Grids', color: 'bg-indigo-500', desc: 'Power / Waterlines' },
    { id: 'restrictions', label: 'Section 22-A Restrictions', color: 'bg-rose-500', desc: 'Govt & Waqf Prohibitions' },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-4 shadow-xl w-72">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-800">
          <Layers size={16} className="text-emerald-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider">GIS Layer Controls</h4>
        </div>
        <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
          OGC GIS
        </span>
      </div>

      <div className="mt-3 space-y-2 max-h-[320px] overflow-y-auto pr-1">
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

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <button
          onClick={() => onToggleAll(true)}
          className="text-emerald-700 font-semibold hover:underline"
        >
          Select All
        </button>
        <span className="text-slate-300">•</span>
        <button
          onClick={() => onToggleAll(false)}
          className="text-slate-500 hover:underline"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
