import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, X, Compass, ExternalLink, Zap, ArrowRight } from "lucide-react";
import { Project } from "../types";

import classicLibraryMissions from "../assets/images/classic_library_missions_1782542271333.jpg";
import classicBurgerMenu from "../assets/images/burger.png";
import classicQuizWizard from "../assets/images/classic_quiz_wizard_1782542798252.jpg";
import classicArchitectDesk from "../assets/images/classic_workspace_intro_1782542257711.jpg";
import classicLibraryBookmarks from "../assets/images/classic_library_bookmarks_1782542822769.jpg";
import journeyData from "../data/journey.json";

interface ProjectsSceneProps {
  projects: Project[];
}

const getProjectImage = (id: string) => {
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

const getProjectJourney = (projectId: string) => {
  switch (projectId) {
    case "mission-01":
      return journeyData[1]; // Chapter 02: Sculpting Interface Space
    case "mission-02":
      return journeyData[5]; // Chapter 06: The Automation Paradigm
    case "mission-03":
      return journeyData[2]; // Chapter 03: Engineering Structure
    case "mission-04":
      return journeyData[3]; // Chapter 04: Dynamic State Synthesis
    default:
      return null;
  }
};

export default function ProjectsScene({ projects }: ProjectsSceneProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <div className="w-full bg-slate-50 text-slate-900 py-16 sm:py-24 px-4 sm:px-12 lg:px-16 select-none overflow-hidden max-w-7xl mx-auto relative">
      {/* Blueprint grid texture background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,43,40,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(45,43,40,0.01)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none z-0" />



      <div className="max-w-6xl mx-auto w-full space-y-16 relative z-10">
        
        {/* Simple & Clean Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3">
            <h2 className="font-space font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight">
              Projects & Initiatives
            </h2>
          </div>
          <p className="font-sans text-sm text-slate-500 max-w-sm leading-relaxed">
            A showcase of software platforms, automated workflows, and digital products constructed with absolute logical precision.
          </p>
        </div>

        {/* Minimal Grid - 2 on every row on desktop, image first, details overlay on hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 30px 60px -15px rgba(15, 23, 42, 0.12)"
                }}
                transition={{ duration: 0.4 }}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => setSelectedProject(project)}
                className="group relative h-80 sm:h-96 md:h-[420px] bg-slate-100 rounded-3xl border border-slate-200/60 shadow-xs transition-all duration-500 overflow-hidden cursor-pointer hover:border-slate-300"
              >
                {/* Schematic Blueprint Background Accent */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:24px_24px] z-10 pointer-events-none" />
                
                {/* Full Card Image */}
                <img
                  src={getProjectImage(project.id)}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Dark Gradient Overlay (statically visible on mobile, reveals on hover on desktop) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent transition-opacity duration-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10" />

                {/* Text Content Overlay (statically visible on mobile, slides up & fades in on hover on desktop) */}
                <div className="absolute inset-0 z-20 p-6 sm:p-8 flex flex-col justify-end text-white transition-all duration-500 ease-out transform translate-y-0 md:translate-y-6 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <div className="space-y-3">
                    <h3 className="font-space font-bold text-xl sm:text-2xl text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md">
                      {project.purpose}
                    </p>
                    
                    {/* Bottom Action Line inside Overlay */}
                    <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs sm:text-sm tracking-widest uppercase font-bold text-white/90 mt-2">
                      <span>Explore Specifications</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FULL SCREEN MODAL DIALOG - Centered Details */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-md"
            />

            {/* Modal Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col shadow-[0_25px_70px_-15px_rgba(15,23,42,0.16)]"
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:text-black hover:bg-white flex items-center justify-center shadow-md transition-all cursor-pointer border border-slate-200/50"
                aria-label="Close details"
              >
                <X size={16} />
              </button>

              {/* Scrollable details container starting directly with the image */}
              <div className="overflow-y-auto flex-1">
                {/* Beautiful wide preview image */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-50">
                  <img
                    src={getProjectImage(selectedProject.id)}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
                </div>

                {/* Typography and specification details with internal padding */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Typography details */}
                  <div className="space-y-4">
                    <h3 className="font-space font-bold text-2xl sm:text-3xl text-slate-950 tracking-tight">
                      {selectedProject.title}
                    </h3>
                    
                    <p className="font-serif italic text-sm text-slate-500 border-l-2 border-slate-900 pl-3 leading-relaxed">
                      “{selectedProject.purpose}”
                    </p>
                  </div>

                  {/* Core specs grids */}
                  <div className="grid grid-cols-1 gap-5 border-t border-slate-100 pt-5 text-sm">
                    <div className="space-y-1.5">
                      <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase font-bold block">
                        CHALLENGE & EXPERIENCE
                      </span>
                      <p className="font-sans text-slate-600 leading-relaxed text-xs sm:text-sm">
                        {selectedProject.learned}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-slate-50">
                      <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase font-bold block">
                        ENGINEERING OUTCOME
                      </span>
                      <p className="font-sans text-slate-600 leading-relaxed text-xs sm:text-sm">
                        {selectedProject.impact}
                      </p>
                    </div>
                  </div>

                  {/* Technologies used */}
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase font-bold block">
                      SYSTEM COMPONENTS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 border border-slate-200 bg-slate-50 text-slate-700 rounded-md font-mono text-[10px] tracking-wider uppercase font-medium transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* The Journey */}
                  {getProjectJourney(selectedProject.id) && (
                    <div className="space-y-3 border-t border-slate-100 pt-5">
                      <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase font-bold block">
                        RELEVANT JOURNEY MILESTONE
                      </span>
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 sm:p-5 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] tracking-wider font-bold uppercase border border-slate-200 bg-slate-100/80 text-slate-700 px-2.5 py-0.5 rounded transition-colors">
                            {getProjectJourney(selectedProject.id)?.chapter} • {getProjectJourney(selectedProject.id)?.stage}
                          </span>
                        </div>
                        <h4 className="font-space font-bold text-base text-slate-900 leading-snug">
                          {getProjectJourney(selectedProject.id)?.title}
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {getProjectJourney(selectedProject.id)?.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom bar of modal */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-slate-950 hover:bg-slate-800 text-white px-5 py-2 rounded-full font-space text-[10px] tracking-widest uppercase font-bold transition-all cursor-pointer shadow-md"
                >
                  Acknowledge Specs
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
