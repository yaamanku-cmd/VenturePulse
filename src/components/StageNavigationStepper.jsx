import React from 'react';
import { 
  HeartPulse, 
  ArrowRightLeft, 
  TrendingUp, 
  Lock, 
  Sparkles, 
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export const STAGES = [
  {
    id: 'pulse',
    number: '01',
    title: 'Executive Pulse',
    shortTitle: 'Pulse & Score',
    subtitle: 'Score, Vitals & Team',
    icon: HeartPulse,
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
  },
  {
    id: 'claim_check',
    number: '02',
    title: 'Claim Check Matrix',
    shortTitle: 'Claim Check',
    subtitle: 'Pitch vs Ledger Audit',
    icon: ArrowRightLeft,
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
  },
  {
    id: 'runway_stress',
    number: '03',
    title: 'Runway Shock Sim',
    shortTitle: 'Runway Stress',
    subtitle: '18-Month What-If',
    icon: TrendingUp,
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
  },
  {
    id: 'tranche_escrow',
    number: '04',
    title: 'Tranche Escrow',
    shortTitle: 'Tranche Escrow',
    subtitle: 'Milestone Releases',
    icon: Lock,
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
  },
  {
    id: 'advisory_action',
    number: '05',
    title: 'Advisory & Action',
    shortTitle: 'Advisory & Action',
    subtitle: 'Syndicate & Term Sheet',
    icon: Sparkles,
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
  }
];

export const StageNavigationStepper = ({
  currentStage,
  onSelectStage,
  startup,
  isFounderMode = false
}) => {
  const currentIndex = STAGES.findIndex(s => s.id === currentStage);

  return (
    <div className="w-full bg-[#0a101f]/90 border border-[#1b2b4a] rounded-2xl p-2 md:p-3 shadow-xl backdrop-blur-md">
      {/* Step navigation bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {STAGES.map((stage, idx) => {
          const isActive = stage.id === currentStage;
          const isCompleted = idx < currentIndex;
          const Icon = stage.icon;

          // Contextual pill badge
          let pillText = null;
          if (stage.id === 'pulse') {
            pillText = `${startup?.meritocracyScore || 0}/100`;
          } else if (stage.id === 'claim_check') {
            pillText = `${startup?.claims?.length || 0} Claims`;
          } else if (stage.id === 'runway_stress') {
            pillText = 'What-If';
          } else if (stage.id === 'tranche_escrow') {
            pillText = `${startup?.tranches?.length || 3} Steps`;
          } else if (stage.id === 'advisory_action') {
            pillText = startup?.financials?.currentMrr === 0 ? 'Pre-Rev' : 'Action';
          }

          return (
            <button
              key={stage.id}
              onClick={() => onSelectStage(stage.id)}
              className={`relative flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl text-left transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-[#142340] to-[#101b33] border border-indigo-500/60 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                  : 'bg-[#0c1424]/60 border border-[#182640] hover:bg-[#111c30] hover:border-slate-600/60'
              }`}
            >
              {/* Left stage indicator badge */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : isCompleted
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800/80 text-slate-400 border border-slate-700/60'
              }`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="font-mono text-xs font-bold">{stage.number}</span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-xs font-bold truncate ${
                    isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {stage.shortTitle}
                  </span>
                  {pillText && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md font-semibold hidden md:inline-block ${
                      isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {pillText}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 font-mono truncate block -mt-0.5">
                  {stage.subtitle}
                </span>
              </div>

              {/* Active glow dot */}
              {isActive && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const StageFooterNav = ({
  currentStage,
  onSelectStage,
  nextLabel,
  prevLabel
}) => {
  const currentIndex = STAGES.findIndex(s => s.id === currentStage);
  const prevStage = currentIndex > 0 ? STAGES[currentIndex - 1] : null;
  const nextStage = currentIndex < STAGES.length - 1 ? STAGES[currentIndex + 1] : null;

  return (
    <div className="mt-8 pt-5 border-t border-[#1a2744] flex items-center justify-between gap-4">
      {prevStage ? (
        <button
          onClick={() => onSelectStage(prevStage.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f172a] hover:bg-[#15223c] border border-[#1f2e4a] text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
          <span>Stage {prevStage.number}: {prevLabel || prevStage.title}</span>
        </button>
      ) : (
        <div />
      )}

      {nextStage ? (
        <button
          onClick={() => onSelectStage(nextStage.id)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-xs font-bold text-white transition-all shadow-lg shadow-indigo-600/20"
        >
          <span>Stage {nextStage.number}: {nextLabel || nextStage.title}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      ) : (
        <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" />
          <span>All 5 Diligence Stages Complete</span>
        </div>
      )}
    </div>
  );
};
