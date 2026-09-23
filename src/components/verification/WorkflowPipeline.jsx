import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowDown, 
  Map, 
  UserCheck, 
  Stamp, 
  Receipt, 
  ShieldAlert, 
  Cpu, 
  Award 
} from 'lucide-react';

export default function WorkflowPipeline({ scenario, activeStep, onSelectStep }) {
  const iconList = [Map, UserCheck, Stamp, Receipt, ShieldAlert, Cpu, Award];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
            <span>Automated 5-Way Interoperability Pipeline</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-register ingestion & heuristic matching engine (DPI SIH26014)
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 self-start sm:self-auto">
          7 Pipeline Stages
        </span>
      </div>

      {/* Vertical Pipeline Flow with connectors */}
      <div className="mt-6 relative">
        <div className="space-y-4">
          {scenario.steps.map((step, idx) => {
            const Icon = iconList[idx] || Map;
            const isLast = idx === scenario.steps.length - 1;
            const isEngine = idx === 5;
            const isResult = idx === 6;

            let statusColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
            let StatusIcon = CheckCircle2;
            if (step.status === 'Warning') {
              statusColor = "bg-amber-50 text-amber-700 border-amber-200";
              StatusIcon = AlertTriangle;
            } else if (step.status === 'Issue') {
              statusColor = "bg-rose-50 text-rose-700 border-rose-200";
              StatusIcon = XCircle;
            }

            return (
              <div key={step.id} className="relative">
                <div 
                  onClick={() => onSelectStep && onSelectStep(step)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isResult 
                      ? step.status === 'Verified' 
                        ? 'bg-emerald-500/10 border-emerald-400 ring-2 ring-emerald-400/30' 
                        : 'bg-amber-500/10 border-amber-400 ring-2 ring-amber-400/30'
                      : isEngine 
                        ? 'bg-slate-900 text-white border-slate-800 shadow-md' 
                        : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl ${isEngine ? 'bg-slate-800 text-emerald-400' : isResult ? 'bg-white shadow-sm' : 'bg-slate-100 text-slate-700'}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${isEngine ? 'text-slate-400' : 'text-slate-400'}`}>
                            Stage 0{step.id}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className={`text-[11px] ${isEngine ? 'text-slate-300' : 'text-slate-500'}`}>
                            {step.agency}
                          </span>
                        </div>
                        <h4 className={`text-sm font-bold mt-0.5 ${isEngine ? 'text-white' : 'text-slate-900'}`}>
                          {step.name}
                        </h4>
                      </div>
                    </div>

                    {/* Step Status Badge */}
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${isEngine ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' : statusColor}`}>
                      <StatusIcon size={13} />
                      <span>{step.status}</span>
                    </div>
                  </div>

                  {/* Key metadata chips */}
                  <div className="mt-3 pt-3 border-t border-slate-100/40 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {Object.entries(step.details).map(([k, v]) => (
                      <div key={k} className={`p-2 rounded-lg ${isEngine ? 'bg-slate-800/80' : 'bg-slate-50'}`}>
                        <p className={`text-[10px] uppercase font-semibold truncate ${isEngine ? 'text-slate-400' : 'text-slate-400'}`}>
                          {k.replace(/([A-Z])/g, ' $1')}
                        </p>
                        <p className={`font-semibold mt-0.5 truncate ${isEngine ? 'text-slate-100' : 'text-slate-800'}`}>
                          {v}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow indicator below card */}
                {!isLast && (
                  <div className="flex justify-center my-1.5 text-slate-400">
                    <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
                      <ArrowDown size={13} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
