/**
 * Venture Pulse AI - Comprehensive Financial & Diligence Mock Dataset
 * Built for offline resilience & hackathon testing
 */

export const MOCK_STARTUPS = [
  {
    id: "startup-104",
    codeName: "Startup #104",
    realName: "KrishiGrid AI",
    sector: "AgriTech & Climate SaaS",
    hubType: "Tier-3 Hub, AgriTech",
    city: "Jabalpur, Madhya Pradesh",
    foundedYear: 2024,
    stage: "Pre-Series A",
    askingRound: "₹1.00 Cr ($120k)",
    trustLevel: "registered", // 'self_reported' | 'registered' | 'verified'
    trustDetails: {
      type: "Registered - MSME/DPIIT",
      certNumber: "DPIIT-IND-2024-88492",
      verificationSource: "MCA & DPIIT Startup India Portal API",
      verifiedOn: "14 Jan 2026",
      ladderLevel: 2,
    },
    founders: [
      {
        realName: "Aarav Sharma",
        blindName: "Founder Alpha",
        role: "CEO & Co-founder",
        realPedigree: "IIT Roorkee, B.Tech '21",
        blindPedigree: "Tier-1 Technical Institute (Masked)",
        experience: "3 yrs IoT System Architecture",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      {
        realName: "Priyanka Patel",
        blindName: "Founder Beta",
        role: "CTO & Co-founder",
        realPedigree: "BITS Pilani, M.Sc '22",
        blindPedigree: "Tier-1 Engineering Institute (Masked)",
        experience: "4 yrs Embedded ML & Edge AI",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
      }
    ],
    meritocracyScore: 84,
    scoreBreakdown: {
      growth: { score: 86, label: "Traction & MoM Velocity", weight: "25%", detail: "24.2% MoM real ARR growth across 48 rural cooperative clients." },
      efficiency: { score: 88, label: "Capital Efficiency", weight: "25%", detail: "Burn multiple of 1.15x. Magic number 0.92 indicating high spend ROI." },
      runway: { score: 79, label: "Runway & Buffer", weight: "20%", detail: "12.1 months base runway at current net burn rate." },
      discipline: { score: 85, label: "Expense Discipline", weight: "15%", detail: "Low OPEX leakage, server costs managed via spot edge nodes." },
      claimConsistency: { score: 82, label: "Claim Consistency Index", weight: "15%", detail: "Minor amber variance on ARR definitions; unit economics match bank flows." }
    },
    financials: {
      currentCashReserve: 7500000, // ₹75 Lakhs
      monthlyBurnBase: 620000,    // ₹6.2 Lakhs
      currentMrr: 480000,         // ₹4.8 Lakhs
      isPreRevenue: false,
      grossMargin: 68.4,
      payingCustomers: 48,
      cac: 2350,
      ltv: 11400,
      avgTechSalary: 180000,      // ₹1.8L / month per tech hire
    },
    claims: [
      {
        id: "c1",
        category: "Revenue Growth",
        pitchClaim: "ARR is ₹66 Lakhs growing at 35% Month-over-Month",
        claimedValue: "₹66L ARR / +35% MoM",
        ledgerValue: "₹57.6L ARR / +24.2% MoM",
        severity: "amber",
        delta: "-10.8% Variance",
        ledgerSource: "Razorpay / Bank Feed Ledger",
        explanation: "Pitch includes anticipated renewals and verbally confirmed pipeline deals not yet settled in ledger.",
        auditedPeriod: "Q3 2025 - Q4 2025"
      },
      {
        id: "c2",
        category: "Customer Acquisition",
        pitchClaim: "Blended CAC sits ultra-low at ₹1,800 with 4-month payback",
        claimedValue: "₹1,800 CAC",
        ledgerValue: "₹2,350 CAC",
        severity: "amber",
        delta: "+30.5% Higher",
        ledgerSource: "Meta/Google Ads + Field Agent Commissions Ledger",
        explanation: "Pitch omitted traveling agent field-rep stipends from the direct acquisition denominator.",
        auditedPeriod: "Last 6 Months"
      },
      {
        id: "c3",
        category: "Gross Margin",
        pitchClaim: "Pure software economics with 78% Gross Margin",
        claimedValue: "78.0% GM",
        ledgerValue: "68.4% GM",
        severity: "amber",
        delta: "-9.6% Discrepancy",
        ledgerSource: "AWS IoT + Cellular SIM Gateway Invoices",
        explanation: "Cellular telemetry SIM connectivity cost for field sensors was accounted under G&A rather than COGS.",
        auditedPeriod: "TTM Ledger"
      },
      {
        id: "c4",
        category: "Customer Retention",
        pitchClaim: "94% Annualized Logo Retention across farm clusters",
        claimedValue: "94.0% Retention",
        ledgerValue: "93.1% Retention",
        severity: "green",
        delta: "Verified (~0.9% match)",
        ledgerSource: "CRM Subscription Event Logs",
        explanation: "High switching cost and seasonal contract lock-in validate retention claim accurately.",
        auditedPeriod: "Past 12 Months"
      }
    ],
    tranches: [
      {
        step: 1,
        title: "Tranche 1: Upfront Deployment",
        allocation: "40%",
        amount: "₹40,00,000",
        milestone: "Hardware tooling & base core sensor production",
        condition: "Execution of SHA & Founder IP transfer",
        status: "released",
        releaseDate: "Nov 2025",
        evidence: "Disbursed to Escrow Node #01"
      },
      {
        step: 2,
        title: "Tranche 2: Traction Hurdle",
        allocation: "30%",
        amount: "₹30,00,000",
        milestone: "Achieve ₹5,00,000 Monthly Recurring Revenue (MRR)",
        condition: "Consecutive 60-day verified ledger receipt",
        status: "in_progress",
        currentProgress: 96,
        currentMetric: "₹4.80L / ₹5.00L MRR achieved",
        releaseDate: "Projected Q1 2026",
        evidence: "Automated Razorpay Webhook Monitor Active"
      },
      {
        step: 3,
        title: "Tranche 3: Unit Economics Expansion",
        allocation: "30%",
        amount: "₹30,00,000",
        milestone: "Achieve >85% Net Retention & CAC < ₹2,200",
        condition: "Third-party cohort audit & zero revenue reversal",
        status: "locked",
        currentProgress: 68,
        currentMetric: "Net Retention: 81.2% | CAC: ₹2,350",
        releaseDate: "Target Q3 2026",
        evidence: "Audited Ledger Lockbox"
      }
    ]
  },
  {
    id: "startup-218",
    codeName: "Startup #218",
    realName: "CashMatrix Protocol",
    sector: "Fintech & Embedded Credit",
    hubType: "Tier-2 Hub, B2B Fintech",
    city: "Jaipur, Rajasthan",
    foundedYear: 2024,
    stage: "Seed",
    askingRound: "₹1.50 Cr ($180k)",
    trustLevel: "self_reported", // Self-reported warning!
    trustDetails: {
      type: "Self-Reported",
      certNumber: "UNVERIFIED-SELF-ENTRY",
      verificationSource: "Manual founder CSV upload (No API link)",
      verifiedOn: "Unverified",
      ladderLevel: 1,
    },
    founders: [
      {
        realName: "Devansh Singhania",
        blindName: "Founder Delta",
        role: "CEO",
        realPedigree: "Stanford Graduate School (Dropout)",
        blindPedigree: "Global Elite University (Masked)",
        experience: "2 yrs Neo-banking PM",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
      },
      {
        realName: "Kunal Mehra",
        blindName: "Founder Gamma",
        role: "Head of Growth",
        realPedigree: "IIM Ahmedabad '20",
        blindPedigree: "Tier-1 Management School (Masked)",
        experience: "Ex-Fintech Growth Lead",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
      }
    ],
    meritocracyScore: 58,
    scoreBreakdown: {
      growth: { score: 72, label: "Traction & MoM Velocity", weight: "25%", detail: "Rapid GMV numbers, but revenue recognition includes gross disbursement." },
      efficiency: { score: 44, label: "Capital Efficiency", weight: "25%", detail: "Alarming burn multiple of 3.4x. Heavy subsidy discounting driving volume." },
      runway: { score: 48, label: "Runway & Buffer", weight: "20%", detail: "Only 4.8 months runway remaining at current actual burn." },
      discipline: { score: 52, label: "Expense Discipline", weight: "15%", detail: "High marketing overhead with questionable attribution." },
      claimConsistency: { score: 40, label: "Claim Consistency Index", weight: "15%", detail: "Critical red discrepancy detected: Deck claims burn of ₹6.5L vs actual ledger of ₹13.8L." }
    },
    financials: {
      currentCashReserve: 6600000, // ₹66 Lakhs
      monthlyBurnBase: 1380000,   // ₹13.8 Lakhs (Deck claimed 6.5L!)
      currentMrr: 320000,         // ₹3.2 Lakhs
      isPreRevenue: false,
      grossMargin: 38.2,          // Deck claimed 72%!
      payingCustomers: 310,
      cac: 4800,
      ltv: 6200,
      avgTechSalary: 210000,
    },
    claims: [
      {
        id: "c201",
        category: "Burn Rate",
        pitchClaim: "Controlled monthly net burn of ₹6.5 Lakhs",
        claimedValue: "₹6.5L / month",
        ledgerValue: "₹13.8L / month",
        severity: "red",
        delta: "+112% Unexplained Over-burn",
        ledgerSource: "HDFC Current Account Outflows",
        explanation: "Pitch deck excluded deferred vendor payouts, digital ad debt, and consultant retainer packages.",
        auditedPeriod: "Last 90 Days"
      },
      {
        id: "c202",
        category: "Gross Margin",
        pitchClaim: "High-margin SaaS take-rate at 72% Gross Margin",
        claimedValue: "72.0% GM",
        ledgerValue: "38.2% GM",
        severity: "red",
        delta: "-46.9% Deep Deficit",
        ledgerSource: "Payment Gateway Interchange + KYC APIs",
        explanation: "Deck calculated revenue as gross processing fee without deducting mandatory NBFC partner risk reserves.",
        auditedPeriod: "H2 2025"
      },
      {
        id: "c203",
        category: "ARR Velocity",
        pitchClaim: "₹85L Annualized Run-Rate",
        claimedValue: "₹85L ARR",
        ledgerValue: "₹38.4L ARR",
        severity: "red",
        delta: "-54.8% Gap",
        ledgerSource: "Bank Settlement Inflows",
        explanation: "Founder counted one-time non-recurring setup fees as recurring annualized software licenses.",
        auditedPeriod: "Current Quarter"
      },
      {
        id: "c204",
        category: "LTV/CAC Ratio",
        pitchClaim: "Strong 4.2x LTV to CAC flywheel",
        claimedValue: "4.2x LTV/CAC",
        ledgerValue: "1.29x LTV/CAC",
        severity: "amber",
        delta: "High Risk Multiple",
        ledgerSource: "Calculated from Ledger Churn & Blended Ad Spend",
        explanation: "High user drop-off after promo incentive period dampens actual realized lifetime value.",
        auditedPeriod: "Cohort 2025"
      }
    ],
    tranches: [
      {
        step: 1,
        title: "Tranche 1: Initial Deployment",
        allocation: "35%",
        amount: "₹52,50,000",
        milestone: "Lending partner API integration & base compliance",
        condition: "Escrow release condition",
        status: "released",
        releaseDate: "Oct 2025",
        evidence: "Disbursed"
      },
      {
        step: 2,
        title: "Tranche 2: Efficiency Gate",
        allocation: "35%",
        amount: "₹52,50,000",
        milestone: "Reduce burn multiple below 1.8x & achieve ₹6L MRR",
        condition: "Strict third-party ledger audit",
        status: "locked",
        currentProgress: 24,
        currentMetric: "Current Burn Multiple: 3.4x (Threshold: <1.8x)",
        releaseDate: "HOLD - Red Flag Discrepancies",
        evidence: "Escrow Blocked by Claim Check Rules"
      },
      {
        step: 3,
        title: "Tranche 3: Scale Gate",
        allocation: "30%",
        amount: "₹45,00,000",
        milestone: "Profitable unit economics & 15% contribution margin",
        condition: "Full statutory verification",
        status: "locked",
        currentProgress: 10,
        currentMetric: "Contribution margin: -12%",
        releaseDate: "Pending Tranche 2 Unlock",
        evidence: "Escrow Pending"
      }
    ]
  },
  {
    id: "startup-309",
    codeName: "Startup #309",
    realName: "BioLogix ColdChain",
    sector: "DeepTech / Supply Chain Diagnostics",
    hubType: "Tier-2 Hub, LifeSciences",
    city: "Kochi, Kerala",
    foundedYear: 2023,
    stage: "Series Seed+",
    askingRound: "₹2.00 Cr ($240k)",
    trustLevel: "verified", // Highest level!
    trustDetails: {
      type: "Verified - AA Sandbox Roadmap",
      certNumber: "AA-FIN-RBI-SANDBOX-7104",
      verificationSource: "Account Aggregator Live Consent + GSTN & Bank API Feeds",
      verifiedOn: "08 Oct 2026 (Live Synced)",
      ladderLevel: 3,
    },
    founders: [
      {
        realName: "Dr. Rohini Menon",
        blindName: "Founder Theta",
        role: "Chief Scientist & CEO",
        realPedigree: "Cochin Univ of Sci & Tech (Ph.D)",
        blindPedigree: "State Research University (Masked)",
        experience: "9 yrs Cryogenic Bio-Logistics",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
      },
      {
        realName: "Vishnu Raj",
        blindName: "Founder Iota",
        role: "COO",
        realPedigree: "Govt Engineering College Thrissur",
        blindPedigree: "Regional Engineering College (Masked)",
        experience: "6 yrs Cold Chain Operations",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
      }
    ],
    meritocracyScore: 92,
    scoreBreakdown: {
      growth: { score: 91, label: "Traction & MoM Velocity", weight: "25%", detail: "Consistent 18.5% MoM compounding with enterprise pharma contracts." },
      efficiency: { score: 94, label: "Capital Efficiency", weight: "25%", detail: "Exceptional burn multiple of 0.78x. Near cashflow break-even." },
      runway: { score: 90, label: "Runway & Buffer", weight: "20%", detail: "19.4 months runway buffer with locked annual enterprise prepayments." },
      discipline: { score: 93, label: "Expense Discipline", weight: "15%", detail: "Extremely frugal lean team, proprietary low-cost bio-sensors." },
      claimConsistency: { score: 95, label: "Claim Consistency Index", weight: "15%", detail: "Bank feeds and pitch statements match within 1.2% variance." }
    },
    financials: {
      currentCashReserve: 11200000, // ₹1.12 Cr
      monthlyBurnBase: 580000,     // ₹5.8 Lakhs
      currentMrr: 890000,          // ₹8.9 Lakhs
      isPreRevenue: false,
      grossMargin: 81.5,
      payingCustomers: 34,
      cac: 3100,
      ltv: 24500,
      avgTechSalary: 190000,
    },
    claims: [
      {
        id: "c301",
        category: "Revenue Verification",
        pitchClaim: "₹1.06 Cr Annualized Run Rate across pharma hubs",
        claimedValue: "₹1.06 Cr ARR",
        ledgerValue: "₹1.068 Cr ARR",
        severity: "green",
        delta: "+0.7% Verified Match",
        ledgerSource: "Live GSTN Invoice Portal & AA Bank Pull",
        explanation: "100% verified against audited GST returns and live ICICI current account feeds.",
        auditedPeriod: "Live Synced"
      },
      {
        id: "c302",
        category: "Hardware Margin",
        pitchClaim: "82% Blended Gross Margin on sensor monitoring licenses",
        claimedValue: "82.0% GM",
        ledgerValue: "81.5% GM",
        severity: "green",
        delta: "-0.5% Verified Match",
        ledgerSource: "ERP Inventory Costing & Assembly Invoices",
        explanation: "Automated ledger cost reconciliation confirms sensor bill of materials.",
        auditedPeriod: "Current Fiscal"
      },
      {
        id: "c303",
        category: "Enterprise Churn",
        pitchClaim: "Zero logo churn since product launch",
        claimedValue: "0% Churn (100% Retention)",
        ledgerValue: "0% Churn (34/34 Retained)",
        severity: "green",
        delta: "Perfect Match",
        ledgerSource: "Bank Standing Mandate Records",
        explanation: "All enterprise hospital & pharmaceutical accounts active and paying on time.",
        auditedPeriod: "Past 18 Months"
      }
    ],
    tranches: [
      {
        step: 1,
        title: "Tranche 1: R&D & Field Deployment",
        allocation: "40%",
        amount: "₹80,00,000",
        milestone: "ISO-13485 Medical Device Certification",
        condition: "Certification verification & escrow release",
        status: "released",
        releaseDate: "Jul 2025",
        evidence: "Completed & Verified"
      },
      {
        step: 2,
        title: "Tranche 2: ₹10L MRR Milestone",
        allocation: "30%",
        amount: "₹60,00,000",
        milestone: "Reach ₹10.0L MRR with >80% Gross Margin",
        condition: "AA Sandbox Live automated consent check",
        status: "in_progress",
        currentProgress: 89,
        currentMetric: "₹8.90L / ₹10.00L MRR achieved",
        releaseDate: "Projected within 45 days",
        evidence: "Live API Telemetry streaming"
      },
      {
        step: 3,
        title: "Tranche 3: Pan-India Expansion",
        allocation: "30%",
        amount: "₹60,00,000",
        milestone: "Deploy across 12 tier-1 & tier-2 distribution hubs",
        condition: "Enterprise SLA verification",
        status: "locked",
        currentProgress: 40,
        currentMetric: "Active in 6 hubs",
        releaseDate: "Target Late 2026",
        evidence: "Hub contract locks"
      }
    ]
  },
  {
    // CRITICAL: Pre-Revenue Startup Profile (Zero Recurring Revenue)
    id: "startup-402",
    codeName: "Startup #402",
    realName: "NexaSolar Materials",
    sector: "CleanTech & Perovskite Solar Cells",
    hubType: "Tier-3 Hub, Deep CleanTech",
    city: "Ranchi, Jharkhand",
    foundedYear: 2025,
    stage: "Pre-Seed (Pre-Revenue)",
    askingRound: "₹50 Lakhs ($60k)",
    trustLevel: "registered",
    trustDetails: {
      type: "Registered - MSME/DPIIT",
      certNumber: "DPIIT-IND-2025-99214",
      verificationSource: "MCA & DPIIT Startup India API",
      verifiedOn: "12 Feb 2026",
      ladderLevel: 2,
    },
    founders: [
      {
        realName: "Riya Sen",
        blindName: "Founder Kappa",
        role: "Lead Materials Scientist & CEO",
        realPedigree: "BIT Mesra, Nanotech M.Tech '23",
        blindPedigree: "Regional Engineering Institution (Masked)",
        experience: "2 yrs CSIR Lab Photovoltaic Fellow",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
      },
      {
        realName: "Saurabh Verma",
        blindName: "Founder Lambda",
        role: "Process Engineer & COO",
        realPedigree: "NIT Jamshedpur '23",
        blindPedigree: "National Institute of Tech (Masked)",
        experience: "2 yrs Chemical Fabrication",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
      }
    ],
    meritocracyScore: 71,
    scoreBreakdown: {
      growth: { score: 62, label: "Traction & Prototype Velocity", weight: "25%", detail: "Working laboratory MVP achieved 22.4% cell efficiency in standard lab tests. Zero MRR (Pre-commercial)." },
      efficiency: { score: 82, label: "Capital Efficiency", weight: "25%", detail: "Extremely frugal lean research burn of ₹2.4L/mo via university lab grant partnerships." },
      runway: { score: 84, label: "Runway & Buffer", weight: "20%", detail: "11.6 months research runway remaining on initial angel grant." },
      discipline: { score: 78, label: "Expense Discipline", weight: "15%", detail: "No ad spend, all capital allocated to lab reagent consumables and patent filing." },
      claimConsistency: { score: 68, label: "Claim Consistency Index", weight: "15%", detail: "Technical lab specs verified; commercial GTM claims marked pre-revenue." }
    },
    financials: {
      currentCashReserve: 2800000, // ₹28 Lakhs
      monthlyBurnBase: 240000,    // ₹2.4 Lakhs
      currentMrr: 0,              // ZERO RECURRING REVENUE!
      isPreRevenue: true,
      grossMargin: 0,
      payingCustomers: 0,
      cac: 0,
      ltv: 0,
      avgTechSalary: 120000,
    },
    preRevenueDetails: {
      prototypeStatus: "Lab Working Prototype (TRL 5)",
      ipPatents: "1 Provisional Patent Filed (IPO #2026/DEL/182)",
      primaryBottleneck: "Commercial Pricing, GTM Distribution, and First Pilot Contracts",
      recommendedSyndicate: ["Serial Hardware Founder", "B2B CleanTech Analyst", "MSME CA Grant Specialist", "Solar Market Researcher"]
    },
    claims: [
      {
        id: "c401",
        category: "Technology Maturity",
        pitchClaim: "Perovskite solar cell efficiency exceeds 22.4% with 40% lower capex",
        claimedValue: "22.4% Cell Efficiency",
        ledgerValue: "21.8% Lab Benchmark",
        severity: "amber",
        delta: "Lab Confirmed (~2.6% diff)",
        ledgerSource: "National Photovoltaic Lab Test Certificate",
        explanation: "Lab tests verify 21.8% to 22.4% indoor illumination efficiency. Scaled outdoor endurance pending.",
        auditedPeriod: "Q1 2026 Audit"
      },
      {
        id: "c402",
        category: "Recurring Revenue",
        pitchClaim: "Pre-commercial pilot pipeline worth ₹1.2 Cr in letter-of-intent (LOI)",
        claimedValue: "₹1.2 Cr LOI Pipeline",
        ledgerValue: "₹0 Realized Revenue (Pre-revenue)",
        severity: "amber",
        delta: "Unsettled Pipeline",
        ledgerSource: "Bank Feed (Zero Inflows)",
        explanation: "LOIs are non-binding expressions of interest without bank deposits. Correctly flagged as Pre-Revenue.",
        auditedPeriod: "Current"
      }
    ],
    tranches: [
      {
        step: 1,
        title: "Tranche 1: Lab Rig Scaling",
        allocation: "50%",
        amount: "₹25,00,000",
        milestone: "Roll-to-roll thin-film prototype validation",
        condition: "Third-party test validation certificate",
        status: "released",
        releaseDate: "Dec 2025",
        evidence: "Lab Certificate Received"
      },
      {
        step: 2,
        title: "Tranche 2: First Commercial Pilot",
        allocation: "30%",
        amount: "₹15,00,000",
        milestone: "Convert 1 industrial rooftop LOI into binding advance contract (>₹3L)",
        condition: "Bank escrow receipt of commercial advance",
        status: "in_progress",
        currentProgress: 30,
        currentMetric: "Commercial pilot discussions ongoing with 2 EPCs",
        releaseDate: "Target Q2 2026",
        evidence: "EPC NDA Active"
      },
      {
        step: 3,
        title: "Tranche 3: Pilot Deployment",
        allocation: "20%",
        amount: "₹10,00,000",
        milestone: "10kW field installation generating verified power telemetry",
        condition: "Grid sync certificate",
        status: "locked",
        currentProgress: 0,
        currentMetric: "Awaiting Tranche 2 Completion",
        releaseDate: "Target Late 2026",
        evidence: "Locked"
      }
    ]
  }
];

export const TRUST_LADDER_INFO = [
  {
    level: 1,
    id: "self_reported",
    label: "Self-Reported",
    badgeColor: "amber",
    borderClass: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    description: "Manual founder CSV or unverified self-submitted metrics. Caution: Discrepancies possible.",
    checksRequired: ["Pitch deck uploaded", "Manual self-entry table submitted"],
    riskAssessment: "High Diligence Required. Claims subject to Claim Check comparison."
  },
  {
    level: 2,
    id: "registered",
    label: "Registered - MSME/DPIIT",
    badgeColor: "blue",
    borderClass: "border-blue-500/40 bg-blue-500/10 text-blue-400",
    description: "Official Govt entity verified. Cross-referenced via MCA, DPIIT Startup India, and Udyam records.",
    checksRequired: ["MCA Certificate of Incorporation", "DPIIT Recognition Number", "Active GSTN Filing History"],
    riskAssessment: "Standard Screening. Corporate structure & legal identity authenticated."
  },
  {
    level: 3,
    id: "verified",
    label: "Verified - AA Sandbox Roadmap",
    badgeColor: "emerald",
    borderClass: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    description: "Gold Standard: Direct machine-to-machine financial verification via RBI Account Aggregator (AA) and GSTN live feeds.",
    checksRequired: ["RBI AA Consent Flow", "Live Bank Statement Ingestion", "Automated GST Invoice Matching", "Zero Manual Override"],
    riskAssessment: "Institution-Grade Trust. Real-time ledger matching with zero tamper risk."
  }
];

/**
 * UNIQUE FEATURE: Curated Network of Big Founders, Business Analysts, Chartered Accountants (CA) & Market Researchers
 * Specially designed to guide Pre-Revenue startups to achieve their first ₹5L MRR and statutory readiness.
 */
export const MOCK_ADVISORS = [
  {
    id: "adv-1",
    name: "Kavita Nambiar",
    category: "Serial Founder",
    role: "2x Exited Founder (LogiStack & SensorNode)",
    trackRecord: "Scaled B2B DeepTech hardware from ₹0 to ₹25 Cr ARR, exited to Fortune 500.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    domain: "Hardware GTM & Pilot Pricing",
    rating: 4.9,
    sessionsCount: 38,
    badge: "Unicorn Ecosystem Alum",
    guidanceOffer: "1-on-1 Commercial Pilot structuring, customer discovery interviews, and overcoming Tier-2/3 distributor skepticism."
  },
  {
    id: "adv-2",
    name: "CA Rajesh Chawla, FCA",
    category: "Chartered Accountant (CA)",
    role: "Senior Partner, Chawla & Associates (22+ yrs exp)",
    trackRecord: "Secured ₹14 Cr in non-dilutive MSME & BIRAC grants for 45+ seed startups.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    domain: "Statutory Structuring, Cap Tables & MSME Grants",
    rating: 5.0,
    sessionsCount: 62,
    badge: "DPIIT 80-IAC Tax Exemption Lead",
    guidanceOffer: "Pre-revenue grant compliance, Section 80-IAC 3-year tax holiday application, GST registration, and anti-dilution cap table architecture."
  },
  {
    id: "adv-3",
    name: "Aditya Varma",
    category: "Business Analyst",
    role: "Ex-McKinsey & VP of Strategy @ GrowthPulse",
    trackRecord: "Modeled unit economics & pricing decks for 30+ Y Combinator & Surge startups.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    domain: "Financial Modeling & Unit Economics",
    rating: 4.8,
    sessionsCount: 44,
    badge: "Unit Economics Architect",
    guidanceOffer: "Translating engineering prototypes into robust three-statement financial models, establishing contribution margins, and defining payback periods."
  },
  {
    id: "adv-4",
    name: "Dr. Pradeep Sen",
    category: "Market Researcher",
    role: "Director of Market Intelligence, Bharat Tech Frontier",
    trackRecord: "Published 12 comprehensive industry sizing reports on Indian CleanTech & AgriTech adoption.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    domain: "TAM/SAM Sizing & Competitive Defense",
    rating: 4.9,
    sessionsCount: 29,
    badge: "DeepTech Research Fellow",
    guidanceOffer: "Bottom-up TAM/SAM estimation, competitive moat mapping against global Chinese/Western suppliers, and government subsidy mapping."
  }
];

/**
 * Pre-configured Sign-in Demo Personas for Founder & Investor / VC Auth
 */
export const MOCK_PERSONAS = {
  founders: [
    {
      id: "user-f1",
      name: "Aarav Sharma",
      email: "aarav@krishigrid.ai",
      phone: "+91 98765 43210",
      role: "founder",
      title: "Co-Founder & CEO",
      startupId: "startup-104",
      startupName: "KrishiGrid AI",
      college: "IIT Roorkee",
      city: "Jabalpur (Tier-3 Hub)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "user-f2",
      name: "Riya Sen",
      email: "riya@nexasolar.in",
      phone: "+91 97654 32109",
      role: "founder",
      title: "Founder & Lead Scientist (Pre-Revenue)",
      startupId: "startup-402",
      startupName: "NexaSolar Materials",
      college: "BIT Mesra",
      city: "Ranchi (Tier-3 Hub)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "user-f3",
      name: "Devansh Singhania",
      email: "devansh@cashmatrix.io",
      phone: "+91 91234 56780",
      role: "founder",
      title: "Founder & CEO",
      startupId: "startup-218",
      startupName: "CashMatrix Protocol",
      college: "Stanford (Dropout)",
      city: "Jaipur (Tier-2 Hub)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    }
  ],
  investors: [
    {
      id: "user-inv1",
      name: "Vikram Mehta",
      email: "v.mehta@alphascale.vc",
      phone: "+91 98200 44321",
      role: "investor",
      title: "Managing Partner",
      firm: "AlphaScale Ventures",
      ticketSize: "₹1.00 Cr – ₹5.00 Cr",
      aum: "₹150 Cr",
      focusSectors: "AgriTech, DeepTech, CleanTech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "user-inv2",
      name: "Ananya Rao",
      email: "ananya@catalystindia.com",
      phone: "+91 98450 78912",
      role: "investor",
      title: "Principal & Head of Diligence",
      firm: "Catalyst India Capital",
      ticketSize: "₹50 Lakhs – ₹2.00 Cr",
      aum: "₹80 Cr",
      focusSectors: "B2B SaaS, Embedded Fintech",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
    }
  ]
};

/**
 * On-The-Fly Startup Generator for Custom Registrations (e.g. Founders with "No Startup / Idea Phase")
 */
export const createCustomStartup = ({
  founderName,
  founderEmail,
  founderPhone,
  founderCollege,
  founderRole = "Founder & CEO",
  hasStartup = true,
  startupName = "",
  sector = "CleanTech & AI",
  city = "Tier-2/3 Regional Hub",
  currentMrr = 0,
  stage = "Idea / Pre-Revenue"
}) => {
  const isPreRev = currentMrr === 0 || !hasStartup;
  const resolvedName = hasStartup && startupName?.trim() ? startupName.trim() : `${founderName}'s Stealth Venture`;
  const customId = `custom-startup-${Date.now()}`;
  const codeNum = Math.floor(100 + Math.random() * 899);

  return {
    id: customId,
    codeName: `Startup #${codeNum}`,
    realName: resolvedName,
    sector: sector,
    hubType: `Tier-2/3 Hub, ${sector}`,
    city: city,
    contactEmail: founderEmail,
    contactPhone: founderPhone,
    foundedYear: 2026,
    stage: isPreRev ? "Idea / Pre-Revenue" : stage,
    askingRound: isPreRev ? "₹25 Lakhs – ₹50 Lakhs (Angel/Grant)" : "₹1.00 Cr",
    trustLevel: "self_reported",
    trustDetails: {
      type: "Self-Reported",
      certNumber: "SELF-ENTRY-PENDING",
      verificationSource: "Founder Direct Self-Submission (Unverified)",
      verifiedOn: "Just Now",
      ladderLevel: 1,
    },
    founders: [
      {
        realName: founderName,
        blindName: "Founder Prime",
        role: founderRole,
        realPedigree: founderCollege || "Self-Taught & Industry Practitioner",
        blindPedigree: "Domain Specialist (Masked)",
        experience: "Hands-on domain builder",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      }
    ],
    meritocracyScore: isPreRev ? 66 : 75,
    scoreBreakdown: {
      growth: { 
        score: isPreRev ? 55 : 72, 
        label: "Traction & Prototype Velocity", 
        weight: "25%", 
        detail: isPreRev ? "Pre-commercial idea phase. Advised to connect with Pre-Revenue Advisory Syndicate." : "Early commercial testing." 
      },
      efficiency: { 
        score: 82, 
        label: "Capital Efficiency", 
        weight: "25%", 
        detail: "Lean founder-funded initial prototyping." 
      },
      runway: { 
        score: 78, 
        label: "Runway & Buffer", 
        weight: "20%", 
        detail: "Self-funded initial runway buffer." 
      },
      discipline: { 
        score: 72, 
        label: "Expense Discipline", 
        weight: "15%", 
        detail: "Frugal early-stage development expenses." 
      },
      claimConsistency: { 
        score: 65, 
        label: "Claim Consistency Index", 
        weight: "15%", 
        detail: "Self-reported assertions awaiting third-party ledger integration." 
      }
    },
    financials: {
      currentCashReserve: isPreRev ? 1800000 : 4500000,
      monthlyBurnBase: isPreRev ? 140000 : 380000,
      currentMrr: isPreRev ? 0 : Number(currentMrr),
      isPreRevenue: isPreRev,
      grossMargin: isPreRev ? 0 : 65,
      payingCustomers: isPreRev ? 0 : 6,
      cac: isPreRev ? 0 : 2100,
      ltv: isPreRev ? 0 : 8500,
      avgTechSalary: 140000
    },
    preRevenueDetails: {
      prototypeStatus: isPreRev ? "Idea & Concept Validation Phase" : "MVP Alpha Live",
      ipPatents: "In ideation / provisional drafting",
      primaryBottleneck: isPreRev ? "No recurring revenue. Needs Big Founder pilot intro, Business Analyst pricing model, and CA grant compliance." : "Scaling customer acquisition.",
      recommendedSyndicate: ["Serial Founder", "Business Analyst", "Chartered Accountant (CA)", "Market Researcher"]
    },
    claims: [
      {
        id: `c-cust-1`,
        category: "Commercial Assertion",
        pitchClaim: isPreRev ? "Early prototype addressing large domestic market" : `Current MRR verified at ₹${Number(currentMrr) / 100000} Lakhs`,
        claimedValue: isPreRev ? "Pre-Revenue (₹0 MRR)" : `₹${Number(currentMrr) / 100000}L MRR`,
        ledgerValue: isPreRev ? "₹0 Realized Inflows" : `₹${Number(currentMrr) / 100000}L Bank Receipts`,
        severity: isPreRev ? "amber" : "green",
        delta: isPreRev ? "Pre-Commercial" : "Verified",
        ledgerSource: "Self-Reported Initial Declaration",
        explanation: isPreRev ? "Startup has zero recurring revenue. Automatically recommended for Pre-Revenue Advisory Launchpad." : "Self-entered initial ledger.",
        auditedPeriod: "Current"
      }
    ],
    tranches: [
      {
        step: 1,
        title: "Tranche 1: Prototyping & Grants",
        allocation: "50%",
        amount: isPreRev ? "₹20,00,000" : "₹40,00,000",
        milestone: "Working Prototype Validation & DPIIT Registration",
        condition: "CA Certification & MSME filing",
        status: "in_progress",
        currentProgress: 50,
        currentMetric: "Prototype Testing Ongoing",
        releaseDate: "Active Sprint",
        evidence: "Self-Reported"
      },
      {
        step: 2,
        title: "Tranche 2: First Commercial Pilot",
        allocation: "30%",
        amount: isPreRev ? "₹15,00,000" : "₹35,00,000",
        milestone: "Secure 2 signed commercial pilot contracts (>₹2L each)",
        condition: "Customer bank advance verification",
        status: "locked",
        currentProgress: 0,
        currentMetric: "Awaiting Pilot Closure",
        releaseDate: "Target Q3 2026",
        evidence: "Locked"
      },
      {
        step: 3,
        title: "Tranche 3: Scale Gate",
        allocation: "20%",
        amount: isPreRev ? "₹15,00,000" : "₹25,00,000",
        milestone: "Achieve ₹3,00,000 MRR from repeat contracts",
        condition: "Razorpay/Bank statement verification",
        status: "locked",
        currentProgress: 0,
        currentMetric: "Revenue Gate",
        releaseDate: "Target Late 2026",
        evidence: "Locked"
      }
    ]
  };
};
