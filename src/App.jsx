/**
 * VENTURE PULSE AI — COMPLETE CONSOLIDATED SINGLE-FILE APPLICATION
 * 
 * Autonomous Diligence & Runway Operating System
 * Incorporating:
 * - Financial & Projection Engine (18-Month Cash Depletion Simulator)
 * - Complete Mock Diligence Database (4 Startups including ₹0 MRR Pre-Revenue)
 * - Curated Advisory Syndicate (Big Founders, Business Analysts, CAs, Market Researchers)
 * - Personal Credentials & Role Authentication Gateway (Founders & Investors)
 * - On-the-fly Startup Generator (with "No Startup / Idea Phase" incubation)
 * - "Two-Door Entryway": Founder CFO Studio vs Investor Diligence Terminal
 * - "Claim Check": Side-by-Side Pitch vs Self-Reported Ledger Matrix
 * - "Trust Ladder": 3-Tier Multi-layer Verification Protocol
 * - "Meritocracy Score Dial": 0-100 Circular Gauge & 5-Pillar Diagnostics
 * - "Pedigree-Blind Toggle": Masks Founder Names, Photos & Colleges
 * - "Interactive What-If Sliders": Marketing Shock & Tech Headcount Stress
 * - "Milestone Tranche Escrow Simulator": Stepper with Milestone Unlocks
 */

