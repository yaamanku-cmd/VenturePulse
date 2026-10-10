import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  ShieldAlert, 
  BadgeCheck, 
  Zap, 
  ChevronDown, 
  Activity, 
  Sparkles,
  UserCheck,
  Check,
  Flame,
  ArrowRight
} from 'lucide-react';
import { MOCK_STARTUPS } from '../data/mockStartups';
import { TrustLadderModal } from './TrustLadderModal';

/**
 * Navbar Component
 * 
 * CRITICAL PRODUCT PRINCIPLES:
 * 1. "Two-Door Entryway": Top navigation switcher between "Founder CFO Studio" and "Investor Diligence Terminal"
 * 2. "One-Click Sample Data": Header button "⚡ Load Sample Data" with visible "SAMPLE DATA" watermark
 * 3. "Trust Ladder": Profile Trust Badge display: [Self-Reported] (Amber), [Registered - MSME/DPIIT] (Blue), [Verified - AA Sandbox Roadmap] (Green)
 * 4. User Role Switcher: Sign in as Founder or as Investor / VC
 */
export const Navbar = ({
  activeDoor,           // 'founder' | 'investor'
  setActiveDoor,
  selectedStartupId,
  setSelectedStartupId,
  startupsList = MOCK_STARTUPS,
  isSampleDataLoaded,
  toggleSampleData,
  isBlindMode,
  currentUser,
  onOpenAuthModal,
  onOpenProfileModal
}) => {
  const [isTrustModalOpen, setIsTrustModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentStartup = (startupsList || MOCK_STARTUPS).find(s => s.id === selectedStartupId) || (startupsList || MOCK_STARTUPS)[0];

  // Helper for Trust Badge style
  const getTrustBadge = (trustLevel) => {
    switch (trustLevel) {
      case 'verified':
        return {
          label: 'Verified - AA Roadmap',
          icon: BadgeCheck,
          styles: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-sm shadow-emerald-500/10',
          dot: 'bg-emerald-400'
        };
      case 'registered':
        return {
          label: 'Registered - MSME/DPIIT',
          icon: ShieldCheck,
          styles: 'bg-blue-500/15 border-blue-500/40 text-blue-400 shadow-sm shadow-blue-500/10',
          dot: 'bg-blue-400'
        };
      case 'self_reported':
      default:
        return {
          label: 'Self-Reported Ledger',
          icon: ShieldAlert,
          styles: 'bg-amber-500/15 border-amber-500/40 text-amber-400 shadow-sm shadow-amber-500/10',
          dot: 'bg-amber-400'
        };
    }
  };

  const trustBadge = getTrustBadge(currentStartup.trustLevel);
  const TrustIcon = trustBadge.icon;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#18253f] bg-[#070b14]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            
            {/* Brand Logo & High-Tech Badge */}
            <div className="flex items-center gap-3">
              <div className="relative group cursor-pointer flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-indigo-600 p-0.5 shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/30 transition-all duration-300">
                <div className="w-full h-full bg-[#080d18] rounded-[10px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-white flex items-center">
                    VenturePulse
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider">
                    AI OS
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-tight block -mt-0.5 font-mono">
                  Autonomous Diligence & Runway Terminal
                </span>
              </div>
            </div>

            {/* CRITICAL: "Two-Door Entryway" Top Switcher with Radiant Glow */}
            <div className="flex items-center bg-[#0c1424] p-1 rounded-2xl border border-[#1d2d4a] shadow-inner">
              <button
                onClick={() => setActiveDoor('founder')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activeDoor === 'founder'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Building2 className={`w-3.5 h-3.5 ${activeDoor === 'founder' ? 'text-white' : 'text-emerald-400'}`} />
                <span>Founder CFO Studio</span>
              </button>

              <button
                onClick={() => setActiveDoor('investor')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activeDoor === 'investor'
                    ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Briefcase className={`w-3.5 h-3.5 ${activeDoor === 'investor' ? 'text-white' : 'text-indigo-400'}`} />
                <span>Investor Diligence Terminal</span>
              </button>
            </div>

            {/* Right Action Tools: Startup Selector, Trust Badge, Demo Trigger, Profile */}
            <div className="flex items-center gap-2.5">
              
              {/* Trust Badge Interactive Trigger */}
              <button
                onClick={() => setIsTrustModalOpen(true)}
                className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 hover:scale-[1.02] ${trustBadge.styles}`}
                title="Click to view Trust Ladder progression & audit details"
              >
                <span className={`w-2 h-2 rounded-full ${trustBadge.dot} animate-pulse`} />
                <TrustIcon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate max-w-[130px] lg:max-w-[170px]">{trustBadge.label}</span>
              </button>

              {/* Startup Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0e1628] border border-[#1f2e4a] text-xs font-medium text-slate-200 hover:border-indigo-500/50 hover:bg-[#131f38] transition-all shadow-sm"
                >
                  <div className="text-left">
                    <div className="font-mono text-emerald-400 font-bold leading-tight">
                      {isBlindMode && activeDoor === 'investor' ? currentStartup.codeName : currentStartup.realName}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-[#0c1424] border border-[#223558] rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn divide-y divide-[#182642]">
                    <div className="px-3.5 py-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between">
                      <span>Diligence Portfolios</span>
                      <span className="font-mono text-emerald-400">{startupsList.length} Active</span>
                    </div>
                    <div className="py-1">
                      {startupsList.map((startup) => (
                        <button
                          key={startup.id}
                          onClick={() => {
                            setSelectedStartupId(startup.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-[#131f36] transition-colors ${
                            selectedStartupId === startup.id ? 'bg-indigo-600/20 text-white font-semibold' : 'text-slate-300'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-white flex items-center gap-1.5">
                              <span>{isBlindMode && activeDoor === 'investor' ? startup.codeName : startup.realName}</span>
                              {startup.financials?.currentMrr === 0 && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">Pre-Rev</span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {startup.sector} • {startup.stage}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-mono text-emerald-400 font-bold block">
                              {startup.meritocracyScore}/100
                            </span>
                            <span className="text-[9px] text-slate-500 uppercase font-mono">Merit</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CRITICAL: "One-Click Sample Data" Button */}
              <button
                onClick={toggleSampleData}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isSampleDataLoaded
                    ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-md shadow-amber-400/20 ring-1 ring-amber-300'
                    : 'bg-[#0e1628] border border-[#1f2e4a] text-slate-300 hover:text-white hover:border-amber-400/60'
                }`}
                title="Toggle Sample Data Mock watermarks & demo records"
              >
                <Zap className={`w-3.5 h-3.5 ${isSampleDataLoaded ? 'fill-slate-950 text-slate-950' : 'text-amber-400'}`} />
                <span className="hidden sm:inline">⚡ Sample Data</span>
                <span className="sm:hidden font-mono">Demo</span>
              </button>

              {/* Personal Identity Passport & Profile Modal */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenProfileModal}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#0e1628] border border-[#1f2e4a] hover:border-indigo-500/60 text-xs transition-all shadow-sm"
                  title="View your verified credentials passport"
                >
                  <img 
                    src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
                    alt={currentUser?.name || "User"} 
                    className="w-5 h-5 rounded-full object-cover border border-[#1f2e4a]" 
                  />
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="font-bold text-white text-[11px] leading-tight truncate max-w-[95px]">
                      {currentUser?.name || "User"}
                    </span>
                    <span className={`text-[9px] font-mono leading-none capitalize font-semibold ${
                      currentUser?.role === 'founder' ? 'text-emerald-400' : 'text-indigo-400'
                    }`}>
                      {currentUser?.role === 'founder' ? 'Founder' : 'VC / Angel'}
                    </span>
                  </div>
                  <UserCheck className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                </button>

                <button
                  onClick={onOpenAuthModal}
                  className="px-2.5 py-1.5 rounded-xl bg-[#121c32] hover:bg-[#1a2948] border border-[#203152] text-[11px] font-bold text-indigo-300 hover:text-white transition-colors"
                  title="Switch demo persona or register new details"
                >
                  Switch
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Sub-header Bar: Engine Status & Active Pipeline Details */}
        <div className="px-4 sm:px-6 lg:px-8 py-1.5 bg-[#050914] border-t border-[#142036] text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Diligence Ledger Sync: Online</span>
            </span>
            <span className="hidden md:inline text-slate-700">•</span>
            <span className="hidden md:inline text-slate-300">
              Mode: <span className="text-white capitalize font-semibold">{activeDoor} CFO Studio</span>
            </span>
            <span className="hidden lg:inline text-slate-700">•</span>
            <span className="hidden lg:inline text-slate-400">
              Audit Pipeline: <span className="text-indigo-300 font-semibold">5-Stage Verification Standard</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isSampleDataLoaded && (
              <span className="text-amber-400 font-bold flex items-center gap-1.5 text-[10px] bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                <Sparkles className="w-3 h-3" />
                <span>HACKATHON LIVE WATERMARK</span>
              </span>
            )}
            <span className="text-slate-500 hidden sm:inline">Engine: v2026.10-Autonomous</span>
          </div>
        </div>
      </header>

      {/* Trust Ladder Modal */}
      <TrustLadderModal
        isOpen={isTrustModalOpen}
        onClose={() => setIsTrustModalOpen(false)}
        currentStartup={currentStartup}
      />
    </>
  );
};
