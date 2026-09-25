/**
 * Centralized Properties Mock Dataset for Land Trust (SIH26014)
 * Phase 1 Mock Data - Designed for seamless replacement with PostgreSQL/PostGIS in Phase 2
 */

export const mockProperties = [
  {
    id: "PROP-HYD-001",
    surveyNumber: "123/4",
    propertyId: "TS-RR-SER-MAD-001234",
    village: "Shamshabad",
    mandal: "Rajendranagar",
    district: "Rangareddy",
    state: "Telangana",
    area: "2.5 Acres",
    areaInSqYards: 12100,
    landType: "Farm Land",
    coordinates: "17.2750° N, 78.3750° E",
    verificationStatus: "Verified", // 'Verified' | 'Warning' | 'Issue'
    statusReason: "Simulated Demo: Cultivated farm land boundary cross-reconciled with mock drone survey.",

    // Ownership Information
    ownership: {
      ownerName: "Venkata Rao N. (Simulated Demo)",
      aadhaarHash: "XXXX-XXXX-8921",
      pattadarPassbookNo: "T192837465",
      ownershipStatus: "Sole Freehold Owner",
      rorStatus: "Mutation Completed & Active",
      relation: "S/o Subba Rao",
      acquisitionDate: "14 May 2014",
      acquisitionType: "Inheritance / Partition Deed",
    },

    // Cadastral Information
    cadastral: {
      parcelId: "CAD-2026-MAD-1234",
      boundaryStatus: "DGPS Demarcated & Georeferenced",
      recordedArea: "2.50 Acres",
      northBoundary: "Survey No. 123/3 (Panchayat Canal)",
      southBoundary: "Survey No. 123/5 (Agricultural Road)",
      eastBoundary: "Survey No. 124/1 (Private Land)",
      westBoundary: "Survey No. 122/2 (Govt Reserve Buffer)",
      surveyorAgency: "Survey of India / State Revenue Drone Wing",
      surveyDate: "12 Jan 2024",
    },

    // Registration Information
    registration: {
      sroOffice: "SRO Serilingampally",
      documentNumber: "Doc No. 4129/2014",
      registrationDate: "18 Jun 2014",
      registrationStatus: "Encumbrance Free",
      transactionStatus: "No Pending Deeds / Clear Title",
      registeredArea: "2.50 Acres",
      marketValue: "₹ 4,50,00,000",
    },

    // Tax Information
    tax: {
      taxStatus: "Paid & Up to Date",
      assessmentNumber: "TX-2025-SER-882",
      annualTax: "₹ 8,450",
      pendingDues: "₹ 0.00",
      lastPaymentDate: "10 Aug 2025",
      receiptNumber: "RCP-2025-99214",
    },

    // Restrictions & Prohibitions
    restrictions: {
      hasRestrictions: false,
      landUseRestrictions: "None (Approved under Zone R-1 Master Plan)",
      governmentRestrictions: "Non-Government / Clear Patta",
      planningRestrictions: "No Environmental / Lake Buffer encroachment (Beyond 30m FTL)",
      prohibitedListStatus: "Clear (Not in Section 22-A list)",
    },

    // Building & Zoning Information
    building: {
      permissionStatus: "Eligible for Agricultural Farm House / DTCP Sanction",
      zoneType: "Periphery Semi-Urban Agricultural Zone",
      maxPermissibleFSI: "0.50",
      setbackRequirement: "6 Meters All Sides",
    },

    // Utility & Infrastructure Information
    utilities: {
      roadAccess: "12m Blacktop Panchayat Road Connected",
      waterConnection: "Mission Bhagiratha Supply Available",
      electricityConnection: "TSSPDCL Dedicated 3-Phase Agr/Com Feeder",
      drainageStatus: "Stormwater Natural Gradient Drain",
    },

    // Verification Breakdown Checkpoints
    checkpoints: [
      { label: "Cadastral Boundary vs Drone GIS", status: "Verified", detail: "Boundaries align within 0.02m tolerance" },
      { label: "Record of Rights (RoR) vs SRO Deed", status: "Verified", detail: "Pattadar matches registered transferee" },
      { label: "Registered Area vs Cadastral Area", status: "Verified", detail: "Exact match: 2.50 Acres across both" },
      { label: "Prohibited Lands (Sec 22-A) Check", status: "Verified", detail: "No encumbrance or endowment classification" },
      { label: "Local Body Property Tax Dues", status: "Verified", detail: "Zero pending arrears for FY 2025-26" },
    ],
  },

  {
    id: "PROP-HYD-002",
    surveyNumber: "204/3",
    propertyId: "TS-RR-SER-NAN-002043",
    village: "Nanakramguda",
    mandal: "Serilingampally",
    district: "Hyderabad",
    state: "Telangana",
    area: "3.2 Acres",
    areaInSqYards: 15488,
    landType: "Mixed Use",
    coordinates: "17.4180° N, 78.3420° E",
    verificationStatus: "Warning",
    statusReason: "Simulated Demo: Area Mismatch Detected: RoR displays 2.5 Acres while Registration Deed records 3.2 Acres.",

    ownership: {
      ownerName: "K. Rajeshwar (Simulated Demo)",
      aadhaarHash: "XXXX-XXXX-4109",
      pattadarPassbookNo: "T847291039",
      ownershipStatus: "Co-parcenary Claim Pending",
      rorStatus: "Pending Area Rectification",
      relation: "S/o Chandra Reddy",
      acquisitionDate: "22 Nov 2018",
      acquisitionType: "Registered Sale Deed",
    },

    cadastral: {
      parcelId: "CAD-2026-NAN-2043",
      boundaryStatus: "Field Resurvey Requested",
      recordedArea: "2.50 Acres",
      northBoundary: "Survey No. 204/2",
      southBoundary: "Outer Ring Road Service Line",
      eastBoundary: "Survey No. 205/1",
      westBoundary: "Survey No. 203",
      surveyorAgency: "District Collectorate Survey Team",
      surveyDate: "05 Nov 2025",
    },

    registration: {
      sroOffice: "SRO Serilingampally",
      documentNumber: "Doc No. 8920/2018",
      registrationDate: "22 Nov 2018",
      registrationStatus: "Discrepancy Noted in Area",
      transactionStatus: "Sub-division verification awaited",
      registeredArea: "3.20 Acres",
      marketValue: "₹ 18,20,00,000",
    },

    tax: {
      taxStatus: "Disputed Assessment",
      assessmentNumber: "TX-2025-SER-419",
      annualTax: "₹ 42,000",
      pendingDues: "₹ 14,000",
      lastPaymentDate: "15 Mar 2024",
      receiptNumber: "RCP-2024-11840",
    },

    restrictions: {
      hasRestrictions: true,
      landUseRestrictions: "Buffer Zone along ORR Expressway (15m No-Development Corridor)",
      governmentRestrictions: "Sub-division approval pending from HMDA",
      planningRestrictions: "Height restriction due to telecom transit corridor",
      prohibitedListStatus: "Clear from Wakf/Endowments",
    },

    building: {
      permissionStatus: "Conditional Clearance Pending Field Survey",
      zoneType: "Commercial IT Corridor Buffer",
      maxPermissibleFSI: "1.25",
      setbackRequirement: "9 Meters Frontage",
    },

    utilities: {
      roadAccess: "24m Main Sector Road",
      waterConnection: "HMWSSB Water Grid Connected",
      electricityConnection: "HT 11kV Commercial Feed",
      drainageStatus: "Municipal Underground Sewerage Line",
    },

    checkpoints: [
      { label: "Cadastral Boundary vs Drone GIS", status: "Warning", detail: "Overlap of 0.70 acres with adjacent parcel" },
      { label: "Record of Rights (RoR) vs SRO Deed", status: "Warning", detail: "Area mismatch: RoR 2.50 Ac vs Reg 3.20 Ac" },
      { label: "Registered Area vs Cadastral Area", status: "Warning", detail: "Discrepancy of +0.70 Acres in Deed" },
      { label: "Prohibited Lands (Sec 22-A) Check", status: "Verified", detail: "Not on government prohibited register" },
      { label: "Local Body Property Tax Dues", status: "Warning", detail: "Pending arrears of ₹ 14,000" },
    ],
  },

  {
    id: "PROP-HYD-003",
    surveyNumber: "45/2A",
    propertyId: "TS-RR-SER-GAC-000452",
    village: "Gachibowli",
    mandal: "Serilingampally",
    district: "Hyderabad",
    state: "Telangana",
    area: "1.75 Acres",
    areaInSqYards: 8470,
    landType: "Commercial",
    coordinates: "17.4320° N, 78.3480° E",
    verificationStatus: "Verified",
    statusReason: "Simulated Demo: High-density commercial financial district IT hub title cleared.",

    ownership: {
      ownerName: "Padmavathi Infraworks (Simulated Demo Entity)",
      aadhaarHash: "Corp-GST-09AAACP4129",
      pattadarPassbookNo: "T441209845",
      ownershipStatus: "Corporate Entity Freehold",
      rorStatus: "Active & Verified",
      relation: "Rep by Director S. Srinivas",
      acquisitionDate: "11 Aug 2019",
      acquisitionType: "Auction / Direct Conveyance Deed",
    },

    cadastral: {
      parcelId: "CAD-2026-GAC-0452",
      boundaryStatus: "GPS Pegged & Geo-Fenced",
      recordedArea: "1.75 Acres",
      northBoundary: "Survey No. 45/1 (IT Campus)",
      southBoundary: "60ft Link Road",
      eastBoundary: "Survey No. 46 (Commercial Complex)",
      westBoundary: "Survey No. 44 (Green Belt)",
      surveyorAgency: "Directorate of Survey & Land Records",
      surveyDate: "19 Sep 2023",
    },

    registration: {
      sroOffice: "SRO Serilingampally",
      documentNumber: "Doc No. 1204/2019",
      registrationDate: "15 Aug 2019",
      registrationStatus: "Encumbrance Free",
      transactionStatus: "Clear Title / High Value Commercial Registered",
      registeredArea: "1.75 Acres",
      marketValue: "₹ 24,50,00,000",
    },

    tax: {
      taxStatus: "Paid & Up to Date",
      assessmentNumber: "TX-2025-SER-1092",
      annualTax: "₹ 1,12,000",
      pendingDues: "₹ 0.00",
      lastPaymentDate: "20 May 2025",
      receiptNumber: "RCP-2025-44910",
    },

    restrictions: {
      hasRestrictions: false,
      landUseRestrictions: "Designated Multi-Use / High-Rise Commercial Zone",
      governmentRestrictions: "None",
      planningRestrictions: "Fire Dept NOC & Airport Authority Height Clearance Verified",
      prohibitedListStatus: "Clear",
    },

    building: {
      permissionStatus: "Building Plan Sanctioned (G+8 Floors)",
      zoneType: "Commercial Zone C-3",
      maxPermissibleFSI: "2.50",
      setbackRequirement: "12 Meters Frontage",
    },

    utilities: {
      roadAccess: "18m 4-Lane Municipal Arterial Road",
      waterConnection: "High Capacity Industrial HMWSSB Line",
      electricityConnection: "Dedicated 33kV Substation Line",
      drainageStatus: "Heavy Commercial Storm & Sewage Outfall",
    },

    checkpoints: [
      { label: "Cadastral Boundary vs Drone GIS", status: "Verified", detail: "Exact polygon match with revenue boundaries" },
      { label: "Record of Rights (RoR) vs SRO Deed", status: "Verified", detail: "Corporate entity registered with MCA match" },
      { label: "Registered Area vs Cadastral Area", status: "Verified", detail: "1.75 Acres verified on ground" },
      { label: "Prohibited Lands (Sec 22-A) Check", status: "Verified", detail: "Not on government prohibited register" },
      { label: "Local Body Property Tax Dues", status: "Verified", detail: "All commercial dues cleared" },
    ],
  },

  {
    id: "PROP-HYD-004",
    surveyNumber: "88/1B",
    propertyId: "TS-RR-RAJ-SHA-000881",
    village: "Shamshabad",
    mandal: "Rajendranagar",
    district: "Rangareddy",
    state: "Telangana",
    area: "4.10 Acres",
    areaInSqYards: 19844,
    landType: "Agricultural",
    coordinates: "17.2580° N, 78.3980° E",
    verificationStatus: "Issue",
    statusReason: "Simulated Demo: Encroachment alert overlapping protected lake catchment buffer zone (GO 111).",

    ownership: {
      ownerName: "M. A. Qadeer (Simulated Demo)",
      aadhaarHash: "XXXX-XXXX-6612",
      pattadarPassbookNo: "T991823412",
      ownershipStatus: "Ancestral Title Disputed",
      rorStatus: "Suspended Under Environmental Review",
      relation: "S/o Late Abdul Rasheed",
      acquisitionDate: "03 Mar 2001",
      acquisitionType: "Succession Certificate",
    },

    cadastral: {
      parcelId: "CAD-2026-SHA-0881",
      boundaryStatus: "Boundary Dispute under Collector Enquiry",
      recordedArea: "4.10 Acres",
      northBoundary: "Survey No. 88/1A (Protected Water Reservoir Buffer)",
      southBoundary: "Survey No. 89 (Private Agricultural)",
      eastBoundary: "Survey No. 88/2 (Revenue Poramboke Land)",
      westBoundary: "Survey No. 87 (Panchayat Way)",
      surveyorAgency: "Irrigation & Revenue Joint Task Force",
      surveyDate: "14 Feb 2026",
    },

    registration: {
      sroOffice: "SRO Shamshabad",
      documentNumber: "Doc No. 331/2001",
      registrationDate: "10 Mar 2001",
      registrationStatus: "Restricted from Further Conveyance",
      transactionStatus: "Transaction Blocked on Portal (Section 22-A Flag)",
      registeredArea: "4.10 Acres",
      marketValue: "₹ 6,15,00,000",
    },

    tax: {
      taxStatus: "Defaulter / Under Notice",
      assessmentNumber: "TX-2025-RAJ-088",
      annualTax: "₹ 5,200",
      pendingDues: "₹ 15,600 (3 Years Arrears)",
      lastPaymentDate: "12 Apr 2022",
      receiptNumber: "RCP-2022-0091",
    },

    restrictions: {
      hasRestrictions: true,
      landUseRestrictions: "Bio-Conservation Catchment Area (GO 111 Restricted Zone)",
      governmentRestrictions: "Listed on Government 22-A Prohibited Registry (Water Body Buffer)",
      planningRestrictions: "No permanent RCC structure permitted; Heavy pollution restriction",
      prohibitedListStatus: "Flagged under Section 22-A(1)(b)",
    },

    building: {
      permissionStatus: "Strictly Prohibited for Commercial / Residential Construction",
      zoneType: "Bio-Conservation & Water Harvesting Sanctuary",
      maxPermissibleFSI: "0.00",
      setbackRequirement: "Cannot construct within 100m lake buffer",
    },

    utilities: {
      roadAccess: "Unpaved 6m Cart Track",
      waterConnection: "Agricultural Borewell Only",
      electricityConnection: "Temporary Low Tension Line",
      drainageStatus: "Natural Water Inundation Zone",
    },

    checkpoints: [
      { label: "Cadastral Boundary vs Drone GIS", status: "Issue", detail: "1.2 Acres overlaps with Himayat Sagar Full Tank Level (FTL)" },
      { label: "Record of Rights (RoR) vs SRO Deed", status: "Warning", detail: "Succession certificate under judicial contest" },
      { label: "Registered Area vs Cadastral Area", status: "Verified", detail: "Paper area matches survey sheet" },
      { label: "Prohibited Lands (Sec 22-A) Check", status: "Issue", detail: "Active prohibitory order by District Collector" },
      { label: "Local Body Property Tax Dues", status: "Warning", detail: "3 years pending dues" },
    ],
  },

  {
    id: "PROP-HYD-005",
    surveyNumber: "156/A",
    propertyId: "TS-RR-SER-KON-000156",
    village: "Kondapur",
    mandal: "Serilingampally",
    district: "Hyderabad",
    state: "Telangana",
    area: "0.85 Acres",
    areaInSqYards: 4114,
    landType: "Residential",
    coordinates: "17.4680° N, 78.3580° E",
    verificationStatus: "Verified",
    statusReason: "Simulated Demo: Fully regularized residential plot layout with GHMC & RERA clearances.",

    ownership: {
      ownerName: "Ananya Sharma & Co. (Simulated Demo)",
      aadhaarHash: "XXXX-XXXX-3341",
      pattadarPassbookNo: "T771239081",
      ownershipStatus: "Joint Ownership Freehold",
      rorStatus: "Clear & Digitally Signed",
      relation: "W/o & S/o D.K. Sharma",
      acquisitionDate: "19 Dec 2021",
      acquisitionType: "Tripartite Registered Conveyance",
    },

    cadastral: {
      parcelId: "CAD-2026-KON-0156",
      boundaryStatus: "Survey Completed & Boundary Stones Fixed",
      recordedArea: "0.85 Acres",
      northBoundary: "Survey No. 156/B (Residential Colony)",
      southBoundary: "GHMC 40ft Master Plan Road",
      eastBoundary: "Survey No. 157 (Park Reserve)",
      westBoundary: "Survey No. 155 (Gated Community)",
      surveyorAgency: "GHMC Town Planning & Survey Branch",
      surveyDate: "28 Feb 2024",
    },

    registration: {
      sroOffice: "SRO Serilingampally",
      documentNumber: "Doc No. 7842/2021",
      registrationDate: "22 Dec 2021",
      registrationStatus: "Encumbrance Free",
      transactionStatus: "Clean Title Verified",
      registeredArea: "0.85 Acres",
      marketValue: "₹ 11,00,00,000",
    },

    tax: {
      taxStatus: "Paid & Up to Date",
      assessmentNumber: "TX-2025-GHMC-559",
      annualTax: "₹ 28,000",
      pendingDues: "₹ 0.00",
      lastPaymentDate: "05 Jul 2025",
      receiptNumber: "RCP-2025-78192",
    },

    restrictions: {
      hasRestrictions: false,
      landUseRestrictions: "Residential Zone R-2",
      governmentRestrictions: "None",
      planningRestrictions: "GHMC approved layout with statutory 10% open space gift deeded",
      prohibitedListStatus: "Clear",
    },

    building: {
      permissionStatus: "Approved for Stilt + 5 Residential Villa/Apartments",
      zoneType: "Urban Residential R-2",
      maxPermissibleFSI: "1.75",
      setbackRequirement: "4.5 Meters All Around",
    },

    utilities: {
      roadAccess: "12m Wide Paver & Asphalt Municipal Road",
      waterConnection: "24x7 HMWSSB Potable Water Connection",
      electricityConnection: "Underground Cabling 415V Grid",
      drainageStatus: "Connected to GHMC Trunk Drain",
    },

    checkpoints: [
      { label: "Cadastral Boundary vs Drone GIS", status: "Verified", detail: "Boundary pillars match satellite georeferencing" },
      { label: "Record of Rights (RoR) vs SRO Deed", status: "Verified", detail: "Joint owners match registered transfer" },
      { label: "Registered Area vs Cadastral Area", status: "Verified", detail: "0.85 Acres exactly reconciles" },
      { label: "Prohibited Lands (Sec 22-A) Check", status: "Verified", detail: "No restrictive entries" },
      { label: "Local Body Property Tax Dues", status: "Verified", detail: "Current financial year paid" },
    ],
  },

  {
    id: "PROP-HYD-006",
    surveyNumber: "310/2",
    propertyId: "TS-RR-RAJ-BUD-000310",
    village: "Budvel",
    mandal: "Rajendranagar",
    district: "Rangareddy",
    state: "Telangana",
    area: "5.00 Acres",
    areaInSqYards: 24200,
    landType: "Institutional / Public Utility",
    coordinates: "17.3210° N, 78.4110° E",
    verificationStatus: "Verified",
    statusReason: "Simulated Demo: State educational & public reserve in Budvel knowledge corridor.",

    ownership: {
      ownerName: "State Infrastructure Reserve (Simulated Demo)",
      aadhaarHash: "GOVT-DEP-TSIC-001",
      pattadarPassbookNo: "TG-GOVT-0992",
      ownershipStatus: "Government Vested Land",
      rorStatus: "Recorded in Government Land Register",
      relation: "Department of Revenue & Industries",
      acquisitionDate: "10 Oct 2005",
      acquisitionType: "Land Acquisition Act Award",
    },

    cadastral: {
      parcelId: "CAD-2026-BUD-0310",
      boundaryStatus: "Geomapped & Cement Boundaried",
      recordedArea: "5.00 Acres",
      northBoundary: "Survey No. 310/1 (Railway Line)",
      southBoundary: "National Highway Bypass",
      eastBoundary: "Survey No. 311 (Forest Reserve)",
      westBoundary: "Survey No. 309 (Public Substation)",
      surveyorAgency: "Revenue Divisional Surveyor",
      surveyDate: "02 Mar 2025",
    },

    registration: {
      sroOffice: "SRO Rajendranagar",
      documentNumber: "Gazette Notif. 44/2005",
      registrationDate: "14 Nov 2005",
      registrationStatus: "Government Gazette Enrolled",
      transactionStatus: "Non-Transferable Public Reserve",
      registeredArea: "5.00 Acres",
      marketValue: "₹ 35,00,00,000",
    },

    tax: {
      taxStatus: "Exempt (Government Public Facility)",
      assessmentNumber: "TX-GOVT-BUD-01",
      annualTax: "₹ 0.00",
      pendingDues: "₹ 0.00",
      lastPaymentDate: "N/A",
      receiptNumber: "EXEMPT-CERT-2025",
    },

    restrictions: {
      hasRestrictions: true,
      landUseRestrictions: "Institutional / Public Infrastructure Use Only",
      governmentRestrictions: "Absolute Government Land (Section 22-A 1(a))",
      planningRestrictions: "Cannot be alienated or mortgaged to private lenders",
      prohibitedListStatus: "Enlisted as Protected Public Infrastructure",
    },

    building: {
      permissionStatus: "Special Project Clearance Accorded",
      zoneType: "Public & Semi-Public Institutional Zone",
      maxPermissibleFSI: "2.00",
      setbackRequirement: "15 Meters Frontage",
    },

    utilities: {
      roadAccess: "30m NH Connectivity",
      waterConnection: "Industrial Bulk Supply Line",
      electricityConnection: "33kV Grid Feeder Dedicated",
      drainageStatus: "Engineered Storm & Treatment System",
    },

    checkpoints: [
      { label: "Cadastral Boundary vs Drone GIS", status: "Verified", detail: "Full perimeter validated via CORS network" },
      { label: "Record of Rights (RoR) vs SRO Deed", status: "Verified", detail: "Gazette notification title established" },
      { label: "Registered Area vs Cadastral Area", status: "Verified", detail: "Exact 5.00 Acres" },
      { label: "Prohibited Lands (Sec 22-A) Check", status: "Verified", detail: "Correctly classified under Section 22-A(1)(a)" },
      { label: "Local Body Property Tax Dues", status: "Verified", detail: "Statutorily exempt" },
    ],
  },

  {
    id: "PROP-HYD-007",
    surveyNumber: "92/1",
    propertyId: "TS-RR-SER-GAC-000921",
    village: "Gandipet",
    mandal: "Gandipet",
    district: "Rangareddy",
    state: "Telangana",
    area: "1.20 Acres",
    areaInSqYards: 5808,
    landType: "Agricultural",
    coordinates: "17.3650° N, 78.3200° E",
    verificationStatus: "Pending",
    statusReason: "Simulated Demo: Semi-rural agricultural holding; field verification audit in queue.",

    ownership: {
      ownerName: "B. Venkatesham (Simulated Demo)",
      aadhaarHash: "XXXX-XXXX-1934",
      pattadarPassbookNo: "T928374102",
      ownershipStatus: "Pattadar Title Holder",
      rorStatus: "Mutation Under Scrutiny",
      relation: "S/o B. Narsimha",
      acquisitionDate: "15 Apr 2017",
      acquisitionType: "Ancestral Succession",
    },

    cadastral: {
      parcelId: "CAD-2026-GAC-0921",
      boundaryStatus: "Boundaries Demarcated",
      recordedArea: "1.20 Acres",
      northBoundary: "Survey No. 92/2",
      southBoundary: "Survey No. 123/4",
      eastBoundary: "Survey No. 93",
      westBoundary: "Survey No. 91",
      surveyorAgency: "Mandal Surveyor Office",
      surveyDate: "10 Mar 2024",
    },

    registration: {
      sroOffice: "SRO Serilingampally",
      documentNumber: "Doc No. 2210/2017",
      registrationDate: "20 Apr 2017",
      registrationStatus: "Encumbrance Free",
      transactionStatus: "Clear Title / Verification Underway",
      registeredArea: "1.20 Acres",
      marketValue: "₹ 4,80,00,000",
    },

    tax: {
      taxStatus: "Pending Verification",
      assessmentNumber: "TX-2025-GHMC-921",
      annualTax: "₹ 4,800",
      pendingDues: "₹ 4,800",
      lastPaymentDate: "14 Feb 2024",
      receiptNumber: "RCP-2024-55102",
    },

    restrictions: {
      hasRestrictions: false,
      landUseRestrictions: "Peri-Urban Agricultural Zone",
      governmentRestrictions: "None",
      planningRestrictions: "No buffer violations",
      prohibitedListStatus: "Clear",
    },

    building: {
      permissionStatus: "Farmhouse DTCP Eligible",
      zoneType: "Agricultural Zone A-1",
      maxPermissibleFSI: "0.50",
      setbackRequirement: "6 Meters Frontage",
    },

    utilities: {
      roadAccess: "12m Panchayat Bitumen Road",
      waterConnection: "Ground Water Borewell Available",
      electricityConnection: "3-Phase Agricultural Grid",
      drainageStatus: "Natural Outfall Drain",
    },

    checkpoints: [
      { label: "Cadastral Boundary vs Drone GIS", status: "Verified", detail: "Boundaries match revenue map" },
      { label: "Record of Rights (RoR) vs SRO Deed", status: "Verified", detail: "Transferee name matches" },
      { label: "Registered Area vs Cadastral Area", status: "Verified", detail: "1.20 Acres consistent" },
      { label: "Prohibited Lands (Sec 22-A) Check", status: "Verified", detail: "Clear of restrictions" },
      { label: "Local Body Property Tax Dues", status: "Pending", detail: "Awaiting local body electronic receipt" },
    ],
  },

  {
    id: "PROP-HYD-008",
    surveyNumber: "101/A",
    propertyId: "TS-RR-SER-MAD-001011",
    village: "Madhapur",
    mandal: "Serilingampally",
    district: "Hyderabad",
    state: "Telangana",
    area: "2.10 Acres",
    areaInSqYards: 10164,
    landType: "Residential",
    coordinates: "17.4420° N, 78.3960° E",
    verificationStatus: "Verified",
    statusReason: "Simulated Demo: Low-rise residential enclave near Durgam Cheruvu lake periphery.",

    ownership: {
      ownerName: "S. Mohan Rao (Simulated Demo)",
      aadhaarHash: "XXXX-XXXX-9102",
      pattadarPassbookNo: "T101928374",
      ownershipStatus: "Sole Freehold Owner",
      rorStatus: "Mutation Completed & Active",
      relation: "S/o S. Narayana",
      acquisitionDate: "05 Jun 2016",
      acquisitionType: "Registered Sale Deed",
    },

    cadastral: {
      parcelId: "CAD-2026-MAD-0101",
      boundaryStatus: "DGPS Georeferenced",
      recordedArea: "2.10 Acres",
      northBoundary: "Survey No. 100",
      southBoundary: "Survey No. 204/3",
      eastBoundary: "Survey No. 102/B",
      westBoundary: "Survey No. 92/1",
      surveyorAgency: "Revenue Divisional Surveyor",
      surveyDate: "18 Aug 2024",
    },

    registration: {
      sroOffice: "SRO Serilingampally",
      documentNumber: "Doc No. 4410/2016",
      registrationDate: "10 Jun 2016",
      registrationStatus: "Encumbrance Free",
      transactionStatus: "Clear Title / Certificate Issued",
      registeredArea: "2.10 Acres",
      marketValue: "₹ 16,80,00,000",
    },

    tax: {
      taxStatus: "Paid & Up to Date",
      assessmentNumber: "TX-2025-GHMC-101",
      annualTax: "₹ 18,500",
      pendingDues: "₹ 0.00",
      lastPaymentDate: "15 May 2025",
      receiptNumber: "RCP-2025-10192",
    },

    restrictions: {
      hasRestrictions: false,
      landUseRestrictions: "Residential Zone R-1",
      governmentRestrictions: "None",
      planningRestrictions: "No buffer overlap",
      prohibitedListStatus: "Clear",
    },

    building: {
      permissionStatus: "HMDA Layout Sanctioned",
      zoneType: "Residential Urban R-1",
      maxPermissibleFSI: "1.50",
      setbackRequirement: "6 Meters All Around",
    },

    utilities: {
      roadAccess: "18m Sector Master Plan Road",
      waterConnection: "HMWSSB Water Grid Active",
      electricityConnection: "TSSPDCL Dedicated Transformer",
      drainageStatus: "Connected to Municipal Sewer",
    },

    checkpoints: [
      { label: "Cadastral Boundary vs Drone GIS", status: "Verified", detail: "Boundaries align within 0.01m" },
      { label: "Record of Rights (RoR) vs SRO Deed", status: "Verified", detail: "100% Concordant" },
      { label: "Registered Area vs Cadastral Area", status: "Verified", detail: "2.10 Acres exactly matches" },
      { label: "Prohibited Lands (Sec 22-A) Check", status: "Verified", detail: "No encumbrance found" },
      { label: "Local Body Property Tax Dues", status: "Verified", detail: "Cleared for current fiscal" },
    ],
  },

  {
    id: "PROP-HYD-009",
    surveyNumber: "102/B",
    propertyId: "TS-RR-SER-MAD-001022",
    village: "Madhapur",
    mandal: "Serilingampally",
    district: "Hyderabad",
    state: "Telangana",
    area: "1.45 Acres",
    areaInSqYards: 7018,
    landType: "Commercial",
    coordinates: "17.4510° N, 78.3830° E",
    verificationStatus: "Warning",
    statusReason: "Simulated Demo: Commercial IT corridor sector; subdivision demarcation pending.",

    ownership: {
      ownerName: "V. Lakshmi Prasanna (Simulated Demo)",
      aadhaarHash: "XXXX-XXXX-4581",
      pattadarPassbookNo: "T102837491",
      ownershipStatus: "Co-Owner Title",
      rorStatus: "Pending Subdivision Record",
      relation: "D/o V. Ramaiah",
      acquisitionDate: "12 Oct 2020",
      acquisitionType: "Gift Settlement Deed",
    },

    cadastral: {
      parcelId: "CAD-2026-MAD-0102",
      boundaryStatus: "Resurvey Scheduled",
      recordedArea: "1.45 Acres",
      northBoundary: "Survey No. 99",
      southBoundary: "Survey No. 88/1B",
      eastBoundary: "Lake Buffer Boundary",
      westBoundary: "Survey No. 101/A",
      surveyorAgency: "District Surveyor Team",
      surveyDate: "20 Jan 2025",
    },

    registration: {
      sroOffice: "SRO Serilingampally",
      documentNumber: "Doc No. 7102/2020",
      registrationDate: "15 Oct 2020",
      registrationStatus: "Encumbrance Free",
      transactionStatus: "Subdivision Notice Emitted",
      registeredArea: "1.45 Acres",
      marketValue: "₹ 11,60,00,000",
    },

    tax: {
      taxStatus: "Paid & Up to Date",
      assessmentNumber: "TX-2025-GHMC-102",
      annualTax: "₹ 14,200",
      pendingDues: "₹ 0.00",
      lastPaymentDate: "11 Aug 2025",
      receiptNumber: "RCP-2025-10244",
    },

    restrictions: {
      hasRestrictions: false,
      landUseRestrictions: "Commercial Mixed Zone",
      governmentRestrictions: "None",
      planningRestrictions: "Buffer demarcation required",
      prohibitedListStatus: "Clear",
    },

    building: {
      permissionStatus: "Awaiting Joint Boundary Verification",
      zoneType: "Commercial Zone C-2",
      maxPermissibleFSI: "1.75",
      setbackRequirement: "9 Meters Frontage",
    },

    utilities: {
      roadAccess: "15m Municipal Road",
      waterConnection: "HMWSSB Water Grid",
      electricityConnection: "Commercial 3-Phase",
      drainageStatus: "Municipal Sewer Connection",
    },

    checkpoints: [
      { label: "Cadastral Boundary vs Drone GIS", status: "Warning", detail: "Subdivision sketch needs alignment" },
      { label: "Record of Rights (RoR) vs SRO Deed", status: "Verified", detail: "Title documents match" },
      { label: "Registered Area vs Cadastral Area", status: "Verified", detail: "1.45 Acres confirmed" },
      { label: "Prohibited Lands (Sec 22-A) Check", status: "Verified", detail: "No restrictive orders" },
      { label: "Local Body Property Tax Dues", status: "Verified", detail: "Zero pending arrears" },
    ],
  },

  {
    id: "PROP-HYD-010",
    surveyNumber: "103/C",
    propertyId: "TS-RR-SER-MAD-001033",
    village: "Budvel",
    mandal: "Rajendranagar",
    district: "Rangareddy",
    state: "Telangana",
    area: "3.00 Acres",
    areaInSqYards: 14520,
    landType: "Farm Land",
    coordinates: "17.3080° N, 78.3920° E",
    verificationStatus: "Pending",
    statusReason: "Simulated Demo: Southern agricultural farm land parcel; DGPS baseline submission in progress.",

    ownership: {
      ownerName: "P. Raghunath Yadav (Simulated Demo)",
      aadhaarHash: "XXXX-XXXX-8820",
      pattadarPassbookNo: "T103728194",
      ownershipStatus: "Pattadar Title Holder",
      rorStatus: "Under Digital Verification",
      relation: "S/o P. Mallaiah",
      acquisitionDate: "18 Aug 2012",
      acquisitionType: "Ancestral Partition",
    },

    cadastral: {
      parcelId: "CAD-2026-MAD-0103",
      boundaryStatus: "Drone Survey Field Capture Complete",
      recordedArea: "3.00 Acres",
      northBoundary: "Survey No. 90",
      southBoundary: "Survey No. 45/2A",
      eastBoundary: "Survey No. 123/4",
      westBoundary: "Survey No. 104",
      surveyorAgency: "State Drone Survey Cell",
      surveyDate: "14 Feb 2026",
    },

    registration: {
      sroOffice: "SRO Serilingampally",
      documentNumber: "Doc No. 5103/2012",
      registrationDate: "22 Aug 2012",
      registrationStatus: "Encumbrance Free",
      transactionStatus: "Digital Verification in Queue",
      registeredArea: "3.00 Acres",
      marketValue: "₹ 12,00,00,000",
    },

    tax: {
      taxStatus: "Paid",
      assessmentNumber: "TX-2025-GHMC-103",
      annualTax: "₹ 6,500",
      pendingDues: "₹ 0.00",
      lastPaymentDate: "02 Jun 2025",
      receiptNumber: "RCP-2025-10381",
    },

    restrictions: {
      hasRestrictions: false,
      landUseRestrictions: "Agricultural Periphery Zone",
      governmentRestrictions: "None",
      planningRestrictions: "Standard agricultural setbacks",
      prohibitedListStatus: "Clear",
    },

    building: {
      permissionStatus: "Farmhouse Sanction Eligible",
      zoneType: "Agricultural Reserve",
      maxPermissibleFSI: "0.50",
      setbackRequirement: "6 Meters All Sides",
    },

    utilities: {
      roadAccess: "12m Panchayat Bitumen Road",
      waterConnection: "Agricultural Canal & Borewell",
      electricityConnection: "Agricultural Feeder Connected",
      drainageStatus: "Natural Outfall Drain",
    },

    checkpoints: [
      { label: "Cadastral Boundary vs Drone GIS", status: "Pending", detail: "DGPS baseline awaiting final officer signoff" },
      { label: "Record of Rights (RoR) vs SRO Deed", status: "Verified", detail: "Transferee and RoR match" },
      { label: "Registered Area vs Cadastral Area", status: "Verified", detail: "3.00 Acres reconciled" },
      { label: "Prohibited Lands (Sec 22-A) Check", status: "Verified", detail: "Clean patta" },
      { label: "Local Body Property Tax Dues", status: "Verified", detail: "Tax paid" },
    ],
  }
];

export const districtList = ["Hyderabad", "Rangareddy", "Medchal-Malkajgiri", "Sangareddy"];
export const mandalList = ["Serilingampally", "Rajendranagar", "Gandipet", "Kukatpally"];
export const villageList = ["Madhapur", "Nanakramguda", "Gachibowli", "Shamshabad", "Kondapur", "Budvel", "Gandipet"];
