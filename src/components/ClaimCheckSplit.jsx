import React, { useState } from 'react';
import { 
  FileText, 
  Database, 
  AlertTriangle, 
  AlertOctagon, 
  CheckCircle2, 
  Filter, 
  ArrowRightLeft, 
  ShieldCheck,
  Building
} from 'lucide-react';

/**
 * ClaimCheckSplit Component
 * 
 * CRITICAL PRODUCT PRINCIPLE:
 * "Claim Check" (NOT Lie Detector): A side-by-side comparison screen.
 * - Left side: Extracted pitch claims
 * - Right side: Computed metrics labeled "Self-Reported Ledger"
 * - Amber badge for minor gaps
 * - Red badge for large unexplained discrepancies
 * - Green badge for verified matches
 */
export const ClaimCheckSplit = ({ startup, isFounderMode = false }) => {
  const [filterSeverity, setFilterSeverity] = useState('all'); // 'all' | 'red' | 'amber' | 'green'
  const [activeClaimId, setActiveClaimId] = useState(null);

  const claims = startup?.claims || [];

  const filteredClaims = claims.filter(c => {
    if (filterSeverity === 'all') return true;
    return c.severity === filterSeverity;
  });

  const redCount = claims.filter(c => c.severity === 'red').length;
  const amberCount = claims.filter(c => c.severity === 'amber').length;
  const greenCount = claims.filter(c => c.severity === 'green').length;

  return (
    <div className="w-full flex flex-col rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-xl overflow-hidden">
      {/* Component Header Bar */}
      <div className="p-5 md:p-6 border-b border-[#1f2e4a] bg-[#111927]/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Claim Check Comparison Engine
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  Dual-Audit Matrix
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isFounderMode 
                  ? "Audit your pitch deck claims against your live ledger before sharing with institutional angels & VCs"
                  : "Automated diligence cross-referencing pitch memo statements against self-reported financial ledgers"}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterSeverity === 'all'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({claims.length})
          </button>
          <button
            onClick={() => setFilterSeverity('red')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              filterSeverity === 'red'
                ? 'bg-rose-500/25 text-rose-300 border border-rose-500/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-rose-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Large Discrepancies ({redCount})
          </button>
          <button
            onClick={() => setFilterSeverity('amber')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              filterSeverity === 'amber'
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-amber-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Minor Gaps ({amberCount})
          </button>
          <button
            onClick={() => setFilterSeverity('green')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              filterSeverity === 'green'
                ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-emerald-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Verified ({greenCount})
          </button>
        </div>
      </div>

      {/* Side-by-Side Column Headers */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#1f2e4a] bg-[#0b101c]">
        {/* Left Header: Extracted Pitch Claims */}
        <div className="p-4 px-6 border-b md:border-b-0 md:border-r border-[#1f2e4a] flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-200">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              1. Extracted Pitch Claims
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Source: Pitch Deck & Memo AI Extraction
          </span>
        </div>

        {/* Right Header: Computed Metrics labeled "Self-Reported Ledger" */}
        <div className="p-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-200">
            <Database className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              2. Self-Reported Ledger
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Audited Reconciliation Stream
          </span>
        </div>
      </div>

      {/* Comparison Claims List */}
      <div className="divide-y divide-[#1f2e4a]/70">
        {filteredClaims.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2 opacity-80" />
            <p className="text-sm">No claims found for this filter severity.</p>
          </div>
        ) : (
          filteredClaims.map((claim) => {
            const isRed = claim.severity === 'red';
            const isAmber = claim.severity === 'amber';

            const badgeBg = isRed
              ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
              : isAmber
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
              : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300';

            const badgeIcon = isRed ? (
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            ) : isAmber ? (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            );

            const badgeLabel = isRed
              ? 'Large Discrepancy'
              : isAmber
              ? 'Minor Gap'
              : 'Verified Ledger Match';

            return (
              <div 
                key={claim.id} 
                className={`grid grid-cols-1 md:grid-cols-2 transition-colors ${
                  activeClaimId === claim.id ? 'bg-[#142038]' : 'hover:bg-[#111a2e]'
                }`}
                onClick={() => setActiveClaimId(activeClaimId === claim.id ? null : claim.id)}
              >
                {/* LEFT SIDE: Extracted Pitch Claims */}
                <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-[#1f2e4a] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {claim.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Period: {claim.auditedPeriod}
                      </span>
                    </div>

                    <p className="text-sm text-slate-100 font-medium leading-relaxed italic border-l-2 border-indigo-500/60 pl-3 py-0.5">
                      "{claim.pitchClaim}"
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                        Claimed Metric
                      </span>
                      <span className="text-base font-bold font-mono text-indigo-300">
                        {claim.claimedValue}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Deck Memo</span>
                  </div>
                </div>

                {/* RIGHT SIDE: Computed Metrics labeled "Self-Reported Ledger" */}
                <div className="p-5 md:p-6 flex flex-col justify-between bg-slate-900/30">
                  <div>
                    {/* Status Badge: Amber badge for minor gaps, Red for large unexplained discrepancies */}
                    <div className="flex items-center justify-between mb-2">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeBg}`}>
                        {badgeIcon}
                        <span>{badgeLabel}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300">
                        {claim.delta}
                      </span>
                    </div>

                    {/* Ledger value */}
                    <div className="mt-2">
                      <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                        Self-Reported Ledger Metric
                      </span>
                      <span className="text-base font-bold font-mono text-emerald-400">
                        {claim.ledgerValue}
                      </span>
                    </div>

                    {/* Explanatory discrepancy note */}
                    <div className="mt-3 p-3 rounded-lg bg-[#090d16] border border-[#1f2e4a]">
                      <div className="text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                        <Database className="w-3 h-3 text-emerald-400" />
                        <span>Reconciliation Root Cause:</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {claim.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Ledger Data Source Stamp */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Building className="w-3 h-3 text-slate-500" />
                      <span>Ledger: {claim.ledgerSource}</span>
                    </span>
                    <button 
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium underline flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Diligence drilldown for [${claim.category}]:\n\nClaimed: ${claim.claimedValue}\nLedger: ${claim.ledgerValue}\nSource: ${claim.ledgerSource}\nAudit Period: ${claim.auditedPeriod}`);
                      }}
                    >
                      Audit Trail
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Component Footer Note */}
      <div className="p-4 px-6 bg-[#090d16] border-t border-[#1f2e4a] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Claim Check highlights variances impartially without moral judgment or punitive labels.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-slate-500">
            Reconciled: {claims.length} of {claims.length} assertions
          </span>
        </div>
      </div>
    </div>
  );
};
