import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  X, 
  LogIn, 
  ArrowRight,
  User,
  Mail,
  Phone,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { MOCK_PERSONAS, createCustomStartup } from '../data/mockStartups';

/**
 * AuthModal Component
 * Comprehensive authentication & personal details registration gateway.
 * Supports:
 * 1. Detailed Personal Registration Form (Founder & Investor)
 *    - Includes "No Startup / Idea Phase" option for pre-revenue founders
 * 2. 1-Click Quick Demo Profiles for instant hackathon testing
 */
export const AuthModal = ({ 
  isOpen, 
  onClose, 
  onRegisterUser,
  currentUser 
}) => {
  // Mode switcher: 'form' (Detailed Registration) | 'personas' (1-Click Demo Profiles)
  const [activeMode, setActiveMode] = useState('form');

  // Role tab: 'founder' | 'investor'
  const [roleTab, setRoleTab] = useState(currentUser?.role || 'founder');
  const [formError, setFormError] = useState(null);

  // Founder Personal Details Form State
  const [founderForm, setFounderForm] = useState({
    name: '',
    email: '',
    phone: '',
    designation: 'Founder & CEO',
    college: '',
    city: 'Tier-2/3 Regional Hub',
    noStartup: false, // "No Startup / Idea Phase"
    startupName: '',
    sector: 'CleanTech & Energy',
    currentMrr: '0',
    stage: 'Idea / Prototype'
  });

  // Investor Personal Details Form State
  const [investorForm, setInvestorForm] = useState({
    name: '',
    email: '',
    phone: '',
    designation: 'Managing Partner',
    firm: '',
    aum: '₹50 Cr – ₹150 Cr',
    ticketSize: '₹50 Lakhs – ₹2.00 Cr',
    sectorFocus: 'CleanTech & DeepTech',
    blindModeDefault: true,
    isAccredited: true
  });

  if (!isOpen) return null;

  // Handle 1-Click Persona selection
  const handleSelectPersona = (persona) => {
    onRegisterUser({
      user: persona,
      customStartup: null
    });
    onClose();
  };

  // Handle Founder Form Submit
  const handleFounderSubmit = (e) => {
    e.preventDefault();
    if (!founderForm.name || !founderForm.email) {
      setFormError("Please provide at least your Full Name and Work/Personal Email.");
      return;
    }
    setFormError(null);

    // Generate custom startup profile
    const customStartup = createCustomStartup({
      founderName: founderForm.name,
      founderEmail: founderForm.email,
      founderPhone: founderForm.phone,
      founderCollege: founderForm.college,
      founderRole: founderForm.designation,
      hasStartup: !founderForm.noStartup,
      startupName: founderForm.startupName,
      sector: founderForm.sector,
      city: founderForm.city,
      currentMrr: founderForm.noStartup ? 0 : Number(founderForm.currentMrr),
      stage: founderForm.noStartup ? "Idea / Pre-Revenue" : founderForm.stage
    });

    const newUser = {
      id: `user-f-${Date.now()}`,
      name: founderForm.name,
      email: founderForm.email,
      phone: founderForm.phone || "+91 98000 00000",
      role: 'founder',
      title: `${founderForm.designation} (${founderForm.noStartup ? 'Stealth Idea' : customStartup.realName})`,
      startupId: customStartup.id,
      startupName: customStartup.realName,
      college: founderForm.college || "Industry Practitioner",
      city: founderForm.city,
      isPreRevenue: customStartup.financials.isPreRevenue,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    };

    onRegisterUser({
      user: newUser,
      customStartup: customStartup
    });
    onClose();
  };

  // Handle Investor Form Submit
  const handleInvestorSubmit = (e) => {
    e.preventDefault();
    if (!investorForm.name || !investorForm.email) {
      setFormError("Please provide at least your Full Name and Work Email.");
      return;
    }
    setFormError(null);

    const newUser = {
      id: `user-inv-${Date.now()}`,
      name: investorForm.name,
      email: investorForm.email,
      phone: investorForm.phone || "+91 98200 00000",
      role: 'investor',
      title: `${investorForm.designation} @ ${investorForm.firm || 'Angel Syndicate'}`,
      firm: investorForm.firm || "Independent Venture Syndicate",
      ticketSize: investorForm.ticketSize,
      aum: investorForm.aum,
      focusSectors: investorForm.sectorFocus,
      blindModeDefault: investorForm.blindModeDefault,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    };

    onRegisterUser({
      user: newUser,
      customStartup: null,
      preferredBlindMode: investorForm.blindModeDefault
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0e1524] border border-[#1f2e4a] rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Modal Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#1f2e4a]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              <LogIn className="w-6 h-6" />
            </div>
            <div>
              <h2 id="auth-modal-title" className="text-xl font-bold text-white tracking-tight">
                Authentication & Personal Onboarding
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Register personal credentials, configure your startup or investor mandate
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Segmented Controls: Form Mode vs 1-Click Demos */}
        <div className="flex items-center justify-between gap-3 mt-4 mb-2">
          {/* Role selector */}
          <div className="flex items-center bg-[#090d16] p-1 rounded-xl border border-[#1f2e4a] flex-1">
            <button
              onClick={() => setRoleTab('founder')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                roleTab === 'founder'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Founder Door</span>
            </button>
            <button
              onClick={() => setRoleTab('investor')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                roleTab === 'investor'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Investor / VC Door</span>
            </button>
          </div>

          {/* Sub-mode switcher */}
          <div className="flex items-center bg-[#131d31] p-1 rounded-xl border border-[#1f2e4a] text-xs">
            <button
              onClick={() => setActiveMode('form')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeMode === 'form' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Custom Form
            </button>
            <button
              onClick={() => setActiveMode('personas')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeMode === 'personas' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1-Click Demos
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto space-y-4 flex-1 pr-1.5 pt-2">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center justify-between animate-fadeIn">
              <span>⚠️ {formError}</span>
              <button 
                type="button" 
                onClick={() => setFormError(null)} 
                className="text-slate-400 hover:text-white font-bold ml-2"
              >
                ✕
              </button>
            </div>
          )}
          
          {/* MODE 1: Detailed Personal Details Form */}
          {activeMode === 'form' && (
            <div>
              {roleTab === 'founder' ? (
                /* FOUNDER PERSONAL DETAILS FORM */
                <form onSubmit={handleFounderSubmit} className="space-y-4">
                  
                  {/* Section 1: Personal Info */}
                  <div className="p-4 rounded-xl bg-[#090d16] border border-[#1f2e4a] space-y-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                      1. Founder Personal Details:
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="e.g. Karthik Menon"
                            value={founderForm.name}
                            onChange={(e) => setFounderForm({ ...founderForm, name: e.target.value })}
                            className="w-full px-3 py-2 pl-8 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                          <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="karthik@stealth.ai"
                            value={founderForm.email}
                            onChange={(e) => setFounderForm({ ...founderForm, email: e.target.value })}
                            className="w-full px-3 py-2 pl-8 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                          <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={founderForm.phone}
                            onChange={(e) => setFounderForm({ ...founderForm, phone: e.target.value })}
                            className="w-full px-3 py-2 pl-8 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                          <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Founder Role
                        </label>
                        <select
                          value={founderForm.designation}
                          onChange={(e) => setFounderForm({ ...founderForm, designation: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-emerald-500"
                        >
                          <option value="Founder & CEO">Founder & CEO</option>
                          <option value="Co-Founder & CTO">Co-Founder & CTO</option>
                          <option value="Lead Scientist & Researcher">Lead Scientist & Researcher</option>
                          <option value="Solo Builder / Hacker">Solo Builder / Hacker</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Alma Mater / College
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. IIT, BITS, Self-Taught"
                            value={founderForm.college}
                            onChange={(e) => setFounderForm({ ...founderForm, college: e.target.value })}
                            className="w-full px-3 py-2 pl-8 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Startup Status & "No Startup / Idea Phase" option */}
                  <div className="p-4 rounded-xl bg-[#090d16] border border-[#1f2e4a] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                        2. Venture Details & Revenue Status:
                      </span>
                    </div>

                    {/* CRITICAL FEATURE: "No Startup / Idea Phase" Checkbox */}
                    <div className="p-3 rounded-xl bg-[#131d31] border border-amber-500/30 flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="noStartupCheckbox"
                        checked={founderForm.noStartup}
                        onChange={(e) => setFounderForm({ ...founderForm, noStartup: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-slate-700 text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
                      />
                      <label htmlFor="noStartupCheckbox" className="text-xs text-slate-300 cursor-pointer select-none">
                        <strong className="text-white block font-semibold">
                          I have No Startup yet (Idea Phase / Pre-Revenue Prototype)
                        </strong>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          Check this if you are in the lab/concept phase. You will automatically receive a Stealth Workspace and be connected to the Pre-Revenue Advisory Syndicate.
                        </span>
                      </label>
                    </div>

                    {!founderForm.noStartup ? (
                      /* If they HAVE a startup */
                      <div className="space-y-3 pt-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                              Startup Name *
                            </label>
                            <input
                              type="text"
                              required={!founderForm.noStartup}
                              placeholder="e.g. AeroFlow Dynamics"
                              value={founderForm.startupName}
                              onChange={(e) => setFounderForm({ ...founderForm, startupName: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                              Sector & Industry
                            </label>
                            <select
                              value={founderForm.sector}
                              onChange={(e) => setFounderForm({ ...founderForm, sector: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-emerald-500"
                            >
                              <option value="CleanTech & Energy">CleanTech & Energy</option>
                              <option value="AgriTech & Climate SaaS">AgriTech & Climate SaaS</option>
                              <option value="DeepTech & AI Hardware">DeepTech & AI Hardware</option>
                              <option value="B2B Enterprise SaaS">B2B Enterprise SaaS</option>
                              <option value="Fintech & Embedded Credit">Fintech & Embedded Credit</option>
                              <option value="HealthTech & Diagnostics">HealthTech & Diagnostics</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                              Current MRR (Monthly Recurring Revenue)
                            </label>
                            <select
                              value={founderForm.currentMrr}
                              onChange={(e) => setFounderForm({ ...founderForm, currentMrr: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                            >
                              <option value="0">₹0 (Pre-Revenue Stage)</option>
                              <option value="150000">₹1.5 Lakhs / month</option>
                              <option value="350000">₹3.5 Lakhs / month</option>
                              <option value="600000">₹6.0 Lakhs / month</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                              Venture Location / Hub
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Bhopal (Tier-2 Hub)"
                              value={founderForm.city}
                              onChange={(e) => setFounderForm({ ...founderForm, city: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* If they have NO startup */
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                        <div className="text-emerald-300 font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Stealth Incubator Mode Configured</span>
                        </div>
                        <p className="text-slate-300">
                          Workspace Name: <span className="font-mono text-white">{founderForm.name ? `${founderForm.name}'s Stealth Venture` : "Founder Stealth Labs"}</span>
                        </p>
                        <p className="text-slate-400 text-[11px]">
                          Includes zero-MRR diagnostic modeling and immediate 1-on-1 access to Chartered Accountants, Serial Founders & Business Analysts.
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Complete Registration & Open Founder CFO Studio</span>
                  </button>
                </form>
              ) : (
                /* INVESTOR PERSONAL DETAILS FORM */
                <form onSubmit={handleInvestorSubmit} className="space-y-4">
                  
                  {/* Section 1: Investor Personal Info */}
                  <div className="p-4 rounded-xl bg-[#090d16] border border-[#1f2e4a] space-y-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400 block">
                      1. Investor Credentials & Designation:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="e.g. Pooja Singhal"
                            value={investorForm.name}
                            onChange={(e) => setInvestorForm({ ...investorForm, name: e.target.value })}
                            className="w-full px-3 py-2 pl-8 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                          <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Institutional Work Email *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="pooja@indiascale.vc"
                            value={investorForm.email}
                            onChange={(e) => setInvestorForm({ ...investorForm, email: e.target.value })}
                            className="w-full px-3 py-2 pl-8 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                          <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Contact Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="+91 98200 88990"
                            value={investorForm.phone}
                            onChange={(e) => setInvestorForm({ ...investorForm, phone: e.target.value })}
                            className="w-full px-3 py-2 pl-8 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                          <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Investor Designation
                        </label>
                        <select
                          value={investorForm.designation}
                          onChange={(e) => setInvestorForm({ ...investorForm, designation: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Managing Partner">Managing Partner</option>
                          <option value="Principal & Diligence Head">Principal & Diligence Head</option>
                          <option value="Angel Syndicate Lead">Angel Syndicate Lead</option>
                          <option value="Family Office Director">Family Office Director</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Fund Mandate & Ticket Size */}
                  <div className="p-4 rounded-xl bg-[#090d16] border border-[#1f2e4a] space-y-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400 block">
                      2. Fund Entity & Deployment Parameters:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Fund / Syndicate Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. India Scale Ventures"
                          value={investorForm.firm}
                          onChange={(e) => setInvestorForm({ ...investorForm, firm: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Capital Pool / AUM
                        </label>
                        <select
                          value={investorForm.aum}
                          onChange={(e) => setInvestorForm({ ...investorForm, aum: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        >
                          <option value="₹10 Cr – ₹30 Cr">₹10 Cr – ₹30 Cr</option>
                          <option value="₹50 Cr – ₹150 Cr">₹50 Cr – ₹150 Cr</option>
                          <option value="₹200 Cr+ Tier-1 Fund">₹200 Cr+ Tier-1 Fund</option>
                          <option value="Angel Syndicate Pool">Angel Syndicate Pool</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Typical Check / Ticket Size
                        </label>
                        <select
                          value={investorForm.ticketSize}
                          onChange={(e) => setInvestorForm({ ...investorForm, ticketSize: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        >
                          <option value="₹25 Lakhs – ₹50 Lakhs">₹25 Lakhs – ₹50 Lakhs</option>
                          <option value="₹50 Lakhs – ₹2.00 Cr">₹50 Lakhs – ₹2.00 Cr</option>
                          <option value="₹2.00 Cr – ₹5.00 Cr">₹2.00 Cr – ₹5.00 Cr</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Primary Sector Focus
                        </label>
                        <select
                          value={investorForm.sectorFocus}
                          onChange={(e) => setInvestorForm({ ...investorForm, sectorFocus: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#111927] border border-[#1f2e4a] text-xs text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value="CleanTech & DeepTech">CleanTech & DeepTech</option>
                          <option value="AgriTech & Climate">AgriTech & Climate</option>
                          <option value="B2B Enterprise SaaS">B2B Enterprise SaaS</option>
                          <option value="Fintech & Embedded Credit">Fintech & Embedded Credit</option>
                        </select>
                      </div>
                    </div>

                    {/* Pedigree Blind Checkbox */}
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="blindModeCheck"
                          checked={investorForm.blindModeDefault}
                          onChange={(e) => setInvestorForm({ ...investorForm, blindModeDefault: e.target.checked })}
                          className="h-4 w-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 accent-indigo-500 cursor-pointer"
                        />
                        <label htmlFor="blindModeCheck" className="text-xs text-slate-300 cursor-pointer select-none">
                          Enable <strong>Pedigree-Blind Diligence Mode</strong> by default (Mask founder names & colleges)
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="accreditedCheck"
                          checked={investorForm.isAccredited}
                          onChange={(e) => setInvestorForm({ ...investorForm, isAccredited: e.target.checked })}
                          className="h-4 w-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 accent-indigo-500 cursor-pointer"
                        />
                        <label htmlFor="accreditedCheck" className="text-xs text-slate-400 cursor-pointer select-none">
                          I confirm accreditation under SEBI / applicable venture investment guidelines
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Register Mandate & Enter Diligence Terminal</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* MODE 2: 1-Click Quick Demo Profiles */}
          {activeMode === 'personas' && (
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Select 1-Click Persona for Instant Demo:
              </span>

              {roleTab === 'founder' ? (
                MOCK_PERSONAS.founders.map((persona) => (
                  <div
                    key={persona.id}
                    onClick={() => handleSelectPersona(persona)}
                    className="p-4 rounded-xl border border-[#1f2e4a] bg-[#111927] hover:border-emerald-500/50 hover:bg-[#142236] cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={persona.avatar} 
                        alt={persona.name} 
                        className="w-10 h-10 rounded-full object-cover border border-[#1f2e4a]" 
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{persona.name}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-300">
                            {persona.city}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-400 font-medium">{persona.title} • {persona.startupName}</p>
                        <p className="text-[11px] font-mono text-slate-400">{persona.phone} • {persona.college}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </div>
                ))
              ) : (
                MOCK_PERSONAS.investors.map((persona) => (
                  <div
                    key={persona.id}
                    onClick={() => handleSelectPersona(persona)}
                    className="p-4 rounded-xl border border-[#1f2e4a] bg-[#111927] hover:border-indigo-500/50 hover:bg-[#142038] cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={persona.avatar} 
                        alt={persona.name} 
                        className="w-10 h-10 rounded-full object-cover border border-[#1f2e4a]" 
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{persona.name}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                            AUM: {persona.aum}
                          </span>
                        </div>
                        <p className="text-xs text-indigo-300 font-medium">{persona.title} • {persona.firm}</p>
                        <p className="text-[11px] font-mono text-slate-400">Check: {persona.ticketSize} • {persona.phone}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-indigo-400" />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
