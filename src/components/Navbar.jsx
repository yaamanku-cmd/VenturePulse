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
  UserCheck
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
          label: 'Verified - AA Sandbox Roadmap',
          icon: BadgeCheck,
          styles: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400',
        };
      case 'registered':
        return {
          label: 'Registered - MSME/DPIIT',
          icon: ShieldCheck,
          styles: 'bg-blue-500/15 border-blue-500/40 text-blue-400',
        };
      case 'self_reported':
      default:
        return {
          label: 'Self-Reported',
          icon: ShieldAlert,
          styles: 'bg-amber-500/15 border-amber-500/40 text-amber-400',
        };
    }
  };

  const trustBadge = getTrustBadge(currentStartup.trustLevel);
  const TrustIcon = trustBadge.icon;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#1f2e4a] bg-[#090d16]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            
            {/* Brand Logo & Tagline */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
                    VenturePulse <span className="text-emerald-400 font-mono text-xs font-semibold px-1 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/30">AI</span>
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-tight block -mt-0.5 font-mono">
                  Autonomous Diligence & Runway OS
                </span>
              </div>
            </div>

            {/* CRITICAL: "Two-Door Entryway" Top Switcher */}
            <div className="flex items-center bg-[#111927] p-1 rounded-xl border border-[#1f2e4a] shadow-inner">
              <button
                onClick={() => setActiveDoor('founder')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeDoor === 'founder'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Founder CFO Studio</span>
              </button>

              <button
                onClick={() => setActiveDoor('investor')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeDoor === 'investor'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Investor Diligence Terminal</span>
              </button>
            </div>

            {/* Right Controls: Startup Switcher, Trust Badge, Sample Data Button */}
            <div className="flex items-center gap-2.5">
              
              {/* Trust Badge Trigger */}
              <button
                onClick={() => setIsTrustModalOpen(true)}
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all hover:brightness-110 ${trustBadge.styles}`}
                title="Click to view Trust Ladder progression details"
              >
                <TrustIcon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate max-w-[130px] lg:max-w-[180px]">{trustBadge.label}</span>
              </button>

              {/* Startup Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs font-medium text-slate-200 hover:border-slate-600 transition-colors"
                >
                  <span className="font-mono text-emerald-400 font-bold">
                    {isBlindMode && activeDoor === 'investor' ? currentStartup.codeName : currentStartup.realName}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#0e1524] border border-[#1f2e4a] rounded-xl shadow-2xl py-2 z-50 animate-fadeIn">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Select Demo Profile
                    </div>
                    {startupsList.map((startup) => (
                      <button
                        key={startup.id}
                        onClick={() => {
                          setSelectedStartupId(startup.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/60 transition-colors ${
                          selectedStartupId === startup.id ? 'bg-indigo-600/20 text-white font-semibold' : 'text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-medium">
                            {isBlindMode && activeDoor === 'investor' ? startup.codeName : startup.realName}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {startup.sector}
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 font-bold">
                          {startup.meritocracyScore}/100
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CRITICAL: "One-Click Sample Data" Button */}
              <button
                onClick={toggleSampleData}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSampleDataLoaded
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40'
                    : 'bg-[#111927] border border-[#1f2e4a] text-slate-300 hover:text-white hover:border-amber-500/50'
                }`}
                title="Instant hackathon demo data loader"
              >
                <Zap className={`w-3.5 h-3.5 ${isSampleDataLoaded ? 'fill-slate-950' : 'text-amber-400'}`} />
                <span className="hidden sm:inline">⚡ Load Sample Data</span>
                <span className="sm:hidden font-mono">Sample</span>
              </button>

              {/* NEW: Verified Personal Identity Passport & Profile Modal */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenProfileModal}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111927] border border-[#1f2e4a] hover:border-indigo-500/60 text-xs transition-all shadow-sm"
                  title="Click to view your personal credentials & passport details"
                >
                  <img 
                    src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
                    alt={currentUser?.name || "User"} 
                    className="w-5 h-5 rounded-full object-cover border border-[#1f2e4a]" 
                  />
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="font-bold text-white text-[11px] leading-tight truncate max-w-[110px]">
                      {currentUser?.name || "User"}
                    </span>
                    <span className={`text-[9px] font-mono leading-none capitalize font-semibold ${
                      currentUser?.role === 'founder' ? 'text-emerald-400' : 'text-indigo-400'
                    }`}>
                      {currentUser?.role === 'founder' ? 'Founder Persona' : 'VC Persona'}
                    </span>
                  </div>
                  <UserCheck className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                </button>

                <button
                  onClick={onOpenAuthModal}
                  className="px-2.5 py-1.5 rounded-xl bg-[#131d31] hover:bg-slate-800 border border-[#1f2e4a] text-[11px] font-semibold text-indigo-300 hover:text-white transition-colors"
                  title="Switch profile or register new personal details"
                >
                  Switch / Register
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Sub-header Bar: Engine Status & Active Door Context */}
        <div className="px-4 sm:px-6 lg:px-8 py-1.5 bg-[#070b12] border-t border-[#1f2e4a]/60 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Local Diligence Engine Active (Offline Resilient)</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">
              Active Environment: <span className="text-slate-200 capitalize">{activeDoor} Mode</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isSampleDataLoaded && (
              <span className="text-amber-400 font-bold flex items-center gap-1 text-[10px]">
                <Sparkles className="w-3 h-3" />
                <span>WATERMARK: HACKATHON LIVE RUNTIME</span>
              </span>
            )}
            <span className="text-slate-500">Node Sync: 2026.10-Live</span>
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
