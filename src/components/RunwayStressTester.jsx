import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  Users, 
  AlertTriangle, 
  Zap
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine
} from 'recharts';
import { calculateRunwayProjection, formatINR } from '../utils/formatters';

/**
 * Custom Tooltip for Recharts AreaChart
 */
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

/**
 * RunwayStressTester Component
 * 
 * CRITICAL PRODUCT PRINCIPLE:
 * Interactive What-If Sliders:
 * 1. "Monthly Marketing Shock (+/- 50%)"
 * 2. "Add Tech Hires (+1 to +5)"
 * Real-time recalculation of projected cash runway,
 * updates Recharts AreaChart in real time with vertical line marking depletion month.
 */
export const RunwayStressTester = ({ startup }) => {
  // Slider states
  const [marketingShock, setMarketingShock] = useState(0); // -50% to +50%
  const [techHires, setTechHires] = useState(0); // 0 to 5

  const initialCash = startup?.financials?.currentCashReserve || 7500000;
  const baseBurn = startup?.financials?.monthlyBurnBase || 620000;
  const currentMrr = startup?.financials?.currentMrr || 480000;
  const techSalary = startup?.financials?.avgTechSalary || 180000;

  // Real-time recalculation of cash projection
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

  // Depletion label for vertical reference line
  const depletionLabel = depletionMonthIndex ? `M${depletionMonthIndex}` : null;

  const handleReset = () => {
    setMarketingShock(0);
    setTechHires(0);
  };

  const isShockActive = marketingShock !== 0 || techHires > 0;

  return (
    <div className="w-full flex flex-col rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-xl overflow-hidden">
      {/* Header */}
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

      {/* Control Sliders Panel */}
      <div className="p-5 md:p-6 border-b border-[#1f2e4a] bg-[#0c1220] grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Slider 1: Monthly Marketing Shock (+/- 50%) */}
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

        {/* Slider 2: Add Tech Hires (+1 to +5) */}
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

      {/* Real-Time Impact Metric Stat Cards */}
      <div className="p-5 md:p-6 border-b border-[#1f2e4a] bg-[#090d16] grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Revised Monthly Burn */}
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

        {/* Metric 2: Projected Runway */}
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

        {/* Metric 3: Depletion Month */}
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

        {/* Metric 4: Survival Resilience Rate */}
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

      {/* Recharts AreaChart: Projected Cash Runway with Vertical Depletion Line */}
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

              {/* Baseline Cash Line */}
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

              {/* Stress-tested Cash Area */}
              <Area
                type="monotone"
                dataKey="stressedCash"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#stressedCashGradient)"
                name="Stressed Cash"
              />

              {/* CRITICAL: Vertical line marking the depletion month */}
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

        {/* Narrative interpretation */}
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
