import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  RefreshCw, 
  Play, 
  Cpu, 
  ShieldCheck, 
  FileCheck2,
  Sparkles,
  Info
} from 'lucide-react';
import WorkflowPipeline from '../components/verification/WorkflowPipeline';
import DiscrepancyInspector from '../components/verification/DiscrepancyInspector';
import Modal from '../components/common/Modal';
import { verificationService } from '../services/verificationService';
import { reportService } from '../services/reportService';

export default function LandVerificationPage() {
  const [scenarios, setScenarios] = useState([]);
  const [activeScenarioId, setActiveScenarioId] = useState('scenario-consistent');
  const [loading, setLoading] = useState(true);
  const [isRunningEngine, setIsRunningEngine] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [reportModal, setReportModal] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  useEffect(() => {
    async function loadScenarios() {
      try {
        const data = await verificationService.getScenarios();
        setScenarios(data);
      } finally {
        setLoading(false);
      }
    }
    loadScenarios();
  }, []);

  const currentScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const handleRerunVerification = () => {
    setIsRunningEngine(true);
    setTimeout(() => {
      setIsRunningEngine(false);
    }, 750);
  };

  const handleGenerateReport = async () => {
    if (!currentScenario) return;
    const report = await reportService.generateReport({
      surveyNumber: currentScenario.surveyNumber,
      id: currentScenario.propertyId,
      village: currentScenario.village,
      district: 'Hyderabad',
    });
    setGeneratedReport(report);
    setReportModal(true);
  };

  if (loading || !currentScenario) {
    return (
      <div className="p-12 text-center text-slate-500">
        <RefreshCw size={24} className="animate-spin mx-auto text-emerald-600 mb-2" />
        <p className="text-xs">Initializing Verification Engine...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Citizen Portal</span>
            <span>/</span>
            <span className="text-emerald-700 font-semibold">Land Verification</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-900">
            5-Way Interoperability Verification Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated multi-register cross-validation across Cadastral, RoR, SRO Deeds, Tax & Restrictions.
          </p>
        </div>

        <button
          onClick={handleRerunVerification}
          disabled={isRunningEngine}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw size={14} className={isRunningEngine ? 'animate-spin' : ''} />
          <span>{isRunningEngine ? 'Re-analyzing Public Registers...' : 'Run Verification Simulation'}</span>
        </button>
      </div>

      {/* Scenario Switcher Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-1 mb-2">
          Select SIH Demonstration Scenario:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {scenarios.map((scen) => {
            const isSelected = scen.id === activeScenarioId;
            return (
              <button
                key={scen.id}
                onClick={() => setActiveScenarioId(scen.id)}
                className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? scen.statusBadge === 'Verified'
                      ? 'bg-emerald-50/70 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs'
                      : scen.statusBadge === 'Warning'
                        ? 'bg-amber-50/70 border-amber-500 text-amber-950 ring-2 ring-amber-500/20 shadow-xs'
                        : 'bg-rose-50/70 border-rose-500 text-rose-950 ring-2 ring-rose-500/20 shadow-xs'
                    : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs truncate">{scen.title}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    scen.statusBadge === 'Verified'
                      ? 'bg-emerald-100 text-emerald-800'
                      : scen.statusBadge === 'Warning'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                  }`}>
                    {scen.statusBadge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">
                  {scen.outcome}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Visual Pipeline (Left) + Discrepancy Matrix (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 7-Stage Workflow Pipeline */}
        <div className="lg:col-span-7">
          <WorkflowPipeline
            scenario={currentScenario}
            activeStep={activeStep}
            onSelectStep={setActiveStep}
          />
        </div>

        {/* Right: Comparative Discrepancy Inspector */}
        <div className="lg:col-span-5 space-y-6">
          <DiscrepancyInspector
            scenario={currentScenario}
            onGenerateReport={handleGenerateReport}
          />

          {/* Phase 1 AI & Microservice Architecture Note */}
          <div className="p-5 rounded-2xl bg-[#0b192c] text-white border border-slate-800 shadow-md space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Cpu size={16} />
              <span>Phase 2 Architecture Architecture Ready</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              In Phase 2, this workflow will be dispatched asynchronously via FastAPI microservices and validated against PostGIS spatial intersection engines (e.g. <code className="text-emerald-300 font-mono">ST_Equals</code> and <code className="text-emerald-300 font-mono">ST_Intersects</code>).
            </p>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <Modal
        isOpen={reportModal}
        onClose={() => setReportModal(false)}
        title="DPI Title Verification Certificate"
        subtitle={`Audit results for ${currentScenario.surveyNumber}`}
      >
        {generatedReport && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between text-[11px] text-emerald-400 font-mono">
                <span>{generatedReport.reportNumber}</span>
                <span>{generatedReport.status}</span>
              </div>
              <h4 className="text-base font-bold font-display">{generatedReport.property}</h4>
              <p className="text-slate-300 text-xs">{generatedReport.summary}</p>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-[10px] text-slate-400">
                <span>Verification Score: {generatedReport.verificationScore}</span>
                <span>File Size: {generatedReport.fileSize}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-slate-700 text-[11px]">
              <p><strong>Outcome Verdict:</strong> {currentScenario.outcome}</p>
              <p><strong>Digital Seal:</strong> Revenue Authority Public Infrastructure</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setReportModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Downloading simulation of ${generatedReport.reportNumber}.pdf`);
                  setReportModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              >
                Download PDF Simulation
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
