import React, { useState } from 'react';
import { Activity, Sparkles, Shield, Compass, HeartPulse } from 'lucide-react';
import { MOCK_STARTUPS, MOCK_PERSONAS } from './data/mockStartups';
import { Navbar } from './components/Navbar';
import { FounderStudio } from './components/FounderStudio';
import { InvestorTerminal } from './components/InvestorTerminal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { TrustLadderModal } from './components/TrustLadderModal';

export default function App() {
  const [startupsList, setStartupsList] = useState(MOCK_STARTUPS);
  const [currentUser, setCurrentUser] = useState(MOCK_PERSONAS.investors[0]);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTrustLadderModalOpen, setIsTrustLadderModalOpen] = useState(false);

  const [activeDoor, setActiveDoor] = useState(currentUser.role === 'founder' ? 'founder' : 'investor');
  const [selectedStartupId, setSelectedStartupId] = useState(currentUser.startupId || 'startup-104');
  const [isBlindMode, setIsBlindMode] = useState(true);
  const [isSampleDataLoaded, setIsSampleDataLoaded] = useState(true);

  const currentStartup = startupsList.find(s => s.id === selectedStartupId) || startupsList[0];

  const handleToggleSampleData = () => {
    setIsSampleDataLoaded(prev => !prev);
  };

  const handleRegisterUser = ({ user, customStartup, preferredBlindMode }) => {
    setCurrentUser(user);
    
    if (customStartup) {
      setStartupsList(prev => [customStartup, ...prev]);
      setSelectedStartupId(customStartup.id);
    } else if (user.startupId) {
      setSelectedStartupId(user.startupId);
    }

    if (user.role === 'founder') {
      setActiveDoor('founder');
    } else {
      setActiveDoor('investor');
      if (preferredBlindMode !== undefined) {
        setIsBlindMode(preferredBlindMode);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200 bg-radial-grid relative">
      {/* Ambient background glow orbs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[400px] bg-emerald-500/8 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-10 w-[450px] h-[350px] bg-cyan-600/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Top Main Navigation Bar */}
      <Navbar
        activeDoor={activeDoor}
        setActiveDoor={setActiveDoor}
        selectedStartupId={selectedStartupId}
        setSelectedStartupId={setSelectedStartupId}
        startupsList={startupsList}
        isSampleDataLoaded={isSampleDataLoaded}
        toggleSampleData={handleToggleSampleData}
        isBlindMode={isBlindMode}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 transition-all duration-300">
        {activeDoor === 'founder' ? (
          <FounderStudio
            startup={currentStartup}
            isSampleDataLoaded={isSampleDataLoaded}
            onOpenTrustModal={() => setIsTrustLadderModalOpen(true)}
          />
        ) : (
          <InvestorTerminal
            startup={currentStartup}
            isBlindMode={isBlindMode}
            setIsBlindMode={setIsBlindMode}
            isSampleDataLoaded={isSampleDataLoaded}
            onOpenTrustModal={() => setIsTrustLadderModalOpen(true)}
          />
        )}
      </main>

      {/* Interactive Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onRegisterUser={handleRegisterUser}
        currentUser={currentUser}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        currentStartup={currentStartup}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      <TrustLadderModal
        isOpen={isTrustLadderModalOpen}
        onClose={() => setIsTrustLadderModalOpen(false)}
        currentStartup={currentStartup}
      />

      {/* High-Impact Cyber Fintech Footer */}
      <footer className="border-t border-[#1a2742] bg-[#050811]/90 backdrop-blur-md py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <HeartPulse className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-white font-bold tracking-tight">VenturePulse AI</span>
              <span className="text-slate-400 text-[11px] ml-2">Autonomous Diligence & Runway Operating System</span>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px] flex-wrap justify-center">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Screening aid only. Not investment advice.</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Offline Diligence Engine Active</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
