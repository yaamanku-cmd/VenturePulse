import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  Users, 
  AlertTriangle, 
  Zap,
  TrendingDown,
  TrendingUp,
  Flame,
  Shield,
  Activity
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
      <div className="bg-[#0b1222] border border-[#23385d] p-3.5 rounded-xl shadow-2xl font-mono text-xs backdrop-blur-xl">
        <p className="text-white font-bold mb-2 border-b border-[#1b2b48] pb-1.5 flex items-center justify-between">
          <span>Projection Timeline:</span>
          <span className="text-indigo-400">{label}</span>
        </p>
        <div className="space-y-1.5">
          <p className="text-indigo-300 flex items-center justify-between gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Stressed Cash:</span>
            </span>
            <span className="font-bold text-white">₹{payload[0]?.value} Lakh</span>
          </p>
          {payload[1] && (
            <p className="text-slate-400 flex items-center justify-between gap-6">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                <span>Baseline Cash:</span>
              </span>
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

  const applyPreset = (shock, hires) => {
    setMarketingShock(shock);
    setTechHires(hires);
  };

  const isShockActive = marketingShock !== 0 || techHires > 0;

  return (
    <div className="w-full flex flex-col rounded-2xl bg-gradient-to-b from-[#0e1628] to-[#090f1c] border border-[#1e2f50] shadow-2xl overflow-hidden">
      {/* Header with Quick Presets */}
      <div className="p-5 md:p-6 border-b border-[#1b2b4a] bg-[#0c1324]/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 border border-indigo-500/30 text-indigo-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Runway Stress Tester & What-If Engine
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-bold uppercase">
                18-Month Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate CAC inflation, advertising shocks, and aggressive engineering headcount expansion in real time.
            </p>
          </div>
        </div>

        {/* Quick Scenario Preset Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400 mr-1">Quick Presets:</span>
          <button
            onClick={() => applyPreset(30, 2)}
            className="px-2.5 py-1.5 rounded-lg bg-[#121c32] hover:bg-[#1a2948] border border-[#1f3152] hover:border-indigo-500/50 text-[11px] font-semibold text-slate-300 hover:text-white transition-all"
            title="+30% Marketing shock, +2 Tech Hires"
          >
            🚀 Hyper-Scale
          </button>
          <button
            onClick={() => applyPreset(-35, 0)}
            className="px-2.5 py-1.5 rounded-lg bg-[#121c32] hover:bg-[#1a2948] border border-[#1f3152] hover:border-emerald-500/50 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-all"
            title="-35% Marketing austerity, 0 Hires"
          >
            🛡️ Austerity
          </button>
          <button
            onClick={() => applyPreset(50, 4)}
            className="px-2.5 py-1.5 rounded-lg bg-[#121c32] hover:bg-[#1a2948] border border-[#1f3152] hover:border-rose-500/50 text-[11px] font-semibold text-rose-400 hover:text-rose-300 transition-all"
            title="+50% CAC surge, +4 Tech Hires"
          >
            ⚠️ Crunch Test
          </button>
          {isShockActive && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Control Sliders Panel */}
      <div className="p-5 md:p-6 border-b border-[#1b2b4a] bg-[#0a1122]/90 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Slider 1: Monthly Marketing Shock (+/- 50%) */}
        <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e2f50] hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="marketing-shock-slider" className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Monthly Marketing Shock (+/- 50%)</span>
            </label>
            <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border ${
              marketingShock > 0 
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                : marketingShock < 0 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}>
              {marketingShock > 0 ? `+${marketingShock}% Burn` : marketingShock < 0 ? `${marketingShock}% Burn` : '0% Baseline'}
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
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2">
            <span>-50% (Lean Budget)</span>
            <span>0% (Audited Base)</span>
            <span>+50% (CAC Inflation)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Dynamically models changes in customer acquisition costs or competitive paid ad price escalations.
          </p>
        </div>

        {/* Slider 2: Add Tech Hires (+1 to +5) */}
        <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e2f50] hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="tech-hires-slider" className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Add Tech Hires (+1 to +5)</span>
            </label>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
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
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2">
            <span>0 Hires</span>
            <span>+1 Dev</span>
            <span>+2 Devs</span>
            <span>+3 Devs</span>
            <span>+4 Devs</span>
            <span>+5 Devs</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Includes fully burdened salary, health benefits, and cloud infrastructure costs of {formatINR(techSalary)}/mo each.
          </p>
        </div>
      </div>

      {/* Real-Time Impact Metric Stat Cards */}
      <div className="p-5 md:p-6 border-b border-[#1b2b4a] bg-[#080d1a] grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Stressed Gross Burn */}
        <div className="p-4 rounded-xl bg-[#0e1628] border border-[#1e2f50] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Stressed Gross Burn</span>
            <Flame className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-white">
              {formatINR(stressedMonthlyBurn)}
            </span>
            <span className="text-xs text-slate-400">/mo</span>
          </div>
          <span className={`text-[10px] font-mono font-medium block mt-1 ${
            netBurnDelta > 0 ? 'text-rose-400' : netBurnDelta < 0 ? 'text-emerald-400' : 'text-slate-400'
          }`}>
            {netBurnDelta > 0 ? `+${formatINR(netBurnDelta)}/mo shock` : netBurnDelta < 0 ? `${formatINR(netBurnDelta)}/mo savings` : 'Matches base burn'}
          </span>
        </div>

        {/* Metric 2: Stressed Runway */}
        <div className="p-4 rounded-xl bg-[#0e1628] border border-[#1e2f50] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Stressed Safe Runway</span>
            <Activity className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-xl font-bold font-mono ${
              stressedRunwayMonths < 6 ? 'text-rose-400' : stressedRunwayMonths < 10 ? 'text-amber-300' : 'text-emerald-400'
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
        <div className="p-4 rounded-xl bg-[#0e1628] border border-[#1e2f50] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Zero-Cash Depletion</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-amber-300">
              {depletionMonthIndex ? `Month ${depletionMonthIndex}` : '> 18 Months'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 block mt-1">
            {depletionMonthIndex ? 'Requires Series A bridge' : 'Sufficient cushion'}
          </span>
        </div>

        {/* Metric 4: Survival Resilience Rate */}
        <div className="p-4 rounded-xl bg-[#0e1628] border border-[#1e2f50] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Resilience Score</span>
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-indigo-300">
              {survivalRate}%
            </span>
          </div>
          <div className="w-full bg-[#131f36] h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${survivalRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Recharts AreaChart: Projected Cash Runway */}
      <div className="p-5 md:p-6 bg-[#090f1e]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              18-Month Cash Balance Projection (₹ Lakhs)
            </span>
            {depletionLabel && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                Zero-Cash Date: {depletionLabel}
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

              <CartesianGrid strokeDasharray="3 3" stroke="#1a2744" vertical={false} />
              
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
        <div className="mt-3 p-3.5 rounded-xl bg-[#070b16] border border-[#1b2b48] flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${stressedRunwayMonths < 8 ? 'text-amber-400' : 'text-emerald-400'}`} />
            <span>
              {stressedRunwayMonths < 8
                ? `Critical runway squeeze: At ${stressedRunwayMonths} months, bridge equity or tranche unlock must occur before ${depletionLabel || 'Q4'}.`
                : `Healthy liquidity cushion: Company sustains ${stressedRunwayMonths} months of operation under tested conditions.`}
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-400 hidden md:inline">
            Net Outflow: {formatINR(stressedMonthlyBurn)}/mo
          </span>
        </div>
      </div>
    </div>
  );
};
