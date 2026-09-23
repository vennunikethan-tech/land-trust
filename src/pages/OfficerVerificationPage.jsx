import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  User, 
  ArrowRight, 
  FileCheck2,
  Calendar,
  Check,
  X
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { auditService } from '../services/auditService';

export default function OfficerVerificationPage() {
  const [requests, setRequests] = useState([
    {
      id: "VR-2026-101",
      surveyNumber: "123/4",
      propertyId: "PROP-HYD-001",
      village: "Madhapur",
      applicant: "Venkata Rao Nallamothu",
      aadhaarRef: "XXXX-8921",
      purpose: "Bank Loan Collateral Clearance",
      dateSubmitted: "16 Sep 2026",
      engineMatch: "100% Concordant",
      status: "Pending Officer Seal",
    },
    {
      id: "VR-2026-102",
      surveyNumber: "204/3",
      propertyId: "PROP-HYD-002",
      village: "Nanakramguda",
      applicant: "K. Rajeshwar Reddy",
      aadhaarRef: "XXXX-4109",
      purpose: "Sale Deed Registration Clearance",
      dateSubmitted: "15 Sep 2026",
      engineMatch: "62% Area Divergence",
      status: "Flagged (Mismatch)",
    },
    {
      id: "VR-2026-103",
      surveyNumber: "45/2A",
      propertyId: "PROP-HYD-003",
      village: "Gachibowli",
      applicant: "Padmavathi Infrastructure",
      aadhaarRef: "Corp-GST",
      purpose: "Commercial IT High-Rise Building NOC",
      dateSubmitted: "14 Sep 2026",
      engineMatch: "98.5% Clear Title",
      status: "Pending Officer Seal",
    },
  ]);

  const [notification, setNotification] = useState(null);

  const handleApprove = (req) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: "Approved & Sealed" } : r))
    );
    auditService.logAction({
      user: "Officer001",
      role: "Tahsildar / RDO",
      action: "Approved Verification Request",
      property: `Survey ${req.surveyNumber}`,
      notes: `Issued digital title clearance certificate for ${req.applicant}.`,
      status: "Completed",
    });
    setNotification(`Verification Request ${req.id} (Survey ${req.surveyNumber}) APPROVED.`);
  };

  const handleRejectOrSurvey = (req) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: "Field Survey Dispatched" } : r))
    );
    auditService.logAction({
      user: "Officer001",
      role: "Tahsildar / RDO",
      action: "Ordered Physical Resurvey",
      property: `Survey ${req.surveyNumber}`,
      notes: `Referred ${req.applicant}'s parcel to Mandal Surveyor due to discrepancy.`,
      status: "Dispatched",
    });
    setNotification(`Verification Request ${req.id} sent for FIELD RESURVEY.`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Officer Portal</span>
          <span>/</span>
          <span className="text-amber-600 font-semibold">Verification Requests</span>
        </div>
        <h1 className="text-2xl font-bold font-display text-slate-900">
          Citizen Verification Request Queue
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Process formal applications submitted by citizens and corporate entities for title clearance and digital seals.
        </p>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-700 font-bold">✕</button>
        </div>
      )}

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 font-semibold uppercase text-[11px]">
                <th className="py-3 px-4">Request ID & Survey</th>
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4">Engine Cross-Match</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Officer Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 font-display">Survey {req.surveyNumber}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{req.id} • {req.village}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{req.applicant}</div>
                    <div className="text-[10px] text-slate-400">KYC: {req.aadhaarRef}</div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    <div className="font-medium text-slate-800">{req.purpose}</div>
                    <div className="text-[10px] text-slate-400">Date: {req.dateSubmitted}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-1 rounded-full font-semibold font-mono text-[11px] bg-slate-100 text-slate-800 border border-slate-200">
                      {req.engineMatch}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={req.status} />
                  </td>

                  <td className="py-3.5 px-4 text-right space-x-1.5">
                    <button
                      onClick={() => handleApprove(req)}
                      disabled={req.status === 'Approved & Sealed'}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-40"
                    >
                      <Check size={12} />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleRejectOrSurvey(req)}
                      disabled={req.status === 'Field Survey Dispatched'}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-40"
                    >
                      <AlertTriangle size={12} />
                      <span>Resurvey</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
