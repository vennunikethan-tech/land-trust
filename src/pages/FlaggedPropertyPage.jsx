import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  ArrowRight, 
  Compass, 
  FileText, 
  Check, 
  FileQuestion,
  UserCheck
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import { auditService } from '../services/auditService';

export default function FlaggedPropertyPage() {
  const [flaggedItems, setFlaggedItems] = useState([
    {
      id: "FLAG-01",
      surveyNumber: "204/3",
      propertyId: "PROP-HYD-002",
      village: "Nanakramguda",
      mandal: "Serilingampally",
      district: "Hyderabad",
      issue: "Area Mismatch Detected",
      rorArea: "2.50 Acres",
      registrationArea: "3.20 Acres",
      cadastralArea: "2.50 Acres",
      status: "Pending Review", // 'Pending Review' | 'Verified' | 'Under Investigation'
      pattadarName: "K. Rajeshwar Reddy",
      divergence: "+0.70 Acres (+28.0% difference)",
      notes: "RoR Pahani entry records 2.50 Acres whereas SRO registered sale deed 8920/2018 records 3.20 Acres.",
    },
    {
      id: "FLAG-02",
      surveyNumber: "88/1B",
      propertyId: "PROP-HYD-004",
      village: "Shamshabad",
      mandal: "Rajendranagar",
      district: "Rangareddy",
      issue: "Government Buffer Zone Encroachment",
      rorArea: "4.10 Acres",
      registrationArea: "4.10 Acres",
      cadastralArea: "2.90 Ac Clear / 1.20 Ac Prohibited",
      status: "Pending Review",
      pattadarName: "Mohd. Abdul Qadeer",
      divergence: "1.20 Acres inside Protected FTL",
      notes: "Overlap with Himayat Sagar Full Tank Level protected catchment boundary (GO 111).",
    },
    {
      id: "FLAG-03",
      surveyNumber: "123/4",
      propertyId: "PROP-HYD-001",
      village: "Madhapur",
      mandal: "Serilingampally",
      district: "Hyderabad",
      issue: "Subdivision Sketch Alignment Pending",
      rorArea: "2.50 Acres",
      registrationArea: "2.50 Acres",
      cadastralArea: "2.50 Acres",
      status: "Pending Review",
      pattadarName: "Venkata Rao Nallamothu",
      divergence: "0.00 Acres (Paper verification needed)",
      notes: "All 5 databases are consistent. Re-verification requested for commercial building mortgage.",
    },
  ]);

  const [activeItem, setActiveItem] = useState(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState(null);

  // Frontend-only actions using local state
  const handleMarkVerified = (id, surveyNo) => {
    setFlaggedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Verified' } : item
      )
    );
    auditService.logAction({
      user: "Officer001",
      role: "Tahsildar / RDO",
      action: "Marked Parcel Verified",
      property: `Survey ${surveyNo}`,
      notes: "Officer reviewed discrepancy and cleared title in local registry.",
      status: "Verified",
    });
    setActionSuccessMsg(`Survey ${surveyNo} marked as VERIFIED. Audit trail updated.`);
    setActiveItem(null);
  };

  const handleFlagForInvestigation = (id, surveyNo) => {
    setFlaggedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Under Investigation' } : item
      )
    );
    auditService.logAction({
      user: "Officer001",
      role: "Tahsildar / RDO",
      action: "Dispatched DGPS Field Survey",
      property: `Survey ${surveyNo}`,
      notes: "Field survey ordered to resolve area divergence with Mandal Surveyor.",
      status: "Under Investigation",
    });
    setActionSuccessMsg(`Survey ${surveyNo} flagged for FIELD INVESTIGATION. Dispatched to Mandal Surveyor.`);
    setActiveItem(null);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Officer Portal</span>
          <span>/</span>
          <span className="text-amber-600 font-semibold">Flagged Properties</span>
        </div>
        <h1 className="text-2xl font-bold font-display text-slate-900">
          Inconsistency & Discrepancy Adjudication
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review parcels flagged by the 5-way automated cross-matching engine for area mismatches, boundary divergences, or statutory prohibitions.
        </p>
      </div>

      {/* Success Notification Banner */}
      {actionSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>{actionSuccessMsg}</span>
          </div>
          <button
            onClick={() => setActionSuccessMsg(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Flagged Properties Cards Grid */}
      <div className="space-y-4">
        {flaggedItems.map((item) => {
          const isVerified = item.status === 'Verified';
          const isInvestigation = item.status === 'Under Investigation';

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border p-6 shadow-sm transition-all ${
                isVerified 
                  ? 'border-emerald-200 bg-emerald-50/10' 
                  : isInvestigation 
                    ? 'border-amber-300 bg-amber-50/10' 
                    : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Discrepancy Case
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono text-xs text-slate-500">{item.propertyId}</span>
                    <StatusBadge status={item.status} size="sm" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900 mt-1">
                    Survey No: {item.surveyNumber}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.village}, {item.mandal}, {item.district} • Pattadar: <strong className="text-slate-700">{item.pattadarName}</strong>
                  </p>
                </div>

                {/* Primary Action Buttons (Requirement 12) */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveItem(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    <FileText size={13} />
                    <span>Review Case</span>
                  </button>

                  <button
                    onClick={() => handleMarkVerified(item.id, item.surveyNumber)}
                    disabled={isVerified}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors disabled:opacity-40"
                  >
                    <Check size={13} />
                    <span>{isVerified ? 'Verified' : 'Mark Verified'}</span>
                  </button>

                  <button
                    onClick={() => handleFlagForInvestigation(item.id, item.surveyNumber)}
                    disabled={isInvestigation}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-colors disabled:opacity-40"
                  >
                    <AlertTriangle size={13} />
                    <span>{isInvestigation ? 'Under Investigation' : 'Flag for Further Investigation'}</span>
                  </button>
                </div>
              </div>

              {/* Inconsistency Breakdown Comparison Box */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Issue Identified</p>
                  <p className="font-bold text-slate-900 mt-0.5">{item.issue}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Record of Rights (RoR)</p>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">{item.rorArea}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Registration Deed</p>
                  <p className="font-mono font-bold text-amber-700 mt-0.5">{item.registrationArea}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Discrepancy Delta</p>
                  <p className="font-bold text-rose-600 mt-0.5">{item.divergence}</p>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-600 flex items-start gap-2">
                <span className="font-semibold text-slate-700 shrink-0">Field Inspector Note:</span>
                <span className="text-slate-500">{item.notes}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={!!activeItem}
        onClose={() => setActiveItem(null)}
        title={`Officer Review: Survey No. ${activeItem?.surveyNumber || ''}`}
        subtitle="Institutional Reconciliation Dossier"
      >
        {activeItem && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
              <div className="flex justify-between font-mono text-emerald-400 text-[11px]">
                <span>{activeItem.propertyId}</span>
                <span>{activeItem.status}</span>
              </div>
              <h4 className="text-base font-bold font-display">{activeItem.issue}</h4>
              <p className="text-slate-300 text-xs">{activeItem.notes}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-slate-400 text-[10px] font-bold uppercase">RoR Pahani Area</p>
                <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">{activeItem.rorArea}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-slate-400 text-[10px] font-bold uppercase">SRO Registered Area</p>
                <p className="font-mono font-bold text-amber-700 text-sm mt-0.5">{activeItem.registrationArea}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Executive Officer Endorsement Remarks
              </label>
              <textarea
                rows={3}
                defaultValue={`Field inspection verified with Mandal Surveyor. Area mismatch attributed to unapproved subdivision sketch.`}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setActiveItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => handleMarkVerified(activeItem.id, activeItem.surveyNumber)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              >
                Mark Verified
              </button>
              <button
                onClick={() => handleFlagForInvestigation(activeItem.id, activeItem.surveyNumber)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
              >
                Order DGPS Survey
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
