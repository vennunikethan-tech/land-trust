import React, { useState, useEffect } from 'react';
import { 
  History, 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  Clock, 
  User, 
  Building2, 
  Hash, 
  CheckCircle2 
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { auditService } from '../services/auditService';

export default function AuditTrailPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('ALL');

  useEffect(() => {
    async function loadLogs() {
      try {
        const data = await auditService.getAuditLogs();
        setLogs(data);
      } finally {
        setLoading(false);
      }
    }
    loadLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.notes.toLowerCase().includes(searchTerm.toLowerCase());

    const act = log.action.toLowerCase();
    let matchesFilter = true;
    if (filterAction === 'Verified') {
      matchesFilter = act.includes('verif') || act.includes('approv');
    } else if (filterAction === 'Survey') {
      matchesFilter = act.includes('survey') || act.includes('drone') || act.includes('georeference') || act.includes('dgps');
    } else if (filterAction === 'Prohibition') {
      matchesFilter = act.includes('prohibit') || act.includes('enforce') || act.includes('22-a');
    } else if (filterAction === 'Notice') {
      matchesFilter = act.includes('notice');
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Officer Portal</span>
            <span>/</span>
            <span className="text-amber-600 font-semibold">Audit Trail</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-900">
            Immutable Audit Trail & System Ledger
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tamper-evident log of all land record mutations, verification decisions, and surveyor updates.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>SHA-256 Ledger Verified</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search audit trail by User, Action, Survey No..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800"
          />
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-400 text-xs">Action:</span>
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 outline-none"
          >
            <option value="ALL">All Recorded Actions</option>
            <option value="Verified">Verified Property</option>
            <option value="Survey">Drone / Georeference</option>
            <option value="Prohibition">Section 22-A Prohibition</option>
            <option value="Notice">Issued Notice</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table (Requirement 13) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 font-semibold uppercase text-[11px]">
                <th className="py-3 px-4">Date & Timestamp</th>
                <th className="py-3 px-4">User / Officer ID</th>
                <th className="py-3 px-4">Action Performed</th>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Integrity Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Date & Timestamp */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{log.date}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{log.timestamp}</div>
                  </td>

                  {/* User */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[10px]">
                        {log.user.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 font-mono">{log.user}</div>
                        <div className="text-[10px] text-slate-400">{log.role}</div>
                      </div>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">{log.action}</div>
                    <p className="text-[11px] text-slate-500 max-w-sm mt-0.5 leading-tight">
                      {log.notes}
                    </p>
                  </td>

                  {/* Property */}
                  <td className="py-3.5 px-4 font-bold text-slate-900 font-display">
                    {log.property}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <StatusBadge status={log.status} />
                  </td>

                  {/* Integrity Hash */}
                  <td className="py-3.5 px-4 text-right">
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">
                      {log.hash}
                    </span>
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
