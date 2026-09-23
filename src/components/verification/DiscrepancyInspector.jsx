import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck, Download, FileSpreadsheet, ArrowRight } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function DiscrepancyInspector({ scenario, onGenerateReport }) {
  const isConsistent = scenario.outcome === 'Consistent';
  const isWarning = scenario.statusBadge === 'Warning';
  const isIssue = scenario.statusBadge === 'Issue';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex items-start justify-between pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Cross-Validation Matrix</span>
          <h3 className="text-lg font-bold font-display text-slate-900 mt-0.5">
            {scenario.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Reconciling recorded area values across official institutional registries.
          </p>
        </div>
        <StatusBadge status={scenario.statusBadge} size="lg" />
      </div>

      {/* Side-by-side Attribute Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 font-semibold uppercase text-[11px]">
              <th className="py-2.5 px-3">Institutional Register</th>
              <th className="py-2.5 px-3">Governing Source</th>
              <th className="py-2.5 px-3">Recorded Acreage</th>
              <th className="py-2.5 px-3">Reconciliation Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {scenario.comparisonMatrix.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50">
                <td className="py-3 px-3 font-semibold text-slate-900">
                  {row.attribute}
                </td>
                <td className="py-3 px-3 text-slate-500">
                  {row.source}
                </td>
                <td className="py-3 px-3 font-mono font-bold text-slate-800">
                  {row.value}
                </td>
                <td className="py-3 px-3">
                  {row.match ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold text-[11px]">
                      <CheckCircle2 size={12} />
                      <span>Consistent</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-semibold text-[11px]">
                      <AlertTriangle size={12} />
                      <span>Discrepancy</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Verification Engine Final Verdict Box */}
      <div className={`p-5 rounded-xl border ${
        isConsistent
          ? 'bg-emerald-500/10 border-emerald-300 text-emerald-950'
          : isWarning
            ? 'bg-amber-500/10 border-amber-300 text-amber-950'
            : 'bg-rose-500/10 border-rose-300 text-rose-950'
      }`}>
        <div className="flex items-start gap-3">
          {isConsistent ? (
            <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-0.5" />
          ) : isWarning ? (
            <AlertTriangle size={24} className="text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <XCircle size={24} className="text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold font-display uppercase tracking-wider">
                Engine Verdict: {scenario.outcome}
              </h4>
            </div>
            <p className="text-xs font-medium mt-1 leading-relaxed">
              {scenario.summary}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-300/40 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[11px] font-semibold opacity-80">
                Recommended Action: {scenario.steps[6]?.details?.recommendedAction}
              </span>

              {isConsistent ? (
                <button
                  onClick={onGenerateReport}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-sm transition-all text-xs"
                >
                  <Download size={13} />
                  <span>Download Digital Title Certificate</span>
                </button>
              ) : (
                <button
                  onClick={onGenerateReport}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-sm transition-all text-xs"
                >
                  <FileSpreadsheet size={13} />
                  <span>Export Field Inspection Audit Dossier</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
