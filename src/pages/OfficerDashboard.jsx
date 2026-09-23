import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ArrowRight, 
  Map, 
  Filter, 
  Search,
  ExternalLink,
  Layers,
  History,
  AlertTriangle
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import StatusBadge from '../components/common/StatusBadge';
import { mockOfficerStats, mockOfficerWorklist } from '../data/officerStats';

export default function OfficerDashboard() {
  const [worklist, setWorklist] = useState(mockOfficerWorklist);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Officer Header */}
      <div className="bg-gradient-to-r from-slate-900 via-[#10243e] to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <ShieldAlert size={14} />
            <span>Revenue Officer Executive Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
            Revenue Division: Serilingampally & Rajendranagar
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Monitor cadastral geofences, resolve multi-registry area divergences, process citizens' verification requests, and enforce statutory land-use prohibitions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/officer/flagged"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm transition-all"
          >
            <ShieldAlert size={14} />
            <span>Review Flagged Cases (4)</span>
          </Link>
          <Link
            to="/officer/map"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
          >
            <Map size={14} />
            <span>GIS Cadastral Monitor</span>
          </Link>
        </div>
      </div>

      {/* DASHBOARD CARDS (SPECIFIED IN REQUIREMENT 11) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          title="Total Properties"
          value={mockOfficerStats.totalProperties.toLocaleString()}
          subtitle="Division Master Cadastre"
          icon={Building2}
          color="slate"
          trend={{ label: "Jurisdiction Acreage", value: "32,450 Ac", positive: true }}
        />
        <MetricCard
          title="Verified Properties"
          value={mockOfficerStats.verifiedProperties.toLocaleString()}
          subtitle="Cross-Reconciled & Sealed"
          icon={CheckCircle2}
          color="green"
          trend={{ label: "Reconciliation Rate", value: "87.3%", positive: true }}
        />
        <MetricCard
          title="Pending Verification"
          value={mockOfficerStats.pendingVerification.toLocaleString()}
          subtitle="Citizen Inquiries Awaiting Field Audit"
          icon={Clock}
          color="blue"
          trend={{ label: "Avg Queue Time", value: "2.4 Days", positive: true }}
        />
        <MetricCard
          title="Flagged Properties"
          value={mockOfficerStats.flaggedProperties.toLocaleString()}
          subtitle="Area Mismatch / Sec 22-A Conflicts"
          icon={ShieldAlert}
          color="amber"
          trend={{ label: "Urgent Attention", value: "450 Parcels", positive: false }}
        />
      </div>

      {/* OFFICER WORKLIST TABLE (SPECIFIED IN REQUIREMENT 11) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900">
              Revenue Officer Active Worklist
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Prioritized land parcels requiring official reconciliation, DGPS survey endorsement, or prohibitory order enforcement.
            </p>
          </div>
          <Link
            to="/officer/flagged"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-100 transition-colors"
          >
            <span>Open Flagged Inspector</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 font-semibold uppercase text-[11px]">
                <th className="py-3 px-4">Survey Number</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Issue / Discrepancy Note</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {worklist.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 font-display text-sm">
                      Survey {item.surveyNumber}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {item.propertyId}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{item.location}</div>
                    <div className="text-[10px] text-slate-400">Applicant: {item.applicant}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3.5 px-4 max-w-md">
                    <p className="text-xs font-medium text-slate-700 leading-snug">
                      {item.issue}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to="/officer/flagged"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0f2744] hover:bg-[#1e3e62] text-white transition-colors"
                    >
                      <span>Take Action</span>
                      <ArrowRight size={12} />
                    </Link>
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
