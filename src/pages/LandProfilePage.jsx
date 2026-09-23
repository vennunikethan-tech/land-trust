import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Download, 
  RefreshCw, 
  MapPin, 
  Ruler, 
  Building, 
  Stamp, 
  Receipt, 
  ShieldAlert, 
  Zap, 
  Droplet, 
  Compass, 
  FileText,
  Building2,
  Lock,
  Calendar,
  Share2,
  ExternalLink,
  Printer
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import { landService } from '../services/landService';
import { reportService } from '../services/reportService';

export default function LandProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // UI Modal states for Phase 1 simulation
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifySuccessModal, setVerifySuccessModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  useEffect(() => {
    async function loadProperty() {
      setLoading(true);
      try {
        const data = await landService.getPropertyById(id || 'PROP-HYD-001');
        setProperty(data || null);
      } finally {
        setLoading(false);
      }
    }
    loadProperty();
  }, [id]);

  const handleSimulateVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifySuccessModal(true);
    }, 900);
  };

  const handleSimulateReport = async () => {
    if (!property) return;
    const rep = await reportService.generateReport(property);
    setGeneratedReport(rep);
    setReportModal(true);
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500">
        <RefreshCw size={28} className="animate-spin mx-auto text-emerald-600 mb-3" />
        <p className="text-xs font-semibold">Loading Land Dossier from Digital Public Infrastructure...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Land Record Not Found</h3>
        <p className="text-xs text-slate-500">The requested parcel ID "{id}" does not exist in the prototype dataset.</p>
        <button
          onClick={() => navigate('/citizen/search')}
          className="px-4 py-2 bg-[#0f2744] text-white text-xs font-bold rounded-xl"
        >
          Return to Search
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/citizen/search')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Search</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Land Profile: Survey No. {property.surveyNumber}
            </h1>
            <StatusBadge status={property.verificationStatus} size="lg" />
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <span>Property ULPIN: <strong className="font-mono text-slate-700">{property.propertyId}</strong></span>
            <span>•</span>
            <span>{property.village}, {property.mandal}, {property.district}</span>
          </p>
        </div>

        {/* Phase 1 Interactive Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSimulateVerify}
            disabled={isVerifying}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={isVerifying ? 'animate-spin' : ''} />
            <span>{isVerifying ? 'Verifying 5 Registers...' : 'Verify Property'}</span>
          </button>

          <button
            onClick={handleSimulateReport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0f2744] hover:bg-[#1e3e62] text-white font-bold text-xs shadow-sm transition-all"
          >
            <Download size={14} />
            <span>Generate Report</span>
          </button>

          <button
            onClick={() => window.print()}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            title="Print Dossier"
          >
            <Printer size={15} />
          </button>
        </div>
      </div>

      {/* SECTION: VERIFICATION SUMMARY (TOP HIGHLIGHT) */}
      <div className={`p-6 rounded-2xl border shadow-sm ${
        property.verificationStatus === 'Verified'
          ? 'bg-emerald-500/10 border-emerald-300'
          : property.verificationStatus === 'Warning'
            ? 'bg-amber-500/10 border-amber-300'
            : 'bg-rose-500/10 border-rose-300'
      }`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {property.verificationStatus === 'Verified' ? (
              <CheckCircle2 size={24} className="text-emerald-700 shrink-0 mt-0.5" />
            ) : property.verificationStatus === 'Warning' ? (
              <AlertTriangle size={24} className="text-amber-700 shrink-0 mt-0.5" />
            ) : (
              <XCircle size={24} className="text-rose-700 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Verification Summary & Integrity Audit
                </span>
                <StatusBadge status={property.verificationStatus} size="sm" />
              </div>
              <p className="text-sm font-semibold text-slate-900 mt-1">
                {property.statusReason}
              </p>
            </div>
          </div>
          <Link
            to="/citizen/verification"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-xs hover:bg-slate-50 transition-colors"
          >
            <span>View Full Pipeline</span>
            <ExternalLink size={12} />
          </Link>
        </div>

        {/* Checkpoint mini-pills */}
        <div className="mt-4 pt-4 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {property.checkpoints?.map((chk, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs text-xs">
              <div className="flex items-center justify-between gap-1">
                <span className="font-semibold text-slate-800 truncate">{chk.label}</span>
                <StatusBadge status={chk.status} size="sm" />
              </div>
              <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                {chk.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2-COLUMN GRID OF THE 8 MANDATORY SPEC SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. PROPERTY INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm">
            <Building2 size={16} className="text-emerald-600" />
            <h3 className="font-display uppercase tracking-wide text-xs">1. Property Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-slate-400 font-medium">Survey Number</p>
              <p className="font-bold text-slate-900 font-display text-sm mt-0.5">{property.surveyNumber}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Unique Property ID</p>
              <p className="font-mono font-semibold text-slate-800 mt-0.5">{property.propertyId}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Recorded Area</p>
              <p className="font-bold text-slate-900 mt-0.5">{property.area} ({property.areaInSqYards} Sq. Yds)</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Land Classification</p>
              <p className="font-semibold text-slate-800 mt-0.5">{property.landType}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Village</p>
              <p className="font-semibold text-slate-800 mt-0.5">{property.village}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Mandal & District</p>
              <p className="font-semibold text-slate-800 mt-0.5">{property.mandal}, {property.district}</p>
            </div>
            <div className="col-span-2">
              <p className="text-slate-400 font-medium">Geographic Coordinates</p>
              <p className="font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg mt-0.5 inline-block font-semibold">
                📍 {property.coordinates}
              </p>
            </div>
          </div>
        </div>

        {/* 2. OWNERSHIP INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm">
            <ShieldAlert size={16} className="text-blue-600" />
            <h3 className="font-display uppercase tracking-wide text-xs">2. Ownership Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="col-span-2">
              <p className="text-slate-400 font-medium">Primary Pattadar / Owner Name</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5 flex items-center gap-2">
                <span>{property.ownership?.ownerName}</span>
                <span className="text-[10px] font-normal text-slate-400">({property.ownership?.relation})</span>
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Ownership Legal Status</p>
              <p className="font-semibold text-slate-800 mt-0.5">{property.ownership?.ownershipStatus}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Record of Rights (RoR) Status</p>
              <span className="inline-block mt-0.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold text-[11px]">
                ✓ {property.ownership?.rorStatus}
              </span>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Pattadar Passbook No</p>
              <p className="font-mono font-semibold text-slate-700 mt-0.5">{property.ownership?.pattadarPassbookNo}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Acquisition Mode</p>
              <p className="font-medium text-slate-700 mt-0.5">{property.ownership?.acquisitionType}</p>
            </div>
          </div>
        </div>

        {/* 3. CADASTRAL INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm">
            <Compass size={16} className="text-amber-600" />
            <h3 className="font-display uppercase tracking-wide text-xs">3. Cadastral Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-slate-400 font-medium">Cadastral Parcel ID</p>
              <p className="font-mono font-bold text-slate-800 mt-0.5">{property.cadastral?.parcelId}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Boundary Status</p>
              <span className="inline-block mt-0.5 text-slate-800 font-semibold bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                {property.cadastral?.boundaryStatus}
              </span>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Recorded Survey Area</p>
              <p className="font-bold text-slate-900 mt-0.5">{property.cadastral?.recordedArea}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Surveying Agency</p>
              <p className="font-medium text-slate-700 mt-0.5">{property.cadastral?.surveyorAgency}</p>
            </div>
            <div className="col-span-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Four Boundary Boundaries (Chaukath)</p>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><span className="font-semibold text-slate-600">North:</span> {property.cadastral?.northBoundary}</div>
                <div><span className="font-semibold text-slate-600">South:</span> {property.cadastral?.southBoundary}</div>
                <div><span className="font-semibold text-slate-600">East:</span> {property.cadastral?.eastBoundary}</div>
                <div><span className="font-semibold text-slate-600">West:</span> {property.cadastral?.westBoundary}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. REGISTRATION INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm">
            <Stamp size={16} className="text-purple-600" />
            <h3 className="font-display uppercase tracking-wide text-xs">4. Registration Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-slate-400 font-medium">Sub-Registrar Office (SRO)</p>
              <p className="font-bold text-slate-800 mt-0.5">{property.registration?.sroOffice}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Deed / Document Number</p>
              <p className="font-mono font-semibold text-slate-800 mt-0.5">{property.registration?.documentNumber}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Registration Date</p>
              <p className="font-medium text-slate-800 mt-0.5">{property.registration?.registrationDate}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Registered Area</p>
              <p className="font-bold text-slate-900 mt-0.5">{property.registration?.registeredArea}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Encumbrance Status</p>
              <p className="font-semibold text-emerald-700 mt-0.5">{property.registration?.registrationStatus}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Transaction Title Status</p>
              <p className="font-medium text-slate-700 mt-0.5">{property.registration?.transactionStatus}</p>
            </div>
          </div>
        </div>

        {/* 5. TAX INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm">
            <Receipt size={16} className="text-emerald-600" />
            <h3 className="font-display uppercase tracking-wide text-xs">5. Tax & Municipal Dues</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-slate-400 font-medium">Tax Payment Status</p>
              <span className={`inline-block mt-0.5 px-2 py-0.5 rounded font-semibold text-[11px] ${
                property.tax?.pendingDues === '₹ 0.00' 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {property.tax?.taxStatus}
              </span>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Pending Municipal Dues</p>
              <p className={`font-mono font-bold mt-0.5 text-sm ${
                property.tax?.pendingDues === '₹ 0.00' ? 'text-slate-900' : 'text-rose-600'
              }`}>
                {property.tax?.pendingDues}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Assessment / PTIN No</p>
              <p className="font-mono text-slate-700 mt-0.5">{property.tax?.assessmentNumber}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Last Payment Date</p>
              <p className="font-medium text-slate-700 mt-0.5">{property.tax?.lastPaymentDate}</p>
            </div>
          </div>
        </div>

        {/* 6. RESTRICTIONS & PROHIBITIONS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm">
            <Lock size={16} className="text-rose-600" />
            <h3 className="font-display uppercase tracking-wide text-xs">6. Restrictions & Encumbrances</h3>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <p className="text-slate-400 font-medium">Land-Use Restrictions</p>
              <p className="font-semibold text-slate-800 mt-0.5">{property.restrictions?.landUseRestrictions}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Government / Section 22-A Restrictions</p>
              <p className="font-semibold text-slate-800 mt-0.5">{property.restrictions?.governmentRestrictions}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Planning & Environmental Restrictions</p>
              <p className="font-semibold text-slate-800 mt-0.5">{property.restrictions?.planningRestrictions}</p>
            </div>
          </div>
        </div>

        {/* 7. BUILDING INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm">
            <Building size={16} className="text-indigo-600" />
            <h3 className="font-display uppercase tracking-wide text-xs">7. Building & Zoning Sanctions</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="col-span-2">
              <p className="text-slate-400 font-medium">Building Permission Status</p>
              <p className="font-bold text-slate-800 mt-0.5">{property.building?.permissionStatus}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Master Plan Zone</p>
              <p className="font-semibold text-slate-700 mt-0.5">{property.building?.zoneType}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Permissible FSI</p>
              <p className="font-bold text-slate-900 mt-0.5">{property.building?.maxPermissibleFSI}</p>
            </div>
            <div className="col-span-2">
              <p className="text-slate-400 font-medium">Statutory Setback Requirement</p>
              <p className="text-slate-600 mt-0.5">{property.building?.setbackRequirement}</p>
            </div>
          </div>
        </div>

        {/* 8. UTILITY INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm">
            <Zap size={16} className="text-amber-500" />
            <h3 className="font-display uppercase tracking-wide text-xs">8. Utilities & Infrastructure</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-slate-400 font-medium">Road Access</p>
              <p className="font-semibold text-slate-800 mt-0.5">{property.utilities?.roadAccess}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Water Grid</p>
              <p className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1">
                <Droplet size={12} className="text-blue-500" />
                <span>{property.utilities?.waterConnection}</span>
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Electricity Supply</p>
              <p className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1">
                <Zap size={12} className="text-amber-500" />
                <span>{property.utilities?.electricityConnection}</span>
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Drainage / Sewerage</p>
              <p className="font-semibold text-slate-800 mt-0.5">{property.utilities?.drainageStatus}</p>
            </div>
          </div>
        </div>
      </div>

      {/* PHASE 1 SIMULATION MODALS */}

      {/* 1. Verification Trigger Modal */}
      <Modal
        isOpen={verifySuccessModal}
        onClose={() => setVerifySuccessModal(false)}
        title="Institutional Cross-Check Complete"
        subtitle={`Audit results for Survey No. ${property.surveyNumber}`}
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-900">
                Cross-Verification Engine Executed Successfully
              </h4>
              <p className="text-emerald-800 mt-1">
                Automated heuristic engine compared Cadastral Drone GIS, Record of Rights (RoR), SRO Deed 4129/2014, and Municipal Tax Register.
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 font-mono text-[11px]">
            <p><strong>Hash Proof:</strong> 0x79a09b...33bf81</p>
            <p><strong>Engine Confidence:</strong> 99.8% Record Concordance</p>
            <p><strong>Status:</strong> {property.verificationStatus}</p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setVerifySuccessModal(false)}
              className="px-4 py-2 rounded-xl bg-[#0f2744] text-white font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>

      {/* 2. Generated Report Preview Modal */}
      <Modal
        isOpen={reportModal}
        onClose={() => setReportModal(false)}
        title="Digital Title Certificate Generated"
        subtitle="Verifiable DPI Title Dossier (SIH26014)"
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
                <span>Issuing Seal: {generatedReport.officerSeal}</span>
                <span>Size: {generatedReport.fileSize}</span>
              </div>
            </div>

            <p className="text-slate-500 text-center text-[11px]">
              This is a Phase 1 frontend preview. PDF export will be powered by backend microservices in Phase 2.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setReportModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Downloading ${generatedReport.reportNumber}.pdf simulation.`);
                  setReportModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>Download PDF Simulation</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
