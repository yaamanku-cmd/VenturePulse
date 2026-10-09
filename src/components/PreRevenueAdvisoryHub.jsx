import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Star, 
  X
} from 'lucide-react';
import { MOCK_ADVISORS } from '../data/mockStartups';

/**
 * PreRevenueAdvisoryHub Component
 * 
 * UNIQUE PRODUCT FEATURE:
 * Dedicated intelligent incubation engine for startups with zero recurring revenue.
 * 1. Analyzes the startup's prototype, IP, burn rate, and core bottlenecks.
 * 2. Connects them with a verified advisory syndicate:
 *    - Big Founders / Serial Entrepreneurs (GTM & scaling)
 *    - Business Analysts (Unit economics & financial modeling)
 *    - Chartered Accountants (CA) (Grants, Section 80-IAC tax holiday & cap tables)
 *    - Market Researchers (TAM sizing & competitive moats)
 */
export const PreRevenueAdvisoryHub = ({ startup }) => {
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'Serial Founder' | 'Business Analyst' | 'Chartered Accountant (CA)' | 'Market Researcher'
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [activeBookingAdvisor, setActiveBookingAdvisor] = useState(null);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState(null);
  const [selectedSessionTopic, setSelectedSessionTopic] = useState('Commercial Pilot Pricing');

  const filteredAdvisors = selectedCategory === 'all'
    ? MOCK_ADVISORS
    : MOCK_ADVISORS.filter(a => a.category === selectedCategory);

  const handleRunDiagnostic = () => {
    setIsDiagnosticRunning(true);
    setTimeout(() => {
      setIsDiagnosticRunning(false);
    }, 900);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const advisor = activeBookingAdvisor;
    setActiveBookingAdvisor(null);
    setBookingSuccessMsg(`Advisory sync confirmed with ${advisor.name} (${advisor.category}) on topic: "${selectedSessionTopic}". Calendar invite & prep brief dispatched!`);
    setTimeout(() => setBookingSuccessMsg(null), 6000);
  };

  const isZeroMrr = (startup?.financials?.currentMrr || 0) === 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0f172a] via-[#12203b] to-[#0a1529] border border-indigo-500/30 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Pre-Revenue Launchpad & Advisory Syndicate
            </span>
            {isZeroMrr && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                ₹0 MRR Detected • Advisory Recommended
              </span>
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Turn Prototypes into High-Velocity Recurring Revenue
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
            Instead of raising premature, dilutive capital at zero MRR, connect directly with <span className="text-indigo-300 font-semibold">Serial Founders</span>, <span className="text-emerald-300 font-semibold">Business Analysts</span>, <span className="text-amber-300 font-semibold">Chartered Accountants (CAs)</span>, and <span className="text-cyan-300 font-semibold">Market Researchers</span> to validate unit economics and secure initial paying contracts.
          </p>

          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <button
              onClick={handleRunDiagnostic}
              disabled={isDiagnosticRunning}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Sparkles className={`w-4 h-4 ${isDiagnosticRunning ? 'animate-spin' : ''}`} />
              <span>{isDiagnosticRunning ? 'Synthesizing Diagnostic...' : 'Re-Run AI Startup Diagnostic'}</span>
            </button>
            <div className="text-xs text-slate-400 font-mono">
              Analyzing: <span className="text-white font-semibold">{startup?.realName || startup?.codeName}</span>
            </div>
          </div>
        </div>

        {/* Success Alert Toast */}
        {bookingSuccessMsg && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs font-mono flex items-center gap-2.5 animate-fadeIn shadow-lg">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>{bookingSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* AI Pre-Revenue Diagnostic Analysis Matrix */}
      <div className="p-6 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-[#1f2e4a] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">
                AI Diagnostic Readiness Assessment
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated algorithmic evaluation of prototype maturity, commercial gaps, and statutory leverage
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#131d31] px-3 py-1.5 rounded-xl border border-[#1f2e4a]">
            <span className="text-xs text-slate-400">Bottleneck Diagnosis:</span>
            <span className="text-xs font-bold text-amber-300">Commercial Pilot Structure</span>
          </div>
        </div>

        {/* Diagnostic Score Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Diagnostic 1: Prototype Readiness */}
          <div className="p-4 rounded-xl bg-[#111927] border border-[#1f2e4a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">Technical MVP / TRL</span>
              <span className="text-xs font-mono font-bold text-emerald-400">82% (High)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 mb-2 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '82%' }} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Working laboratory prototype validated. Ready for field alpha testing with pilot partners.
            </p>
          </div>

          {/* Diagnostic 2: Unit Economics & Pricing */}
          <div className="p-4 rounded-xl bg-[#111927] border border-[#1f2e4a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">Commercial Model</span>
              <span className="text-xs font-mono font-bold text-amber-400">38% (Critical Gap)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 mb-2 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '38%' }} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Pricing model undefined. Needs a Business Analyst to design margin payback and contract terms.
            </p>
          </div>

          {/* Diagnostic 3: Statutory & Grant Readiness */}
          <div className="p-4 rounded-xl bg-[#111927] border border-[#1f2e4a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">Statutory / CA Grants</span>
              <span className="text-xs font-mono font-bold text-indigo-400">52% (Untapped)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 mb-2 overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '52%' }} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Eligible for non-dilutive DPIIT Section 80-IAC tax holiday & MSME seed funding via CA guidance.
            </p>
          </div>

          {/* Diagnostic 4: Market Sizing & Moat */}
          <div className="p-4 rounded-xl bg-[#111927] border border-[#1f2e4a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">TAM & Market Moat</span>
              <span className="text-xs font-mono font-bold text-cyan-400">74% (Promising)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 mb-2 overflow-hidden">
              <div className="h-full bg-cyan-500 rounded-full" style={{ width: '74%' }} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Clear replacement market against imports. Requires bottom-up research to map enterprise buyers.
            </p>
          </div>
        </div>

        {/* 3-Step Milestone Roadmap to First ₹5L MRR */}
        <div className="mt-5 p-4 rounded-xl bg-[#090d16] border border-[#1f2e4a]">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
            Recommended Advisory Roadmap to First Commercial Milestone:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-[#111a2d] border border-indigo-500/20">
              <span className="text-[10px] font-mono font-bold text-indigo-400 block mb-1">STAGE 1: STATUTORY ARCHITECTURE</span>
              <h4 className="text-xs font-bold text-white mb-1">Chartered Accountant (CA) Consultation</h4>
              <p className="text-[11px] text-slate-400">Secure non-dilutive government grants (₹15L-₹25L) & formalize clean cap table.</p>
            </div>
            <div className="p-3 rounded-lg bg-[#111a2d] border border-emerald-500/20">
              <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-1">STAGE 2: FINANCIAL MODELING</span>
              <h4 className="text-xs font-bold text-white mb-1">Business Analyst Working Session</h4>
              <p className="text-[11px] text-slate-400">Structure pilot contract economics, pricing tiers, and payback periods.</p>
            </div>
            <div className="p-3 rounded-lg bg-[#111a2d] border border-amber-500/20">
              <span className="text-[10px] font-mono font-bold text-amber-400 block mb-1">STAGE 3: FIRST ENTERPRISE PILOT</span>
              <h4 className="text-xs font-bold text-white mb-1">Serial Founder Deal Mentorship</h4>
              <p className="text-[11px] text-slate-400">Close first 2 paying corporate pilot contracts to achieve early recurring MRR.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Syndicate Network Directory */}
      <div className="space-y-4">
        {/* Category Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">
              Connect with Verified Advisors & Mentors
            </h3>
            <p className="text-xs text-slate-400">
              Hand-picked veterans ready to guide pre-revenue founders to product-market fit
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'Serial Founder', label: '🚀 Big Founders' },
              { id: 'Business Analyst', label: '📊 Business Analysts' },
              { id: 'Chartered Accountant (CA)', label: '⚖️ CAs & Tax Leads' },
              { id: 'Market Researcher', label: '🔬 Market Researchers' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-[#111927] text-slate-400 hover:text-white border border-[#1f2e4a]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Advisors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAdvisors.map((advisor) => (
            <div
              key={advisor.id}
              className="p-5 rounded-2xl bg-[#0e1524] border border-[#1f2e4a] hover:border-indigo-500/40 transition-all flex flex-col justify-between shadow-lg group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={advisor.avatar}
                      alt={advisor.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#1f2e4a] group-hover:border-indigo-400 transition-colors"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{advisor.name}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                          {advisor.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium">{advisor.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold bg-[#131d31] px-2 py-1 rounded-lg border border-[#1f2e4a]">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{advisor.rating}</span>
                  </div>
                </div>

                {/* Track Record & Guidance Focus */}
                <div className="space-y-2 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">
                      Proven Track Record:
                    </span>
                    <p className="text-slate-300 font-medium">{advisor.trackRecord}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#090d16] border border-[#1f2e4a] text-xs">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-0.5">
                      Advisory Guidance Offer:
                    </span>
                    <p className="text-slate-400 leading-relaxed">{advisor.guidanceOffer}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#1f2e4a] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {advisor.sessionsCount} Founder Sprints Completed
                </span>
                <button
                  onClick={() => setActiveBookingAdvisor(advisor)}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Connect & Book Session</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {activeBookingAdvisor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0e1524] border border-[#1f2e4a] rounded-2xl shadow-2xl p-6">
            <div className="flex items-start justify-between pb-4 border-b border-[#1f2e4a]">
              <div>
                <h3 className="text-base font-bold text-white">
                  Schedule Advisory Session
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  With {activeBookingAdvisor.name} ({activeBookingAdvisor.category})
                </p>
              </div>
              <button
                onClick={() => setActiveBookingAdvisor(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Primary Focus / Deliverable:
                </label>
                <select
                  value={selectedSessionTopic}
                  onChange={(e) => setSelectedSessionTopic(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090d16] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Commercial Pilot Pricing & LOI Structure">Commercial Pilot Pricing & LOI Structure</option>
                  <option value="DPIIT Section 80-IAC & MSME Grant Compliance (CA)">DPIIT Section 80-IAC & MSME Grant Compliance (CA)</option>
                  <option value="Bottom-up TAM/SAM Market Sizing">Bottom-up TAM/SAM Market Sizing</option>
                  <option value="Unit Economics & Gross Margin Modeling">Unit Economics & Gross Margin Modeling</option>
                  <option value="Distributor Channel Strategy in Tier-2/3 Hubs">Distributor Channel Strategy in Tier-2/3 Hubs</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-[#131d31] border border-[#1f2e4a] text-xs space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 block">
                  Included in Venture Pulse AI Launchpad:
                </span>
                <p className="text-slate-300">
                  • 45-minute structured sprint session
                </p>
                <p className="text-slate-300">
                  • Post-session diagnostic memo submitted directly into your Claim Check room
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveBookingAdvisor(null)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-lg shadow-indigo-600/20"
                >
                  Confirm Sync Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
