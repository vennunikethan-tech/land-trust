import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Plus, 
  Eye, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Printer, 
  Search,
  ExternalLink
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import { reportService } from '../services/reportService';
import { mockProperties } from '../data/properties';

export default function DigitalReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(mockProperties[0].surveyNumber);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    async function loadReports() {
      try {
        const data = await reportService.getReports();
        setReports(data);
      } finally {
        setLoading(false);
      }
    }
    loadReports();
  }, []);

  const handleGenerateNew = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const prop = mockProperties.find((p) => p.surveyNumber === selectedSurvey) || mockProperties[0];
    setTimeout(async () => {
      const rep = await reportService.generateReport(prop);
      setReports((prev) => [rep, ...prev]);
      setIsGenerating(false);
      setShowGenerateModal(false);
      setSelectedReport(rep);
    }, 700);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Citizen Portal</span>
            <span>/</span>
            <span className="text-emerald-700 font-semibold">Digital Reports</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-900">
            Digital Title Reports & Certificates
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tamper-evident verification dossiers generated across integrated cadastral, revenue, and municipal registries.
          </p>
        </div>

        {/* Generate New Report Button */}
        <button
          onClick={() => setShowGenerateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Generate New Report</span>
        </button>
      </div>

      {/* Reports Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 font-semibold uppercase text-[11px]">
                <th className="py-3 px-4">Report ID</th>
                <th className="py-3 px-4">Survey Number</th>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Generated Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <FileText size={15} className="text-emerald-600" />
                      <span>{report.reportNumber}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800 font-display">
                    {report.surveyNumber}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {report.property}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {report.generatedDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={report.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0f2744] hover:bg-[#1e3e62] text-white transition-colors shadow-2xs"
                    >
                      <Eye size={13} />
                      <span>View Report</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Generate New Report Simulator */}
      <Modal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="Generate Integrated Title Report"
        subtitle="Digital Public Infrastructure automated cross-validation"
      >
        <form onSubmit={handleGenerateNew} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Select Survey Number for Title Certification
            </label>
            <select
              value={selectedSurvey}
              onChange={(e) => setSelectedSurvey(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              {mockProperties.map((p) => (
                <option key={p.id} value={p.surveyNumber}>
                  Survey {p.surveyNumber} — {p.village}, {p.mandal} ({p.area})
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 space-y-1">
            <p className="font-semibold text-slate-800">Automated Pipeline Checkpoints Included:</p>
            <ul className="list-disc list-inside text-[11px] space-y-0.5">
              <li>Drone Cadastral GIS Area reconciliation</li>
              <li>Record of Rights (RoR) Pattadar Passbook validity</li>
              <li>SRO Encumbrance Certificate & Deed chain verification</li>
              <li>Local body Property Tax clearance</li>
              <li>Section 22-A Prohibitions & Master Plan buffer screening</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowGenerateModal(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGenerating}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Synthesizing Dossier...</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>Generate Report</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 2: View Report Preview Dossier */}
      <Modal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        title={`Title Audit Report: ${selectedReport?.reportNumber || ''}`}
        subtitle="Government of India • Integrated Land Trust DPI"
        maxWidth="max-w-3xl"
      >
        {selectedReport && (
          <div className="space-y-6 text-xs text-slate-700">
            {/* Report Header Stamp */}
            <div className="p-5 rounded-2xl bg-[#0f2744] text-white space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono text-emerald-400 font-bold">{selectedReport.reportNumber}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                  {selectedReport.status}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-display">{selectedReport.property}</h3>
                <p className="text-slate-300 text-xs mt-1">{selectedReport.summary}</p>
              </div>
              <div className="pt-3 border-t border-slate-700/80 flex flex-wrap justify-between text-[11px] text-slate-400 gap-2">
                <span>Date: {selectedReport.generatedDate}</span>
                <span>Verification Score: {selectedReport.verificationScore}</span>
                <span>Issuing Authority: {selectedReport.officerSeal}</span>
              </div>
            </div>

            {/* Audit breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400">Survey No</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedReport.surveyNumber}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400">Village</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedReport.village}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400">District</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedReport.district}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400">File Size</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedReport.fileSize}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 flex items-start gap-3">
              <ShieldCheck size={22} className="text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold">Cryptographically Verifiable Digital Certificate</h4>
                <p className="text-emerald-800 text-[11px] mt-0.5 leading-relaxed">
                  This dossier acts as proof of clean title and cadastral boundary validity. Recognized for institutional conveyance and banking mortgage clearance.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-xs font-semibold"
              >
                <Printer size={14} />
                <span>Print Dossier</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert(`Downloading simulated PDF: ${selectedReport.reportNumber}.pdf`);
                    setSelectedReport(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Download size={13} />
                  <span>Download PDF Certificate</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
