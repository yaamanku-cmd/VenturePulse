import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Flame, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw,
  Sparkles,
  Award,
  ChevronRight,
  Lightbulb,
  ArrowRight,
  Shield,
  Activity,
  Zap,
  Layers
} from 'lucide-react';
import { formatINR } from '../utils/formatters';
import { ClaimCheckSplit } from './ClaimCheckSplit';
import { TrancheSimulation } from './TrancheSimulation';
import { RunwayStressTester } from './RunwayStressTester';
import { MeritocracyGauge } from './MeritocracyGauge';
import { PreRevenueAdvisoryHub } from './PreRevenueAdvisoryHub';
import { StageNavigationStepper, StageFooterNav } from './StageNavigationStepper';

/**
 * FounderStudio Component
 * 
 * First Door: "Founder CFO Studio"
 * 
 * FEATURE ORDER ENFORCED:
 * 01. Executive Pulse (Score & Health Vitals)
 * 02. Claim Check Matrix (Pitch Claims vs Ledger Audit)
 * 03. Runway Stress Tester (18-Month What-If Shock Sim)
 * 04. Tranche Escrow (Milestone Capital Governance)
 * 05. Advisory Syndicate (Pre-Revenue / Growth Advisory Launchpad)
 */
export const FounderStudio = ({
  startup,
  isSampleDataLoaded,
  onOpenTrustModal
}) => {
  const [activeStage, setActiveStage] = useState('pulse'); // 'pulse' | 'claim_check' | 'runway_stress' | 'tranche_escrow' | 'advisory_action'
  const [isSyncingLedger, setIsSyncingLedger] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState(null);

  const financials = startup?.financials || {};
  const currentCash = financials.currentCashReserve || 7500000;
  const monthlyBurn = financials.monthlyBurnBase || 620000;
  const currentMrr = financials.currentMrr || 480000;
  const netBurn = Math.max(0, monthlyBurn - currentMrr);
  const runwayMonths = (currentCash / (netBurn || 100000)).toFixed(1);

  const handleSimulateSync = () => {
    setIsSyncingLedger(true);
    setSyncFeedback(null);
    setTimeout(() => {
      setIsSyncingLedger(false);
      setSyncFeedback("Sync complete: 148 transactions ingested from Razorpay & HDFC current account.");
      setTimeout(() => setSyncFeedback(null), 4000);
    }, 1200);
  };

  const flaggedClaimsCount = startup?.claims?.filter(c => c.severity === 'amber' || c.severity === 'red').length || 0;

  return (
    <div className={`space-y-6 ${isSampleDataLoaded ? 'has-sample-watermark' : ''}`}>
      {/* Founder Studio Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1d33] to-[#0a1424] border border-[#1f2e4a] p-6 shadow-xl relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Founder CFO Studio
              </span>
              <span className="text-xs font-mono text-slate-400">
                Stage: {startup.stage} • Founded {startup.foundedYear} • Sector: {startup.sector}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {startup.realName} — CFO Command Center
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
              Audit your pitch deck claims against your live ledger, stress-test your cash runway, and track milestone tranche releases before sharing with investors.
            </p>
          </div>

          {/* Quick Action Tools */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleSimulateSync}
              disabled={isSyncingLedger}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#131e33] hover:bg-[#1a2947] border border-[#1f2e4a] text-xs font-semibold text-slate-200 transition-colors shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncingLedger ? 'animate-spin' : ''}`} />
              <span>{isSyncingLedger ? 'Ingesting Feeds...' : 'Sync Bank & Payment Feeds'}</span>
            </button>

            <button
              onClick={onOpenTrustModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-bold text-white transition-all shadow-lg shadow-emerald-600/20"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Elevate Trust Ladder</span>
            </button>
          </div>
        </div>

        {/* Sync Toast Feedback */}
        {syncFeedback && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{syncFeedback}</span>
          </div>
        )}
      </div>

      {/* CRITICAL: Pre-Revenue Smart Recommendation Banner (Zero Recurring Revenue) */}
      {currentMrr === 0 && (
        <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-indigo-500/15 to-emerald-500/15 border border-amber-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn shadow-xl">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex-shrink-0">
              <Lightbulb className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Zero Recurring Revenue Detected (Pre-Revenue Stage)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  Advisory Launchpad Suggested
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Don't sell cheap equity or pitch empty projections. Venture Pulse AI suggests connecting with <strong className="text-white">Big Founders, Business Analysts, Chartered Accountants (CAs), and Market Researchers</strong> to build your unit economics & pilot contracts first.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveStage('advisory_action')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold whitespace-nowrap shadow-lg shadow-indigo-600/20 flex items-center gap-2 self-start md:self-auto transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enter Advisory Launchpad</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* CORE 5-STAGE PIPELINE STEPPER (ENFORCING EXACT LOGICAL ORDER) */}
      <StageNavigationStepper
        currentStage={activeStage}
        onSelectStage={setActiveStage}
        startup={startup}
        isFounderMode={true}
      />

      {/* =========================================================================
          STAGE 1: EXECUTIVE PULSE (Score & Health Vitals)
          ========================================================================= */}
      {activeStage === 'pulse' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top 5 KPI Vital Overview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Card 1: Cash in Bank */}
            <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span className="uppercase tracking-wider font-semibold text-[10px]">Bank Balance</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl md:text-2xl font-mono font-bold text-white">
                {formatINR(currentCash)}
              </div>
              <span className="text-[11px] font-mono text-emerald-400 block mt-1">
                Reconciled across 2 accounts
              </span>
            </div>

            {/* Card 2: Net Monthly Burn */}
            <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md hover:border-rose-500/30 transition-all">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span className="uppercase tracking-wider font-semibold text-[10px]">Net Monthly Burn</span>
                <Flame className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-xl md:text-2xl font-mono font-bold text-rose-300">
                {formatINR(netBurn)}
                <span className="text-xs text-slate-400 font-normal ml-1">/mo</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 block mt-1">
                Gross Burn: {formatINR(monthlyBurn)}
              </span>
            </div>

            {/* Card 3: Safe Runway */}
            <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md hover:border-amber-500/30 transition-all">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span className="uppercase tracking-wider font-semibold text-[10px]">Zero-Cash Runway</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl md:text-2xl font-mono font-bold text-amber-300">
                {runwayMonths}
                <span className="text-xs text-slate-400 font-normal ml-1">Months</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 block mt-1">
                Based on current velocity
              </span>
            </div>

            {/* Card 4: Current MRR */}
            <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md hover:border-indigo-500/30 transition-all">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span className="uppercase tracking-wider font-semibold text-[10px]">Monthly Revenue</span>
                <TrendingUp className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-xl md:text-2xl font-mono font-bold text-indigo-300">
                {formatINR(currentMrr)}
              </div>
              <span className="text-[11px] font-mono text-indigo-400 block mt-1">
                Gross Margin: {financials.grossMargin}%
              </span>
            </div>

            {/* Card 5: Trust Ladder Status */}
            <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md col-span-2 md:col-span-1 hover:border-blue-500/30 transition-all">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span className="uppercase tracking-wider font-semibold text-[10px]">Trust Tier</span>
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-sm font-bold text-white truncate">
                {startup.trustDetails.type}
              </div>
              <span className="text-[10px] font-mono text-slate-400 block mt-1">
                Level {startup.trustDetails.ladderLevel} of 3 Authenticated
              </span>
            </div>
          </div>

          {/* Main 2-Column Health Layout: Left = Meritocracy Dial; Right = Institutional Readiness */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Meritocracy Score Dial & 5-Pillar Scorecard */}
            <div className="lg:col-span-1">
              <MeritocracyGauge startup={startup} />
            </div>

            {/* Column 2: Diligence Readiness & Pre-Diligence Summary */}
            <div className="lg:col-span-2 space-y-5">
              <div className="p-6 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        Institutional Investor Readiness Audit
                      </h3>
                      <p className="text-xs text-slate-400">
                        Pre-screening status before pitching to institutional angels & VC syndicates
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    88% Diligence Ready
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Status Item 1: Statutory Registry */}
                  <div className="p-3.5 rounded-xl bg-[#121c2f] border border-[#1f2e4a] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-white">MCA & DPIIT Startup Certification</div>
                        <div className="text-[11px] text-slate-400 font-mono">DPIIT-IND-2024-88492 Verified</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      Compliant
                    </span>
                  </div>

                  {/* Status Item 2: Automated Ledger Feeds */}
                  <div className="p-3.5 rounded-xl bg-[#121c2f] border border-[#1f2e4a] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-white">Automated Ledger Feed Ingestion</div>
                        <div className="text-[11px] text-slate-400 font-mono">Razorpay & Bank Webhooks Synced</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      Active
                    </span>
                  </div>

                  {/* Status Item 3: Claim Check Warning */}
                  <div className="p-3.5 rounded-xl bg-[#121c2f] border border-[#1f2e4a] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${flaggedClaimsCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`} />
                      <div>
                        <div className="text-xs font-semibold text-white">Deck Claims Variance Warning</div>
                        <div className="text-[11px] text-slate-400">
                          {flaggedClaimsCount} claims show variance against self-reported ledger.
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveStage('claim_check')}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/30"
                    >
                      <span>Audit In Matrix</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Quick Next Stage Guidance */}
                <div className="mt-5 p-4 rounded-xl bg-[#090f1d] border border-indigo-500/30 flex items-center justify-between">
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-white block">Next Recommended Action:</span>
                    <span>Cross-examine your pitch claims against the self-reported ledger in Stage 02.</span>
                  </div>
                  <button
                    onClick={() => setActiveStage('claim_check')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Proceed to Stage 02</span>
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
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-indigo-300 block mb-0.5">
                Stage 02 — Pre-Diligence Pitch Assertion Audit
              </span>
              <p className="text-slate-300 leading-relaxed">
                Reconcile pitch deck claims against your self-reported accounting ledger before circulating with institutional investors. Resolving red and amber flags elevates your Meritocracy Score into the Top Decile.
              </p>
            </div>
          </div>

          <ClaimCheckSplit startup={startup} isFounderMode={true} />

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
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <Flame className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-amber-300 block mb-0.5">
                Stage 03 — Capital Buffer & Liquidity Shock Simulation
              </span>
              <p className="text-slate-300 leading-relaxed">
                Test your resilience against marketing cost inflation and engineering headcount growth. Identify the exact month your cash depletes so you can plan your next financing round with precision.
              </p>
            </div>
          </div>

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
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-cyan-300 block mb-0.5">
                Stage 04 — Milestone Tranche Escrow Simulation
              </span>
              <p className="text-slate-300 leading-relaxed">
                Simulate smart-contract governed round releases based on verified business metrics (40% Upfront, 30% at ₹5L MRR, 30% at Retention Target). Demonstrates operational accountability to incoming investors.
              </p>
            </div>
          </div>

          <TrancheSimulation startup={startup} />

          <StageFooterNav
            currentStage={activeStage}
            onSelectStage={setActiveStage}
            prevLabel="Runway Stress Tester"
            nextLabel="Advisory Syndicate Launchpad"
          />
        </div>
      )}

      {/* =========================================================================
          STAGE 5: ADVISORY SYNDICATE & ACTION (Pre-Revenue / Growth Launchpad)
          ========================================================================= */}
      {activeStage === 'advisory_action' && (
        <div className="space-y-4 animate-fadeIn">
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
