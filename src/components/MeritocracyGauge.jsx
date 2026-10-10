import React, { useState } from 'react';
import { Award, AlertTriangle, ArrowUpRight, TrendingUp, ShieldCheck, Flame, Scale, CheckCircle2 } from 'lucide-react';
import { ScoreBreakdownModal } from './ScoreBreakdownModal';

/**
 * MeritocracyGauge Component
 * Circular gauge (0-100) with dynamic gradient arc, needle indicator,
 * 5-pillar mini visual breakdown, modal trigger, and mandatory legal disclaimer.
 */
export const MeritocracyGauge = ({ startup }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const score = startup?.meritocracyScore || 0;

  // Gauge calculation: 270 degree arc
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * score) / 100;

  // Color theme determination based on score
  const getScoreTheme = (val) => {
    if (val >= 80) {
      return {
        stroke: '#10b981', // emerald
        glow: 'rgba(16, 185, 129, 0.45)',
        textColor: 'text-emerald-400',
        badge: 'Top Decile Fundamentals',
        bgBadge: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-sm shadow-emerald-500/20'
      };
    } else if (val >= 65) {
      return {
        stroke: '#6366f1', // indigo
        glow: 'rgba(99, 102, 241, 0.45)',
        textColor: 'text-indigo-400',
        badge: 'Moderate Health Tier',
        bgBadge: 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 shadow-sm shadow-indigo-500/20'
      };
    } else {
      return {
        stroke: '#f43f5e', // rose red
        glow: 'rgba(244, 63, 94, 0.45)',
        textColor: 'text-rose-400',
        badge: 'High Diligence Variance',
        bgBadge: 'bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-sm shadow-rose-500/20'
      };
    }
  };

  const theme = getScoreTheme(score);
  const breakdown = startup?.scoreBreakdown || {
    growth: { score: 75 },
    efficiency: { score: 80 },
    runway: { score: 70 },
    discipline: { score: 85 },
    claimConsistency: { score: 65 }
  };

  const pillars = [
    { label: 'Growth Velocity', val: breakdown.growth?.score || 75, weight: '25%' },
    { label: 'Capital Efficiency', val: breakdown.efficiency?.score || 80, weight: '25%' },
    { label: 'Runway Buffer', val: breakdown.runway?.score || 70, weight: '20%' },
    { label: 'Expense Discipline', val: breakdown.discipline?.score || 85, weight: '15%' },
    { label: 'Claim Consistency', val: breakdown.claimConsistency?.score || 65, weight: '15%' },
  ];

  return (
    <>
      <div className="relative flex flex-col justify-between p-5 md:p-6 rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#0a1120] border border-[#1e2f4e] shadow-xl hover:border-indigo-500/40 transition-all duration-300 group">
        {/* Glow ambient background */}
        <div 
          className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ backgroundColor: theme.stroke }}
        />

        {/* Top Header */}
        <div className="w-full flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Meritocracy Score
              </h4>
              <span className="text-[10px] font-mono text-slate-400 block -mt-0.5">
                Objective Ledger Benchmark
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors px-2 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30"
            title="Inspect 5-pillar mathematical breakdown"
          >
            <span>Diagnostics</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Circular Gauge Visualization */}
        <div 
          className="relative flex items-center justify-center my-3 cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            className="w-44 h-44 transform -rotate-135 drop-shadow-lg"
            viewBox="0 0 160 160"
          >
            {/* Background Arc Track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#131e33"
              strokeWidth="11"
              strokeDasharray={arcLength}
              strokeDashoffset={0}
              strokeLinecap="round"
            />
            {/* Active Colored Arc with Cyber Glow */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={theme.stroke}
              strokeWidth="11"
              strokeDasharray={arcLength}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                filter: `drop-shadow(0 0 10px ${theme.glow})`
              }}
            />
          </svg>

          {/* Centered Score Readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-4xl font-extrabold font-mono text-white tracking-tight drop-shadow-sm">
              {score}
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              Score / 100
            </span>
            <div className={`mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${theme.bgBadge}`}>
              {theme.badge}
            </div>
          </div>
        </div>

        {/* 5-Pillar Mini Visual Progression Bars */}
        <div className="w-full space-y-2 pt-3 border-t border-[#1a2844] mt-2">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            <span>5-Pillar Scorecard</span>
            <span className="font-mono text-indigo-400">Ledger Weighted</span>
          </div>

          <div className="space-y-1.5">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2 text-[11px] font-mono">
                <span className="text-slate-300 truncate w-32">{pillar.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-[#131f36] overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700"
                    style={{ 
                      width: `${pillar.val}%`,
                      backgroundColor: pillar.val >= 75 ? '#10b981' : pillar.val >= 60 ? '#6366f1' : '#f43f5e'
                    }}
                  />
                </div>
                <span className="text-white font-bold w-10 text-right">{pillar.val}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Regulatory Disclaimer */}
        <div className="mt-4 pt-3 border-t border-[#1a2844] w-full text-center">
          <p className="text-[10.5px] font-medium text-amber-300/90 tracking-tight flex items-center justify-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 animate-pulse" />
            <span>Screening aid only. Not investment advice.</span>
          </p>
        </div>
      </div>

      {/* 5-Pillar Detailed Modal Dialog */}
      <ScoreBreakdownModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        startup={startup}
      />
    </>
  );
};
