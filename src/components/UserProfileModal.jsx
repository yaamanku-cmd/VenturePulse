import React from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Edit3, 
  DollarSign
} from 'lucide-react';

/**
 * UserProfileModal Component
 * Shows personal credentials passport for the active logged-in user:
 * - Contact information (Phone, Work Email)
 * - Academic / Alma Mater pedigree
 * - Associated Startup (or Stealth/No Startup indicator)
 * - Investor Ticket Size, AUM, and Mandate
 */
export const UserProfileModal = ({
  isOpen,
  onClose,
  currentUser,
  onOpenAuthModal,
  currentStartup
}) => {
  if (!isOpen || !currentUser) return null;

  const isFounder = currentUser.role === 'founder';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#0e1524] border border-[#1f2e4a] rounded-2xl shadow-2xl p-6 md:p-7 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#1f2e4a]">
          <div className="flex items-center gap-3">
            <img 
              src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
              alt={currentUser.name} 
              className="w-12 h-12 rounded-xl object-cover border-2 border-indigo-500/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 id="profile-modal-title" className="text-base font-bold text-white">
                  {currentUser.name}
                </h3>
                <span className={`text-[10px] font-mono px-2 py-0.2 rounded font-bold uppercase ${
                  isFounder 
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                }`}>
                  {isFounder ? 'Founder' : 'Institutional VC'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{currentUser.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Personal Details Card */}
        <div className="mt-5 space-y-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Verified Credentials & Identity:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {/* Email */}
            <div className="p-3 rounded-xl bg-[#111927] border border-[#1f2e4a]">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                <Mail className="w-3 h-3 text-indigo-400" />
                <span>Work Email</span>
              </div>
              <div className="font-mono text-white truncate">{currentUser.email}</div>
            </div>

            {/* Phone */}
            <div className="p-3 rounded-xl bg-[#111927] border border-[#1f2e4a]">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>Contact Phone</span>
              </div>
              <div className="font-mono text-white">{currentUser.phone || "+91 98765 43210"}</div>
            </div>

            {/* Founder Specific / Investor Specific */}
            {isFounder ? (
              <>
                <div className="p-3 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                    <GraduationCap className="w-3 h-3 text-purple-400" />
                    <span>Alma Mater / Pedigree</span>
                  </div>
                  <div className="text-white font-medium truncate">{currentUser.college || "Industry Practitioner"}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>Innovation Hub</span>
                  </div>
                  <div className="text-white font-medium truncate">{currentUser.city || currentStartup?.city}</div>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                    <Briefcase className="w-3 h-3 text-blue-400" />
                    <span>Fund / Syndicate</span>
                  </div>
                  <div className="text-white font-medium truncate">{currentUser.firm || "Venture Syndicate"}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#111927] border border-[#1f2e4a]">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                    <DollarSign className="w-3 h-3 text-emerald-400" />
                    <span>Ticket Size</span>
                  </div>
                  <div className="font-mono text-emerald-400 font-bold">{currentUser.ticketSize || "₹50L – ₹2 Cr"}</div>
                </div>
              </>
            )}
          </div>

          {/* Active Venture Summary */}
          {isFounder && (
            <div className="p-3.5 rounded-xl bg-[#090d16] border border-[#1f2e4a]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Linked Venture Status:</span>
                <span className={`text-[10px] font-mono px-2 py-0.2 rounded font-bold ${
                  currentStartup?.financials?.isPreRevenue ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {currentStartup?.financials?.isPreRevenue ? '₹0 MRR (Pre-Revenue)' : `${currentStartup?.stage}`}
                </span>
              </div>
              <div className="text-sm font-bold text-white">{currentStartup?.realName || currentUser.startupName}</div>
              <div className="text-xs text-slate-400 mt-0.5">{currentStartup?.sector} • {currentStartup?.city}</div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="mt-6 pt-4 border-t border-[#1f2e4a] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenAuthModal();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#131d31] hover:bg-[#1a2947] border border-[#1f2e4a] text-xs font-semibold text-slate-200 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Switch or Register New User</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
