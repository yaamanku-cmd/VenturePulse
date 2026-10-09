import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  UserCheck, 
  ArrowRightLeft, 
  TrendingUp, 
  Lock, 
  Compass,
  Sparkles
} from 'lucide-react';
import { formatINR } from '../utils/formatters';
import { MeritocracyGauge } from './MeritocracyGauge';
import { ClaimCheckSplit } from './ClaimCheckSplit';
import { RunwayStressTester } from './RunwayStressTester';
import { TrancheSimulation } from './TrancheSimulation';
import { PreRevenueAdvisoryHub } from './PreRevenueAdvisoryHub';

/**
 * InvestorTerminal Component
 * 
 * Second Door: "Investor Diligence Terminal"
 * 
 * CRITICAL PRODUCT PRINCIPLES:
 * 1. "Pedigree-Blind Toggle": Interactive toggle ("Blind Mode") masks founder names, faces,
 *    and college names (e.g., displaying "Startup #104 — Tier-3 Hub, AgriTech").
 * 2. "Meritocracy Score Dial": Circular gauge (0-100) with breakdown modal & disclaimer.
 * 3. "Claim Check": Side-by-side comparison of pitch claims vs Self-Reported Ledger.
 * 4. "Interactive What-If Sliders": Dual sliders recalculating runway in real-time.
 * 5. "Tranche Release Simulation": Stepper with milestone unlocks and "Simulation: No real money moves".
 */
