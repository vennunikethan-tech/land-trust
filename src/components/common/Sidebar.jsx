import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Map as MapIcon, 
  Building2, 
  CheckCheck, 
  BellRing, 
  FileText, 
  UserCircle2, 
  ShieldAlert, 
  ClipboardCheck, 
  History, 
  Database,
  X,
  LogOut,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const isOfficer = location.pathname.startsWith('/officer');

  const citizenNav = [
    { label: 'Dashboard', path: '/citizen', icon: LayoutDashboard, exact: true },
    { label: 'Search Land', path: '/citizen/search', icon: Search },
    { label: 'GIS Map', path: '/citizen/map', icon: MapIcon },
    { label: 'My Properties', path: '/citizen/properties', icon: Building2 },
    { label: 'Land Verification', path: '/citizen/verification', icon: CheckCheck, badge: '5-Way' },
    { label: 'Land Alerts', path: '/citizen/alerts', icon: BellRing, badge: '3' },
    { label: 'Digital Reports', path: '/citizen/reports', icon: FileText },
    { label: 'Profile', path: '/citizen/profile', icon: UserCircle2 },
  ];

  const officerNav = [
    { label: 'Dashboard', path: '/officer', icon: LayoutDashboard, exact: true },
    { label: 'Land Records', path: '/officer/records', icon: Database },
    { label: 'GIS Monitoring', path: '/officer/map', icon: MapIcon },
    { label: 'Verification Requests', path: '/officer/verification', icon: ClipboardCheck, badge: '14' },
    { label: 'Flagged Properties', path: '/officer/flagged', icon: ShieldAlert, badge: '4', badgeColor: 'bg-amber-100 text-amber-800' },
    { label: 'Reports', path: '/officer/reports', icon: FileText },
    { label: 'Audit Trail', path: '/officer/audit', icon: History },
  ];

  const navItems = isOfficer ? officerNav : citizenNav;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-200 flex flex-col transition-transform duration-200 ease-in-out border-r border-slate-800 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Role Identifier */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isOfficer ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                {isOfficer ? 'Revenue Administration' : 'Citizen Portal'}
              </p>
              <p className="text-sm font-semibold text-white">
                {isOfficer ? 'Officer Console' : 'Landholder Space'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact 
              ? location.pathname === item.path 
              : location.pathname === item.path || (item.path !== '/citizen' && item.path !== '/officer' && location.pathname.startsWith(item.path));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? isOfficer
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    size={17} 
                    className={`transition-colors ${
                      isActive 
                        ? isOfficer ? 'text-amber-400' : 'text-emerald-400' 
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`} 
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Banner & Log out / Role Info */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-3">
          <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-[11px] text-slate-400">
            <p className="font-semibold text-slate-200">SIH 2026 Prototype</p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Simulated public infrastructure frontend with integrated GIS canvas.
            </p>
          </div>

          <NavLink
            to="/login"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            <LogOut size={14} />
            <span>Sign Out Session</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
