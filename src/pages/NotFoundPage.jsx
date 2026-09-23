import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#071322] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#0f2744] border border-slate-700 flex items-center justify-center text-emerald-400 mb-6 shadow-xl">
        <ShieldCheck size={32} />
      </div>

      <h1 className="text-4xl font-extrabold font-display tracking-tight text-white mb-2">
        404 — Record Not Found
      </h1>
      <p className="text-sm text-slate-400 max-w-md mx-auto mb-8">
        The requested land registry endpoint or portal resource does not exist in the Land Trust Digital Public Infrastructure.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/citizen"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
        >
          <Home size={14} />
          <span>Citizen Dashboard</span>
        </Link>
        <Link
          to="/officer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
        >
          <span>Officer Portal</span>
        </Link>
      </div>
    </div>
  );
}
