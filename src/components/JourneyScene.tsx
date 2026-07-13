import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, ChevronLeft, ChevronRight, ArrowRight, RotateCcw } from "lucide-react";
import { JourneyChapter } from "../types";

import introCinematicBg from "../assets/images/intro_cinematic_bg_1782540341409.jpg";
import missionsCinematicBg from "../assets/images/missions_cinematic_bg_1782540356891.jpg";
import missionSiltawi from "../assets/images/mission_siltawi_1782540461055.jpg";
import loadoutCinematicBg from "../assets/images/loadout_cinematic_bg_1782540371617.jpg";
import mindsetCinematicBg from "../assets/images/mindset_cinematic_bg_1782540384960.jpg";
import classicChessMindset from "../assets/images/classic_chess_mindset_1782542288379.jpg";

interface JourneySceneProps {
  journey: JourneyChapter[];
}

const getJourneyImage = (index: number) => {
  const images = [
    introCinematicBg,
    missionsCinematicBg,
    missionSiltawi,
    loadoutCinematicBg,
    mindsetCinematicBg,
    classicChessMindset
  ];
  return images[index % images.length];
};

export default function JourneyScene({ journey }: JourneySceneProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < journey.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setDirection(-1);
    setCurrentIndex(0);
  };

  const activeChapter = journey[currentIndex];
  const activeImage = getJourneyImage(currentIndex);

  // Smooth book-page sliding fade transitions
  const bookVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1]
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1]
      }
    })
  };

  const isEvenPage = currentIndex % 2 === 0;

  return (
    <div 
      className="w-full bg-gradient-to-b from-[#FAF9F5] via-[#FDFDFD] to-slate-50 select-none relative min-h-screen flex flex-col justify-center py-16 sm:py-24 px-4 sm:px-12 lg:px-16 overflow-hidden max-w-7xl mx-auto transition-all duration-700 ease-in-out"
    >


      <div className="max-w-6xl mx-auto w-full relative z-20 flex flex-col justify-between min-h-[75vh] space-y-12">
        
        {/* "engineering journey" heading integrated at the top of the section */}
        <div className="space-y-1.5 pb-3 border-b border-slate-200">
          <h2 className="font-space font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight uppercase">
            The Engineering Journey
          </h2>
        </div>

        {/* 2 Separate Cards Alternating Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full min-h-[480px]">
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={bookVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full"
            >
              
              {/* Card 1: Image Card Container */}
              <div 
                className={`col-span-12 lg:col-span-5 h-72 sm:h-96 lg:h-[500px] flex flex-col relative rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] transition-all duration-500 ${
                  isEvenPage ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <img
                  src={activeImage}
                  alt={activeChapter.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card 2: White Text Details Card */}
              <div 
                className={`col-span-12 lg:col-span-7 bg-white border border-slate-200/60 rounded-[2.5rem] p-8 sm:p-12 md:p-14 min-h-[420px] lg:h-[460px] lg:self-center flex flex-col justify-between relative transition-all duration-500 ${
                  isEvenPage ? "lg:order-2 lg:-ml-16 z-20" : "lg:order-1 lg:-mr-16 z-20"
                }`}
                style={{ 
                  boxShadow: "0 30px 60px -15px rgba(15,23,42,0.08)"
                }}
              >
                <div className="space-y-5 flex-grow flex flex-col justify-center">
                  
                  {/* Category Pill / Badge */}
                  <div className="inline-block">
                    <span className="font-mono text-[11px] tracking-[0.2em] font-extrabold uppercase border border-slate-200 bg-slate-50/80 text-slate-700 px-4 py-1.5 rounded-full transition-all duration-500">
                      {activeChapter.title || "ENGINEERING PROCESS"}
                    </span>
                  </div>

                  {/* Large display title */}
                  <h3 className="font-space font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight uppercase">
                    {activeChapter.stage}
                  </h3>

                  {/* Elegant description */}
                  <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                    {activeChapter.description}
                  </p>

                </div>

                {/* Primary Action Button inside the card to advance */}
                <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center">
                  {currentIndex < journey.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className="bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all flex items-center gap-2 group cursor-pointer"
                    >
                      <span>NEXT CHAPTER</span>
                      <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ) : (
                    <button
                      onClick={handleReset}
                      className="bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all flex items-center gap-2 group cursor-pointer"
                    >
                      <span>RESTART JOURNEY</span>
                      <RotateCcw size={16} className="group-hover:rotate-45 transition-transform" />
                    </button>
                  )}

                  {/* Stage indicator index */}
                  <span className="font-mono text-xs text-slate-400 font-medium">
                    STAGE {romanNumerals[currentIndex]}
                  </span>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* Bottom Control Bar / Navigation */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-6">
          
          {/* Current Page Indicators */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-900 font-bold">
              0{currentIndex + 1}
            </span>
            <span className="font-mono text-xs text-slate-400">/</span>
            <span className="font-mono text-xs text-slate-500 font-bold">
              0{journey.length}
            </span>
          </div>

          {/* Pagination dots in the center */}
          <div className="hidden sm:flex gap-2 items-center">
            {journey.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? "w-8 bg-slate-800" 
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to stage ${idx + 1}`}
              />
            ))}
          </div>

          {/* Book Navigation controls (Left & Right arrows) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50 text-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
              id="journey-prev-btn"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === journey.length - 1}
              className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50 text-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
              id="journey-next-btn"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}


