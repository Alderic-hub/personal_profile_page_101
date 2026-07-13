import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

// Import data structures
import profileData from "./data/profile.json";
import missionsData from "./data/missions.json";
import skillsData from "./data/skills.json";
import journeyData from "./data/journey.json";

// Import types
import { Profile, Project, Skills, JourneyChapter } from "./types";

// Import components
import IntroScene from "./components/IntroScene";
import ProjectsScene from "./components/ProjectsScene";
import JourneyScene from "./components/JourneyScene";
import LoadoutScene from "./components/LoadoutScene";
import ContactScene from "./components/ContactScene";

export default function App() {
  const profile = profileData as Profile;
  const missions = missionsData as unknown as Project[];
  const skills = skillsData as Skills;
  const journey = journeyData as JourneyChapter[];

  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection to add a border-b/shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section on scroll using IntersectionObserver
  useEffect(() => {
    const sections = ["hero", "missions", "loadout", "journey", "contact"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px", // triggers when section is in the core center viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Smooth scroll handler with offset for sticky header
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 72; // approximate height of header
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white transition-colors duration-300">
      {/* 1. Vintage Film Grain Layer */}
      <div className="film-grain" />

      {/* 2. Unified Sticky/Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/40 backdrop-blur-lg border-b border-slate-200/30 shadow-xs py-3" : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-12 lg:px-16 flex justify-between items-center select-none">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScrollTo("hero")}
              className={`font-space font-black text-2xl tracking-tight cursor-pointer transition-colors ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              abdel<span className={scrolled ? "text-black" : "text-slate-100"}>.</span>
            </button>
          </div>

          {/* Navigation Links with dynamic active highlights */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[
              { id: "hero", label: "Introduction" },
              { id: "missions", label: "Projects" },
              { id: "loadout", label: "Loadout" },
              { id: "journey", label: "Journey" },
              { id: "contact", label: "Contact" }
            ].map((tab) => {
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleScrollTo(tab.id)}
                  className={`py-1.5 transition-colors relative cursor-pointer font-space uppercase text-xs tracking-wider font-bold ${
                    isActive 
                      ? (scrolled ? "text-black" : "text-white") 
                      : (scrolled ? "text-black/60 hover:text-black" : "text-slate-300 hover:text-white")
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                        scrolled ? "bg-black" : "bg-white"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger menu toggle button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-all cursor-pointer border ${
                scrolled 
                  ? "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200" 
                  : "bg-white/10 hover:bg-white/20 text-white border-white/20"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-full left-4 right-4 z-50 bg-white border border-slate-200/90 shadow-2xl rounded-2xl p-6 flex flex-col gap-4 mt-2 md:hidden"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-1">
                <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase font-bold">
                  Navigation Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X size={16} />
                </button>
              </div>

              {[
                { id: "hero", label: "Introduction" },
                { id: "missions", label: "Projects" },
                { id: "loadout", label: "Skills Loadout" },
                { id: "journey", label: "Journey" },
                { id: "contact", label: "Contact" }
              ].map((tab) => {
                const isActive = activeSection === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleScrollTo(tab.id)}
                    className={`text-left font-space text-sm py-2.5 px-4 rounded-xl transition-all font-semibold ${
                      isActive ? "bg-slate-100 text-slate-950 font-bold border-l-4 border-slate-900" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. Scenes Continuous Rendering Flow */}
      <main className="w-full relative flex flex-col divide-y divide-slate-100">
        <section id="hero" className="scroll-mt-16 bg-white">
          <IntroScene
            profile={profile}
            onNavigate={handleScrollTo}
            activeView="home"
          />
        </section>

        <section id="missions" className="scroll-mt-16 bg-slate-50">
          <ProjectsScene 
            projects={missions} 
          />
        </section>

        <section id="loadout" className="scroll-mt-16 bg-[#FAF9F5]">
          <LoadoutScene skills={skills} />
        </section>

        <section id="journey" className="scroll-mt-16 bg-[#111827]">
          <JourneyScene 
            journey={journey} 
          />
        </section>

        <section id="contact" className="scroll-mt-16 bg-slate-50">
          <ContactScene contact={profile.contact} />
        </section>
      </main>
    </div>
  );
}
