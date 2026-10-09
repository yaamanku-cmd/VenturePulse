import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Clock, 
  AlertCircle, 
  Coins, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';

/**
 * TrancheSimulation Component
 * 
 * CRITICAL PRODUCT PRINCIPLE:
 * Visual stepper showing milestone-based fund releases
 * (e.g., 40% upfront, 30% at ₹5L MRR, 30% at retention target)
 * with explicit label: "Simulation: No real money moves"
 */
export const TrancheSimulation = ({ startup }) => {
  const [unlockedStepOverrides, setUnlockedStepOverrides] = useState({});

  // Interactive milestone advance simulation
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
      {/* Header */}
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
              {/* MANDATORY LABEL */}
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

      {/* Stepper Progress Bar Overview */}
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

      {/* Visual Stepper Cards */}
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
              {/* Step indicator badge */}
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

              {/* Title & Amount */}
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

                {/* Milestone requirements */}
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

              {/* Progress Bar (for In Progress or Locked) */}
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

                {/* Interactive Action Button */}
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

      {/* Mandatory Regulatory Simulation Banner */}
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
