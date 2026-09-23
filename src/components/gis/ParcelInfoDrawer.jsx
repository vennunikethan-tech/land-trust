import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight, MapPin, Ruler, User, ShieldCheck, AlertTriangle } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function ParcelInfoDrawer({ parcel, onClose }) {
  const location = useLocation();
  const isOfficer = location.pathname.startsWith('/officer');
  if (!parcel) return null;

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-5 shadow-2xl w-80 lg:w-96 animate-fade-in">
      <div className="flex items-start justify-between pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Parcel Inspector</span>
            <StatusBadge status={parcel.verificationStatus} size="sm" />
          </div>
          <h3 className="text-lg font-bold font-display text-slate-900 mt-1">
            Survey No. {parcel.surveyNumber}
          </h3>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin size={12} />
            {parcel.village}, {parcel.mandal}, {parcel.district}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          title="Close inspector"
        >
          <X size={16} />
        </button>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">Total Area</p>
            <p className="font-bold text-slate-900 mt-0.5">{parcel.area}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">Land Type</p>
            <p className="font-bold text-slate-900 mt-0.5">{parcel.landType}</p>
          </div>
        </div>

        <div>
          <p className="text-[10px] text-slate-500 uppercase font-semibold">Recorded Owner (RoR)</p>
          <div className="flex items-center gap-2 mt-1 p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 text-emerald-900 font-semibold">
            <User size={14} className="text-emerald-700" />
            <span>{parcel.ownership?.ownerName || 'State Record'}</span>
          </div>
        </div>

        <div>
          <p className="text-[10px] text-slate-500 uppercase font-semibold">Cadastral Parcel ID</p>
          <p className="font-mono text-xs text-slate-700 mt-0.5 bg-slate-100 px-2 py-1 rounded">
            {parcel.cadastral?.parcelId || 'CAD-UNKNOWN'}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-slate-500 uppercase font-semibold">Verification Audit Note</p>
          <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
            {parcel.statusReason}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] text-slate-400">GPS: {parcel.coordinates}</span>
        <Link
          to={isOfficer ? `/officer/property/${parcel.id}` : `/citizen/property/${parcel.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#0f2744] hover:bg-[#1e3e62] text-white shadow-sm transition-all hover:gap-2"
        >
          <span>View Land Profile</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
