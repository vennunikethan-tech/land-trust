import { mockAuditLogs } from '../data/auditLogs';

let inMemoryAuditLogs = [...mockAuditLogs];

export const auditService = {
  getAuditLogs: async () => {
    return Promise.resolve([...inMemoryAuditLogs]);
  },

  logAction: async ({ user, role, action, property, notes, status = "Completed" }) => {
    const newEntry = {
      id: `AUDIT-2026-${Math.floor(Math.random() * 900) + 100}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + " IST",
      user: user || "Officer001",
      role: role || "Tahsildar / RDO",
      action: action || "Updated Record",
      property: property || "Survey 123/4",
      status: status,
      notes: notes || "System action logged.",
      hash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
    };

    inMemoryAuditLogs = [newEntry, ...inMemoryAuditLogs];
    return Promise.resolve(newEntry);
  },
};
