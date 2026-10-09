/**
 * Financial & Projection Utility Functions for Venture Pulse AI
 */

export const formatINR = (amount) => {
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

export const formatNumberINR = (val) => {
  if (val === undefined || val === null) return "0";
  return new Intl.NumberFormat('en-IN').format(val);
};

/**
 * Calculates stress-tested runway and monthly projection series for Recharts AreaChart
 */
export const calculateRunwayProjection = ({
  initialCash,
  baseMonthlyBurn,
  marketingShockPercent = 0, // e.g. -50 to +50
  techHiresCount = 0,         // 0 to 5
  techSalaryPerHire = 180000, // ₹1.8L/mo
  currentMrr = 480000,
  mrrGrowthRate = 0.05,       // 5% monthly organic growth
  totalMonths = 18
}) => {
  // Discretionary marketing accounts for ~40% of baseline burn
  const baseMarketingPortion = baseMonthlyBurn * 0.40;
  const fixedBurnPortion = baseMonthlyBurn * 0.60;
  
  const shockedMarketingBurn = baseMarketingPortion * (1 + (marketingShockPercent / 100));
  const additionalTechPayroll = techHiresCount * techSalaryPerHire;
  
  // Total stressed gross monthly burn
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
    // Compounding revenue
    const projectedMrr = currentMrr * Math.pow(1 + mrrGrowthRate, i);
    
    // Baseline net burn
    const baseNetBurn = Math.max(0, baseMonthlyBurn - projectedMrr);
    remainingCashBase = Math.max(0, remainingCashBase - baseNetBurn);
    if (remainingCashBase === 0 && baseDepletionMonthIndex === null) {
      baseDepletionMonthIndex = i + 1;
    }

    // Stressed net burn
    const stressedNetBurn = Math.max(0, stressedGrossBurn - projectedMrr);
    remainingCashStressed = Math.max(0, remainingCashStressed - stressedNetBurn);
    if (remainingCashStressed === 0 && depletionMonthIndex === null) {
      depletionMonthIndex = i + 1;
    }

    projectionData.push({
      month: monthLabel,
      monthIndex: i + 1,
      baselineCash: Math.round(remainingCashBase / 100000), // in Lakhs
      stressedCash: Math.round(remainingCashStressed / 100000), // in Lakhs
      baselineCashRaw: remainingCashBase,
      stressedCashRaw: remainingCashStressed,
      monthlyBurn: Math.round(stressedNetBurn / 100000),
      projectedMrr: Math.round(projectedMrr / 100000)
    });
  }

  // Calculate runaway duration in months (floating point for precision)
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
