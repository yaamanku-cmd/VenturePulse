 # Venture Pulse AI

> **Autonomous Diligence & Runway Operating System**
> Bridging Startup Pitch Claims, Self-Reported Ledgers, and Meritocracy-Driven Venture Capital.

Built with **React (Vite)**, **Tailwind CSS**, **Lucide React**, and **Recharts**.

---

## 🌟 Core Product Principles Enforced

1. **Two-Door Entryway**:
   - Seamless top navigation switcher between **Founder CFO Studio** and **Investor Diligence Terminal**.
   - Context-sensitive views: Founders audit their pitch deck claims before VC distribution; Investors screen startups with meritocracy scoring.

2. **Claim Check (NOT Lie Detector)**:
   - Side-by-side reconciliation matrix:
     - **Left Side**: Extracted pitch claims from pitch memos and decks.
     - **Right Side**: Computed metrics labeled **"Self-Reported Ledger"**.
   - **Amber Badge**: Minor gaps & moderate variance (e.g. traveling field rep stipends omitted from CAC).
   - **Red Badge**: Large unexplained discrepancies (e.g. burn claiming ₹6.5L vs ₹13.8L actual, gross margin inflated).
   - **Green Badge**: Verified ledger matches (e.g. bank & GSTN audited).

3. **Trust Ladder**:
   - Every startup displays a visual Trust Badge:
     - 🟨 **[Self-Reported]** (Amber) — Manual founder CSV / unverified entry.
     - 🟦 **[Registered - MSME/DPIIT]** (Blue) — Official Govt registry matched via MCA/DPIIT API.
     - 🟩 **[Verified - AA Sandbox Roadmap]** (Green) — Account Aggregator / GSTN live machine feed.
   - Interactive educational modal explains prerequisites and audit criteria for each tier.

4. **Meritocracy Score Dial (0–100)**:
   - Dynamic circular SVG gauge with glow and color transitions.
   - 5-Pillar breakdown modal:
     - **Growth & Traction Velocity** (25%)
     - **Capital Efficiency** (25%)
     - **Runway & Buffer** (20%)
     - **Expense Discipline** (15%)
     - **Claim Consistency Index** (15%)
   - Prominently displays the mandatory legal disclaimer: **"Screening aid only. Not investment advice."**

5. **Pedigree-Blind Toggle**:
   - In the Investor Terminal, an interactive toggle (**"Blind Mode"**) masks founder names, faces, and college alma maters.
   - E.g., displays **"Startup #104 — Tier-3 Hub, AgriTech"** with anonymized credentials ("Founder Alpha — Tier-1 Technical Institute (Masked)").
   - Eliminates prestige and pedigree bias, prioritizing unit economics and ledger truth.

6. **Interactive What-If Sliders & Real-Time Recharts**:
   - Dual sliders for stress-testing:
     - **"Monthly Marketing Shock (+/- 50%)"**
     - **"Add Tech Hires (+1 to +5)"**
   - Real-time recalculation of projected monthly burn and runway.
   - **Recharts AreaChart** plots baseline trajectory vs stressed trajectory, with a vertical reference line marking the exact **Depletion Month** (Zero-Cash Date).

7. **Tranche Release Simulation**:
   - Milestone-based escrow fund release stepper (e.g. 40% upfront, 30% at ₹5L MRR hurdle, 30% at retention target).
   - Explicit label: **"Simulation: No real money moves"**.
   - Interactive unlock simulation buttons demonstrating milestone-governed capital release.

8. **One-Click Sample Data & Offline Demo Mock Resilience**:
   - Header button: **"⚡ Load Sample Data"** with visible **SAMPLE DATA** watermark badges across components.
   - Curated startup profiles:
     - **KrishiGrid AI (Startup #104)**: Tier-3 Hub AgriTech, high meritocracy (84/100), Registered MSME/DPIIT.
     - **CashMatrix Protocol (Startup #218)**: High burn multiple (3.4x), Self-Reported, critical red discrepancies.
     - **BioLogix ColdChain (Startup #309)**: Top tier (92/100), Verified AA Sandbox Roadmap.
   - Offline resilience: Zero backend dependency required; gracefully runs with robust local state.

---

## 🎨 Design System

- **Palette**: Deep fintech dark mode (`#090d16` background, `#0e1524` card surfaces, `#1f2e4a` borders).
- **Accents**: Emerald (`#10b981`), Indigo (`#6366f1`), Amber (`#f59e0b`), Rose (`#f43f5e`).
- **Typography**: Inter for UI, **JetBrains Mono** for all financial figures, currencies, and timestamps.
- **Glassmorphism**: Subtle backdrops, glowing borders, and micro-interactions.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Build for production
npm run build
```
The application will be live at `http://localhost:5173/`.
