import React from 'react';

export default function MapLegend({ className = '' }) {
  const legendItems = [
    { label: 'Verified', color: 'bg-emerald-500', border: 'border-emerald-600', desc: 'Cross-Reconciled' },
    { label: 'Flagged (Warning)', color: 'bg-amber-500', border: 'border-amber-600', desc: 'Area / Title Mismatch' },
    { label: 'Restricted (Issue)', color: 'bg-rose-500', border: 'border-rose-600', desc: 'Sec 22-A / Buffer Violation' },
    { label: 'Pending / Unverified', color: 'bg-blue-500', border: 'border-blue-600', desc: 'Field Audit in Queue' },
    { label: 'Selected Parcel', color: 'bg-slate-900', border: 'border-cyan-400 ring-2 ring-cyan-400', desc: 'Active Inspector Focus' },
  ];

  return (
    <div className={`bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 p-3 shadow-md text-xs ${className}`}>
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
        <span className="font-bold text-[11px] uppercase tracking-wider text-slate-700">
          Cadastral Legend
        </span>
        <span className="text-[10px] text-slate-400 font-mono">OGC Vector</span>
      </div>

      <div className="space-y-1.5">
        {legendItems.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 text-[11px]">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded ${item.color} ${item.border} shrink-0 inline-block shadow-xs`}></span>
              <span className="font-semibold text-slate-800">{item.label}</span>
            </div>
            <span className="text-[10px] text-slate-400">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
