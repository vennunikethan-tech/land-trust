import React from 'react';
import { Layers } from 'lucide-react';

export default function MapLegend({ baseMap = 'satellite', className = '' }) {
  const isSat = baseMap === 'satellite';

  const legendItems = [
    {
      label: 'Verified Parcel',
      color: 'bg-emerald-500',
      border: isSat ? 'border-emerald-300' : 'border-emerald-600',
      desc: 'Cross-Reconciled / Title Clear',
      dash: false,
    },
    {
      label: 'Flagged Parcel',
      color: 'bg-amber-500',
      border: isSat ? 'border-amber-300' : 'border-amber-600',
      desc: 'Area Mismatch / Discrepancy',
      dash: true,
    },
    {
      label: 'Restricted Parcel',
      color: 'bg-rose-500',
      border: isSat ? 'border-rose-300' : 'border-rose-600',
      desc: 'Sec 22-A / Buffer Violation',
      dash: false,
    },
    {
      label: 'Unverified Parcel',
      color: 'bg-sky-500',
      border: isSat ? 'border-sky-300' : 'border-sky-600',
      desc: 'Field Survey In Progress',
      dash: true,
    },
    {
      label: 'Selected Parcel',
      color: 'bg-sky-600',
      border: 'border-white ring-2 ring-cyan-400',
      desc: 'Active Cadastral Focus',
      dash: false,
    },
  ];

  return (
    <div className={`bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-3.5 shadow-lg text-xs ${className}`}>
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 text-slate-800">
          <Layers size={13} className="text-emerald-600" />
          <span className="font-bold text-[11px] uppercase tracking-wider">
            Map Legend
          </span>
        </div>
        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
          {isSat ? 'Satellite Mode' : 'Street Mode'}
        </span>
      </div>

      <div className="space-y-2">
        {legendItems.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 text-[11px]">
            <div className="flex items-center gap-2">
              <span
                className={`w-3.5 h-3.5 rounded ${item.color} ${item.border} ${
                  item.dash ? 'border-dashed' : ''
                } shrink-0 inline-block shadow-xs border`}
              ></span>
              <span className="font-semibold text-slate-800">{item.label}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
