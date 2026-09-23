import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  RotateCcw, 
  Building2, 
  MapPin, 
  Ruler, 
  ArrowRight, 
  LayoutGrid, 
  List, 
  Filter,
  CheckCircle2,
  FileSearch
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { landService } from '../services/landService';
import { districtList, mandalList, villageList } from '../data/properties';

export default function SearchLandPage() {
  const [filters, setFilters] = useState({
    surveyNumber: '',
    district: '',
    mandal: '',
    village: '',
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const data = await landService.searchProperties(filters);
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    const empty = {
      surveyNumber: '',
      district: '',
      mandal: '',
      village: '',
    };
    setFilters(empty);
    setLoading(true);
    try {
      const data = await landService.getAllProperties();
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Citizen Portal</span>
          <span>/</span>
          <span className="text-emerald-700 font-semibold">Search Land</span>
        </div>
        <h1 className="text-2xl font-bold font-display text-slate-900">
          Search Land Records & Cadastre
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Query the integrated public land repository by Survey Number, District, Mandal, or Village.
        </p>
      </div>

      {/* Search Filter Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Survey Number Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Survey Number / Property ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.surveyNumber}
                  onChange={(e) => setFilters({ ...filters, surveyNumber: e.target.value })}
                  placeholder="e.g. 123/4, 204/3..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
                />
                <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              </div>
            </div>

            {/* District Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                District
              </label>
              <select
                value={filters.district}
                onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 bg-white"
              >
                <option value="">All Districts</option>
                {districtList.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Mandal Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mandal / Taluk
              </label>
              <select
                value={filters.mandal}
                onChange={(e) => setFilters({ ...filters, mandal: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 bg-white"
              >
                <option value="">All Mandals</option>
                {mandalList.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Village Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Revenue Village
              </label>
              <select
                value={filters.village}
                onChange={(e) => setFilters({ ...filters, village: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 bg-white"
              >
                <option value="">All Villages</option>
                {villageList.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2744] hover:bg-[#1e3e62] text-white font-bold text-xs shadow-sm transition-all"
              >
                <Search size={14} />
                <span>Search Records</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                <RotateCcw size={13} />
                <span>Reset Filters</span>
              </button>
            </div>

            {/* Toggle view mode: Cards or Table */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'cards' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Grid View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Table View"
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Search Results Summary */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1">
        <p>
          Showing <span className="font-bold text-slate-900">{results.length}</span> cadastral records
        </p>
        <span className="text-slate-400">Integrated DPI Query Engine</span>
      </div>

      {/* Results Display */}
      {results.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <FileSearch size={36} className="mx-auto text-slate-400" />
          <h3 className="text-base font-bold text-slate-900 font-display">No Land Records Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No parcels match the search parameters. Try resetting your search filters or searching for "123/4" or "204/3".
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((prop) => (
            <div
              key={prop.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Cadastral Survey
                    </span>
                    <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-emerald-700 transition-colors">
                      Survey {prop.surveyNumber}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {prop.propertyId}
                    </p>
                  </div>
                  <StatusBadge status={prop.verificationStatus} size="sm" />
                </div>

                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <MapPin size={13} className="text-slate-400" />
                      <span>Location</span>
                    </span>
                    <span className="font-semibold text-slate-800">
                      {prop.village}, {prop.mandal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Building2 size={13} className="text-slate-400" />
                      <span>District</span>
                    </span>
                    <span className="font-medium text-slate-700">
                      {prop.district}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Ruler size={13} className="text-slate-400" />
                      <span>Recorded Area</span>
                    </span>
                    <span className="font-bold text-slate-900 font-mono">
                      {prop.area}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Land Classification</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                      {prop.landType}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <p className="line-clamp-2">
                      <strong className="text-slate-700">RoR Holder:</strong> {prop.ownership.ownerName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  to={`/citizen/map?parcel=${prop.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                  title="Inspect boundary on GIS Map"
                >
                  <MapPin size={13} className="text-emerald-600" />
                  <span>View on Map</span>
                </Link>
                <Link
                  to={`/citizen/property/${prop.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#0f2744] hover:bg-[#1e3e62] text-white shadow-xs transition-all group-hover:gap-2"
                >
                  <span>View Details</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 font-semibold uppercase text-[11px]">
                  <th className="py-3 px-4">Survey Number</th>
                  <th className="py-3 px-4">Village</th>
                  <th className="py-3 px-4">Mandal</th>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4">Area</th>
                  <th className="py-3 px-4">Land Type</th>
                  <th className="py-3 px-4">Verification Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 font-display">
                      {prop.surveyNumber}
                    </td>
                    <td className="py-3 px-4 text-slate-800 font-medium">
                      {prop.village}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {prop.mandal}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {prop.district}
                    </td>
                    <td className="py-3 px-4 font-bold font-mono text-slate-900">
                      {prop.area}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                        {prop.landType}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={prop.verificationStatus} />
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <Link
                        to={`/citizen/map?parcel=${prop.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                        title="Inspect on GIS Map"
                      >
                        <MapPin size={12} className="text-emerald-600" />
                        <span>Map</span>
                      </Link>
                      <Link
                        to={`/citizen/property/${prop.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0f2744] hover:bg-[#1e3e62] text-white transition-colors"
                      >
                        <span>Details</span>
                        <ArrowRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
