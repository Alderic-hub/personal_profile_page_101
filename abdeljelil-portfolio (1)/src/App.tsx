import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Activity, ShieldAlert, Navigation2, Menu, X } from "lucide-react";

// Import data structures
import profileData from "./data/profile.json";
import missionsData from "./data/missions.json";
import skillsData from "./data/skills.json";
import journeyData from "./data/journey.json";

// Import types
import { Profile, Mission, Skills, JourneyChapter } from "./types";

// Import components
import IntroScene from "./components/IntroScene";
import MissionsScene from "./components/MissionsScene";
import LoadoutScene from "./components/LoadoutScene";
import JourneyScene from "./components/JourneyScene";
import ContactScene from "./components/ContactScene";

export default function App() {
  // Cast JSON data safely
  const profile = profileData as Profile;
  const missions = missionsData as Mission[];
  const skills = skillsData as Skills;
  const journey = journeyData as JourneyChapter[];

  // Active view tracker
  const [activeView, setActiveView] = useState("home");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [subPageMobileMenuOpen, setSubPageMobileMenuOpen] = useState(false);

  const handleNavigate = (view: string, sector: string | null = null) => {
    setActiveView(view);
    setSelectedSector(sector);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Dynamic styling for unified header based on active page
  const getHeaderStyles = (view: string) => {
    switch (view) {
      case "journey":
        return {
          bg: "bg-palette-taupe",
          text: "text-palette-cream/70",
          activeText: "text-white font-semibold",
          logo: "text-white",
          dot: "text-palette-cream/50",
          cta: "bg-palette-cream text-palette-taupe hover:bg-white hover:shadow-lg",
          indicator: "bg-palette-cream",
          toggleBtn: "bg-palette-cream/10 hover:bg-palette-cream/20 text-palette-cream border-palette-cream/20",
          mobileMenuBg: "bg-palette-taupe border-palette-cream/20 text-palette-cream",
          mobileItemActive: "bg-palette-cream/10 text-white font-bold border-l-4 border-palette-cream",
          mobileItemInactive: "text-palette-cream/70 hover:text-white hover:bg-palette-cream/5",
          mobileDivider: "border-palette-cream/10",
          mobileHeaderTitle: "text-palette-cream/50",
          mobileCloseBtn: "text-palette-cream/50 hover:text-white"
        };
      case "missions":
        return {
          bg: "bg-palette-lightgray",
          text: "text-slate-500",
          activeText: "text-slate-900 font-semibold",
          logo: "text-slate-800",
          dot: "text-slate-500",
          cta: "bg-slate-700 hover:bg-slate-900 text-white hover:shadow-lg",
          indicator: "bg-slate-500",
          toggleBtn: "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200/50",
          mobileMenuBg: "bg-white border-slate-200 text-slate-800",
          mobileItemActive: "bg-slate-50 text-slate-900 font-bold border-l-4 border-slate-800",
          mobileItemInactive: "text-slate-500 hover:text-slate-900 hover:bg-slate-50/50",
          mobileDivider: "border-slate-100",
          mobileHeaderTitle: "text-slate-400",
          mobileCloseBtn: "text-slate-400 hover:text-slate-700"
        };
      case "loadout":
        return {
          bg: "bg-palette-cream",
          text: "text-slate-500",
          activeText: "text-slate-900 font-semibold",
          logo: "text-slate-800",
          dot: "text-slate-500",
          cta: "bg-slate-700 hover:bg-slate-900 text-white hover:shadow-lg",
          indicator: "bg-slate-500",
          toggleBtn: "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200/50",
          mobileMenuBg: "bg-white border-slate-200 text-slate-800",
          mobileItemActive: "bg-slate-50 text-slate-900 font-bold border-l-4 border-slate-800",
          mobileItemInactive: "text-slate-500 hover:text-slate-900 hover:bg-slate-50/50",
          mobileDivider: "border-slate-100",
          mobileHeaderTitle: "text-slate-400",
          mobileCloseBtn: "text-slate-400 hover:text-slate-700"
        };
      case "contact":
        return {
          bg: "bg-slate-100",
          text: "text-slate-500",
          activeText: "text-slate-900 font-semibold",
          logo: "text-slate-800",
          dot: "text-slate-500",
          cta: "bg-slate-700 hover:bg-slate-900 text-white hover:shadow-lg",
          indicator: "bg-slate-500",
          toggleBtn: "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200/50",
          mobileMenuBg: "bg-white border-slate-200 text-slate-800",
          mobileItemActive: "bg-slate-50 text-slate-900 font-bold border-l-4 border-slate-800",
          mobileItemInactive: "text-slate-500 hover:text-slate-900 hover:bg-slate-50/50",
          mobileDivider: "border-slate-100",
          mobileHeaderTitle: "text-slate-400",
          mobileCloseBtn: "text-slate-400 hover:text-slate-700"
        };
      case "home":
      default:
        return {
          bg: "bg-white",
          text: "text-slate-500",
          activeText: "text-slate-900 font-semibold",
          logo: "text-slate-800",
          dot: "text-slate-500",
          cta: "bg-slate-700 hover:bg-slate-900 text-white hover:shadow-lg",
          indicator: "bg-slate-500",
          toggleBtn: "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200/50",
          mobileMenuBg: "bg-white border-slate-200 text-slate-800",
          mobileItemActive: "bg-slate-50 text-slate-900 font-bold border-l-4 border-slate-800",
          mobileItemInactive: "text-slate-500 hover:text-slate-900 hover:bg-slate-50/50",
          mobileDivider: "border-slate-100",
          mobileHeaderTitle: "text-slate-400",
          mobileCloseBtn: "text-slate-400 hover:text-slate-700"
        };
    }
  };

  const styles = getHeaderStyles(activeView);

  return (
    <div className={`relative min-h-screen ${styles.bg} text-palette-charcoal font-sans selection:bg-palette-taupe/20 selection:text-palette-charcoal transition-colors duration-300`}>
      {/* 1. Vintage Film Grain Layer */}
      <div className="film-grain" />

      {/* 2. Unified Navigation Header (Always scrollable, part of the page content, with matching color) */}
      <div className={`${styles.bg} w-full transition-colors duration-300 select-none z-40 relative`}>
        <header className="max-w-7xl mx-auto w-full px-4 sm:px-12 lg:px-16 pt-8 pb-4 flex justify-between items-center relative">
          {/* Logo with matching accent dot */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavigate("home")}
              className={`font-sans font-black text-2xl tracking-tight ${styles.logo} cursor-pointer transition-colors`}
            >
              abdel<span className={styles.dot}>.</span>
            </button>
          </div>

          {/* Unified Navbar Links with identical typography & indicators */}
          <nav className={`hidden lg:flex md:landscape:flex items-center gap-8 text-sm font-medium ${styles.text}`}>
            {[
              { id: "home", label: "Home" },
              { id: "missions", label: "Missions" },
              { id: "loadout", label: "Loadout" },
              { id: "journey", label: "Journey" },
              { id: "contact", label: "Contact" }
            ].map((tab) => {
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavigate(tab.id)}
                  className={`${
                    isActive ? styles.activeText : `hover:${styles.logo}`
                  } py-1.5 transition-colors relative cursor-pointer`}
                >
                  {tab.label}
                  {isActive && (
                    <span className={`absolute bottom-0 left-0 right-0 h-[2.5px] ${styles.indicator} rounded-full`} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA Button and Hamburger Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavigate("contact")}
              className={`hidden sm:block ${styles.cta} px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-md`}
            >
              Let's Talk
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setSubPageMobileMenuOpen(!subPageMobileMenuOpen)}
              className={`lg:hidden md:landscape:hidden p-2.5 ${styles.toggleBtn} rounded-full transition-all cursor-pointer border shadow-sm`}
              aria-label="Toggle menu"
            >
              {subPageMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Mobile Overlay Menu Drawer */}
          <AnimatePresence>
            {subPageMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`absolute top-20 left-4 right-4 z-50 ${styles.mobileMenuBg} border shadow-2xl rounded-2xl p-6 flex flex-col gap-4 lg:hidden md:landscape:hidden`}
              >
                <div className={`flex justify-between items-center border-b ${styles.mobileDivider} pb-3 mb-1`}>
                  <span className={`font-mono text-[9px] tracking-widest ${styles.mobileHeaderTitle} uppercase font-bold`}>
                    Navigation Menu
                  </span>
                  <button
                    onClick={() => setSubPageMobileMenuOpen(false)}
                    className={`${styles.mobileCloseBtn} transition-colors`}
                  >
                    <X size={16} />
                  </button>
                </div>
                {[
                  { id: "home", label: "Home" },
                  { id: "missions", label: "Missions & Projects" },
                  { id: "loadout", label: "Skills Loadout" },
                  { id: "journey", label: "Engineering Journey" },
                  { id: "contact", label: "Direct Transmission" }
                ].map((tab) => {
                  const isActive = activeView === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setSubPageMobileMenuOpen(false);
                        handleNavigate(tab.id);
                      }}
                      className={`text-left font-sans text-sm py-2.5 px-4 rounded-xl transition-all ${
                        isActive ? styles.mobileItemActive : styles.mobileItemInactive
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    setSubPageMobileMenuOpen(false);
                    handleNavigate("contact");
                  }}
                  className={`mt-2 ${
                    activeView === "journey"
                      ? "bg-white text-palette-taupe hover:bg-slate-100"
                      : "bg-slate-800 hover:bg-slate-950 text-white"
                  } w-full py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-md text-center`}
                >
                  Let's Talk
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      {/* 3. Scenes Rendering Flow */}
      <main className="w-full relative">
        <motion.div
          key={activeView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full"
        >
          {activeView === "home" && (
            <IntroScene
              profile={profile}
              onNavigate={handleNavigate}
              activeView={activeView}
            />
          )}
          {activeView === "missions" && (
            <MissionsScene 
              missions={missions} 
              currentMission={profile.currentMission} 
              selectedSector={selectedSector}
              onClearSector={() => setSelectedSector(null)}
            />
          )}
          {activeView === "loadout" && (
            <LoadoutScene skills={skills} />
          )}
          {activeView === "journey" && (
            <JourneyScene journey={journey} />
          )}
          {activeView === "contact" && (
            <ContactScene contact={profile.contact} />
          )}
        </motion.div>
      </main>
    </div>
  );
}
