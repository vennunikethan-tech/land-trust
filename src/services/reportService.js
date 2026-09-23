import { mockReports } from '../data/reports';

let inMemoryReports = [...mockReports];

export const reportService = {
  getReports: async () => {
    return Promise.resolve([...inMemoryReports]);
  },

  generateReport: async (propertyData) => {
    const newReport = {
      id: `REP-2026-0${Math.floor(Math.random() * 900) + 100}`,
      reportNumber: `LT-DPI-REP-0${Math.floor(Math.random() * 900) + 100}`,
      surveyNumber: propertyData?.surveyNumber || "123/4",
      propertyId: propertyData?.id || "PROP-HYD-001",
      property: `Survey ${propertyData?.surveyNumber || '123/4'}, ${propertyData?.village || 'Madhapur'}, ${propertyData?.district || 'Hyderabad'}`,
      village: propertyData?.village || "Madhapur",
      district: propertyData?.district || "Hyderabad",
      generatedDate: "Just now",
      status: "Verified & Digitally Sealed",
      fileSize: "2.5 MB",
      verificationScore: "100%",
      summary: "Freshly generated Integrated 5-Register Cadastral & Title Clearance Certificate.",
      officerSeal: "Digital Public Infrastructure Automated Engine",
    };

    inMemoryReports = [newReport, ...inMemoryReports];
    return Promise.resolve(newReport);
  },
};
