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
  ArrowRight
} from 'lucide-react';
import { formatINR } from '../utils/formatters';
import { ClaimCheckSplit } from './ClaimCheckSplit';
import { TrancheSimulation } from './TrancheSimulation';
import { RunwayStressTester } from './RunwayStressTester';
import { MeritocracyGauge } from './MeritocracyGauge';
import { PreRevenueAdvisoryHub } from './PreRevenueAdvisoryHub';

/**
 * FounderStudio Component
 * 
 * First Door: "Founder CFO Studio"
 * Purpose:
 * - Real-time CFO cockpit for startup founders
 * - Pre-diligence pitch assertion verification (Claim Check)
 * - Runway projection & capital planning
 * - Tranche escrow milestone fulfillment tracker
 * - Trust Ladder advancement workflow
 */
export const FounderStudio = ({
  startup,
  isSampleDataLoaded,
  onOpenTrustModal
}) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'claim_check' | 'runway' | 'tranches'
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

  return (
    <div className={`space-y-6 ${isSampleDataLoaded ? 'has-sample-watermark' : ''}`}>
      {/* Founder Studio Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1d33] to-[#0a1424] border border-[#1f2e4a] p-6 shadow-xl relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Founder Mode Active
              </span>
              <span className="text-xs font-mono text-slate-400">
                Stage: {startup.stage} • Founded {startup.foundedYear}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {startup.realName} — CFO Command Center
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
              Monitor runway dynamics, reconcile pitch claims against self-reported ledgers, and track milestone-governed tranche releases.
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
            onClick={() => setActiveTab('advisory_hub')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold whitespace-nowrap shadow-lg shadow-indigo-600/20 flex items-center gap-2 self-start md:self-auto transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enter Advisory Launchpad</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Cash in Bank */}
        <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-medium">Bank Balance</span>
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
        <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-medium">Net Monthly Burn</span>
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
        <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-medium">Zero-Cash Runway</span>
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
        <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-medium">Monthly Revenue</span>
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
        <div className="p-4 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-md col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-medium">Trust Tier</span>
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

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1f2e4a] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'overview'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Overview & Merit Diagnostics
        </button>
        <button
          onClick={() => setActiveTab('claim_check')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'claim_check'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Pre-Diligence Claim Check</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-900/80 text-indigo-200">
            {startup.claims.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('runway')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'runway'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Runway Stress Simulator
        </button>
        <button
          onClick={() => setActiveTab('tranches')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'tranches'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Milestone Tranches</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
            Sim
          </span>
        </button>

        {/* UNIQUE FEATURE: Pre-Revenue Advisory Launchpad Tab */}
        <button
          onClick={() => setActiveTab('advisory_hub')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'advisory_hub'
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Pre-Revenue Advisory Launchpad</span>
          {currentMrr === 0 ? (
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold uppercase animate-pulse">
              Suggested
            </span>
          ) : (
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
              Syndicate
            </span>
          )}
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Meritocracy Dial for Founder self-audit */}
          <div className="lg:col-span-1">
            <MeritocracyGauge startup={startup} />
          </div>

          {/* Diligence Readiness & Trust Ladder Checklist */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base font-bold text-white">
                    Institutional Investor Readiness Audit
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  88% Ready for Pre-Series A
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#131d31] border border-[#1f2e4a] flex items-center justify-between">
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

                <div className="p-3.5 rounded-xl bg-[#131d31] border border-[#1f2e4a] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-white">Automated Ledger Feed Ingestion</div>
                      <div className="text-[11px] text-slate-400 font-mono">Stripe/Razorpay Webhooks Synced</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Active
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#131d31] border border-[#1f2e4a] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-white">Deck Claims Variance Warning</div>
                      <div className="text-[11px] text-slate-400">
                        {startup.claims.filter(c => c.severity === 'amber' || c.severity === 'red').length} claims show variance against ledger.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('claim_check')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                  >
                    <span>Fix In Deck</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Runway Simulator Embed */}
            <RunwayStressTester startup={startup} />
          </div>
        </div>
      )}

      {/* Tab 2: Pre-Diligence Claim Check */}
      {activeTab === 'claim_check' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-indigo-300 block mb-0.5">
                Founder Recommendation: Reconcile Deck Metrics Before VC Sharing
              </span>
              <p className="text-slate-300">
                Institutional venture funds cross-examine pitch decks against bank receipts. Fixing minor discrepancies (e.g., SIM costs or non-recurring setup fees) elevates your Meritocracy Score from Tier-2 to Tier-1.
              </p>
            </div>
          </div>
          <ClaimCheckSplit startup={startup} isFounderMode={true} />
        </div>
      )}

      {/* Tab 3: Runway Stress Simulator */}
      {activeTab === 'runway' && (
        <div className="space-y-4">
          <RunwayStressTester startup={startup} />
        </div>
      )}

      {/* Tab 4: Milestone Tranche Escrow */}
      {activeTab === 'tranches' && (
        <div className="space-y-4">
          <TrancheSimulation startup={startup} />
        </div>
      )}

      {/* Tab 5: Pre-Revenue Advisory Launchpad */}
      {activeTab === 'advisory_hub' && (
        <PreRevenueAdvisoryHub startup={startup} />
      )}
    </div>
  );
};
