import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Layers, 
  Lock, 
  User, 
  Building, 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  FileCheck, 
  Fingerprint,
  ChevronRight,
  Database,
  Globe2
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('citizen.demo@landtrust.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState('citizen'); // 'citizen' | 'officer'

  const handleFormLogin = (e) => {
    e.preventDefault();
    if (selectedRole === 'officer') {
      navigate('/officer');
    } else {
      navigate('/citizen');
    }
  };

  const handleQuickCitizen = () => {
    navigate('/citizen');
  };

  const handleQuickOfficer = () => {
    navigate('/officer');
  };

  return (
    <div className="min-h-screen bg-[#071322] text-slate-100 flex flex-col font-sans">
      {/* Top Government Strip */}
      <div className="bg-[#040c17] border-b border-slate-800 text-[11px] text-slate-400 py-2 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300 font-medium">
            Smart India Hackathon 2026 (SIH26014) • Digital Public Infrastructure
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>Department of Land Resources</span>
          <span className="text-slate-700">|</span>
          <span className="text-emerald-400">Phase 1: UI & Architecture Prototype</span>
        </div>
      </div>

      {/* Hero & Login Section */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center p-6 sm:p-12 max-w-7xl mx-auto w-full gap-12 lg:gap-16 my-auto">
        {/* Left Column: Mission & Value Proposition */}
        <div className="lg:w-7/12 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-semibold">
            <ShieldCheck size={15} />
            <span>SIH 2026 Land Governance Public Infrastructure</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              LAND <span className="text-emerald-400">TRUST</span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-300 mt-2">
              Unified GIS-Based Digital Infrastructure for Land Governance
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            Unifying fragmented land records into a single source of public truth. Seamlessly reconciles Cadastral Drone Surveys, Record of Rights (RoR), Registration Deeds, Municipal Tax Rolls, and Statutory Environmental Restrictions.
          </p>

          {/* Key Infrastructure Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Layers size={18} />
                <span>Integrated GIS Layers</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Cadastral parcel polygons, zoning master plans, roads, water bodies & buffer zones.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Automated 5-Way Cross Check</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Instant detection of area discrepancies, boundary overlaps, and Section 22-A prohibitions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <FileCheck size={18} />
                <span>Verifiable Digital Reports</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Cryptographically sealable title dossiers for citizens, banks, and judiciary.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <Fingerprint size={18} />
                <span>Tamper-Evident Audit Trail</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Immutable ledger recording every officer modification, survey update, and certificate issue.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Portal Login Card */}
        <div className="lg:w-5/12 w-full max-w-md">
          <div className="bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900">Sign In to Land Trust</h2>
                <p className="text-xs text-slate-500 mt-0.5">Government Digital Public Infrastructure</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#0f2744] text-emerald-400 flex items-center justify-center">
                <ShieldCheck size={22} />
              </div>
            </div>

            {/* Quick Demo Persona Switcher (For SIH Evaluation) */}
            <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Fast Demonstration Access (Phase 1)
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleQuickCitizen}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200 border border-emerald-300 transition-colors"
                >
                  <User size={14} />
                  <span>Continue as Citizen</span>
                </button>
                <button
                  type="button"
                  onClick={handleQuickOfficer}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold text-blue-900 bg-blue-100/70 hover:bg-blue-200 border border-blue-300 transition-colors"
                >
                  <Building size={14} />
                  <span>Continue as Officer</span>
                </button>
              </div>
            </div>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-semibold">Or Sign In with Credentials</span>
              </div>
            </div>

            {/* Standard Login Form */}
            <form onSubmit={handleFormLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email / Mobile / Aadhaar Virtual ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
                    placeholder="e.g. 9876543210 or user@landtrust.gov.in"
                    required
                  />
                  <User size={15} className="absolute left-3 top-2.5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password / Security PIN
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
                    placeholder="Enter password"
                    required
                  />
                  <Lock size={15} className="absolute left-3 top-2.5 text-slate-400" />
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={selectedRole === 'citizen'}
                    onChange={() => setSelectedRole('citizen')}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-slate-700 font-medium">Citizen Portal</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={selectedRole === 'officer'}
                    onChange={() => setSelectedRole('officer')}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-slate-700 font-medium">Revenue Officer</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#0b192c] hover:bg-[#1e3e62] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Login to Portal</span>
                <ArrowRight size={14} />
              </button>
            </form>

            <p className="text-[11px] text-slate-400 text-center mt-5">
              Secure authentication simulation. Ready for MeriPehchaan & Single Sign-On (SSO) integration in Phase 2.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#040c17] py-4 px-6 text-center text-xs text-slate-500">
        <p>
          Land Trust — SIH 2026 Project (Problem Statement SIH26014) • Integrated GIS-based Digital Public Infrastructure for Land Governance
        </p>
      </footer>
    </div>
  );
}
