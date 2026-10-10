import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  UserCheck, 
  ArrowRightLeft, 
  TrendingUp, 
  Lock, 
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Award,
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { formatINR } from '../utils/formatters';
import { MeritocracyGauge } from './MeritocracyGauge';
import { ClaimCheckSplit } from './ClaimCheckSplit';
import { RunwayStressTester } from './RunwayStressTester';
import { TrancheSimulation } from './TrancheSimulation';
import { PreRevenueAdvisoryHub } from './PreRevenueAdvisoryHub';
import { StageNavigationStepper, StageFooterNav } from './StageNavigationStepper';

/**
 * InvestorTerminal Component
 * 
 * Second Door: "Investor Diligence Terminal"
 * 
 * FEATURE ORDER ENFORCED:
 * 01. Executive Pulse (Score, Investment Ratios & Pedigree-Blind Screening)
 * 02. Claim Check Matrix (Pitch Claims vs Self-Reported Ledger Audit)
 * 03. Runway Shock Sim (18-Month What-If Cash Depletion Simulator)
 * 04. Tranche Escrow (Milestone Capital Governance)
 * 05. Advisory Syndicate & IC Decision (Term Sheet / Audit / Pass)
 */
export const InvestorTerminal = ({
  startup,
  isBlindMode,
  setIsBlindMode,
  isSampleDataLoaded,
  onOpenTrustModal
}) => {
  const [activeStage, setActiveStage] = useState('pulse'); // 'pulse' | 'claim_check' | 'runway_stress' | 'tranche_escrow' | 'advisory_action'
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
                Round: {startup.askingRound} • Stage: {startup.stage} • Sector: {startup.sector}
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

      {/* CORE 5-STAGE PIPELINE STEPPER (ENFORCING EXACT LOGICAL ORDER) */}
      <StageNavigationStepper
        currentStage={activeStage}
        onSelectStage={setActiveStage}
        startup={startup}
        isFounderMode={false}
      />

      {/* =========================================================================
          STAGE 1: EXECUTIVE PULSE (Score, Investment Ratios & Pedigree Card)
          ========================================================================= */}
      {activeStage === 'pulse' && (
        <div className="space-y-6 animate-fadeIn">
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
                      ? 'bg-[#111927] border-emerald-500/30 ring-1 ring-emerald-500/10' 
                      : 'bg-[#111927] border-[#1f2e4a]'
                  }`}
                >
                  <img
                    src={founder.avatar}
                    alt="Founder Avatar"
                    className={`w-12 h-12 rounded-xl object-cover border border-[#1f2e4a] transition-all ${
                      isBlindMode ? 'filter blur-md grayscale contrast-125' : ''
                    }`}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white truncate">
                        {founder.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {founder.role}
                      </span>
                    </div>

                    <div className="text-xs text-indigo-300 font-mono mt-0.5">
                      Alma Mater: {founder.college}
                    </div>

                    <div className="text-[11px] text-slate-400 mt-1">
                      Track Record: {founder.experience}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main 2-Column Diligence Layout: Left = Meritocracy Dial; Right = Verified Investment Ratios */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Meritocracy Score Dial (0-100) */}
            <div className="lg:col-span-1">
              <MeritocracyGauge startup={startup} />
            </div>

            {/* Column 2: Diligence Summary Matrix & Ratios */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Core Investment Ratios (Verified vs Deck)
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
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

                {/* Next Stage Navigation Prompt */}
                <div className="mt-5 p-4 rounded-xl bg-[#090f1d] border border-indigo-500/30 flex items-center justify-between">
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-white block">Audit Reconciliation Queue:</span>
                    <span>{startup.claims.length} pitch deck statements extracted and cross-checked against live ledger.</span>
                  </div>
                  <button
                    onClick={() => setActiveStage('claim_check')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Proceed to Stage 02: Claim Check</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <StageFooterNav
            currentStage={activeStage}
            onSelectStage={setActiveStage}
            nextLabel="Claim Check Matrix (Audit)"
          />
        </div>
      )}

      {/* =========================================================================
          STAGE 2: CLAIM CHECK MATRIX (Pitch Claims vs Ledger Audit)
          ========================================================================= */}
      {activeStage === 'claim_check' && (
        <div className="space-y-4 animate-fadeIn">
          <ClaimCheckSplit startup={startup} isFounderMode={false} />

          <StageFooterNav
            currentStage={activeStage}
            onSelectStage={setActiveStage}
            prevLabel="Executive Pulse"
            nextLabel="Runway Stress Tester"
          />
        </div>
      )}

      {/* =========================================================================
          STAGE 3: RUNWAY SHOCK SIMULATOR (18-Month What-If Stress)
          ========================================================================= */}
      {activeStage === 'runway_stress' && (
        <div className="space-y-4 animate-fadeIn">
          <RunwayStressTester startup={startup} />

          <StageFooterNav
            currentStage={activeStage}
            onSelectStage={setActiveStage}
            prevLabel="Claim Check Matrix"
            nextLabel="Tranche Escrow Governance"
          />
        </div>
      )}

      {/* =========================================================================
          STAGE 4: TRANCHE ESCROW (Milestone Capital Governance)
          ========================================================================= */}
      {activeStage === 'tranche_escrow' && (
        <div className="space-y-4 animate-fadeIn">
          <TrancheSimulation startup={startup} />

          <StageFooterNav
            currentStage={activeStage}
            onSelectStage={setActiveStage}
            prevLabel="Runway Stress Tester"
            nextLabel="Advisory & IC Decision"
          />
        </div>
      )}

      {/* =========================================================================
          STAGE 5: ADVISORY SYNDICATE & INVESTMENT COMMITTEE ACTION
          ========================================================================= */}
      {activeStage === 'advisory_action' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Investment Memo Decision Simulator */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0c1424] via-[#111d36] to-[#0a1222] border border-indigo-500/40 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  <span>Investment Committee Decision Simulator</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Simulate your partner meeting vote based on meritocracy score, claim discrepancies, and runway cushion
                </p>
              </div>
              <span className="text-xs font-mono text-indigo-300 font-semibold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/25">
                Round Size: {startup.askingRound}
              </span>
            </div>

            <div className="flex items-center gap-3 flex-wrap pt-2">
              <button
                onClick={() => setDecisionState('approved')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  decisionState === 'approved'
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 shadow-lg shadow-emerald-600/30'
                    : 'bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/40'
                }`}
              >
                Issue Milestone Term Sheet ({startup.askingRound})
              </button>
              <button
                onClick={() => setDecisionState('audit_requested')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  decisionState === 'audit_requested'
                    ? 'bg-amber-600 text-white ring-2 ring-amber-400 shadow-lg shadow-amber-600/30'
                    : 'bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 border border-amber-500/40'
                }`}
              >
                Request Claim Check Audit Clarification
              </button>
              <button
                onClick={() => setDecisionState('passed')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  decisionState === 'passed'
                    ? 'bg-rose-600 text-white ring-2 ring-rose-400 shadow-lg shadow-rose-600/30'
                    : 'bg-rose-600/20 text-rose-300 hover:bg-rose-600/30 border border-rose-500/40'
                }`}
              >
                Pass on Round
              </button>
            </div>

            {decisionState && (
              <div className="mt-4 p-4 rounded-xl bg-[#090f1e] border border-slate-700 text-xs font-mono text-slate-200 animate-fadeIn flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  {decisionState === 'approved' && `✅ Term Sheet Draft Generated: ₹1.00 Cr commitment with 3-Step Milestone Escrow Conditions attached.`}
                  {decisionState === 'audit_requested' && `⚠️ Diligence RFIs dispatched to ${isBlindMode ? startup.codeName : startup.realName} for amber/red ledger variances.`}
                  {decisionState === 'passed' && `❌ Opportunity archived in Deal Flow CRM with automated meritocracy score memo.`}
                </span>
              </div>
            )}
          </div>

          {/* Advisory Syndicate Network Directory */}
          <PreRevenueAdvisoryHub startup={startup} />

          <StageFooterNav
            currentStage={activeStage}
            onSelectStage={setActiveStage}
            prevLabel="Tranche Escrow Governance"
          />
        </div>
      )}
    </div>
  );
};
