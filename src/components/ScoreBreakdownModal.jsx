import React from 'react';
import { X, Award, AlertCircle, TrendingUp, Zap, Clock, ShieldCheck, FileSpreadsheet } from 'lucide-react';

/**
 * ScoreBreakdownModal Component
 * Shows complete algorithmic breakdown of the Meritocracy Score (0-100)
 * Across 5 Core Pillars:
 * 1. Growth & Velocity
 * 2. Capital Efficiency
 * 3. Runway & Buffer
 * 4. Expense Discipline
 * 5. Claim Consistency
 * Displays mandatory disclaimer: "Screening aid only. Not investment advice."
 */
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
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    },
    {
      key: 'efficiency',
      name: scoreBreakdown.efficiency.label,
      score: scoreBreakdown.efficiency.score,
      weight: scoreBreakdown.efficiency.weight,
      detail: scoreBreakdown.efficiency.detail,
      icon: Zap,
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      key: 'runway',
      name: scoreBreakdown.runway.label,
      score: scoreBreakdown.runway.score,
      weight: scoreBreakdown.runway.weight,
      detail: scoreBreakdown.runway.detail,
      icon: Clock,
      color: 'from-amber-500 to-orange-600',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    },
    {
      key: 'discipline',
      name: scoreBreakdown.discipline.label,
      score: scoreBreakdown.discipline.score,
      weight: scoreBreakdown.discipline.weight,
      detail: scoreBreakdown.discipline.detail,
      icon: ShieldCheck,
      color: 'from-purple-500 to-pink-600',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    },
    {
      key: 'claimConsistency',
      name: scoreBreakdown.claimConsistency.label,
      score: scoreBreakdown.claimConsistency.score,
      weight: scoreBreakdown.claimConsistency.weight,
      detail: scoreBreakdown.claimConsistency.detail,
      icon: FileSpreadsheet,
      color: 'from-cyan-500 to-blue-600',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
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
        {/* Header */}
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

        {/* Aggregate Score Highlight */}
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

        {/* Scrollable Pillars List */}
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

                {/* Score bar */}
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

        {/* Mandatory Legal & Regulatory Disclaimer */}
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
