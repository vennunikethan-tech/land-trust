import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Layers, 
  Bell, 
  User, 
  Menu, 
  ArrowRightLeft, 
  Search, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ onToggleSidebar, isSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isOfficer = location.pathname.startsWith('/officer');

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      {/* Top micro-bar: Government of India / SIH 2026 Public Infrastructure indicator */}
      <div className="bg-[#0b192c] text-slate-300 text-[11px] px-4 py-1.5 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Digital Public Infrastructure for Land Governance • SIH 2026 (Problem SIH26014)</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <span>Standards: OGC Compliant Cadastral GIS</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-semibold">Phase 1 Frontend Prototype</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile hamburger toggle */}
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu size={20} />
          </button>

          {/* Logo & Branding */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0f2744] to-[#1e3e62] text-white flex items-center justify-center shadow-md shadow-blue-900/10 group-hover:scale-105 transition-transform">
              <ShieldCheck size={24} className="text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  LAND<span className="text-[#047857]">TRUST</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  DPI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 tracking-tight hidden sm:block">
                Unified GIS-Based Digital Infrastructure for Land Governance
              </p>
            </div>
          </Link>
        </div>

        {/* Center/Right utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Shortcut */}
          <button
            onClick={() => navigate(isOfficer ? '/officer/records' : '/citizen/search')}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg transition-colors"
          >
            <Search size={14} />
            <span>Search Survey No / Parcel...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-white rounded border border-slate-300 font-mono text-slate-400">Ctrl+K</kbd>
          </button>

          {/* Persona Switcher Button */}
          {isOfficer ? (
            <Link
              to="/citizen"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors shadow-sm"
              title="Switch to Citizen Portal"
            >
              <ArrowRightLeft size={14} />
              <span className="hidden sm:inline">Switch to</span> Citizen Portal
            </Link>
          ) : (
            <Link
              to="/officer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors shadow-sm"
              title="Switch to Revenue Officer Portal"
            >
              <ArrowRightLeft size={14} />
              <span className="hidden sm:inline">Switch to</span> Officer Console
            </Link>
          )}

          {/* Notifications Bell */}
          <Link
            to={isOfficer ? "/officer/flagged" : "/citizen/alerts"}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="View Alerts & Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </Link>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {isOfficer ? 'OF' : 'VR'}
            </div>
            <div className="hidden xl:block text-left text-xs">
              <p className="font-semibold text-slate-800 leading-none">
                {isOfficer ? 'Srihari V.' : 'Venkata Rao N.'}
              </p>
              <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                {isOfficer ? 'Tahsildar / RDO' : 'Citizen (KYC Verified)'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
