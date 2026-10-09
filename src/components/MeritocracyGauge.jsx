import React, { useState } from 'react';
import { Award, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { ScoreBreakdownModal } from './ScoreBreakdownModal';

/**
 * MeritocracyGauge Component
 * Circular gauge (0-100) with dynamic gradient arc, needle indicator,
 * breakdown modal trigger, and mandatory legal disclaimer.
 */
export const MeritocracyGauge = ({ startup }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const score = startup?.meritocracyScore || 0;

  // Gauge calculation: 240 degree arc (from 150 deg to 390 deg / -30 deg)
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75; // 270 degrees
  const strokeDashoffset = arcLength - (arcLength * score) / 100;

  // Color determination based on score
  const getScoreTheme = (val) => {
    if (val >= 80) {
      return {
        stroke: '#10b981', // emerald
        glow: 'rgba(16, 185, 129, 0.4)',
        textColor: 'text-emerald-400',
        badge: 'Top Decile Fundamentals',
        bgBadge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
      };
    } else if (val >= 65) {
      return {
        stroke: '#6366f1', // indigo
        glow: 'rgba(99, 102, 241, 0.4)',
        textColor: 'text-indigo-400',
        badge: 'Moderate Health',
        bgBadge: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
      };
    } else {
      return {
        stroke: '#f43f5e', // red
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
        {/* Top Header */}
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

        {/* Circular Gauge Visualization */}
        <div 
          className="relative flex items-center justify-center my-2 cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            className="w-44 h-44 transform -rotate-135 drop-shadow-md"
            viewBox="0 0 160 160"
          >
            {/* Background Arc Track */}
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
            {/* Active Colored Arc */}
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

          {/* Centered Score Readout */}
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

        {/* Quick Micro-stats */}
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

        {/* Mandatory Regulatory Disclaimer */}
        <div className="mt-3 w-full text-center">
          <p className="text-[10.5px] font-medium text-amber-400/90 tracking-tight flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0" />
            <span>Screening aid only. Not investment advice.</span>
          </p>
        </div>
      </div>

      {/* Modal Dialog */}
      <ScoreBreakdownModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        startup={startup}
      />
    </>
  );
};
