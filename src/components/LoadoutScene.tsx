import { motion } from "motion/react";
import { Globe, Palette, Settings, GitMerge } from "lucide-react";
import { Skills } from "../types";

interface LoadoutSceneProps {
  skills: Skills;
}

// Map technology names to official clean SVG logo URLs
const getTechLogo = (name: string) => {
  const normalized = name.toLowerCase().trim();
  switch (normalized) {
    case "html":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
    case "css":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
    case "javascript":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
    case "typescript":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg";
    case "react":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
    case "java":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg";
    case "sql":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg";
    case "express":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg";
    case "php":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg";
    case "python":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
    case "c / c++":
    case "c++":
    case "c":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg";
    default:
      return null;
  }
};

export default function LoadoutScene({ skills }: LoadoutSceneProps) {
  // Concept icons mapping for non-language systems
  const getConceptIcon = (name: string) => {
    const norm = name.toLowerCase();
    if (norm.includes("web development")) return Globe;
    if (norm.includes("design") || norm.includes("ui/ux")) return Palette;
    if (norm.includes("automation")) return Settings;
    return GitMerge;
  };

  const allSystems = [...skills.coreSystems, ...skills.supportingSystems];
  // Triplicate the array to ensure perfect seamless coverage for the marquee width
  const marqueeItems = [...allSystems, ...allSystems, ...allSystems];

  return (
    <div className="w-full bg-slate-50 text-slate-900 py-16 sm:py-24 px-4 sm:px-12 lg:px-16 select-none overflow-hidden max-w-7xl mx-auto relative">
      {/* Blueprint grid texture background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,43,40,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(45,43,40,0.01)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Humble, Clear, and Perfectly Centered Display Heading */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto border-b border-slate-200 pb-6">
          <h2 className="font-space font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Technology Loadout
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-500 leading-relaxed">
            Hover over any core system to pause translation and view specific engine metadata.
          </p>
        </div>

        {/* INFINITE MARQUEE SECTION */}
        <div className="relative w-full overflow-hidden py-8 border-y border-slate-200 bg-white/50 rounded-2xl">
          {/* Gradient edge masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee gap-8 py-2">
            {marqueeItems.map((sys, idx) => {
              const logoUrl = getTechLogo(sys.name);
              return (
                <motion.div
                  key={`${sys.name}-${idx}`}
                  whileHover={{ scale: 1.05, borderColor: "rgb(203, 213, 225)", boxShadow: "0 15px 35px -5px rgba(15, 23, 42, 0.08)" }}
                  className="group relative flex items-center justify-center p-5 bg-white border border-slate-200/60 rounded-2xl shadow-[0_4px_12px_rgba(15,23,42,0.03)] cursor-pointer w-24 h-24 sm:w-28 sm:h-28 overflow-hidden shrink-0 transition-colors"
                >
                  {/* Logo (Normally shown) */}
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={sys.name}
                      className="w-12 h-12 object-contain transition-all duration-300 group-hover:scale-75 group-hover:opacity-10"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Settings size={28} className="text-slate-400 transition-all duration-300 group-hover:scale-75 group-hover:opacity-10" />
                  )}

                  {/* Text & Detail overlay (Shown on hover) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/95">
                    <span className="text-white font-space font-bold text-xs sm:text-sm text-center uppercase tracking-wider">
                      {sys.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CONCEPTS & LOGIC SECTION (Full Field Under It) */}
        <div className="space-y-6 pt-4">
          <div className="text-center">
            <h3 className="font-space font-bold text-2xl text-slate-950 mt-1">
              Concepts & Logic
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {skills.concepts.map((concept, idx) => {
              const IconComponent = getConceptIcon(concept.name);
              return (
                <motion.div
                  key={concept.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{
                    y: -5,
                    borderColor: "rgb(203, 213, 225)",
                    boxShadow: "0 20px 45px -12px rgba(15, 23, 42, 0.08)"
                  }}
                  className="py-8 px-6 bg-white border border-slate-200/50 rounded-3xl shadow-xs transition-colors flex flex-col items-center text-center space-y-4 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200 text-slate-950 shadow-xs">
                    <IconComponent size={20} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-space font-bold text-base text-slate-950 leading-tight">
                      {concept.name}
                    </h4>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed">
                      {concept.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
