import React from 'react';
import { ShieldCheck, ShieldAlert, BadgeCheck, X, CheckCircle2 } from 'lucide-react';
import { TRUST_LADDER_INFO } from '../data/mockStartups';

/**
 * TrustLadderModal Component
 * Visualizes the 3-tier Trust Ladder progression:
 * 1. [Self-Reported] (Amber)
 * 2. [Registered - MSME/DPIIT] (Blue)
 * 3. [Verified - AA Sandbox Roadmap] (Green)
 */
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
        {/* Modal Header */}
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

        {/* Current Startup Status Pill */}
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

        {/* The 3-Tier Ladder */}
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

                {/* Requirements Checklist */}
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

        {/* Footer info & action */}
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