export const InvestorTerminal = ({
  startup,
  isBlindMode,
  setIsBlindMode,
  isSampleDataLoaded,
  onOpenTrustModal
}) => {
  const [activeView, setActiveView] = useState('diligence_hub'); // 'diligence_hub' | 'claim_check' | 'runway_stress' | 'tranche_escrow'
  const [decisionState, setDecisionState] = useState(null); // 'approved' | 'audit_requested' | 'passed'

  const displayName = isBlindMode 
    ? `${startup.codeName} — ${startup.hubType}`
    : `${startup.realName} — ${startup.city}`;

  const founders = startup.founders || [];

  return (
    <div className={`space-y-6 ${isSampleDataLoaded ? 'has-sample-watermark' : ''}`}>
      {/* Top Diligence Terminal Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0c1424] via-[#101b33] to-[#0a1120] border border-[#1f2e4a] p-6 shadow-xl relative overflow-hidden">
        {/* Ambient indigo glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                Institutional Diligence Terminal
              </span>
              <span className="text-xs font-mono text-slate-400">
                Round Size: {startup.askingRound} • Stage: {startup.stage}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>{displayName}</span>
              {isBlindMode && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <EyeOff className="w-3.5 h-3.5" />
                  Blind Mode Active
                </span>
              )}
            </h1>

            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
              {isBlindMode 
                ? "Pedigree-blind evaluation mode active. Founder identities, faces, and collegiate alma maters are masked to eliminate prestige bias."
                : "Standard diligence view with founder pedigree, identity authentication, and verified ledger trails."}
            </p>
          </div>

          {/* CRITICAL: "Pedigree-Blind Toggle" Controls */}
          <div className="flex items-center gap-3 bg-[#131d31] p-3 rounded-2xl border border-[#1f2e4a] shadow-inner">
            <div className="flex items-center gap-2">
              {isBlindMode ? (
                <EyeOff className="w-5 h-5 text-emerald-400" />
              ) : (
                <Eye className="w-5 h-5 text-indigo-400" />
              )}
              <div>
                <span className="text-xs font-bold text-white block">
                  Pedigree-Blind Mode
                </span>
                <span className="text-[10px] text-slate-400">
                  {isBlindMode ? 'Masks Names, Faces & Colleges' : 'Reveals Founder Identities'}
                </span>
              </div>
            </div>

            {/* Toggle switch */}
            <button
              onClick={() => setIsBlindMode(!isBlindMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#090d16] ${
                isBlindMode ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
              role="switch"
              aria-checked={isBlindMode}
              title="Toggle Pedigree-Blind evaluation"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isBlindMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Founder Team / Pedigree Card (Affected by Blind Toggle) */}
      <div className="p-5 md:p-6 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {isBlindMode ? 'Anonymized Founder Profiles (Bias-Free)' : 'Founding Team Credentials'}
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {isBlindMode ? 'Pedigree Obfuscated' : 'Verified via LinkedIn / MCA'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {founders.map((founder, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${
                isBlindMode 
                  ? 'bg-[#111927] border-emerald-500/20 shadow-sm' 
                  : 'bg-[#111927] border-[#1f2e4a]'
              }`}
            >
              {/* Avatar: algorithmic geometric icon in blind mode, photo in normal mode */}
              {isBlindMode ? (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-900 to-slate-800 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm shadow-inner">
                  #{idx + 1}
                </div>
              ) : (
                <img 
                  src={founder.avatar} 
                  alt={founder.realName} 
                  className="w-12 h-12 rounded-xl object-cover border border-[#1f2e4a]" 
                />
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white truncate">
                    {isBlindMode ? founder.blindName : founder.realName}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-400">
                    {founder.role}
                  </span>
                </div>

                <div className="text-xs text-indigo-300 font-mono mt-0.5 truncate">
                  {isBlindMode ? founder.blindPedigree : founder.realPedigree}
                </div>

                <div className="text-[11px] text-slate-400 mt-1">
                  Track Record: {founder.experience}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal View Switcher Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1f2e4a] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveView('diligence_hub')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeView === 'diligence_hub'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Executive Diligence Hub</span>
        </button>

        <button
          onClick={() => setActiveView('claim_check')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeView === 'claim_check'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Claim Check Matrix</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-900/80 text-indigo-200 font-mono">
            {startup.claims.length}
          </span>
        </button>

        <button
          onClick={() => setActiveView('runway_stress')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeView === 'runway_stress'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>What-If Runway Shock Test</span>
        </button>

        <button
          onClick={() => setActiveView('tranche_escrow')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeView === 'tranche_escrow'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Tranche Escrow Governance</span>
        </button>

        {/* Advisory Syndicate & Pre-Revenue Diagnostic View */}
        <button
          onClick={() => setActiveView('advisory_syndicate')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeView === 'advisory_syndicate'
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Advisory Syndicate & Diagnostics</span>
          {startup?.financials?.currentMrr === 0 && (
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold uppercase animate-pulse">
              Pre-Rev
            </span>
          )}
        </button>
      </div>

      {/* VIEW 1: Executive Diligence Hub (Combines Dial, Key Ratios, Quick Split Preview) */}
      {activeView === 'diligence_hub' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Meritocracy Score Dial (0-100) */}
            <div className="lg:col-span-1">
              <MeritocracyGauge startup={startup} />
            </div>

            {/* Column 2 & 3: Diligence Summary Matrix & Ratios */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Core Investment Ratios (Verified vs Deck)
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">
                    Live Ledger Ground Truth
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Real MRR</span>
                    <span className="text-lg font-mono font-bold text-white">
                      {formatINR(startup.financials.currentMrr)}
                    </span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">Stripe/Razorpay</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Real Monthly Burn</span>
                    <span className="text-lg font-mono font-bold text-rose-300">
                      {formatINR(startup.financials.monthlyBurnBase)}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Bank outflow audit</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Audited GM</span>
                    <span className="text-lg font-mono font-bold text-indigo-300">
                      {startup.financials.grossMargin}%
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">COGS reconciled</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">True Blended CAC</span>
                    <span className="text-lg font-mono font-bold text-white">
                      ₹{startup.financials.cac}
                    </span>
                    <span className="text-[10px] text-amber-400 block mt-0.5">Includes field agents</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated LTV</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      ₹{startup.financials.ltv}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Multiple: {(startup.financials.ltv / startup.financials.cac).toFixed(1)}x
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Trust Ladder</span>
                    <span className="text-xs font-bold text-slate-200 block truncate mt-1">
                      {startup.trustDetails.type}
                    </span>
                    <button
                      onClick={onOpenTrustModal}
                      className="text-[10px] text-indigo-400 hover:underline block mt-0.5"
                    >
                      Audit Proof &rarr;
                    </button>
                  </div>
                </div>

                {/* Investment Memo Decision Simulator */}
                <div className="mt-6 pt-5 border-t border-[#1f2e4a]">
                  <span className="text-xs font-semibold text-slate-300 block mb-3">
                    Investment Committee Action:
                  </span>
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() => setDecisionState('approved')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        decisionState === 'approved'
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                          : 'bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/40'
                      }`}
                    >
                      Issue Milestone Term Sheet (₹1.00 Cr)
                    </button>
                    <button
                      onClick={() => setDecisionState('audit_requested')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        decisionState === 'audit_requested'
                          ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                          : 'bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 border border-amber-500/40'
                      }`}
                    >
                      Request Claim Check Audit Clarification
                    </button>
                    <button
                      onClick={() => setDecisionState('passed')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        decisionState === 'passed'
                          ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                          : 'bg-rose-600/20 text-rose-300 hover:bg-rose-600/30 border border-rose-500/40'
                      }`}
                    >
                      Pass on Round
                    </button>
                  </div>

                  {decisionState && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 animate-fadeIn">
                      {decisionState === 'approved' && '✅ Term Sheet Draft Generated with 3-Step Milestone Escrow Conditions attached.'}
                      {decisionState === 'audit_requested' && '⚠️ Diligence RFIs dispatched to founder for amber/red ledger variances.'}
                      {decisionState === 'passed' && '❌ Opportunity archived in Deal Flow CRM with automated meritocracy score memo.'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Claim Check Preview */}
          <ClaimCheckSplit startup={startup} isFounderMode={false} />

          {/* Embedded Runway Tester */}
          <RunwayStressTester startup={startup} />
        </div>
      )}

      {/* VIEW 2: Dedicated Claim Check Matrix */}
      {activeView === 'claim_check' && (
        <ClaimCheckSplit startup={startup} isFounderMode={false} />
      )}

      {/* VIEW 3: Dedicated What-If Runway Shock Test */}
      {activeView === 'runway_stress' && (
        <RunwayStressTester startup={startup} />
      )}

      {/* VIEW 4: Tranche Escrow Governance */}
      {activeView === 'tranche_escrow' && (
        <TrancheSimulation startup={startup} />
      )}

      {/* VIEW 5: Advisory Syndicate & Pre-Revenue Diagnostic */}
      {activeView === 'advisory_syndicate' && (
        <PreRevenueAdvisoryHub startup={startup} />
      )}
    </div>
  );
};
