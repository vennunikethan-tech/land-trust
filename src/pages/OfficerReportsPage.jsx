import React from 'react';
import { FileText, Download, Printer, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { mockReports } from '../data/reports';

export default function OfficerReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Officer Portal</span>
            <span>/</span>
            <span className="text-amber-600 font-semibold">Reports</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-900">
            Cadastral Audit & Departmental Dossiers
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Official government reports, Section 22-A gazette extracts, and division reconciliation summaries.
          </p>
        </div>

        <button
          onClick={() => alert("Downloading all division reports archive (.zip)...")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0f2744] hover:bg-[#1e3e62] text-white font-bold text-xs shadow-sm transition-all self-start sm:self-auto"
        >
          <Download size={14} />
          <span>Export Department Dossiers</span>
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 font-semibold uppercase text-[11px]">
                <th className="py-3 px-4">Report Number</th>
                <th className="py-3 px-4">Subject Property</th>
                <th className="py-3 px-4">Issuing Authority</th>
                <th className="py-3 px-4">Audit Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockReports.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <FileText size={15} className="text-slate-600" />
                      <span>{r.reportNumber}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800 font-display">Survey {r.surveyNumber}</div>
                    <div className="text-[10px] text-slate-400">{r.village}, {r.district}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {r.officerSeal}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {r.verificationScore}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Downloading official PDF copy of ${r.reportNumber}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                    >
                      <Download size={12} />
                      <span>PDF</span>
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
