import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Github, Linkedin, ArrowRight, Sparkles, Terminal, Check, Instagram, Layers, Code, Brain } from "lucide-react";
import { Profile } from "../types";

interface IntroSceneProps {
  profile: Profile;
  onNavigate: (view: string, sector?: string | null) => void;
  activeView: string;
}

export default function IntroScene({ profile, onNavigate, activeView }: IntroSceneProps) {
  const [copied, setCopied] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Custom roles matching the floating cards on the right of the reference image
  const roles = [
    {
      title: "Systems Architect",
      desc: "Designing high-performance, scalable distributed systems & modular architectures.",
      img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80",
      tag: "Core Engineering",
      icon: Layers,
      colorClasses: {
        bg: "bg-slate-50 hover:bg-slate-100",
        border: "border-slate-200",
        text: "text-slate-600",
        shadow: "shadow-sm hover:shadow-md",
        bullet: "bg-indigo-500",
        hoverRing: "group-hover:ring-indigo-100"
      }
    },
    {
      title: "Software Engineer",
      desc: "Crafting beautiful frontends and secure, robust backends in TypeScript & React.",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
      tag: "Full-Stack Dev",
      icon: Code,
      colorClasses: {
        bg: "bg-slate-50 hover:bg-slate-100",
        border: "border-slate-200",
        text: "text-slate-600",
        shadow: "shadow-sm hover:shadow-md",
        bullet: "bg-emerald-500",
        hoverRing: "group-hover:ring-emerald-100"
      }
    },
    {
      title: "DevOps Specialist",
      desc: "Streamlining deployment workflows, container orchestration, and automated pipelines.",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
      tag: "Cloud & Infrastructure",
      icon: Terminal,
      colorClasses: {
        bg: "bg-slate-50 hover:bg-slate-100",
        border: "border-slate-200",
        text: "text-slate-600",
        shadow: "shadow-sm hover:shadow-md",
        bullet: "bg-sky-500",
        hoverRing: "group-hover:ring-sky-100"
      }
    }
  ];

  const [activeRoleIndex, setActiveRoleIndex] = useState<number | null>(null);
  const [hoveredRoleIndex, setHoveredRoleIndex] = useState<number | null>(null);

  return (
    <div id="intro-scene" className="w-full bg-white select-none relative min-h-[calc(100vh-100px)] flex flex-col justify-between px-4 sm:px-12 lg:px-16 pb-4 sm:pb-12 lg:pb-16 pt-4 max-w-7xl mx-auto">
      
      {/* Soft radial glow elements mimicking mockup */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-slate-100 rounded-full blur-[100px] opacity-70 pointer-events-none z-0" />
        <div className="absolute bottom-10 left-10 w-[200px] h-[200px] bg-slate-100 rounded-full blur-[50px] opacity-50 pointer-events-none z-0" />



        {/* 2. Main Hero Layout (Grid matching Left: Text, Center: Portrait, Right: Role cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-stretch my-auto z-10 relative">
          
          {/* Left Column (Typographic Hero Details) - 4 Cols */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col min-h-[350px] md:min-h-[480px] lg:min-h-[460px] text-left items-start relative z-20">
            <div className="space-y-6 flex flex-col items-start">
              <div className="space-y-2">
                <h2 className="font-sans font-bold text-2xl text-slate-700 tracking-tight">
                  Hello, I'm
                </h2>
              </div>

              {/* Massive Display Name ABDELJELIL with precise 3D letter styling like image */}
              <h1 className="font-sans font-black text-5xl sm:text-6xl md:text-7xl lg:text-5xl xl:text-6xl text-slate-800 leading-none tracking-tight uppercase select-none drop-shadow-sm filter">
                {profile.name}
                <span className="text-slate-500">.</span>
              </h1>

              {/* Profile Subtitle / Persona Intro */}
              <p className="font-sans text-sm md:text-base lg:text-sm text-slate-600 leading-relaxed max-w-sm md:w-[450px] md:max-w-full lg:max-w-sm text-left">
                Software Engineer with a passion for designing systems, building high-impact solutions, and testing boundaries. I focus on modular architectures, clean codebases, and relentless self-improvement.
              </p>
            </div>

            {/* Dynamic Buttons / Actions - styled like the reference image */}
            <div className="flex-grow flex flex-col justify-center min-h-[120px] pt-8 lg:pt-0 items-start">
              {/* Circular Social Icons */}
              <div className="flex items-center gap-3">
                {/* Mail Icon Wrapper */}
                <div 
                  className="relative flex items-center justify-center"
                  onMouseEnter={() => setIsEmailHovered(true)}
                  onMouseLeave={() => setIsEmailHovered(false)}
                >
                  <AnimatePresence>
                    {isEmailHovered && (
                      <motion.button
                        onClick={copyEmail}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 450, damping: 25 }}
                        className="absolute bottom-full left-[-10px] mb-3.5 z-40 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/90 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors"
                      >
                        <span className="font-sans text-xs font-semibold select-all">
                          {copied ? "Copied to clipboard!" : profile.contact.email}
                        </span>
                        {copied ? (
                          <Check size={13} className="text-emerald-600 shrink-0" />
                        ) : (
                          <span className="font-mono text-[9px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90">
                            Copy
                          </span>
                        )}
                        {/* Little triangle pointing down, centered precisely with the button */}
                        <div className="absolute top-full left-[30px] -translate-x-1/2 -mt-1 w-2.5 h-2.5 bg-slate-50 border-r border-b border-slate-200/90 rotate-45 pointer-events-none" />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={copyEmail}
                    className="w-11 h-11 bg-[#0ea5e9] hover:bg-sky-500 text-white rounded-full flex items-center justify-center transition-all shadow-[0_4px_12px_rgba(14,165,233,0.35)] hover:shadow-[0_4px_16px_rgba(14,165,233,0.5)] cursor-pointer"
                    aria-label="Copy Email"
                    title="Click to copy email"
                  >
                    {copied ? (
                      <Check size={18} className="text-white animate-pulse" />
                    ) : (
                      <Mail size={18} className="text-white" />
                    )}
                  </button>
                </div>

                {/* GitHub - Borderless / transparent */}
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 text-slate-400 hover:text-slate-800 rounded-full flex items-center justify-center transition-all bg-transparent hover:bg-slate-50"
                  aria-label="GitHub profile"
                  title="GitHub"
                >
                  <Github size={18} />
                </a>

                {/* LinkedIn - Borderless / transparent */}
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 text-slate-400 hover:text-slate-800 rounded-full flex items-center justify-center transition-all bg-transparent hover:bg-slate-50"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>

                {/* Instagram - Borderless / transparent */}
                <a
                  href="https://instagram.com/abdeljelil"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 text-slate-400 hover:text-slate-800 rounded-full flex items-center justify-center transition-all bg-transparent hover:bg-slate-50"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Center Column (The Studio Portrait with soft light highlighted circle) - 4 Cols */}
          <div className="md:relative md:inset-auto md:h-[480px] lg:relative lg:inset-auto lg:h-[540px] md:col-span-1 lg:col-span-4 flex justify-center items-center z-10 pointer-events-auto md:overflow-visible lg:overflow-visible">
            {/* Ambient white spotlight circle backing */}
            <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] bg-slate-50 rounded-full border border-slate-100 shadow-inner z-0" />
            
            {/* The absolute portrait render exactly like mockup image */}
            <div className="w-[280px] h-[370px] sm:w-[340px] sm:h-[450px] md:w-full md:max-w-[320px] md:h-[450px] lg:w-[360px] lg:h-[480px] rounded-3xl overflow-hidden border border-slate-100/80 shadow-2xl relative z-10 transition-transform duration-500 hover:scale-[1.02] bg-slate-200">
              <img
                src="/src/assets/images/developer_portrait_1782548142914.jpg"
                alt="Abdeljelil Studio portrait"
                className="w-full h-full object-cover filter brightness-[1.02] contrast-[1.01]"
                referrerPolicy="no-referrer"
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column (Floating role tags with interactive semi-circular arc layout) - 4 Cols */}
          <div className="hidden lg:flex lg:col-span-4 space-y-6 flex-col justify-center">
            <div className="space-y-1 md:text-center lg:text-left">
              <span className="font-mono text-[9px] tracking-[0.25em] text-slate-500 font-bold uppercase">
                ALDRIC CORE CAPABILITIES
              </span>
              <h3 className="font-sans font-bold text-lg text-slate-800 tracking-tight">
                Active Architectural Roles
              </h3>
            </div>

            {/* Staggered arrangement on desktop in relative flex flow (never overlaps/overlays when active/expanded) */}
            <div className="w-full flex flex-col md:flex-row lg:flex-col items-center md:items-start lg:items-center justify-center gap-5 mt-2 select-none">
              {roles.map((role, idx) => {
                const isActive = idx === activeRoleIndex;
                return (
                  <motion.div
                    key={role.title}
                    onMouseEnter={() => setActiveRoleIndex(idx)}
                    onMouseLeave={() => setActiveRoleIndex(null)}
                    onClick={() => setActiveRoleIndex(isActive ? null : idx)}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`transition-all duration-300 cursor-pointer flex flex-col items-center group p-3.5 rounded-2xl w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[180px] ${
                      isActive 
                        ? "z-30 bg-white border border-slate-100 shadow-[0_12px_32px_rgba(0,0,0,0.06)]" 
                        : "z-10 bg-transparent border border-transparent"
                    } ${
                      idx === 0
                        ? "lg:self-center lg:translate-x-[-18px]"
                        : idx === 1
                        ? "lg:self-center lg:translate-x-[18px]"
                        : "lg:self-center lg:translate-x-[-18px]"
                    }`}
                  >
                    {/* Visual Mockup Image from web - raw, borderless, clean layout */}
                    <div className="w-36 h-20 rounded-xl overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      <img
                        src={role.img}
                        alt={role.title}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.05]"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Reference-matching connection dot & line */}
                    <div className="flex flex-col items-center mt-1.5 mb-1.5">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                      <div className="h-2 w-[1px] bg-slate-200" />
                    </div>

                    {/* Title centered directly below the connection line */}
                    <div className="text-center w-full transition-colors duration-300">
                      <h4 className="font-sans font-bold text-[11px] text-slate-700 tracking-tight leading-none uppercase tracking-[0.05em] group-hover:text-slate-900">
                        {role.title}
                      </h4>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

        {/* 3. Bottom Call To Action / Enter Journey */}
        <div className="w-full pt-6 mt-8 border-t border-slate-200/40 z-20 hidden sm:flex justify-end items-center">
          <button
            onClick={() => onNavigate("journey")}
            className="group inline-flex items-center gap-2.5 font-sans text-xs tracking-[0.15em] text-slate-600 hover:text-slate-900 font-bold uppercase transition-all cursor-pointer bg-white/60 hover:bg-white border border-slate-200/80 hover:border-slate-300 px-5 py-2.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md"
          >
            <span>Enter Journey</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform text-slate-500 group-hover:text-slate-800" />
          </button>
        </div>

    </div>
  );
}
