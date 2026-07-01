import { motion } from "motion/react";
import { Skills } from "../types";

interface LoadoutSceneProps {
  skills: Skills;
}

export default function LoadoutScene({ skills }: LoadoutSceneProps) {
  return (
    <section id="loadout-scene" className="relative min-h-[calc(100vh-100px)] w-full bg-palette-cream text-palette-charcoal pt-10 pb-32 px-4 sm:px-12 lg:px-16 select-none overflow-hidden max-w-7xl mx-auto">
      
      {/* Cinematic grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,43,40,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(45,43,40,0.015)_1px,transparent_1px)] bg-[size:120px_120px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        
        {/* Top Header Split */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 border-b border-palette-taupe/20 pb-10">
          <div className="max-w-xs">
            <p className="font-mono text-[9px] tracking-[0.28em] text-palette-taupe uppercase mb-3 font-bold">
              Chapter 03
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-palette-charcoal">
              Loadout
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-sm text-cinematic-blue leading-relaxed">
              A growing arsenal of tools and concepts — each one chosen not for the resume, but for the problems they unlock. The goal is fluency, not familiarity.
            </p>
          </div>
        </div>

        {/* 3-Column Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Core Systems */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="py-8 px-6 bg-white border border-slate-200 rounded-2xl shadow-sm"
          >
            <p className="font-mono text-[10px] tracking-[0.25em] text-palette-taupe uppercase mb-8 font-bold">
              Core Systems
            </p>
            <div className="flex flex-col gap-6">
              {skills.coreSystems.map((sys) => (
                <div key={sys.name} className="group border-b border-palette-taupe/10 pb-3 last:border-0 last:pb-0">
                  <p className="font-serif text-lg sm:text-xl text-palette-charcoal group-hover:text-palette-taupe transition-colors duration-300">
                    {sys.name}
                  </p>
                  <p className="font-mono text-[8px] text-palette-taupe tracking-widest uppercase mt-1">
                    {sys.level} // SYSTEM
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Supporting Systems */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="py-8 px-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm"
          >
            <p className="font-mono text-[10px] tracking-[0.25em] text-palette-taupe uppercase mb-8 font-bold">
              Supporting Systems
            </p>
            <div className="flex flex-col gap-6">
              {skills.supportingSystems.map((sys) => (
                <div key={sys.name} className="group border-b border-palette-taupe/10 pb-3 last:border-0 last:pb-0">
                  <p className="font-serif text-lg sm:text-xl text-palette-charcoal group-hover:text-palette-taupe transition-colors duration-300">
                    {sys.name}
                  </p>
                  <p className="font-mono text-[8px] text-palette-taupe tracking-widest uppercase mt-1">
                    {sys.type} // AUXILIARY
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Concepts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="py-8 px-6 bg-white border border-slate-200 rounded-2xl shadow-sm"
          >
            <p className="font-mono text-[10px] tracking-[0.25em] text-palette-taupe uppercase mb-8 font-bold">
              Concepts
            </p>
            <div className="flex flex-col gap-6">
              {skills.concepts.map((concept) => (
                <div key={concept.name} className="group border-b border-palette-taupe/10 pb-3 last:border-0 last:pb-0">
                  <p className="font-serif text-lg sm:text-xl text-palette-charcoal group-hover:text-palette-taupe transition-colors duration-300">
                    {concept.name}
                  </p>
                  <p className="font-mono text-[8px] text-palette-taupe tracking-widest uppercase mt-1">
                    LOGIC & THINKING
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
