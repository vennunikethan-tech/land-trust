import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Clock, ShieldAlert, Info } from 'lucide-react';

export default function StatusBadge({ status, size = 'md', className = '' }) {
  const norm = (status || '').toLowerCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let Icon = Info;
  let label = status;

  if (norm.includes('verif') || norm === 'success' || norm === 'passed' || norm === 'completed') {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    Icon = CheckCircle2;
    label = status || 'Verified';
  } else if (norm.includes('warn') || norm.includes('mismatch') || norm.includes('flag')) {
    styles = 'bg-amber-50 text-amber-700 border-amber-200';
    Icon = AlertTriangle;
    label = status || 'Warning';
  } else if (norm.includes('issue') || norm.includes('critical') || norm.includes('prohibit') || norm.includes('encroach')) {
    styles = 'bg-red-50 text-red-700 border-red-200';
    Icon = XCircle;
    label = status || 'Issue';
  } else if (norm.includes('pend') || norm.includes('review') || norm.includes('progress')) {
    styles = 'bg-blue-50 text-blue-700 border-blue-200';
    Icon = Clock;
    label = status || 'Pending';
  }

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs' 
    : size === 'lg' 
      ? 'px-3.5 py-1.5 text-sm font-semibold' 
      : 'px-2.5 py-1 text-xs font-medium';

  const iconSizes = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm ${styles} ${sizeClasses} ${className}`}>
      <Icon size={iconSizes} className="shrink-0" />
      <span>{label}</span>
    </span>
  );
}
