import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import { Shield, FileCheck2, AlertCircle } from 'lucide-react';

export default function OfficerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      
      {/* Officer Authority Sub-Banner */}
      <div className="bg-slate-900 text-amber-300 text-xs px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-amber-400" />
          <span className="font-semibold tracking-wide">REVENUE ADMINISTRATION DESK</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Office of the Tahsildar & Executive Magistrate</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span>Jurisdiction: Serilingampally & Rajendranagar Division</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Digital Seal Active
          </span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
