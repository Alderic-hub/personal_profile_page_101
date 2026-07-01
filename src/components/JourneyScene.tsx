import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp, ChevronDown, Compass, Landmark } from "lucide-react";
import { JourneyChapter } from "../types";

interface JourneySceneProps {
  journey: JourneyChapter[];
}

const getJourneyImage = (index: number) => {
  const images = [
    "../src/assets/images/intro_cinematic_bg_1782540341409.jpg",
    "../src/assets/images/missions_cinematic_bg_1782540356891.jpg",
    "../src/assets/images/mission_siltawi_1782540461055.jpg",
    "../src/assets/images/loadout_cinematic_bg_1782540371617.jpg",
    "../src/assets/images/mindset_cinematic_bg_1782540384960.jpg",
    "../src/assets/images/classic_chess_mindset_1782542288379.jpg"
  ];
  return images[index % images.length];
};

export default function JourneyScene({ journey }: JourneySceneProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for up, 1 for down

  const nextSlide = () => {
    if (currentIndex < journey.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop to start
      setDirection(1);
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    } else {
      // Loop to end
      setDirection(-1);
      setCurrentIndex(journey.length - 1);
    }
  };

  const activeChapter = journey[currentIndex];

  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  // Slide variants for smooth vertical slide transition
  const verticalSlideVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      y: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section id="journey-scene" className="relative min-h-[calc(100vh-100px)] w-full bg-palette-taupe text-palette-cream pt-10 pb-24 px-4 sm:px-12 lg:px-16 select-none overflow-hidden flex flex-col justify-center max-w-7xl mx-auto">
      
      {/* Cinematic faint overlay lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,243,209,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(251,243,209,0.015)_1px,transparent_1px)] bg-[size:120px_120px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex-grow flex flex-col justify-between space-y-12">
        
        {/* Header split */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-palette-cream/30 pb-6">
          <div>
            <p className="font-mono text-[9px] tracking-[0.28em] text-palette-cream uppercase mb-3 font-bold">
              Chapter 03 // VERTICAL SYSTEM SLIDES
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-palette-cream">
              The Journey Timeline
            </h2>
          </div>
          <p className="font-sans text-xs text-palette-cream/90 max-w-xs leading-relaxed">
            Every breakthrough is a stepping stone. Navigate through the chapters of engineering evolution.
          </p>
        </div>

        {/* Vertical Slideshow Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px] lg:min-h-[460px] relative py-4">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={verticalSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
            >
              
              {/* Left Column: Vertical Image Slide (5 cols) */}
              <div className="lg:col-span-5 relative h-[280px] sm:h-[350px] lg:h-[400px] w-full order-last lg:order-first">
                <div className="absolute inset-0 bg-palette-sage border border-palette-cream/40 overflow-hidden shadow-xl">
                  <motion.img
                    initial={{ scale: 1.15, filter: "brightness(0.9) contrast(0.9)" }}
                    animate={{ scale: 1, filter: "brightness(0.95) contrast(0.95)" }}
                    transition={{ duration: 0.8 }}
                    src={getJourneyImage(currentIndex)}
                    alt={activeChapter.title}
                    className="w-full h-full object-cover mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                  {/* Faint overlay grid */}
                  <div className="absolute inset-0 bg-gradient-to-t from-palette-charcoal/30 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Right Column: Info & Content (7 cols) */}
              <div className="lg:col-span-7 space-y-6 lg:pl-8 flex flex-col justify-center">
                
                {/* Chapter metadata tag */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-[0.25em] text-palette-cream font-bold">
                    STAGE {romanNumerals[currentIndex]} // {activeChapter.chapter.toUpperCase()}
                  </span>
                  <div className="h-[1px] w-12 bg-palette-cream/40" />
                </div>

                {/* Subtitle / Stage Label */}
                <p className="font-mono text-[10px] tracking-[0.2em] text-palette-cream/90 uppercase font-semibold">
                  {activeChapter.title}
                </p>

                {/* Main Heading */}
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-palette-cream tracking-tight leading-tight">
                  {activeChapter.stage}
                </h3>

                {/* Description paragraphs */}
                <p className="font-sans text-sm text-palette-cream/90 leading-relaxed max-w-xl">
                  {activeChapter.description}
                </p>

                {/* Visual quote indicator */}
                <div className="flex items-center gap-2 text-palette-cream text-xs font-mono font-bold tracking-widest pt-4">
                  <Compass size={14} className="animate-spin-slow text-palette-cream" />
                  <span>ALDRIC REALM PROTOCOL_0{currentIndex + 1}</span>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

          {/* Right Side: Floating Vertical Dots & Arrow Indicators for Vertical Vibe */}
          <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-20 bg-palette-charcoal/10 py-4 px-2.5 border border-palette-cream/20 backdrop-blur-sm">
            
            <button
              onClick={prevSlide}
              className="p-1 hover:text-palette-cream text-palette-cream/70 transition-colors cursor-pointer"
              aria-label="Slide Up"
            >
              <ChevronUp size={16} />
            </button>

            <div className="flex flex-col gap-2.5 my-2">
              {journey.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "bg-palette-cream scale-125"
                      : "bg-palette-cream/40 hover:bg-palette-cream/80"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-1 hover:text-palette-cream text-palette-cream/70 transition-colors cursor-pointer"
              aria-label="Slide Down"
            >
              <ChevronDown size={16} />
            </button>

          </div>

        </div>

        {/* Carousel Bottom Control Bar for mobile / standard viewports */}
        <div className="flex flex-row justify-between items-center gap-6 border-t border-palette-cream/20 pt-6">
          
          {/* Active indicator index info */}
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-sm text-palette-cream font-editorial font-bold">
              0{currentIndex + 1}
            </span>
            <span className="text-palette-cream/40 text-xs font-mono">/</span>
            <span className="font-mono text-[10px] text-palette-cream/60 tracking-widest">
              0{journey.length} CHAPTERS
            </span>
          </div>

          {/* Direct Slide Text tabs */}
          <div className="hidden sm:flex items-center gap-2">
            {journey.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`font-mono text-[9px] py-1 px-2.5 border transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-palette-cream text-palette-charcoal border-palette-cream font-bold"
                    : "text-palette-cream/70 border-palette-cream/20 hover:border-palette-cream/60 hover:text-palette-cream"
                }`}
              >
                C0{idx + 1}
              </button>
            ))}
          </div>

          {/* Trigger controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-2.5 border border-palette-cream/30 text-palette-cream hover:bg-palette-cream hover:text-palette-charcoal transition-all duration-300 rounded-none cursor-pointer"
              aria-label="Previous Chapter"
            >
              <ChevronUp size={14} />
            </button>
            
            <button
              onClick={nextSlide}
              className="p-2.5 border border-palette-cream/30 text-palette-cream hover:bg-palette-cream hover:text-palette-charcoal transition-all duration-300 rounded-none cursor-pointer"
              aria-label="Next Chapter"
            >
              <ChevronDown size={14} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
