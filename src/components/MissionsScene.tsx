import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, CheckCircle, Cpu, ArrowRight, X } from "lucide-react";
import { Mission } from "../types";

import classicLibraryMissions from "../assets/images/classic_library_missions_1782542271333.jpg";
import classicBurgerMenu from "../assets/images/classic_burger_menu_1782542784943.jpg";
import classicQuizWizard from "../assets/images/classic_quiz_wizard_1782542798252.jpg";
import classicArchitectDesk from "../assets/images/classic_architect_desk_1782542810235.jpg";
import classicLibraryBookmarks from "../assets/images/regenerated_image_1783150776020.png";

interface MissionsSceneProps {
  missions: Mission[];
  currentMission?: string[];
  selectedSector?: string | null;
  onClearSector?: () => void;
}

const MISSION_SECTORS: Record<string, string[]> = {
  "mission-01": ["Software Engineer"],
  "mission-02": ["Systems Architect", "DevOps Specialist"],
  "mission-03": ["Software Engineer"],
  "mission-04": ["Systems Architect", "Software Engineer"]
};

const getMissionImage = (id: string) => {
  switch (id) {
    case "mission-01":
      return classicBurgerMenu;
    case "mission-02":
      return classicQuizWizard;
    case "mission-03":
      return classicArchitectDesk;
    case "mission-04":
      return classicLibraryBookmarks;
    default:
      return classicLibraryMissions;
  }
};

