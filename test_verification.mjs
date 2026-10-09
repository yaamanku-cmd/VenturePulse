import { calculateRunwayProjection, formatINR } from './src/utils/formatters.js';
import { MOCK_STARTUPS, MOCK_ADVISORS, MOCK_PERSONAS, TRUST_LADDER_INFO } from './src/data/mockStartups.js';

console.log("==================================================");
console.log("  VENTURE PULSE AI - COMPLETE FEATURE CROSS-VALIDATION");
console.log("==================================================");

let testsPassed = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  [PASS] ${message}`);
    testsPassed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// 1. Cross-validate Currency & Number Formatting
console.log("\n[TEST SUITE 1] Financial Formatters");
assert(formatINR(7500000).includes("75.00 Lakh"), "₹75L formatted correctly");
assert(formatINR(12000000).includes("1.20 Cr"), "₹1.2 Cr formatted correctly");
assert(formatINR(50000).includes("50,000"), "Small amounts formatted correctly");

// 2. Cross-validate Runway Stress Calculations
console.log("\n[TEST SUITE 2] Runway Stress Tester Calculations");
const baselineTest = calculateRunwayProjection({
  initialCash: 7500000,
  baseMonthlyBurn: 620000,
  marketingShockPercent: 0,
  techHiresCount: 0,
  techSalaryPerHire: 180000,
  currentMrr: 480000,
  totalMonths: 18
});

assert(baselineTest.stressedRunwayMonths > 0, `Baseline runway calculated: ${baselineTest.stressedRunwayMonths} months`);
assert(baselineTest.stressedMonthlyBurn === 620000, `Baseline monthly gross burn is ₹6.20L`);
assert(baselineTest.projectionData.length === 18, `Generates 18 months of projection points`);

const shockedTest = calculateRunwayProjection({
  initialCash: 7500000,
  baseMonthlyBurn: 620000,
  marketingShockPercent: 50,
  techHiresCount: 3,
  techSalaryPerHire: 180000,
  currentMrr: 480000,
  totalMonths: 18
});

assert(shockedTest.stressedMonthlyBurn > baselineTest.stressedMonthlyBurn, `Stressed burn is higher: ₹${shockedTest.stressedMonthlyBurn} vs ₹${baselineTest.stressedMonthlyBurn}`);
assert(shockedTest.stressedRunwayMonths < baselineTest.stressedRunwayMonths, `Runway shrinks under shock: ${shockedTest.stressedRunwayMonths}m vs ${baselineTest.stressedRunwayMonths}m`);
assert(shockedTest.depletionMonthIndex !== null, `Depletion month successfully identified: Month ${shockedTest.depletionMonthIndex}`);

// 3. NEW FEATURE 1: Authentication & Role Gateway (Founders & Investors/VCs)
console.log("\n[TEST SUITE 3] Role Authentication & Sign-in Personas");
assert(MOCK_PERSONAS.founders.length >= 3, `Founder demo personas exist (${MOCK_PERSONAS.founders.length} profiles)`);
assert(MOCK_PERSONAS.investors.length >= 2, `Investor / VC demo personas exist (${MOCK_PERSONAS.investors.length} profiles)`);

const sampleFounder = MOCK_PERSONAS.founders[0];
const sampleVC = MOCK_PERSONAS.investors[0];
assert(sampleFounder.role === 'founder' && sampleFounder.startupId, `Founder persona binds correctly to startup`);
assert(sampleVC.role === 'investor' && sampleVC.firm && sampleVC.ticketSize, `VC persona includes institutional ticket size & firm name`);

// 4. NEW FEATURE 2: Pre-Revenue Startup & Advisory Syndicate Network
console.log("\n[TEST SUITE 4] Pre-Revenue Detection & Advisory Syndicate Network");
const preRevStartup = MOCK_STARTUPS.find(s => s.financials.currentMrr === 0);
assert(preRevStartup !== undefined, `Pre-Revenue Startup (#402 NexaSolar) exists in registry`);
assert(preRevStartup.financials.currentMrr === 0, `Pre-Revenue startup has ₹0 recurring MRR`);
assert(preRevStartup.preRevenueDetails !== undefined, `Pre-Revenue diagnostic details defined`);

assert(MOCK_ADVISORS.length >= 4, `Advisory syndicate directory has ${MOCK_ADVISORS.length} curated experts`);
assert(MOCK_ADVISORS.some(a => a.category === 'Serial Founder'), `Contains Big Founders / Serial Entrepreneurs`);
assert(MOCK_ADVISORS.some(a => a.category === 'Business Analyst'), `Contains Business Analysts`);
assert(MOCK_ADVISORS.some(a => a.category === 'Chartered Accountant (CA)'), `Contains Chartered Accountants (CA)`);
assert(MOCK_ADVISORS.some(a => a.category === 'Market Researcher'), `Contains Market Researchers`);

// 5. Cross-validate Claim Check & Trust Ladder
console.log("\n[TEST SUITE 5] Claim Check & Trust Ladder Integrity");
assert(TRUST_LADDER_INFO.length === 3, `3 Trust Ladder tiers defined`);
const startup218 = MOCK_STARTUPS.find(s => s.id === 'startup-218');
assert(startup218.claims.some(c => c.severity === 'red'), `Startup #218 contains large red discrepancies`);

// 6. Cross-validate Meritocracy Score & Tranche Escrow
console.log("\n[TEST SUITE 6] Meritocracy Score & Tranche Escrow");
MOCK_STARTUPS.forEach(s => {
  assert(s.meritocracyScore >= 0 && s.meritocracyScore <= 100, `${s.codeName} score within 0-100 range`);
  assert(s.tranches.length === 3, `${s.codeName} has 3 release tranches`);
});

// 7. NEW FEATURE 3: On-The-Fly Startup Generation (No Startup / Idea Phase)
console.log("\n[TEST SUITE 7] Personal Details Onboarding & No-Startup Generator");
import('./src/data/mockStartups.js').then(({ createCustomStartup }) => {
  // Test A: Founder with "No Startup / Idea Phase"
  const stealthStartup = createCustomStartup({
    founderName: "Rohan Varma",
    founderEmail: "rohan@stealth.io",
    founderPhone: "+91 98888 77777",
    founderCollege: "IIT Kanpur",
    hasStartup: false,
    currentMrr: 0
  });

  assert(stealthStartup.realName.includes("Rohan Varma's Stealth Venture"), `Generates customized stealth project for founder with no startup`);
  assert(stealthStartup.financials.currentMrr === 0, `Stealth founder is configured with ₹0 MRR`);
  assert(stealthStartup.financials.isPreRevenue === true, `Stealth founder is flagged as Pre-Revenue`);
  assert(stealthStartup.preRevenueDetails !== undefined, `Stealth founder has Pre-Revenue advisory guidance attached`);

  // Test B: Founder with existing startup
  const liveCustomStartup = createCustomStartup({
    founderName: "Meera Nair",
    founderEmail: "meera@aerocells.com",
    founderPhone: "+91 97777 66666",
    hasStartup: true,
    startupName: "AeroCells Hydrogen",
    currentMrr: 250000,
    stage: "Seed"
  });

  assert(liveCustomStartup.realName === "AeroCells Hydrogen", `Custom startup name applied correctly`);
  assert(liveCustomStartup.financials.currentMrr === 250000, `Custom startup MRR preserved`);

  console.log("\n==================================================");
  console.log(`  RESULTS: ${testsPassed} OF ${totalTests} CHECKS PASSED PERFECTLY`);
  console.log("==================================================");
});
