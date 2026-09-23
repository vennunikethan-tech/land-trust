import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BellRing, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Info, 
  ArrowRight, 
  Filter,
  CheckCheck,
  Calendar,
  Clock
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { alertService } from '../services/alertService';

export default function LandAlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  useEffect(() => {
    async function loadAlerts() {
      try {
        const data = await alertService.getAlerts();
        setAlerts(data);
      } finally {
        setLoading(false);
      }
    }
    loadAlerts();
  }, []);

  const filteredAlerts = filterSeverity === 'ALL'
    ? alerts
    : alerts.filter((a) => a.severity.toLowerCase() === filterSeverity.toLowerCase());

  const handleMarkAllRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, isRead: true })));
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Citizen Portal</span>
            <span>/</span>
            <span className="text-emerald-700 font-semibold">Land Alerts</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-900">
            Cadastral & Registration Alerts
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated event triggers for boundary discrepancies, restriction updates, and verification status changes.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs transition-colors"
          >
            <CheckCheck size={14} className="text-emerald-600" />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Severity Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-200 text-xs">
        <span className="text-slate-400 font-medium text-[11px] uppercase mr-1 flex items-center gap-1">
          <Filter size={12} /> Filter:
        </span>
        {['ALL', 'Critical', 'Warning', 'Success', 'Info'].map((sev) => (
          <button
            key={sev}
            onClick={() => setFilterSeverity(sev)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
              filterSeverity === sev
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {sev === 'ALL' ? 'All Alerts' : sev}
          </button>
        ))}
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3.5">
        {filteredAlerts.map((alert) => {
          let BorderColor = "border-slate-200";
          let BgColor = "bg-white";
          let Icon = Info;
          let iconColor = "text-blue-600";

          if (alert.severity === 'Critical') {
            BorderColor = "border-rose-200 hover:border-rose-300";
            BgColor = alert.isRead ? "bg-white" : "bg-rose-50/20";
            Icon = XCircle;
            iconColor = "text-rose-600";
          } else if (alert.severity === 'Warning') {
            BorderColor = "border-amber-200 hover:border-amber-300";
            BgColor = alert.isRead ? "bg-white" : "bg-amber-50/20";
            Icon = AlertTriangle;
            iconColor = "text-amber-600";
          } else if (alert.severity === 'Success') {
            BorderColor = "border-emerald-200 hover:border-emerald-300";
            BgColor = alert.isRead ? "bg-white" : "bg-emerald-50/20";
            Icon = CheckCircle2;
            iconColor = "text-emerald-600";
          }

          return (
            <div
              key={alert.id}
              className={`rounded-2xl border ${BorderColor} ${BgColor} p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-xl bg-slate-50 border border-slate-100 ${iconColor} shrink-0`}>
                  <Icon size={20} />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      {alert.alertType}
                    </h3>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Survey {alert.surveyNumber}
                    </span>
                    <StatusBadge status={alert.severity} size="sm" />
                    {!alert.isRead && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {alert.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{alert.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{alert.time}</span>
                    </span>
                    <span>Location: {alert.village}, {alert.district}</span>
                  </div>
                </div>
              </div>

              {/* View Property Button */}
              <div className="shrink-0 self-end sm:self-center">
                <Link
                  to={`/citizen/property/${alert.propertyId}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#0f2744] hover:bg-[#1e3e62] text-white transition-all shadow-xs hover:gap-2"
                >
                  <span>View Property</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
