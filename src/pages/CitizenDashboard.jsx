import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Search, 
  Map, 
  FileCheck2, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink,
  MapPin,
  Calendar,
  Layers
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import StatusBadge from '../components/common/StatusBadge';
import { landService } from '../services/landService';
import { alertService } from '../services/alertService';

export default function CitizenDashboard() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [props, alrts] = await Promise.all([
          landService.getAllProperties(),
          alertService.getAlerts()
        ]);
        setProperties(props);
        setAlerts(alrts);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const verifiedCount = properties.filter((p) => p.verificationStatus === 'Verified').length;
  const warningCount = properties.filter((p) => p.verificationStatus === 'Warning').length;
  const issueCount = properties.filter((p) => p.verificationStatus === 'Issue').length;
  const pendingCount = warningCount + issueCount;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0f2744] via-[#163359] to-[#0f2744] rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <ShieldCheck size={14} />
            <span>Digital Public Infrastructure (SIH26014)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
            Welcome, Venkata Rao Nallamothu
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Manage your registered parcels, verify cadastral boundaries, check encumbrance status across government registries, and generate verifiable digital title dossiers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/citizen/search"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-sm transition-all"
          >
            <Search size={14} />
            <span>Search Land Registry</span>
          </Link>
          <Link
            to="/citizen/verification"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
          >
            <CheckCircle2 size={14} />
            <span>Run 5-Way Check</span>
          </Link>
        </div>
      </div>

      {/* Dashboard KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          title="My Properties"
          value={properties.length}
          subtitle="Linked to Pattadar Passbook"
          icon={Building2}
          color="blue"
          trend={{ label: "Active Landholdings", value: "3 Primary Lots", positive: true }}
        />
        <MetricCard
          title="Verified Properties"
          value={verifiedCount}
          subtitle="100% Consistent Records"
          icon={CheckCircle2}
          color="green"
          trend={{ label: "Clear Title Certificates", value: `${verifiedCount} Parcels`, positive: true }}
        />
        <MetricCard
          title="Pending Verification"
          value={pendingCount}
          subtitle="Area Mismatches / Review"
          icon={Clock}
          color="amber"
          trend={{ label: "Requires Action", value: `${pendingCount} Flagged`, positive: false }}
        />
        <MetricCard
          title="Active Alerts"
          value={alerts.length}
          subtitle="Cadastral & Registry Feeds"
          icon={AlertTriangle}
          color="red"
          trend={{ label: "Last notification", value: "16 Sep 2026", positive: true }}
        />
      </div>

      {/* Quick Access Action Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/citizen/map"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group flex items-start justify-between"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Interactive GIS</span>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5">
              <span>View Cadastral GIS Map</span>
            </h4>
            <p className="text-xs text-slate-500">
              Explore georeferenced parcels, zoning overlays & road buffers.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Map size={18} />
          </div>
        </Link>

        <Link
          to="/citizen/verification"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group flex items-start justify-between"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Interoperability</span>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 flex items-center gap-1.5">
              <span>5-Way Cross-Verification Engine</span>
            </h4>
            <p className="text-xs text-slate-500">
              Detect area divergences between RoR, SRO deed & Cadastre.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <CheckCircle2 size={18} />
          </div>
        </Link>

        <Link
          to="/citizen/reports"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all group flex items-start justify-between"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Title Dossiers</span>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 flex items-center gap-1.5">
              <span>Digital Title Reports</span>
            </h4>
            <p className="text-xs text-slate-500">
              Generate & download verifiable certificates for bank loans & NOC.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <FileCheck2 size={18} />
          </div>
        </Link>
      </div>

      {/* Recent Properties Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900">Recent Properties</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cadastral records registered under your digital citizen account.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/citizen/search"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>Search All Registry</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Properties Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 font-semibold uppercase text-[11px]">
                <th className="py-3 px-4">Survey Number</th>
                <th className="py-3 px-4">Location (Village / Mandal)</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Area</th>
                <th className="py-3 px-4">Land Type</th>
                <th className="py-3 px-4">Verification Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 font-display text-sm">
                      {prop.surveyNumber}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {prop.propertyId}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{prop.village}</div>
                    <div className="text-[11px] text-slate-500">{prop.mandal} Mandal</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {prop.district}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {prop.area}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                      {prop.landType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={prop.verificationStatus} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/citizen/property/${prop.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0f2744] hover:bg-[#1e3e62] text-white transition-colors shadow-xs"
                    >
                      <span>View Details</span>
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
