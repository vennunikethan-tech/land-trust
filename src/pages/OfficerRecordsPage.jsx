import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Building2, 
  MapPin, 
  Ruler, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink 
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { landService } from '../services/landService';

export default function OfficerRecordsPage() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  useEffect(() => {
    async function load() {
      const data = await landService.getAllProperties();
      setProperties(data);
    }
    load();
  }, []);

  const filtered = properties.filter((p) => {
    const matchesSearch = 
      p.surveyNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.village.toLowerCase().includes(search.toLowerCase()) ||
      p.ownership.ownerName.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'ALL' || p.landType.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Officer Portal</span>
            <span>/</span>
            <span className="text-amber-600 font-semibold">Land Records</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-900">
            Master Cadastral & Revenue Ledger
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Centralized public land administration registry for the Serilingampally & Rajendranagar division.
          </p>
        </div>

        <button
          onClick={() => alert("Exporting official revenue ledger as CSV...")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all self-start sm:self-auto"
        >
          <Download size={14} />
          <span>Export Division Ledger</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Survey No, Village, or Pattadar..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800"
          />
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-400 text-xs">Classification:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 outline-none"
          >
            <option value="ALL">All Classifications</option>
            <option value="Agricultural">Agricultural</option>
            <option value="Commercial">Commercial</option>
            <option value="Residential">Residential</option>
            <option value="Institutional">Institutional</option>
          </select>
        </div>
      </div>

      {/* Master Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 font-semibold uppercase text-[11px]">
                <th className="py-3 px-4">Survey Number</th>
                <th className="py-3 px-4">Pattadar / Owner Name</th>
                <th className="py-3 px-4">Village & Mandal</th>
                <th className="py-3 px-4">Acreage</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Market Valuation</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 font-display text-sm">
                      Survey {prop.surveyNumber}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {prop.cadastral.parcelId}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    <div>{prop.ownership.ownerName}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{prop.ownership.ownershipStatus}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <div>{prop.village}</div>
                    <div className="text-[11px] text-slate-500">{prop.mandal}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {prop.area}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={prop.verificationStatus} />
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700 font-semibold">
                    {prop.registration.marketValue}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/citizen/property/${prop.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0f2744] hover:bg-[#1e3e62] text-white transition-colors"
                    >
                      <Eye size={12} />
                      <span>Profile</span>
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
