import { motion } from "motion/react";
import { Compass, Sparkles } from "lucide-react";
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
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  return (
    <div className="w-full bg-[#111827] text-white py-16 sm:py-24 px-4 sm:px-12 lg:px-16 select-none overflow-hidden max-w-7xl mx-auto relative">
      {/* Cinematic faint overlay lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Humble and Clear Display Heading using Space Grotesk */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <span className="font-mono text-[9px] tracking-[0.25em] text-slate-400 uppercase font-bold block">
              HISTORIC PROGRESSION
            </span>
            <h2 className="font-space font-bold text-3xl sm:text-5xl text-white tracking-tight">
              The Engineering Journey
            </h2>
          </div>
          <p className="font-sans text-sm text-slate-400 max-w-xs leading-relaxed">
            A chronological timeline of milestones, technical evolutions, and the paradigm shifts that shaped my engineering mindset.
          </p>
        </div>

        {/* Continuous Vertical Timeline spine */}
        <div className="relative mt-12 pl-4 sm:pl-8 lg:pl-0">
          
          {/* Centered timeline line on large screens, left-aligned on smaller viewports */}
          <div className="absolute left-[21px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800 origin-top pointer-events-none" />

          {/* Chapters container */}
          <div className="space-y-16 lg:space-y-24">
            {journey.map((chapter, index) => {
              const isEven = index % 2 === 0;
              const chapterImage = getJourneyImage(index);
              
              return (
                <div 
                  key={chapter.chapter} 
                  className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  
                  {/* Glowing timeline node */}
                  <div className="absolute left-[-24px] sm:left-[-40px] lg:left-1/2 lg:-translate-x-1/2 top-4 w-6 h-6 rounded-full bg-[#111827] border-4 border-indigo-500 shadow-lg flex items-center justify-center z-20">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </div>

                  {/* Text Column (Alternates Left/Right on Desktop) */}
                  <div className={`lg:col-span-6 space-y-4 ${
                    isEven ? "lg:order-first lg:text-right lg:pr-12" : "lg:col-start-7 lg:text-left lg:pl-12"
                  }`}>
                    <div className={`flex items-center gap-3 ${isEven ? "lg:justify-end" : "lg:justify-start"}`}>
                      <span className="font-mono text-[10px] tracking-[0.25em] text-indigo-400 font-bold">
                        STAGE {romanNumerals[index]} // {chapter.chapter.toUpperCase()}
                      </span>
                    </div>

                    <p className="font-mono text-[9px] tracking-[0.2em] text-slate-400 uppercase font-semibold">
                      {chapter.title}
                    </p>

                    <h3 className="font-space font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                      {chapter.stage}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                      {chapter.description}
                    </p>
                  </div>

                  {/* Image Column (Alternates Left/Right on Desktop) */}
                  <div className={`lg:col-span-6 flex ${
                    isEven ? "lg:col-start-7 lg:justify-start lg:pl-12" : "lg:order-first lg:justify-end lg:pr-12"
                  }`}>
                    <div className="w-full max-w-md h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/5 bg-slate-900 shadow-2xl relative group">
                      {/* Image completely filling the container */}
                      <img
                        src={chapterImage}
                        alt={chapter.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] opacity-60 group-hover:opacity-85"
                        referrerPolicy="no-referrer"
                      />
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/40 text-[9px] font-mono font-bold tracking-widest">
                        <Compass size={12} className="animate-spin-slow text-indigo-400" />
                        <span>PROTOCOL_0{index + 1}</span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
