import React from 'react';
import { User, ShieldCheck, Phone, Mail, MapPin, Award, CheckCircle2, Building2 } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';

export default function CitizenProfilePage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Citizen Portal</span>
          <span>/</span>
          <span className="text-emerald-700 font-semibold">Profile</span>
        </div>
        <h1 className="text-2xl font-bold font-display text-slate-900">
          Citizen KYC & Digital Landholder Profile
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Verified citizen identity linked to State Revenue Record of Rights (RoR) and Pattadar Passbook.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0f2744] text-white flex items-center justify-center font-bold text-xl font-display shadow-md">
              VR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-display text-slate-900">
                  Venkata Rao Nallamothu
                </h2>
                <StatusBadge status="Verified" size="sm" />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Primary Landholder • S/o Subba Rao
              </p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>MeriPehchaan & Aadhaar KYC Verified</span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <p className="text-slate-400 font-medium uppercase text-[10px]">Aadhaar Virtual ID (VID)</p>
            <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">XXXX-XXXX-8921</p>
          </div>

          <div>
            <p className="text-slate-400 font-medium uppercase text-[10px]">Digital Pattadar Passbook ID</p>
            <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">T192837465</p>
          </div>

          <div>
            <p className="text-slate-400 font-medium uppercase text-[10px]">Registered Mobile</p>
            <p className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
              <Phone size={13} className="text-slate-400" />
              <span>+91 98480 •••••</span>
            </p>
          </div>

          <div>
            <p className="text-slate-400 font-medium uppercase text-[10px]">Linked Email</p>
            <p className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
              <Mail size={13} className="text-slate-400" />
              <span>venkata.nallamothu@demo.gov.in</span>
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-slate-400 font-medium uppercase text-[10px]">Permanent Revenue Address</p>
            <p className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
              <MapPin size={13} className="text-slate-400" />
              <span>Plot No. 42, Jubilee Hills Enclave, Madhapur, Serilingampally, Hyderabad - 500081</span>
            </p>
          </div>
        </div>

        {/* Linked Holdings Summary */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700">
              <Building2 size={18} className="text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">3 Registered Land Parcels Linked</h4>
              <p className="text-slate-500 text-[11px]">Total combined holding: 4.25 Acres in Serilingampally Division</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
            Clear Title Active
          </span>
        </div>
      </div>
    </div>
  );
}
