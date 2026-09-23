import React from 'react';
import { Popup } from 'react-leaflet';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function PropertyPopup({ parcel, position, onClose }) {
  const location = useLocation();
  const isOfficer = location.pathname.startsWith('/officer');

  if (!parcel || !position) return null;

  const profileUrl = isOfficer 
    ? `/officer/property/${parcel.propertyId || parcel.id}` 
    : `/citizen/property/${parcel.propertyId || parcel.id}`;

  return (
    <Popup position={position} onClose={onClose} closeButton={true} className="land-trust-gis-popup">
      <div className="p-1 min-w-[210px] text-xs font-sans">
        {/* Header */}
        <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-200">
          <div className="w-5 h-5 rounded-md bg-[#0f2744] text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck size={13} />
          </div>
          <span className="font-extrabold font-display tracking-tight text-slate-900 text-sm">
            LAND <span className="text-emerald-700">TRUST</span>
          </span>
          <span className="text-[9px] uppercase font-bold px-1 rounded bg-slate-100 text-slate-600 border border-slate-200 ml-auto">
            DPI
          </span>
        </div>

        {/* Content Table / Properties */}
        <div className="space-y-1.5 text-slate-700 text-[11px] mb-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-500 font-medium">Survey No:</span>
            <span className="font-bold text-slate-900 font-display">{parcel.surveyNumber}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-500 font-medium">Property ID:</span>
            <span className="font-mono font-semibold text-slate-800 text-[10px]">{parcel.propertyId}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-500 font-medium">Area:</span>
            <span className="font-mono font-bold text-slate-900">{parcel.area}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-500 font-medium">Land Type:</span>
            <span className="font-medium text-slate-800">{parcel.landType}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-500 font-medium">Village:</span>
            <span className="font-medium text-slate-800">{parcel.village}</span>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
            <span className="text-slate-500 font-medium">Status:</span>
            <StatusBadge status={parcel.verificationStatus} size="sm" />
          </div>
        </div>

        {/* View Property Button */}
        <Link
          to={profileUrl}
          className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold bg-[#0f2744] hover:bg-[#1e3e62] text-white shadow-xs transition-all"
        >
          <span>View Property</span>
          <ArrowRight size={12} />
        </Link>
      </div>
    </Popup>
  );
}