export default function MissionsScene({ missions, currentMission, selectedSector, onClearSector }: MissionsSceneProps) {
  const filteredMissions = selectedSector
    ? missions.filter((m) => MISSION_SECTORS[m.id]?.includes(selectedSector))
    : missions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedSector]);

  const nextSlide = () => {
    if (filteredMissions.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredMissions.length);
  };

  const prevSlide = () => {
    if (filteredMissions.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredMissions.length) % filteredMissions.length);
  };

  const activeMission = filteredMissions[currentIndex] || filteredMissions[0];

  // Slide variants for smooth horizontal transition
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section id="missions-scene" className="relative min-h-[calc(100vh-100px)] w-full bg-palette-lightgray text-palette-charcoal pt-10 pb-24 px-4 sm:px-12 lg:px-16 select-none overflow-hidden flex flex-col justify-center max-w-7xl mx-auto">
      
      {/* Decorative dynamic grain/lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,43,40,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(45,43,40,0.01)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto w-full space-y-12 relative z-10 flex-grow flex flex-col justify-between">
        
        {/* Header Split */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-palette-taupe/30 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-palette-charcoal">
                Missions & Projects
              </h2>
              {selectedSector && (
                <div className="flex items-center gap-2 bg-sky-50 text-sky-700 border border-sky-200/60 px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider font-bold shadow-sm animate-fade-in">
                  <span>Sector: {selectedSector}</span>
                  <button
                    onClick={onClearSector}
                    className="ml-1 text-sky-400 hover:text-sky-700 transition-colors cursor-pointer"
                    title="Clear filter"
                  >
                    <X size={10} className="stroke-[3]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Horizontal Slideshow Stage */}
        <div className="relative min-h-[500px] lg:min-h-[480px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full relative"
            >
              {/* Left Column (Info) */}
              <div className="lg:col-span-7 space-y-6 flex flex-col justify-center relative z-10 bg-white p-6 sm:p-10 lg:p-12 rounded-3xl border border-palette-taupe/15 shadow-md">
                
                {/* Number & Tag */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-palette-taupe font-bold">
                    MISSION 0{activeMission.number} / 0{filteredMissions.length}
                  </span>
                  <div className="h-[1px] w-12 bg-palette-taupe/40" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-palette-charcoal tracking-tight leading-none">
                  {activeMission.title}
                </h3>

                {/* Quote / Purpose */}
                <p className="font-serif italic text-lg sm:text-xl text-palette-taupe font-light font-editorial pl-4 border-l-2 border-palette-taupe">
                  “{activeMission.purpose}”
                </p>

                {/* Detailed Description */}
                <div className="space-y-4 font-sans text-sm text-palette-charcoal/85 leading-relaxed">
                  <p>
                    <strong className="font-medium text-palette-charcoal">The Challenge & Learnings:</strong> {activeMission.learned}
                  </p>
                  <p>
                    <strong className="font-medium text-palette-charcoal">The Outcome:</strong> {activeMission.impact}
                  </p>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeMission.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-palette-cream/60 border border-palette-taupe/30 rounded-none font-mono text-[9px] text-palette-charcoal tracking-widest uppercase font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

              {/* Right Column: Blueprint Grid & Professional Schematic Work */}
              <div className="lg:col-span-5 h-[380px] lg:h-[480px] w-full z-10 overflow-hidden rounded-3xl border border-palette-taupe/15 bg-white shadow-md relative">
                {/* 1. Base Blueprint Structural Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(75,85,99,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(75,85,99,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-80" />
                
                {/* 2. Secondary fine grid with micro dots */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(75,85,99,0.08)_1px,transparent_1px)] bg-[size:20px_20px] opacity-60" />

                {/* 3. Structural Labels & Metadata to "show the work" */}
                <div className="absolute top-4 left-5 font-mono text-[8px] text-palette-taupe/50 tracking-widest uppercase hidden sm:flex items-center gap-2 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-palette-taupe/30 animate-pulse" />
                  [SYS_GRID // MODE: SCHEMATIC_DRAWING] // S-REF_01
                </div>
                <div className="absolute top-4 right-5 font-mono text-[8px] text-palette-taupe/50 tracking-widest uppercase hidden sm:block select-none">
                  X_DIM: 100% // Y_DIM: 100% [BOUNDS: FULL]
                </div>
                <div className="absolute bottom-4 left-5 font-mono text-[8px] text-palette-taupe/50 tracking-widest uppercase hidden sm:block select-none">
                  PROJECT_REF: {activeMission.id.toUpperCase()} // DESIGN_SHEET_V4.3
                </div>
                
                {/* 4. Measurement lines & crosshairs */}
                <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-palette-taupe/5 border-l border-dashed border-palette-taupe/10" />
                <div className="absolute top-0 bottom-0 left-[80%] w-[1px] bg-palette-taupe/5 border-l border-dashed border-palette-taupe/10" />
                <div className="absolute left-0 right-0 top-[50%] h-[1px] bg-palette-taupe/5 border-t border-dashed border-palette-taupe/10" />
                
                {/* Crosshairs (+) */}
                <div className="absolute top-[25%] left-[20%] font-mono text-[9px] text-palette-taupe/30 -translate-x-1/2 -translate-y-1/2 select-none">+</div>
                <div className="absolute top-[25%] left-[80%] font-mono text-[9px] text-palette-taupe/30 -translate-x-1/2 -translate-y-1/2 select-none">+</div>
                <div className="absolute top-[75%] left-[20%] font-mono text-[9px] text-palette-taupe/30 -translate-x-1/2 -translate-y-1/2 select-none">+</div>
                <div className="absolute top-[75%] left-[80%] font-mono text-[9px] text-palette-taupe/30 -translate-x-1/2 -translate-y-1/2 select-none">+</div>

                {/* 5. Elegant top and bottom drafting rules with millimeter tick marks */}
                <div className="absolute top-0 left-0 w-full h-[12px] bg-palette-cream/10 border-b border-palette-taupe/15 flex items-center justify-between px-4 select-none opacity-60">
                  <span className="font-mono text-[6px] text-palette-taupe/60">0.00</span>
                  <span className="font-mono text-[6px] text-palette-taupe/40">| . | . | . | . |</span>
                  <span className="font-mono text-[6px] text-palette-taupe/60">0.25</span>
                  <span className="font-mono text-[6px] text-palette-taupe/40">| . | . | . | . |</span>
                  <span className="font-mono text-[6px] text-palette-taupe/60">0.50</span>
                  <span className="font-mono text-[6px] text-palette-taupe/40">| . | . | . | . |</span>
                  <span className="font-mono text-[6px] text-palette-taupe/60">0.75</span>
                  <span className="font-mono text-[6px] text-palette-taupe/40">| . | . | . | . |</span>
                  <span className="font-mono text-[6px] text-palette-taupe/60">1.00</span>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[12px] bg-palette-cream/10 border-t border-palette-taupe/15 flex items-center justify-between px-4 select-none opacity-60">
                  <span className="font-mono text-[6px] text-palette-taupe/60">L_BOUND</span>
                  <span className="font-mono text-[6px] text-palette-taupe/40">- - - - - - - - -</span>
                  <span className="font-mono text-[6px] text-palette-taupe/60">C_ALIGN</span>
                  <span className="font-mono text-[6px] text-palette-taupe/40">- - - - - - - - -</span>
                  <span className="font-mono text-[6px] text-palette-taupe/60">R_BOUND</span>
                </div>

                {/* 6. Fully stretched edge-to-edge background Image */}
                <div className="absolute inset-0 w-full h-full opacity-80 sm:opacity-90">
                  <motion.img
                    initial={{ scale: 1.05, filter: "brightness(0.95) contrast(0.92)" }}
                    animate={{ scale: 1, filter: "brightness(1.0) contrast(0.95)" }}
                    transition={{ duration: 0.8 }}
                    src={getMissionImage(activeMission.id)}
                    alt={activeMission.title}
                    className="w-full h-full object-cover mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette layer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-palette-charcoal/5 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* 7. Architectural "Drip Plumb Lines" (gravity-based layout lines terminating in coordinates) */}
                {[
                  { left: "15%", initialHeight: 0, targetHeight: 180, delay: 0.1, label: "H_1" },
                  { left: "33%", initialHeight: 0, targetHeight: 260, delay: 0.4, label: "H_2" },
                  { left: "55%", initialHeight: 0, targetHeight: 120, delay: 0.2, label: "H_3" },
                  { left: "72%", initialHeight: 0, targetHeight: 310, delay: 0.6, label: "H_4" },
                  { left: "90%", initialHeight: 0, targetHeight: 210, delay: 0.3, label: "H_5" },
                ].map((plumb, i) => (
                  <div
                    key={i}
                    className="absolute top-[12px] pointer-events-none hidden sm:block"
                    style={{ left: plumb.left }}
                  >
                    {/* The sleek dripping vertical layout wire */}
                    <motion.div
                      className="w-[1px] bg-palette-taupe/20 origin-top"
                      initial={{ height: 0 }}
                      animate={{ height: plumb.targetHeight }}
                      transition={{
                        duration: 1.5,
                        delay: plumb.delay,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                    
                    {/* The plumb weight droplet (sleek high-tech coordinate block at the bottom tip) */}
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: [0, 0.9, 0.7], y: plumb.targetHeight }}
                      transition={{
                        duration: 1.5,
                        delay: plumb.delay,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {/* Precise laser micro droplet dot */}
                      <span className="w-1.5 h-1.5 rounded-full bg-palette-taupe/40 -mt-1.5" />
                      {/* Metric reading box */}
                      <span className="mt-1 px-1 py-0.5 bg-palette-lightgray/90 border border-palette-taupe/25 font-mono text-[6px] text-palette-taupe/70 rounded select-none shadow-sm whitespace-nowrap">
                        {plumb.label}: {plumb.targetHeight}px
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* Carousel Navigation Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-palette-taupe/20 pt-6">
          
          {/* Slide selectors / Dot indicators with numbers */}
          <div className="flex items-center gap-2">
            {filteredMissions.map((mission, index) => (
              <button
                key={mission.id}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`font-mono text-[10px] tracking-wider py-1 px-3 transition-all duration-300 border ${
                  index === currentIndex
                    ? "bg-palette-charcoal text-palette-cream border-palette-charcoal font-bold"
                    : "bg-transparent text-palette-charcoal/60 border-palette-taupe/20 hover:border-palette-taupe/60 hover:text-palette-charcoal"
                }`}
              >
                0{index + 1}
              </button>
            ))}
          </div>

          {/* Action Prev / Next Trigger Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="p-3 border border-palette-taupe/30 text-palette-charcoal hover:bg-palette-cream hover:border-palette-charcoal transition-all duration-300 rounded-none cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={16} />
            </button>
            
            <span className="font-mono text-xs text-palette-taupe font-bold tracking-widest">
              {currentIndex + 1} // {filteredMissions.length}
            </span>

            <button
              onClick={nextSlide}
              className="p-3 border border-palette-taupe/30 text-palette-charcoal hover:bg-palette-cream hover:border-palette-charcoal transition-all duration-300 rounded-none cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