import React, { useState, useMemo } from 'react';
import {
  Activity,
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  ArrowRightLeft,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Briefcase,
  Building,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Coins,
  Compass,
  Database,
  DollarSign,
  Edit3,
  Eye,
  EyeOff,
  FileSpreadsheet,
  FileText,
  Filter,
  Flame,
  GraduationCap,
  Lightbulb,
  Lock,
  LogIn,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Star,
  TrendingUp,
  Unlock,
  User,
  UserCheck,
  Users,
  X,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';

/* ==========================================================================
   SECTION 1: FINANCIAL & PROJECTION UTILITIES
   ========================================================================== */

const formatINR = (amount) => {
  if (amount === undefined || amount === null) return "₹0";
  if (Math.abs(amount) >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (Math.abs(amount) >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};



const calculateRunwayProjection = ({
  initialCash,
  baseMonthlyBurn,
  marketingShockPercent = 0,
  techHiresCount = 0,
  techSalaryPerHire = 180000,
  currentMrr = 480000,
  mrrGrowthRate = 0.05,
  totalMonths = 18
}) => {
  const baseMarketingPortion = baseMonthlyBurn * 0.40;
  const fixedBurnPortion = baseMonthlyBurn * 0.60;
  
  const shockedMarketingBurn = baseMarketingPortion * (1 + (marketingShockPercent / 100));
  const additionalTechPayroll = techHiresCount * techSalaryPerHire;
  
  const stressedGrossBurn = fixedBurnPortion + shockedMarketingBurn + additionalTechPayroll;

  const projectionData = [];
  let remainingCashBase = initialCash;
  let remainingCashStressed = initialCash;
  let depletionMonthIndex = null;
  let baseDepletionMonthIndex = null;

  const monthNames = [
    "M1", "M2", "M3", "M4", "M5", "M6", 
    "M7", "M8", "M9", "M10", "M11", "M12", 
    "M13", "M14", "M15", "M16", "M17", "M18"
  ];

  for (let i = 0; i < totalMonths; i++) {
    const monthLabel = monthNames[i];
    const projectedMrr = currentMrr * Math.pow(1 + mrrGrowthRate, i);
    
    const baseNetBurn = Math.max(0, baseMonthlyBurn - projectedMrr);
    remainingCashBase = Math.max(0, remainingCashBase - baseNetBurn);
    if (remainingCashBase === 0 && baseDepletionMonthIndex === null) {
      baseDepletionMonthIndex = i + 1;
    }

    const stressedNetBurn = Math.max(0, stressedGrossBurn - projectedMrr);
    remainingCashStressed = Math.max(0, remainingCashStressed - stressedNetBurn);
    if (remainingCashStressed === 0 && depletionMonthIndex === null) {
      depletionMonthIndex = i + 1;
    }

    projectionData.push({
      month: monthLabel,
      monthIndex: i + 1,
      baselineCash: Math.round(remainingCashBase / 100000),
      stressedCash: Math.round(remainingCashStressed / 100000),
      baselineCashRaw: remainingCashBase,
      stressedCashRaw: remainingCashStressed,
      monthlyBurn: Math.round(stressedNetBurn / 100000),
      projectedMrr: Math.round(projectedMrr / 100000)
    });
  }

  const initialStressedNetBurn = Math.max(50000, stressedGrossBurn - currentMrr);
  const stressedRunwayMonths = initialCash / initialStressedNetBurn;
  
  const initialBaseNetBurn = Math.max(50000, baseMonthlyBurn - currentMrr);
  const baseRunwayMonths = initialCash / initialBaseNetBurn;

  return {
    projectionData,
    depletionMonthIndex: depletionMonthIndex || (stressedRunwayMonths <= totalMonths ? Math.round(stressedRunwayMonths) : null),
    baseDepletionMonthIndex: baseDepletionMonthIndex || Math.round(baseRunwayMonths),
    stressedRunwayMonths: Number(stressedRunwayMonths.toFixed(1)),
    baseRunwayMonths: Number(baseRunwayMonths.toFixed(1)),
    stressedMonthlyBurn: Math.round(stressedGrossBurn),
    netBurnDelta: Math.round(stressedGrossBurn - baseMonthlyBurn),
    survivalRate: Math.min(100, Math.max(12, Math.round((stressedRunwayMonths / 18) * 100)))
  };
};

/* ==========================================================================
   SECTION 2: MOCK DILIGENCE DATA & ADVISORY NETWORK
   ========================================================================== */

const MOCK_STARTUPS = [
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
    trustLevel: "registered",
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
      currentCashReserve: 7500000,
      monthlyBurnBase: 620000,
      currentMrr: 480000,
      isPreRevenue: false,
      grossMargin: 68.4,
      payingCustomers: 48,
      cac: 2350,
      ltv: 11400,
      avgTechSalary: 180000,
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
    trustLevel: "self_reported",
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
      currentCashReserve: 6600000,
      monthlyBurnBase: 1380000,
      currentMrr: 320000,
      isPreRevenue: false,
      grossMargin: 38.2,
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
    trustLevel: "verified",
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
      currentCashReserve: 11200000,
      monthlyBurnBase: 580000,
      currentMrr: 890000,
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
      currentCashReserve: 2800000,
      monthlyBurnBase: 240000,
      currentMrr: 0,
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

const TRUST_LADDER_INFO = [
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

const MOCK_ADVISORS = [
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

const MOCK_PERSONAS = {
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

const createCustomStartup = ({
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

/* ==========================================================================
   SECTION 3: MODAL COMPONENTS (BREAKDOWN, TRUST LADDER, PROFILE, AUTH)
   ========================================================================== */

export const ScoreBreakdownModal = ({ isOpen, onClose, startup }) => {
  if (!isOpen || !startup) return null;

  const { meritocracyScore, scoreBreakdown } = startup;

  const pillars = [
    {
      key: 'growth',
      name: scoreBreakdown.growth.label,
      score: scoreBreakdown.growth.score,
      weight: scoreBreakdown.growth.weight,
      detail: scoreBreakdown.growth.detail,
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      key: 'efficiency',
      name: scoreBreakdown.efficiency.label,
      score: scoreBreakdown.efficiency.score,
      weight: scoreBreakdown.efficiency.weight,
      detail: scoreBreakdown.efficiency.detail,
      icon: Zap,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      key: 'runway',
      name: scoreBreakdown.runway.label,
      score: scoreBreakdown.runway.score,
      weight: scoreBreakdown.runway.weight,
      detail: scoreBreakdown.runway.detail,
      icon: Clock,
      color: 'from-amber-500 to-orange-600',
    },
    {
      key: 'discipline',
      name: scoreBreakdown.discipline.label,
      score: scoreBreakdown.discipline.score,
      weight: scoreBreakdown.discipline.weight,
      detail: scoreBreakdown.discipline.detail,
      icon: ShieldCheck,
      color: 'from-purple-500 to-pink-600',
    },
    {
      key: 'claimConsistency',
      name: scoreBreakdown.claimConsistency.label,
      score: scoreBreakdown.claimConsistency.score,
      weight: scoreBreakdown.claimConsistency.weight,
      detail: scoreBreakdown.claimConsistency.detail,
      icon: FileSpreadsheet,
      color: 'from-cyan-500 to-blue-600',
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#0e1524] border border-[#1f2e4a] rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="merit-modal-title"
      >
        <div className="flex items-start justify-between pb-4 border-b border-[#1f2e4a]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 id="merit-modal-title" className="text-xl font-bold text-white tracking-tight">
                Meritocracy Algorithm Diagnostics
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Objective quantitative composite score based on 5 financial and diligence pillars
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-5 p-4 rounded-xl bg-[#131d31] border border-[#1f2e4a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
              {meritocracyScore}
              <span className="text-sm font-normal text-slate-400 ml-1">/ 100</span>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Composite Score</div>
              <div className="text-xs text-emerald-400 font-medium">
                {meritocracyScore >= 80 ? 'Tier-1 Fundamental Health' : meritocracyScore >= 65 ? 'Moderate Fundability' : 'High Diligence Flagged'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Target Benchmark</span>
            <div className="text-xs font-mono font-semibold text-slate-200">Sector Median: 64/100</div>
          </div>
        </div>

        <div className="space-y-4 overflow-y-auto pr-1 flex-1 py-1">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.key} 
                className="p-4 rounded-xl bg-[#090d16]/70 border border-[#1f2e4a] hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-semibold text-slate-200">{pillar.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-400">
                      Weight: {pillar.weight}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-white">{pillar.score}</span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-2">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${pillar.color}`}
                    style={{ width: `${pillar.score}%` }}
                  />
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-[#1f2e4a]">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-amber-300 uppercase tracking-wide">
                Screening aid only. Not investment advice.
              </span>
              <p className="text-slate-400 mt-0.5 leading-relaxed">
                The Meritocracy Score provides automated algorithmic synthesis of self-reported financial ledgers and third-party registry feeds. Investors must perform independent fiduciary due diligence before deploying capital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TrustLadderModal = ({ isOpen, onClose, currentStartup }) => {
  if (!isOpen) return null;

  const currentLevel = currentStartup?.trustDetails?.ladderLevel || 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0e1524] border border-[#1f2e4a] rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="trust-ladder-title"
      >
        <div className="flex items-start justify-between pb-5 border-b border-[#1f2e4a]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 id="trust-ladder-title" className="text-xl font-bold text-white tracking-tight">
                Venture Trust Ladder Architecture
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Multi-layer verification protocol eliminating information asymmetry in startup finance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 p-4 rounded-xl bg-[#131d31] border border-[#1f2e4a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Profile:</span>
            <span className="text-sm font-semibold text-white">{currentStartup?.realName || currentStartup?.codeName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Active Tier:</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
              currentLevel === 3 
                ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400' 
                : currentLevel === 2 
                  ? 'border-blue-500/40 bg-blue-500/15 text-blue-400' 
                  : 'border-amber-500/40 bg-amber-500/15 text-amber-400'
            }`}>
              {currentStartup?.trustDetails?.type}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {TRUST_LADDER_INFO.map((tier) => {
            const isCurrent = tier.level === currentLevel;
            const isPassed = tier.level < currentLevel;

            return (
              <div
                key={tier.id}
                className={`p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? `${tier.borderClass} ring-1 ring-offset-0 ${
                        tier.level === 3 ? 'ring-emerald-500/50' : tier.level === 2 ? 'ring-blue-500/50' : 'ring-amber-500/50'
                      }`
                    : isPassed
                    ? 'border-slate-800 bg-slate-900/50 text-slate-300 opacity-80'
                    : 'border-slate-800/80 bg-slate-900/30 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-slate-800/80 border border-slate-700/50">
                      L{tier.level}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white">{tier.label}</h3>
                        {isCurrent && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-white">
                            Current Stage
                          </span>
                        )}
                        {isPassed && (
                          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                            <CheckCircle2 className="w-3 h-3" /> Cleared
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{tier.description}</p>
                    </div>
                  </div>
                  
                  {tier.level === 1 && <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />}
                  {tier.level === 2 && <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0" />}
                  {tier.level === 3 && <BadgeCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {tier.checksRequired.map((chk, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                      <div className={`w-1.5 h-1.5 rounded-full ${isPassed || isCurrent ? 'bg-indigo-400' : 'bg-slate-600'}`} />
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-[#1f2e4a] flex items-center justify-between text-xs text-slate-400">
          <span>Authentication sync powered by Account Aggregator & MCA v3 API</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};

export const UserProfileModal = ({
  isOpen,
  onClose,
  currentUser,
  onOpenAuthModal,
  currentStartup
}) => {
  if (!isOpen || !currentUser) return null;

  const isFounder = currentUser.role === 'founder';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#0e1524] border border-[#1f2e4a] rounded-2xl shadow-2xl p-6 md:p-7 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
      >
        <div className="flex items-start justify-between pb-4 border-b border-[#1f2e4a]">
          <div className="flex items-center gap-3">
            <img 
              src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
              alt={currentUser.name} 
              className="w-12 h-12 rounded-xl object-cover border-2 border-indigo-500/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 id="profile-modal-title" className="text-base font-bold text-white">
                  {currentUser.name}
                </h3>
                <span className={`text-[10px] font-mono px-2 py-0.2 rounded font-bold uppercase ${
                  isFounder 
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                }`}>
                  {isFounder ? 'Founder' : 'Institutional VC'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{currentUser.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Verified Credentials & Identity:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#111927] border border-[#1f2e4a]">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                <Mail className="w-3 h-3 text-indigo-400" />
                <span>Work Email</span>
              </div>
              <div className="font-mono text-white truncate">{currentUser.email}</div>
            </div>

            <div className="p-3 rounded-xl bg-[#111927] border border-[#1f2e4a]">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>Contact Phone</span>
              </div>
              <div className="font-mono text-white">{currentUser.phone || "+91 98765 43210"}</div>
            </div>

            {isFounder ? (
              <>
                <div className="p-3 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                    <GraduationCap className="w-3 h-3 text-purple-400" />
                    <span>Alma Mater / Pedigree</span>
                  </div>
                  <div className="text-white font-medium truncate">{currentUser.college || "Industry Practitioner"}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>Innovation Hub</span>
                  </div>
                  <div className="text-white font-medium truncate">{currentUser.city || currentStartup?.city}</div>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                    <Briefcase className="w-3 h-3 text-blue-400" />
                    <span>Fund / Syndicate</span>
                  </div>
                  <div className="text-white font-medium truncate">{currentUser.firm || "Venture Syndicate"}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                    <DollarSign className="w-3 h-3 text-emerald-400" />
                    <span>Ticket Size</span>
                  </div>
                  <div className="font-mono text-emerald-400 font-bold">{currentUser.ticketSize || "₹50L – ₹2 Cr"}</div>
                </div>
              </>
            )}
          </div>

          {isFounder && (
            <div className="p-3.5 rounded-xl bg-[#090d16] border border-[#1f2e4a]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Linked Venture Status:</span>
                <span className={`text-[10px] font-mono px-2 py-0.2 rounded font-bold ${
                  currentStartup?.financials?.isPreRevenue ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {currentStartup?.financials?.isPreRevenue ? '₹0 MRR (Pre-Revenue)' : `${currentStartup?.stage}`}
                </span>
              </div>
              <div className="text-sm font-bold text-white">{currentStartup?.realName || currentUser.startupName}</div>
              <div className="text-xs text-slate-400 mt-0.5">{currentStartup?.sector} • {currentStartup?.city}</div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-[#1f2e4a] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenAuthModal();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#131d31] hover:bg-[#1a2947] border border-[#1f2e4a] text-xs font-semibold text-slate-200 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Switch or Register New User</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const AuthModal = ({ 
  isOpen, 
  onClose, 
  onRegisterUser,
  currentUser 
}) => {
  const [activeMode, setActiveMode] = useState('form');
  const [roleTab, setRoleTab] = useState(currentUser?.role || 'founder');

  const [founderForm, setFounderForm] = useState({
    name: '',
    email: '',
    phone: '',
    designation: 'Founder & CEO',
    college: '',
    city: 'Tier-2/3 Regional Hub',
    noStartup: false,
    startupName: '',
    sector: 'CleanTech & Energy',
    currentMrr: '0',
    stage: 'Idea / Prototype'
  });

  const [investorForm, setInvestorForm] = useState({
    name: '',
    email: '',
    phone: '',
    designation: 'Managing Partner',
    firm: '',
    aum: '₹50 Cr – ₹150 Cr',
    ticketSize: '₹50 Lakhs – ₹2.00 Cr',
    sectorFocus: 'CleanTech & DeepTech',
    blindModeDefault: true,
    isAccredited: true
  });

  if (!isOpen) return null;

  const handleSelectPersona = (persona) => {
    onRegisterUser({
      user: persona,
      customStartup: null
    });
    onClose();
  };

  const handleFounderSubmit = (e) => {
    e.preventDefault();
    if (!founderForm.name || !founderForm.email) {
      alert("Please provide at least your Full Name and Work/Personal Email.");
      return;
    }

    const customStartup = createCustomStartup({
      founderName: founderForm.name,
      founderEmail: founderForm.email,
      founderPhone: founderForm.phone,
      founderCollege: founderForm.college,
      founderRole: founderForm.designation,
      hasStartup: !founderForm.noStartup,
      startupName: founderForm.startupName,
      sector: founderForm.sector,
      city: founderForm.city,
      currentMrr: founderForm.noStartup ? 0 : Number(founderForm.currentMrr),
      stage: founderForm.noStartup ? "Idea / Pre-Revenue" : founderForm.stage
    });

    const newUser = {
      id: `user-f-${Date.now()}`,
      name: founderForm.name,
      email: founderForm.email,
      phone: founderForm.phone || "+91 98000 00000",
      role: 'founder',
      title: `${founderForm.designation} (${founderForm.noStartup ? 'Stealth Idea' : customStartup.realName})`,
      startupId: customStartup.id,
      startupName: customStartup.realName,
      college: founderForm.college || "Industry Practitioner",
      city: founderForm.city,
      isPreRevenue: customStartup.financials.isPreRevenue,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    };

    onRegisterUser({
      user: newUser,
      customStartup: customStartup
    });
    onClose();
  };

  const handleInvestorSubmit = (e) => {
    e.preventDefault();
    if (!investorForm.name || !investorForm.email) {
      alert("Please provide at least your Full Name and Work Email.");
      return;
    }

    const newUser = {
      id: `user-inv-${Date.now()}`,
      name: investorForm.name,
      email: investorForm.email,
      phone: investorForm.phone || "+91 98200 00000",
      role: 'investor',
      title: `${investorForm.designation} @ ${investorForm.firm || 'Angel Syndicate'}`,
      firm: investorForm.firm || "Independent Venture Syndicate",
      ticketSize: investorForm.ticketSize,
      aum: investorForm.aum,
      focusSectors: investorForm.sectorFocus,
      blindModeDefault: investorForm.blindModeDefault,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    };

    onRegisterUser({
      user: newUser,
      customStartup: null,
      preferredBlindMode: investorForm.blindModeDefault
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0e1524] border border-[#1f2e4a] rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <div className="flex items-start justify-between pb-4 border-b border-[#1f2e4a]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              <LogIn className="w-6 h-6" />
            </div>
            <div>
              <h2 id="auth-modal-title" className="text-xl font-bold text-white tracking-tight">
                Authentication & Personal Onboarding
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Register personal credentials, configure your startup or investor mandate
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 mt-4 mb-2">
          <div className="flex items-center bg-[#090d16] p-1 rounded-xl border border-[#1f2e4a] flex-1">
            <button
              onClick={() => setRoleTab('founder')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                roleTab === 'founder'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Founder Door</span>
            </button>
            <button
              onClick={() => setRoleTab('investor')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                roleTab === 'investor'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Investor / VC Door</span>
            </button>
          </div>

          <div className="flex items-center bg-[#131d31] p-1 rounded-xl border border-[#1f2e4a] text-xs">
            <button
              onClick={() => setActiveMode('form')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeMode === 'form' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Custom Form
            </button>
            <button
              onClick={() => setActiveMode('personas')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeMode === 'personas' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1-Click Demos
            </button>
          </div>
        </div>

        <div className="overflow-y-auto space-y-4 flex-1 pr-1.5 pt-2">
          {activeMode === 'form' && (
            <div>
              {roleTab === 'founder' ? (
                <form onSubmit={handleFounderSubmit} className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#090d16] border border-[#1f2e4a] space-y-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                      1. Founder Personal Details:
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="e.g. Karthik Menon"
                            value={founderForm.name}
                            onChange={(e) => setFounderForm({ ...founderForm, name: e.target.value })}
                            className="w-full px-3 py-2 pl-8 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                          <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="karthik@stealth.ai"
                            value={founderForm.email}
                            onChange={(e) => setFounderForm({ ...founderForm, email: e.target.value })}
                            className="w-full px-3 py-2 pl-8 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                          <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={founderForm.phone}
                            onChange={(e) => setFounderForm({ ...founderForm, phone: e.target.value })}
                            className="w-full px-3 py-2 pl-8 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                          <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Founder Role
                        </label>
                        <select
                          value={founderForm.designation}
                          onChange={(e) => setFounderForm({ ...founderForm, designation: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-emerald-500"
                        >
                          <option value="Founder & CEO">Founder & CEO</option>
                          <option value="Co-Founder & CTO">Co-Founder & CTO</option>
                          <option value="Lead Scientist & Researcher">Lead Scientist & Researcher</option>
                          <option value="Solo Builder / Hacker">Solo Builder / Hacker</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Alma Mater / College
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. IIT, BITS, Self-Taught"
                            value={founderForm.college}
                            onChange={(e) => setFounderForm({ ...founderForm, college: e.target.value })}
                            className="w-full px-3 py-2 pl-8 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#090d16] border border-[#1f2e4a] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                        2. Venture Details & Revenue Status:
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#131d31] border border-amber-500/30 flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="noStartupCheckbox"
                        checked={founderForm.noStartup}
                        onChange={(e) => setFounderForm({ ...founderForm, noStartup: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-slate-700 text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
                      />
                      <label htmlFor="noStartupCheckbox" className="text-xs text-slate-300 cursor-pointer select-none">
                        <strong className="text-white block font-semibold">
                          I have No Startup yet (Idea Phase / Pre-Revenue Prototype)
                        </strong>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          Check this if you are in the lab/concept phase. You will automatically receive a Stealth Workspace and be connected to the Pre-Revenue Advisory Syndicate.
                        </span>
                      </label>
                    </div>

                    {!founderForm.noStartup ? (
                      <div className="space-y-3 pt-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                              Startup Name *
                            </label>
                            <input
                              type="text"
                              required={!founderForm.noStartup}
                              placeholder="e.g. AeroFlow Dynamics"
                              value={founderForm.startupName}
                              onChange={(e) => setFounderForm({ ...founderForm, startupName: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                              Sector & Industry
                            </label>
                            <select
                              value={founderForm.sector}
                              onChange={(e) => setFounderForm({ ...founderForm, sector: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-emerald-500"
                            >
                              <option value="CleanTech & Energy">CleanTech & Energy</option>
                              <option value="AgriTech & Climate SaaS">AgriTech & Climate SaaS</option>
                              <option value="DeepTech & AI Hardware">DeepTech & AI Hardware</option>
                              <option value="B2B Enterprise SaaS">B2B Enterprise SaaS</option>
                              <option value="Fintech & Embedded Credit">Fintech & Embedded Credit</option>
                              <option value="HealthTech & Diagnostics">HealthTech & Diagnostics</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                              Current MRR (Monthly Recurring Revenue)
                            </label>
                            <select
                              value={founderForm.currentMrr}
                              onChange={(e) => setFounderForm({ ...founderForm, currentMrr: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                            >
                              <option value="0">₹0 (Pre-Revenue Stage)</option>
                              <option value="150000">₹1.5 Lakhs / month</option>
                              <option value="350000">₹3.5 Lakhs / month</option>
                              <option value="600000">₹6.0 Lakhs / month</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                              Venture Location / Hub
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Bhopal (Tier-2 Hub)"
                              value={founderForm.city}
                              onChange={(e) => setFounderForm({ ...founderForm, city: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                        <div className="text-emerald-300 font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Stealth Incubator Mode Configured</span>
                        </div>
                        <p className="text-slate-300">
                          Workspace Name: <span className="font-mono text-white">{founderForm.name ? `${founderForm.name}'s Stealth Venture` : "Founder Stealth Labs"}</span>
                        </p>
                        <p className="text-slate-400 text-[11px]">
                          Includes zero-MRR diagnostic modeling and immediate 1-on-1 access to Chartered Accountants, Serial Founders & Business Analysts.
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Complete Registration & Open Founder CFO Studio</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleInvestorSubmit} className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#090d16] border border-[#1f2e4a] space-y-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400 block">
                      1. Investor Credentials & Designation:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="e.g. Pooja Singhal"
                            value={investorForm.name}
                            onChange={(e) => setInvestorForm({ ...investorForm, name: e.target.value })}
                            className="w-full px-3 py-2 pl-8 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                          <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Institutional Work Email *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="pooja@indiascale.vc"
                            value={investorForm.email}
                            onChange={(e) => setInvestorForm({ ...investorForm, email: e.target.value })}
                            className="w-full px-3 py-2 pl-8 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                          <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Contact Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="+91 98200 88990"
                            value={investorForm.phone}
                            onChange={(e) => setInvestorForm({ ...investorForm, phone: e.target.value })}
                            className="w-full px-3 py-2 pl-8 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                          <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Investor Designation
                        </label>
                        <select
                          value={investorForm.designation}
                          onChange={(e) => setInvestorForm({ ...investorForm, designation: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Managing Partner">Managing Partner</option>
                          <option value="Principal & Diligence Head">Principal & Diligence Head</option>
                          <option value="Angel Syndicate Lead">Angel Syndicate Lead</option>
                          <option value="Family Office Director">Family Office Director</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#090d16] border border-[#1f2e4a] space-y-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400 block">
                      2. Fund Entity & Deployment Parameters:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Fund / Syndicate Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. India Scale Ventures"
                          value={investorForm.firm}
                          onChange={(e) => setInvestorForm({ ...investorForm, firm: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Capital Pool / AUM
                        </label>
                        <select
                          value={investorForm.aum}
                          onChange={(e) => setInvestorForm({ ...investorForm, aum: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        >
                          <option value="₹10 Cr – ₹30 Cr">₹10 Cr – ₹30 Cr</option>
                          <option value="₹50 Cr – ₹150 Cr">₹50 Cr – ₹150 Cr</option>
                          <option value="₹200 Cr+ Tier-1 Fund">₹200 Cr+ Tier-1 Fund</option>
                          <option value="Angel Syndicate Pool">Angel Syndicate Pool</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Typical Check / Ticket Size
                        </label>
                        <select
                          value={investorForm.ticketSize}
                          onChange={(e) => setInvestorForm({ ...investorForm, ticketSize: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        >
                          <option value="₹25 Lakhs – ₹50 Lakhs">₹25 Lakhs – ₹50 Lakhs</option>
                          <option value="₹50 Lakhs – ₹2.00 Cr">₹50 Lakhs – ₹2.00 Cr</option>
                          <option value="₹2.00 Cr – ₹5.00 Cr">₹2.00 Cr – ₹5.00 Cr</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Primary Sector Focus
                        </label>
                        <select
                          value={investorForm.sectorFocus}
                          onChange={(e) => setInvestorForm({ ...investorForm, sectorFocus: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value="CleanTech & DeepTech">CleanTech & DeepTech</option>
                          <option value="AgriTech & Climate">AgriTech & Climate</option>
                          <option value="B2B Enterprise SaaS">B2B Enterprise SaaS</option>
                          <option value="Fintech & Embedded Credit">Fintech & Embedded Credit</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="blindModeCheck"
                          checked={investorForm.blindModeDefault}
                          onChange={(e) => setInvestorForm({ ...investorForm, blindModeDefault: e.target.checked })}
                          className="h-4 w-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 accent-indigo-500 cursor-pointer"
                        />
                        <label htmlFor="blindModeCheck" className="text-xs text-slate-300 cursor-pointer select-none">
                          Enable <strong>Pedigree-Blind Diligence Mode</strong> by default (Mask founder names & colleges)
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="accreditedCheck"
                          checked={investorForm.isAccredited}
                          onChange={(e) => setInvestorForm({ ...investorForm, isAccredited: e.target.checked })}
                          className="h-4 w-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 accent-indigo-500 cursor-pointer"
                        />
                        <label htmlFor="accreditedCheck" className="text-xs text-slate-400 cursor-pointer select-none">
                          I confirm accreditation under SEBI / applicable venture investment guidelines
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Register Mandate & Enter Diligence Terminal</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {activeMode === 'personas' && (
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Select 1-Click Persona for Instant Demo:
              </span>

              {roleTab === 'founder' ? (
                MOCK_PERSONAS.founders.map((persona) => (
                  <div
                    key={persona.id}
                    onClick={() => handleSelectPersona(persona)}
                    className="p-4 rounded-xl border border-[#1f2e4a] bg-[#111927] hover:border-emerald-500/50 hover:bg-[#142236] cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={persona.avatar} 
                        alt={persona.name} 
                        className="w-10 h-10 rounded-full object-cover border border-[#1f2e4a]" 
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{persona.name}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-300">
                            {persona.city}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-400 font-medium">{persona.title} • {persona.startupName}</p>
                        <p className="text-[11px] font-mono text-slate-400">{persona.phone} • {persona.college}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </div>
                ))
              ) : (
                MOCK_PERSONAS.investors.map((persona) => (
                  <div
                    key={persona.id}
                    onClick={() => handleSelectPersona(persona)}
                    className="p-4 rounded-xl border border-[#1f2e4a] bg-[#111927] hover:border-indigo-500/50 hover:bg-[#142038] cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={persona.avatar} 
                        alt={persona.name} 
                        className="w-10 h-10 rounded-full object-cover border border-[#1f2e4a]" 
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{persona.name}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                            AUM: {persona.aum}
                          </span>
                        </div>
                        <p className="text-xs text-indigo-300 font-medium">{persona.title} • {persona.firm}</p>
                        <p className="text-[11px] font-mono text-slate-400">Check: {persona.ticketSize} • {persona.phone}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-indigo-400" />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   SECTION 4: CORE ANALYTIC COMPONENTS (DIAL, SLIDERS, CLAIM CHECK, TRANCHES)
   ========================================================================== */

export const MeritocracyGauge = ({ startup }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const score = startup?.meritocracyScore || 0;

  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * score) / 100;

  const getScoreTheme = (val) => {
    if (val >= 80) {
      return {
        stroke: '#10b981',
        glow: 'rgba(16, 185, 129, 0.4)',
        textColor: 'text-emerald-400',
        badge: 'Top Decile Fundamentals',
        bgBadge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
      };
    } else if (val >= 65) {
      return {
        stroke: '#6366f1',
        glow: 'rgba(99, 102, 241, 0.4)',
        textColor: 'text-indigo-400',
        badge: 'Moderate Health',
        bgBadge: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
      };
    } else {
      return {
        stroke: '#f43f5e',
        glow: 'rgba(244, 63, 94, 0.4)',
        textColor: 'text-rose-400',
        badge: 'High Diligence Flag',
        bgBadge: 'bg-rose-500/10 border-rose-500/30 text-rose-400'
      };
    }
  };

  const theme = getScoreTheme(score);

  return (
    <>
      <div className="relative flex flex-col items-center justify-between p-5 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-lg">
        <div className="w-full flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Meritocracy Score
            </h4>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-400 transition-colors font-medium"
            title="Inspect 5-pillar breakdown"
          >
            <span>Breakdown</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div 
          className="relative flex items-center justify-center my-2 cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            className="w-44 h-44 transform -rotate-135 drop-shadow-md"
            viewBox="0 0 160 160"
          >
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#1e293b"
              strokeWidth="10"
              strokeDasharray={arcLength}
              strokeDashoffset={0}
              strokeLinecap="round"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={theme.stroke}
              strokeWidth="10"
              strokeDasharray={arcLength}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                filter: `drop-shadow(0 0 8px ${theme.glow})`
              }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-4xl font-extrabold font-mono text-white tracking-tighter">
              {score}
            </span>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
              Score / 100
            </span>
            <div className={`mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${theme.bgBadge}`}>
              {theme.badge}
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#1f2e4a] text-center">
          <div className="bg-[#131d31] p-2 rounded-lg">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Efficiency</span>
            <span className="text-xs font-mono font-bold text-slate-200">
              {startup?.scoreBreakdown?.efficiency?.score || 0}/100
            </span>
          </div>
          <div className="bg-[#131d31] p-2 rounded-lg">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Consistency</span>
            <span className="text-xs font-mono font-bold text-slate-200">
              {startup?.scoreBreakdown?.claimConsistency?.score || 0}/100
            </span>
          </div>
        </div>

        <div className="mt-3 w-full text-center">
          <p className="text-[10.5px] font-medium text-amber-400/90 tracking-tight flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0" />
            <span>Screening aid only. Not investment advice.</span>
          </p>
        </div>
      </div>

      <ScoreBreakdownModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        startup={startup}
      />
    </>
  );
};

export const ClaimCheckSplit = ({ startup, isFounderMode = false }) => {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [activeClaimId, setActiveClaimId] = useState(null);

  const claims = startup?.claims || [];

  const filteredClaims = claims.filter(c => {
    if (filterSeverity === 'all') return true;
    return c.severity === filterSeverity;
  });

  const redCount = claims.filter(c => c.severity === 'red').length;
  const amberCount = claims.filter(c => c.severity === 'amber').length;
  const greenCount = claims.filter(c => c.severity === 'green').length;

  return (
    <div className="w-full flex flex-col rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-xl overflow-hidden">
      <div className="p-5 md:p-6 border-b border-[#1f2e4a] bg-[#111927]/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Claim Check Comparison Engine
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  Dual-Audit Matrix
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isFounderMode 
                  ? "Audit your pitch deck claims against your live ledger before sharing with institutional angels & VCs"
                  : "Automated diligence cross-referencing pitch memo statements against self-reported financial ledgers"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterSeverity === 'all'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({claims.length})
          </button>
          <button
            onClick={() => setFilterSeverity('red')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              filterSeverity === 'red'
                ? 'bg-rose-500/25 text-rose-300 border border-rose-500/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-rose-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Large Discrepancies ({redCount})
          </button>
          <button
            onClick={() => setFilterSeverity('amber')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              filterSeverity === 'amber'
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-amber-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Minor Gaps ({amberCount})
          </button>
          <button
            onClick={() => setFilterSeverity('green')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              filterSeverity === 'green'
                ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-emerald-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Verified ({greenCount})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#1f2e4a] bg-[#0b101c]">
        <div className="p-4 px-6 border-b md:border-b-0 md:border-r border-[#1f2e4a] flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-200">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              1. Extracted Pitch Claims
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Source: Pitch Deck & Memo AI Extraction
          </span>
        </div>

        <div className="p-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-200">
            <Database className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              2. Self-Reported Ledger
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Audited Reconciliation Stream
          </span>
        </div>
      </div>

      <div className="divide-y divide-[#1f2e4a]/70">
        {filteredClaims.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2 opacity-80" />
            <p className="text-sm">No claims found for this filter severity.</p>
          </div>
        ) : (
          filteredClaims.map((claim) => {
            const isRed = claim.severity === 'red';
            const isAmber = claim.severity === 'amber';

            const badgeBg = isRed
              ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
              : isAmber
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
              : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300';

            const badgeIcon = isRed ? (
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            ) : isAmber ? (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            );

            const badgeLabel = isRed
              ? 'Large Discrepancy'
              : isAmber
              ? 'Minor Gap'
              : 'Verified Ledger Match';

            return (
              <div 
                key={claim.id} 
                className={`grid grid-cols-1 md:grid-cols-2 transition-colors ${
                  activeClaimId === claim.id ? 'bg-[#142038]' : 'hover:bg-[#111a2e]'
                }`}
                onClick={() => setActiveClaimId(activeClaimId === claim.id ? null : claim.id)}
              >
                <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-[#1f2e4a] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {claim.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Period: {claim.auditedPeriod}
                      </span>
                    </div>

                    <p className="text-sm text-slate-100 font-medium leading-relaxed italic border-l-2 border-indigo-500/60 pl-3 py-0.5">
                      "{claim.pitchClaim}"
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                        Claimed Metric
                      </span>
                      <span className="text-base font-bold font-mono text-indigo-300">
                        {claim.claimedValue}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Deck Memo</span>
                  </div>
                </div>

                <div className="p-5 md:p-6 flex flex-col justify-between bg-slate-900/30">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeBg}`}>
                        {badgeIcon}
                        <span>{badgeLabel}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300">
                        {claim.delta}
                      </span>
                    </div>

                    <div className="mt-2">
                      <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                        Self-Reported Ledger Metric
                      </span>
                      <span className="text-base font-bold font-mono text-emerald-400">
                        {claim.ledgerValue}
                      </span>
                    </div>

                    <div className="mt-3 p-3 rounded-lg bg-[#090d16] border border-[#1f2e4a]">
                      <div className="text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                        <Database className="w-3 h-3 text-emerald-400" />
                        <span>Reconciliation Root Cause:</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {claim.explanation}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Building className="w-3 h-3 text-slate-500" />
                      <span>Ledger: {claim.ledgerSource}</span>
                    </span>
                    <button 
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium underline flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Diligence drilldown for [${claim.category}]:\n\nClaimed: ${claim.claimedValue}\nLedger: ${claim.ledgerValue}\nSource: ${claim.ledgerSource}\nAudit Period: ${claim.auditedPeriod}`);
                      }}
                    >
                      Audit Trail
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-4 px-6 bg-[#090d16] border-t border-[#1f2e4a] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Claim Check highlights variances impartially without moral judgment or punitive labels.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-slate-500">
            Reconciled: {claims.length} of {claims.length} assertions
          </span>
        </div>
      </div>
    </div>
  );
};

export const TrancheSimulation = ({ startup }) => {
  const [unlockedStepOverrides, setUnlockedStepOverrides] = useState({});

  const handleSimulateNextTranche = (stepIndex) => {
    setUnlockedStepOverrides(prev => ({
      ...prev,
      [startup.id]: [...(prev[startup.id] || []), stepIndex]
    }));
  };

  const startupOverrides = unlockedStepOverrides[startup?.id] || [];
  const baseTranches = startup?.tranches || [];
  const tranches = baseTranches.map((t, idx) => {
    if (startupOverrides.includes(idx)) {
      return {
        ...t,
        status: 'released',
        currentProgress: 100,
        currentMetric: 'Milestone verified via automated ledger API',
        releaseDate: 'Unlocked Just Now (Simulated)'
      };
    }
    if (startupOverrides.includes(idx - 1) && t.status === 'locked') {
      return {
        ...t,
        status: 'in_progress',
        currentProgress: 35
      };
    }
    return t;
  });

  const totalRound = startup?.askingRound || "₹1.00 Cr";

  return (
    <div className="w-full flex flex-col rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-xl overflow-hidden">
      <div className="p-5 md:p-6 border-b border-[#1f2e4a] bg-[#111927]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Milestone Escrow Tranche Simulator
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase font-bold tracking-wide">
                Simulation: No real money moves
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Smart-contract style milestone escrow safeguarding round allocation: {totalRound}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Escrow Protocol</span>
          <span className="text-xs font-mono font-semibold text-emerald-400">Milestone Governed</span>
        </div>
      </div>

      <div className="p-4 px-6 border-b border-[#1f2e4a] bg-[#0c1220] flex items-center justify-between text-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-slate-400">Release Cadence:</span>
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Tranche 1 (40% Upfront)</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          <div className="flex items-center gap-1.5 text-indigo-400 font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>Tranche 2 (30% at MRR)</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          <div className="flex items-center gap-1.5 text-slate-400 font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span>Tranche 3 (30% Retention)</span>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {tranches.map((tranche, idx) => {
          const isReleased = tranche.status === 'released';
          const isInProgress = tranche.status === 'in_progress';

          return (
            <div
              key={tranche.step}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-all relative ${
                isReleased
                  ? 'border-emerald-500/40 bg-emerald-500/5 ring-1 ring-emerald-500/20'
                  : isInProgress
                  ? 'border-indigo-500/40 bg-indigo-500/5 ring-1 ring-indigo-500/20'
                  : 'border-slate-800 bg-[#090d16]/70 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-slate-400">
                  Step 0{tranche.step}
                </span>

                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isReleased 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : isInProgress
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 animate-pulse'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {isReleased ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Released</span>
                    </>
                  ) : isInProgress ? (
                    <>
                      <Clock className="w-3 h-3 text-indigo-400" />
                      <span>In Progress</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>Locked</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {tranche.title}
                </h4>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-mono font-extrabold text-white">
                    {tranche.amount}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ({tranche.allocation} of Round)
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#090d16] border border-[#1f2e4a] text-xs space-y-1.5 mb-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Milestone Condition:
                  </span>
                  <p className="text-slate-200 font-medium leading-relaxed">
                    {tranche.milestone}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Audit: {tranche.condition}
                  </p>
                </div>
              </div>

              <div className="mt-2">
                {isInProgress && (
                  <div className="space-y-1.5 mb-3">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-indigo-300">{tranche.currentMetric}</span>
                      <span className="text-slate-400 font-bold">{tranche.currentProgress || 0}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${tranche.currentProgress || 0}%` }}
                      />
                    </div>
                  </div>
                )}

                {isInProgress ? (
                  <button
                    onClick={() => handleSimulateNextTranche(idx)}
                    className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-indigo-600/20"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Simulate Unlock ({tranche.allocation})</span>
                  </button>
                ) : isReleased ? (
                  <div className="text-center py-1 text-xs font-mono text-emerald-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Disbursed • {tranche.releaseDate}</span>
                  </div>
                ) : (
                  <div className="text-center py-1 text-xs font-mono text-slate-500 flex items-center justify-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Awaiting Step 0{idx} Verification</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 px-6 bg-[#090d16] border-t border-[#1f2e4a] flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span className="text-slate-300 font-semibold">
            Simulation Sandbox Environment:
          </span>
          <span>
            Demonstrates milestone-based capital disbursement without touching banking rail liquidity.
          </span>
        </div>
        <span className="text-[11px] font-mono text-amber-400/80 uppercase tracking-widest hidden sm:inline">
          Simulation: No real money moves
        </span>
      </div>
    </div>
  );
};

const CustomRunwayTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0e1524] border border-[#1f2e4a] p-3 rounded-xl shadow-xl font-mono text-xs">
        <p className="text-slate-300 font-bold mb-1.5 border-b border-slate-800 pb-1">
          Projection: {label}
        </p>
        <div className="space-y-1">
          <p className="text-indigo-400 flex items-center justify-between gap-4">
            <span>Stressed Cash:</span>
            <span className="font-bold">₹{payload[0]?.value} Lakh</span>
          </p>
          {payload[1] && (
            <p className="text-slate-400 flex items-center justify-between gap-4">
              <span>Baseline Cash:</span>
              <span className="font-bold">₹{payload[1]?.value} Lakh</span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const RunwayStressTester = ({ startup }) => {
  const [marketingShock, setMarketingShock] = useState(0);
  const [techHires, setTechHires] = useState(0);

  const initialCash = startup?.financials?.currentCashReserve || 7500000;
  const baseBurn = startup?.financials?.monthlyBurnBase || 620000;
  const currentMrr = startup?.financials?.currentMrr || 480000;
  const techSalary = startup?.financials?.avgTechSalary || 180000;

  const stressResults = useMemo(() => {
    return calculateRunwayProjection({
      initialCash,
      baseMonthlyBurn: baseBurn,
      marketingShockPercent: marketingShock,
      techHiresCount: techHires,
      techSalaryPerHire: techSalary,
      currentMrr: currentMrr,
      totalMonths: 18
    });
  }, [initialCash, baseBurn, marketingShock, techHires, techSalary, currentMrr]);

  const {
    projectionData,
    depletionMonthIndex,
    stressedRunwayMonths,
    baseRunwayMonths,
    stressedMonthlyBurn,
    netBurnDelta,
    survivalRate
  } = stressResults;

  const depletionLabel = depletionMonthIndex ? `M${depletionMonthIndex}` : null;

  const handleReset = () => {
    setMarketingShock(0);
    setTechHires(0);
  };

  const isShockActive = marketingShock !== 0 || techHires > 0;

  return (
    <div className="w-full flex flex-col rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-xl overflow-hidden">
      <div className="p-5 md:p-6 border-b border-[#1f2e4a] bg-[#111927]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Runway Stress Tester & What-If Simulator
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Recharts Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate market contraction, ad-rate inflation, and aggressive headcount expansion
            </p>
          </div>
        </div>

        {isShockActive && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sliders</span>
          </button>
        )}
      </div>

      <div className="p-5 md:p-6 border-b border-[#1f2e4a] bg-[#0c1220] grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl bg-[#111a2c] border border-[#1f2e4a]/80">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="marketing-shock-slider" className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Monthly Marketing Shock</span>
            </label>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
              marketingShock > 0 
                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30' 
                : marketingShock < 0 
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
                : 'bg-slate-800 text-slate-300'
            }`}>
              {marketingShock > 0 ? `+${marketingShock}%` : `${marketingShock}%`}
            </span>
          </div>

          <input
            id="marketing-shock-slider"
            type="range"
            min="-50"
            max="50"
            step="5"
            value={marketingShock}
            onChange={(e) => setMarketingShock(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
            <span>-50% (Austerity)</span>
            <span>0% (Baseline)</span>
            <span>+50% (CAC Inflation)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Simulates digital acquisition price surge or ad account performance changes.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#111a2c] border border-[#1f2e4a]/80">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="tech-hires-slider" className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span>Add Tech Hires</span>
            </label>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              +{techHires} Engineer{techHires !== 1 ? 's' : ''} ({formatINR(techHires * techSalary)}/mo)
            </span>
          </div>

          <input
            id="tech-hires-slider"
            type="range"
            min="0"
            max="5"
            step="1"
            value={techHires}
            onChange={(e) => setTechHires(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
            <span>0 Hires</span>
            <span>+1</span>
            <span>+2</span>
            <span>+3</span>
            <span>+4</span>
            <span>+5 Sr. Devs</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Adds fully burdened compensation of {formatINR(techSalary)}/mo per engineer.
          </p>
        </div>
      </div>

      <div className="p-5 md:p-6 border-b border-[#1f2e4a] bg-[#090d16] grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
            Stressed Gross Burn
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-white">
              {formatINR(stressedMonthlyBurn)}
            </span>
            <span className="text-xs text-slate-400">/mo</span>
          </div>
          <span className={`text-[10px] font-mono font-medium block mt-1 ${
            netBurnDelta > 0 ? 'text-rose-400' : netBurnDelta < 0 ? 'text-emerald-400' : 'text-slate-400'
          }`}>
            {netBurnDelta > 0 ? `+${formatINR(netBurnDelta)}/mo increase` : netBurnDelta < 0 ? `${formatINR(netBurnDelta)}/mo reduction` : 'Identical to baseline'}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
            Projected Runway
          </span>
          <div className="flex items-baseline gap-2">
            <span className={`text-xl font-bold font-mono ${
              stressedRunwayMonths < 6 ? 'text-rose-400' : stressedRunwayMonths < 10 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {stressedRunwayMonths}
            </span>
            <span className="text-xs text-slate-400">Months</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 block mt-1">
            Baseline: {baseRunwayMonths} Months
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
            Zero-Cash Depletion
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-amber-300">
              {depletionMonthIndex ? `Month ${depletionMonthIndex}` : '> 18 Months'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 block mt-1">
            {depletionMonthIndex ? 'Requires Series A bridge' : 'Sufficient buffer'}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
            Resilience Index
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-indigo-300">
              {survivalRate}%
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400"
              style={{ width: `${survivalRate}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 bg-[#0e1524]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              18-Month Liquidity Trajectory (₹ Lakhs)
            </span>
            {depletionLabel && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                Depletion Marker: {depletionLabel}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-indigo-500" />
              <span>Stressed Trajectory</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-slate-500" />
              <span>Baseline Trend</span>
            </div>
          </div>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={projectionData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="stressedCashGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.55} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="baselineCashGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1f2e4a" vertical={false} />
              
              <XAxis 
                dataKey="month" 
                stroke="#64748b" 
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }} 
              />
              <YAxis 
                stroke="#64748b" 
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                unit="L"
              />

              <Tooltip content={<CustomRunwayTooltip />} />

              <Area
                type="monotone"
                dataKey="baselineCash"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#baselineCashGradient)"
                name="Baseline Cash"
              />

              <Area
                type="monotone"
                dataKey="stressedCash"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#stressedCashGradient)"
                name="Stressed Cash"
              />

              {depletionLabel && (
                <ReferenceLine
                  x={depletionLabel}
                  stroke="#f43f5e"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  label={{
                    value: `Depletion: ${depletionLabel}`,
                    fill: '#f43f5e',
                    fontSize: 10,
                    position: 'top',
                    fontFamily: 'JetBrains Mono'
                  }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 p-3 rounded-xl bg-[#090d16] border border-[#1f2e4a] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-4 h-4 ${stressedRunwayMonths < 8 ? 'text-amber-400' : 'text-emerald-400'}`} />
            <span>
              {stressedRunwayMonths < 8
                ? `Critical runway squeeze: At ${stressedRunwayMonths} months, bridge equity or tranche unlock must occur before ${depletionLabel || 'Q4'}.`
                : `Comfortable runway buffer: Company sustains ${stressedRunwayMonths} months with dynamic hiring shocks.`}
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-500 hidden sm:inline">
            Cash Outflow: {formatINR(stressedMonthlyBurn)}/mo
          </span>
        </div>
      </div>
    </div>
  );
};

export const PreRevenueAdvisoryHub = ({ startup }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [activeBookingAdvisor, setActiveBookingAdvisor] = useState(null);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState(null);
  const [selectedSessionTopic, setSelectedSessionTopic] = useState('Commercial Pilot Pricing');

  const filteredAdvisors = selectedCategory === 'all'
    ? MOCK_ADVISORS
    : MOCK_ADVISORS.filter(a => a.category === selectedCategory);

  const handleRunDiagnostic = () => {
    setIsDiagnosticRunning(true);
    setTimeout(() => {
      setIsDiagnosticRunning(false);
    }, 900);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const advisor = activeBookingAdvisor;
    setActiveBookingAdvisor(null);
    setBookingSuccessMsg(`Advisory sync confirmed with ${advisor.name} (${advisor.category}) on topic: "${selectedSessionTopic}". Calendar invite & prep brief dispatched!`);
    setTimeout(() => setBookingSuccessMsg(null), 6000);
  };

  const isZeroMrr = (startup?.financials?.currentMrr || 0) === 0;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#0f172a] via-[#12203b] to-[#0a1529] border border-indigo-500/30 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Pre-Revenue Launchpad & Advisory Syndicate
            </span>
            {isZeroMrr && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                ₹0 MRR Detected • Advisory Recommended
              </span>
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Turn Prototypes into High-Velocity Recurring Revenue
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
            Instead of raising premature, dilutive capital at zero MRR, connect directly with <span className="text-indigo-300 font-semibold">Serial Founders</span>, <span className="text-emerald-300 font-semibold">Business Analysts</span>, <span className="text-amber-300 font-semibold">Chartered Accountants (CAs)</span>, and <span className="text-cyan-300 font-semibold">Market Researchers</span> to validate unit economics and secure initial paying contracts.
          </p>

          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <button
              onClick={handleRunDiagnostic}
              disabled={isDiagnosticRunning}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Sparkles className={`w-4 h-4 ${isDiagnosticRunning ? 'animate-spin' : ''}`} />
              <span>{isDiagnosticRunning ? 'Synthesizing Diagnostic...' : 'Re-Run AI Startup Diagnostic'}</span>
            </button>
            <div className="text-xs text-slate-400 font-mono">
              Analyzing: <span className="text-white font-semibold">{startup?.realName || startup?.codeName}</span>
            </div>
          </div>
        </div>

        {bookingSuccessMsg && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs font-mono flex items-center gap-2.5 animate-fadeIn shadow-lg">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>{bookingSuccessMsg}</span>
          </div>
        )}
      </div>

      <div className="p-6 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-[#1f2e4a] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">
                AI Diagnostic Readiness Assessment
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated algorithmic evaluation of prototype maturity, commercial gaps, and statutory leverage
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#131d31] px-3 py-1.5 rounded-xl border border-[#1f2e4a]">
            <span className="text-xs text-slate-400">Bottleneck Diagnosis:</span>
            <span className="text-xs font-bold text-amber-300">Commercial Pilot Structure</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#111927] border border-[#1f2e4a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">Technical MVP / TRL</span>
              <span className="text-xs font-mono font-bold text-emerald-400">82% (High)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 mb-2 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '82%' }} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Working laboratory prototype validated. Ready for field alpha testing with pilot partners.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#111927] border border-[#1f2e4a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">Commercial Model</span>
              <span className="text-xs font-mono font-bold text-amber-400">38% (Critical Gap)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 mb-2 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '38%' }} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Pricing model undefined. Needs a Business Analyst to design margin payback and contract terms.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#111927] border border-[#1f2e4a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">Statutory / CA Grants</span>
              <span className="text-xs font-mono font-bold text-indigo-400">52% (Untapped)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 mb-2 overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '52%' }} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Eligible for non-dilutive DPIIT Section 80-IAC tax holiday & MSME seed funding via CA guidance.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#111927] border border-[#1f2e4a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">TAM & Market Moat</span>
              <span className="text-xs font-mono font-bold text-cyan-400">74% (Promising)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 mb-2 overflow-hidden">
              <div className="h-full bg-cyan-500 rounded-full" style={{ width: '74%' }} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Clear replacement market against imports. Requires bottom-up research to map enterprise buyers.
            </p>
          </div>
        </div>

        <div className="mt-5 p-4 rounded-xl bg-[#090d16] border border-[#1f2e4a]">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
            Recommended Advisory Roadmap to First Commercial Milestone:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-[#111a2d] border border-indigo-500/20">
              <span className="text-[10px] font-mono font-bold text-indigo-400 block mb-1">STAGE 1: STATUTORY ARCHITECTURE</span>
              <h4 className="text-xs font-bold text-white mb-1">Chartered Accountant (CA) Consultation</h4>
              <p className="text-[11px] text-slate-400">Secure non-dilutive government grants (₹15L-₹25L) & formalize clean cap table.</p>
            </div>
            <div className="p-3 rounded-lg bg-[#111a2d] border border-emerald-500/20">
              <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-1">STAGE 2: FINANCIAL MODELING</span>
              <h4 className="text-xs font-bold text-white mb-1">Business Analyst Working Session</h4>
              <p className="text-[11px] text-slate-400">Structure pilot contract economics, pricing tiers, and payback periods.</p>
            </div>
            <div className="p-3 rounded-lg bg-[#111a2d] border border-amber-500/20">
              <span className="text-[10px] font-mono font-bold text-amber-400 block mb-1">STAGE 3: FIRST ENTERPRISE PILOT</span>
              <h4 className="text-xs font-bold text-white mb-1">Serial Founder Deal Mentorship</h4>
              <p className="text-[11px] text-slate-400">Close first 2 paying corporate pilot contracts to achieve early recurring MRR.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">
              Connect with Verified Advisors & Mentors
            </h3>
            <p className="text-xs text-slate-400">
              Hand-picked veterans ready to guide pre-revenue founders to product-market fit
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'Serial Founder', label: '🚀 Big Founders' },
              { id: 'Business Analyst', label: '📊 Business Analysts' },
              { id: 'Chartered Accountant (CA)', label: '⚖️ CAs & Tax Leads' },
              { id: 'Market Researcher', label: '🔬 Market Researchers' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-[#111927] text-slate-400 hover:text-white border border-[#1f2e4a]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAdvisors.map((advisor) => (
            <div
              key={advisor.id}
              className="p-5 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] hover:border-indigo-500/40 transition-all flex flex-col justify-between shadow-lg group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={advisor.avatar}
                      alt={advisor.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#1f2e4a] group-hover:border-indigo-400 transition-colors"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{advisor.name}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                          {advisor.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium">{advisor.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold bg-[#131d31] px-2 py-1 rounded-lg border border-[#1f2e4a]">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{advisor.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">
                      Proven Track Record:
                    </span>
                    <p className="text-slate-300 font-medium">{advisor.trackRecord}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#090d16] border border-[#1f2e4a] text-xs">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-0.5">
                      Advisory Guidance Offer:
                    </span>
                    <p className="text-slate-400 leading-relaxed">{advisor.guidanceOffer}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1f2e4a] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {advisor.sessionsCount} Founder Sprints Completed
                </span>
                <button
                  onClick={() => setActiveBookingAdvisor(advisor)}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Connect & Book Session</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeBookingAdvisor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0e1524] border border-[#1f2e4a] rounded-2xl shadow-2xl p-6">
            <div className="flex items-start justify-between pb-4 border-b border-[#1f2e4a]">
              <div>
                <h3 className="text-base font-bold text-white">
                  Schedule Advisory Session
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  With {activeBookingAdvisor.name} ({activeBookingAdvisor.category})
                </p>
              </div>
              <button
                onClick={() => setActiveBookingAdvisor(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Primary Focus / Deliverable:
                </label>
                <select
                  value={selectedSessionTopic}
                  onChange={(e) => setSelectedSessionTopic(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090d16] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Commercial Pilot Pricing & LOI Structure">Commercial Pilot Pricing & LOI Structure</option>
                  <option value="DPIIT Section 80-IAC & MSME Grant Compliance (CA)">DPIIT Section 80-IAC & MSME Grant Compliance (CA)</option>
                  <option value="Bottom-up TAM/SAM Market Sizing">Bottom-up TAM/SAM Market Sizing</option>
                  <option value="Unit Economics & Gross Margin Modeling">Unit Economics & Gross Margin Modeling</option>
                  <option value="Distributor Channel Strategy in Tier-2/3 Hubs">Distributor Channel Strategy in Tier-2/3 Hubs</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-[#131d31] border border-[#1f2e4a] text-xs space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 block">
                  Included in Venture Pulse AI Launchpad:
                </span>
                <p className="text-slate-300">
                  • 45-minute structured sprint session
                </p>
                <p className="text-slate-300">
                  • Post-session diagnostic memo submitted directly into your Claim Check room
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveBookingAdvisor(null)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-lg shadow-indigo-600/20"
                >
                  Confirm Sync Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ==========================================================================
   SECTION 5: NAVBAR, FOUNDER STUDIO & INVESTOR TERMINAL DOORS
   ========================================================================== */

export const Navbar = ({
  activeDoor,
  setActiveDoor,
  selectedStartupId,
  setSelectedStartupId,
  startupsList = MOCK_STARTUPS,
  isSampleDataLoaded,
  toggleSampleData,
  isBlindMode,
  currentUser,
  onOpenAuthModal,
  onOpenProfileModal
}) => {
  const [isTrustModalOpen, setIsTrustModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentStartup = (startupsList || MOCK_STARTUPS).find(s => s.id === selectedStartupId) || (startupsList || MOCK_STARTUPS)[0];

  const getTrustBadge = (trustLevel) => {
    switch (trustLevel) {
      case 'verified':
        return {
          label: 'Verified - AA Sandbox Roadmap',
          icon: BadgeCheck,
          styles: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400',
        };
      case 'registered':
        return {
          label: 'Registered - MSME/DPIIT',
          icon: ShieldCheck,
          styles: 'bg-blue-500/15 border-blue-500/40 text-blue-400',
        };
      case 'self_reported':
      default:
        return {
          label: 'Self-Reported',
          icon: ShieldAlert,
          styles: 'bg-amber-500/15 border-amber-500/40 text-amber-400',
        };
    }
  };

  const trustBadge = getTrustBadge(currentStartup.trustLevel);
  const TrustIcon = trustBadge.icon;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#1f2e4a] bg-[#090d16]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
                    VenturePulse <span className="text-emerald-400 font-mono text-xs font-semibold px-1 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/30">AI</span>
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-tight block -mt-0.5 font-mono">
                  Autonomous Diligence & Runway OS
                </span>
              </div>
            </div>

            <div className="flex items-center bg-[#111927] p-1 rounded-xl border border-[#1f2e4a] shadow-inner">
              <button
                onClick={() => setActiveDoor('founder')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeDoor === 'founder'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Founder CFO Studio</span>
              </button>

              <button
                onClick={() => setActiveDoor('investor')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeDoor === 'investor'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Investor Diligence Terminal</span>
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsTrustModalOpen(true)}
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all hover:brightness-110 ${trustBadge.styles}`}
                title="Click to view Trust Ladder progression details"
              >
                <TrustIcon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate max-w-[130px] lg:max-w-[180px]">{trustBadge.label}</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs font-medium text-slate-200 hover:border-slate-600 transition-colors"
                >
                  <span className="font-mono text-emerald-400 font-bold">
                    {isBlindMode && activeDoor === 'investor' ? currentStartup.codeName : currentStartup.realName}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#0e1524] border border-[#1f2e4a] rounded-xl shadow-2xl py-2 z-50 animate-fadeIn">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Select Demo Profile
                    </div>
                    {startupsList.map((startup) => (
                      <button
                        key={startup.id}
                        onClick={() => {
                          setSelectedStartupId(startup.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/60 transition-colors ${
                          selectedStartupId === startup.id ? 'bg-indigo-600/20 text-white font-semibold' : 'text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-medium">
                            {isBlindMode && activeDoor === 'investor' ? startup.codeName : startup.realName}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {startup.sector}
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 font-bold">
                          {startup.meritocracyScore}/100
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={toggleSampleData}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSampleDataLoaded
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40'
                    : 'bg-[#111927] border border-[#1f2e4a] text-slate-300 hover:text-white hover:border-amber-500/50'
                }`}
                title="Instant hackathon demo data loader"
              >
                <Zap className={`w-3.5 h-3.5 ${isSampleDataLoaded ? 'fill-slate-950' : 'text-amber-400'}`} />
                <span className="hidden sm:inline">⚡ Load Sample Data</span>
                <span className="sm:hidden font-mono">Sample</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenProfileModal}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111927] border border-[#1f2e4a] hover:border-indigo-500/60 text-xs transition-all shadow-sm"
                  title="Click to view your personal credentials & passport details"
                >
                  <img 
                    src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
                    alt={currentUser?.name || "User"} 
                    className="w-5 h-5 rounded-full object-cover border border-[#1f2e4a]" 
                  />
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="font-bold text-white text-[11px] leading-tight truncate max-w-[110px]">
                      {currentUser?.name || "User"}
                    </span>
                    <span className={`text-[9px] font-mono leading-none capitalize font-semibold ${
                      currentUser?.role === 'founder' ? 'text-emerald-400' : 'text-indigo-400'
                    }`}>
                      {currentUser?.role === 'founder' ? 'Founder Persona' : 'VC Persona'}
                    </span>
                  </div>
                  <UserCheck className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                </button>

                <button
                  onClick={onOpenAuthModal}
                  className="px-2.5 py-1.5 rounded-xl bg-[#131d31] hover:bg-slate-800 border border-[#1f2e4a] text-[11px] font-semibold text-indigo-300 hover:text-white transition-colors"
                  title="Switch profile or register new personal details"
                >
                  Switch / Register
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-1.5 bg-[#070b12] border-t border-[#1f2e4a]/60 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Local Diligence Engine Active (Offline Resilient)</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">
              Active Environment: <span className="text-slate-200 capitalize">{activeDoor} Mode</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isSampleDataLoaded && (
              <span className="text-amber-400 font-bold flex items-center gap-1 text-[10px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WATERMARK: HACKATHON LIVE RUNTIME</span>
              </span>
            )}
            <span className="text-slate-500">Node Sync: 2026.10-Live</span>
          </div>
        </div>
      </header>

      <TrustLadderModal
        isOpen={isTrustModalOpen}
        onClose={() => setIsTrustModalOpen(false)}
        currentStartup={currentStartup}
      />
    </>
  );
};

export const FounderStudio = ({
  startup,
  isSampleDataLoaded,
  onOpenTrustModal
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSyncingLedger, setIsSyncingLedger] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState(null);

  const financials = startup?.financials || {};
  const currentCash = financials.currentCashReserve || 7500000;
  const monthlyBurn = financials.monthlyBurnBase || 620000;
  const currentMrr = financials.currentMrr || 480000;
  const netBurn = Math.max(0, monthlyBurn - currentMrr);
  const runwayMonths = (currentCash / (netBurn || 100000)).toFixed(1);

  const handleSimulateSync = () => {
    setIsSyncingLedger(true);
    setSyncFeedback(null);
    setTimeout(() => {
      setIsSyncingLedger(false);
      setSyncFeedback("Sync complete: 148 transactions ingested from Razorpay & HDFC current account.");
      setTimeout(() => setSyncFeedback(null), 4000);
    }, 1200);
  };

  return (
    <div className={`space-y-6 ${isSampleDataLoaded ? 'has-sample-watermark' : ''}`}>
      <div className="rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1d33] to-[#0a1424] border border-[#1f2e4a] p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Founder Mode Active
              </span>
              <span className="text-xs font-mono text-slate-400">
                Stage: {startup.stage} • Founded {startup.foundedYear}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {startup.realName} — CFO Command Center
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
              Monitor runway dynamics, reconcile pitch claims against self-reported ledgers, and track milestone-governed tranche releases.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleSimulateSync}
              disabled={isSyncingLedger}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#131e33] hover:bg-[#1a2947] border border-[#1f2e4a] text-xs font-semibold text-slate-200 transition-colors shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncingLedger ? 'animate-spin' : ''}`} />
              <span>{isSyncingLedger ? 'Ingesting Feeds...' : 'Sync Bank & Payment Feeds'}</span>
            </button>

            <button
              onClick={onOpenTrustModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-bold text-white transition-all shadow-lg shadow-emerald-600/20"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Elevate Trust Ladder</span>
            </button>
          </div>
        </div>

        {syncFeedback && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{syncFeedback}</span>
          </div>
        )}
      </div>

      {currentMrr === 0 && (
        <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-indigo-500/15 to-emerald-500/15 border border-amber-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn shadow-xl">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex-shrink-0">
              <Lightbulb className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Zero Recurring Revenue Detected (Pre-Revenue Stage)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  Advisory Launchpad Suggested
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Don't sell cheap equity or pitch empty projections. Venture Pulse AI suggests connecting with <strong className="text-white">Big Founders, Business Analysts, Chartered Accountants (CAs), and Market Researchers</strong> to build your unit economics & pilot contracts first.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('advisory_hub')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold whitespace-nowrap shadow-lg shadow-indigo-600/20 flex items-center gap-2 self-start md:self-auto transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enter Advisory Launchpad</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-medium">Bank Balance</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl md:text-2xl font-mono font-bold text-white">
            {formatINR(currentCash)}
          </div>
          <span className="text-[11px] font-mono text-emerald-400 block mt-1">
            Reconciled across 2 accounts
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-medium">Net Monthly Burn</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl md:text-2xl font-mono font-bold text-rose-300">
            {formatINR(netBurn)}
            <span className="text-xs text-slate-400 font-normal ml-1">/mo</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 block mt-1">
            Gross Burn: {formatINR(monthlyBurn)}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-medium">Zero-Cash Runway</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl md:text-2xl font-mono font-bold text-amber-300">
            {runwayMonths}
            <span className="text-xs text-slate-400 font-normal ml-1">Months</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 block mt-1">
            Based on current velocity
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-medium">Monthly Revenue</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-xl md:text-2xl font-mono font-bold text-indigo-300">
            {formatINR(currentMrr)}
          </div>
          <span className="text-[11px] font-mono text-indigo-400 block mt-1">
            Gross Margin: {financials.grossMargin}%
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-medium">Trust Tier</span>
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-sm font-bold text-white truncate">
            {startup.trustDetails.type}
          </div>
          <span className="text-[10px] font-mono text-slate-400 block mt-1">
            Level {startup.trustDetails.ladderLevel} of 3 Authenticated
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-[#1f2e4a] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'overview'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Overview & Merit Diagnostics
        </button>
        <button
          onClick={() => setActiveTab('claim_check')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'claim_check'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Pre-Diligence Claim Check</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-900/80 text-indigo-200">
            {startup.claims.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('runway')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'runway'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Runway Stress Simulator
        </button>
        <button
          onClick={() => setActiveTab('tranches')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'tranches'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Milestone Tranches</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
            Sim
          </span>
        </button>

        <button
          onClick={() => setActiveTab('advisory_hub')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'advisory_hub'
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Pre-Revenue Advisory Launchpad</span>
          {currentMrr === 0 ? (
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold uppercase animate-pulse">
              Suggested
            </span>
          ) : (
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
              Syndicate
            </span>
          )}
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <MeritocracyGauge startup={startup} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base font-bold text-white">
                    Institutional Investor Readiness Audit
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  88% Ready for Pre-Series A
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#131d31] border border-[#1f2e4a] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-white">MCA & DPIIT Startup Certification</div>
                      <div className="text-[11px] text-slate-400 font-mono">DPIIT-IND-2024-88492 Verified</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Compliant
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#131d31] border border-[#1f2e4a] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-white">Automated Ledger Feed Ingestion</div>
                      <div className="text-[11px] text-slate-400 font-mono">Stripe/Razorpay Webhooks Synced</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Active
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#131d31] border border-[#1f2e4a] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-white">Deck Claims Variance Warning</div>
                      <div className="text-[11px] text-slate-400">
                        {startup.claims.filter(c => c.severity === 'amber' || c.severity === 'red').length} claims show variance against ledger.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('claim_check')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                  >
                    <span>Fix In Deck</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <RunwayStressTester startup={startup} />
          </div>
        </div>
      )}

      {activeTab === 'claim_check' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-indigo-300 block mb-0.5">
                Founder Recommendation: Reconcile Deck Metrics Before VC Sharing
              </span>
              <p className="text-slate-300">
                Institutional venture funds cross-examine pitch decks against bank receipts. Fixing minor discrepancies (e.g., SIM costs or non-recurring setup fees) elevates your Meritocracy Score from Tier-2 to Tier-1.
              </p>
            </div>
          </div>
          <ClaimCheckSplit startup={startup} isFounderMode={true} />
        </div>
      )}

      {activeTab === 'runway' && (
        <div className="space-y-4">
          <RunwayStressTester startup={startup} />
        </div>
      )}

      {activeTab === 'tranches' && (
        <div className="space-y-4">
          <TrancheSimulation startup={startup} />
        </div>
      )}

      {activeTab === 'advisory_hub' && (
        <PreRevenueAdvisoryHub startup={startup} />
      )}
    </div>
  );
};

export const InvestorTerminal = ({
  startup,
  isBlindMode,
  setIsBlindMode,
  isSampleDataLoaded,
  onOpenTrustModal
}) => {
  const [activeView, setActiveView] = useState('diligence_hub');
  const [decisionState, setDecisionState] = useState(null);

  const displayName = isBlindMode 
    ? `${startup.codeName} — ${startup.hubType}`
    : `${startup.realName} — ${startup.city}`;

  const founders = startup.founders || [];

  return (
    <div className={`space-y-6 ${isSampleDataLoaded ? 'has-sample-watermark' : ''}`}>
      <div className="rounded-2xl bg-gradient-to-r from-[#0c1424] via-[#101b33] to-[#0a1120] border border-[#1f2e4a] p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                Institutional Diligence Terminal
              </span>
              <span className="text-xs font-mono text-slate-400">
                Round Size: {startup.askingRound} • Stage: {startup.stage}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>{displayName}</span>
              {isBlindMode && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <EyeOff className="w-3.5 h-3.5" />
                  Blind Mode Active
                </span>
              )}
            </h1>

            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
              {isBlindMode 
                ? "Pedigree-blind evaluation mode active. Founder identities, faces, and collegiate alma maters are masked to eliminate prestige bias."
                : "Standard diligence view with founder pedigree, identity authentication, and verified ledger trails."}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#131d31] p-3 rounded-2xl border border-[#1f2e4a] shadow-inner">
            <div className="flex items-center gap-2">
              {isBlindMode ? (
                <EyeOff className="w-5 h-5 text-emerald-400" />
              ) : (
                <Eye className="w-5 h-5 text-indigo-400" />
              )}
              <div>
                <span className="text-xs font-bold text-white block">
                  Pedigree-Blind Mode
                </span>
                <span className="text-[10px] text-slate-400">
                  {isBlindMode ? 'Masks Names, Faces & Colleges' : 'Reveals Founder Identities'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsBlindMode(!isBlindMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#090d16] ${
                isBlindMode ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
              role="switch"
              aria-checked={isBlindMode}
              title="Toggle Pedigree-Blind evaluation"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isBlindMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {isBlindMode ? 'Anonymized Founder Profiles (Bias-Free)' : 'Founding Team Credentials'}
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {isBlindMode ? 'Pedigree Obfuscated' : 'Verified via LinkedIn / MCA'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {founders.map((founder, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${
                isBlindMode 
                  ? 'bg-[#111927] border-emerald-500/20 shadow-sm' 
                  : 'bg-[#111927] border-[#1f2e4a]'
              }`}
            >
              {isBlindMode ? (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-900 to-slate-800 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm shadow-inner">
                  #{idx + 1}
                </div>
              ) : (
                <img 
                  src={founder.avatar} 
                  alt={founder.realName} 
                  className="w-12 h-12 rounded-xl object-cover border border-[#1f2e4a]" 
                />
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white truncate">
                    {isBlindMode ? founder.blindName : founder.realName}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-400">
                    {founder.role}
                  </span>
                </div>

                <div className="text-xs text-indigo-300 font-mono mt-0.5 truncate">
                  {isBlindMode ? founder.blindPedigree : founder.realPedigree}
                </div>

                <div className="text-[11px] text-slate-400 mt-1">
                  Track Record: {founder.experience}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-[#1f2e4a] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveView('diligence_hub')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeView === 'diligence_hub'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Executive Diligence Hub</span>
        </button>

        <button
          onClick={() => setActiveView('claim_check')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeView === 'claim_check'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Claim Check Matrix</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-900/80 text-indigo-200 font-mono">
            {startup.claims.length}
          </span>
        </button>

        <button
          onClick={() => setActiveView('runway_stress')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeView === 'runway_stress'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>What-If Runway Shock Test</span>
        </button>

        <button
          onClick={() => setActiveView('tranche_escrow')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeView === 'tranche_escrow'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Tranche Escrow Governance</span>
        </button>

        <button
          onClick={() => setActiveView('advisory_syndicate')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeView === 'advisory_syndicate'
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Advisory Syndicate & Diagnostics</span>
          {startup?.financials?.currentMrr === 0 && (
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold uppercase animate-pulse">
              Pre-Rev
            </span>
          )}
        </button>
      </div>

      {activeView === 'diligence_hub' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <MeritocracyGauge startup={startup} />
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Core Investment Ratios (Verified vs Deck)
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">
                    Live Ledger Ground Truth
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Real MRR</span>
                    <span className="text-lg font-mono font-bold text-white">
                      {formatINR(startup.financials.currentMrr)}
                    </span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">Stripe/Razorpay</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Real Monthly Burn</span>
                    <span className="text-lg font-mono font-bold text-rose-300">
                      {formatINR(startup.financials.monthlyBurnBase)}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Bank outflow audit</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Audited GM</span>
                    <span className="text-lg font-mono font-bold text-indigo-300">
                      {startup.financials.grossMargin}%
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">COGS reconciled</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">True Blended CAC</span>
                    <span className="text-lg font-mono font-bold text-white">
                      ₹{startup.financials.cac}
                    </span>
                    <span className="text-[10px] text-amber-400 block mt-0.5">Includes field agents</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated LTV</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      ₹{startup.financials.ltv}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Multiple: {(startup.financials.ltv / startup.financials.cac).toFixed(1)}x
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Trust Ladder</span>
                    <span className="text-xs font-bold text-slate-200 block truncate mt-1">
                      {startup.trustDetails.type}
                    </span>
                    <button
                      onClick={onOpenTrustModal}
                      className="text-[10px] text-indigo-400 hover:underline block mt-0.5"
                    >
                      Audit Proof &rarr;
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#1f2e4a]">
                  <span className="text-xs font-semibold text-slate-300 block mb-3">
                    Investment Committee Action:
                  </span>
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() => setDecisionState('approved')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        decisionState === 'approved'
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                          : 'bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/40'
                      }`}
                    >
                      Issue Milestone Term Sheet (₹1.00 Cr)
                    </button>
                    <button
                      onClick={() => setDecisionState('audit_requested')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        decisionState === 'audit_requested'
                          ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                          : 'bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 border border-amber-500/40'
                      }`}
                    >
                      Request Claim Check Audit Clarification
                    </button>
                    <button
                      onClick={() => setDecisionState('passed')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        decisionState === 'passed'
                          ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                          : 'bg-rose-600/20 text-rose-300 hover:bg-rose-600/30 border border-rose-500/40'
                      }`}
                    >
                      Pass on Round
                    </button>
                  </div>

                  {decisionState && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 animate-fadeIn">
                      {decisionState === 'approved' && '✅ Term Sheet Draft Generated with 3-Step Milestone Escrow Conditions attached.'}
                      {decisionState === 'audit_requested' && '⚠️ Diligence RFIs dispatched to founder for amber/red ledger variances.'}
                      {decisionState === 'passed' && '❌ Opportunity archived in Deal Flow CRM with automated meritocracy score memo.'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <ClaimCheckSplit startup={startup} isFounderMode={false} />
          <RunwayStressTester startup={startup} />
        </div>
      )}

      {activeView === 'claim_check' && (
        <ClaimCheckSplit startup={startup} isFounderMode={false} />
      )}

      {activeView === 'runway_stress' && (
        <RunwayStressTester startup={startup} />
      )}

      {activeView === 'tranche_escrow' && (
        <TrancheSimulation startup={startup} />
      )}

      {activeView === 'advisory_syndicate' && (
        <PreRevenueAdvisoryHub startup={startup} />
      )}
    </div>
  );
};

/* ==========================================================================
   SECTION 6: ROOT APP ORCHESTRATOR
   ========================================================================== */

export default function App() {
  const [startupsList, setStartupsList] = useState(MOCK_STARTUPS);
  const [currentUser, setCurrentUser] = useState(MOCK_PERSONAS.investors[0]);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTrustLadderModalOpen, setIsTrustLadderModalOpen] = useState(false);

  const [activeDoor, setActiveDoor] = useState(currentUser.role === 'founder' ? 'founder' : 'investor');
  const [selectedStartupId, setSelectedStartupId] = useState(currentUser.startupId || 'startup-104');
  const [isBlindMode, setIsBlindMode] = useState(true);
  const [isSampleDataLoaded, setIsSampleDataLoaded] = useState(true);

  const currentStartup = startupsList.find(s => s.id === selectedStartupId) || startupsList[0];

  const handleToggleSampleData = () => {
    setIsSampleDataLoaded(prev => !prev);
  };

  const handleRegisterUser = ({ user, customStartup, preferredBlindMode }) => {
    setCurrentUser(user);
    
    if (customStartup) {
      setStartupsList(prev => [customStartup, ...prev]);
      setSelectedStartupId(customStartup.id);
    } else if (user.startupId) {
      setSelectedStartupId(user.startupId);
    }

    if (user.role === 'founder') {
      setActiveDoor('founder');
    } else {
      setActiveDoor('investor');
      if (preferredBlindMode !== undefined) {
        setIsBlindMode(preferredBlindMode);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar
        activeDoor={activeDoor}
        setActiveDoor={setActiveDoor}
        selectedStartupId={selectedStartupId}
        setSelectedStartupId={setSelectedStartupId}
        startupsList={startupsList}
        isSampleDataLoaded={isSampleDataLoaded}
        toggleSampleData={handleToggleSampleData}
        isBlindMode={isBlindMode}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {activeDoor === 'founder' ? (
          <FounderStudio
            startup={currentStartup}
            isSampleDataLoaded={isSampleDataLoaded}
            onOpenTrustModal={() => setIsTrustLadderModalOpen(true)}
          />
        ) : (
          <InvestorTerminal
            startup={currentStartup}
            isBlindMode={isBlindMode}
            setIsBlindMode={setIsBlindMode}
            isSampleDataLoaded={isSampleDataLoaded}
            onOpenTrustModal={() => setIsTrustLadderModalOpen(true)}
          />
        )}
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onRegisterUser={handleRegisterUser}
        currentUser={currentUser}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        currentStartup={currentStartup}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      <TrustLadderModal
        isOpen={isTrustLadderModalOpen}
        onClose={() => setIsTrustLadderModalOpen(false)}
        currentStartup={currentStartup}
      />

      <footer className="border-t border-[#1f2e4a] bg-[#070b12] py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400 font-semibold">Venture Pulse AI</span>
            <span>— Autonomous Diligence & Runway Operating System</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span className="text-amber-400/90 font-medium">
              Screening aid only. Not investment advice.
            </span>
            <span className="text-slate-400">Offline Mock Engine Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
