import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Github, Linkedin, ArrowRight, Check, Instagram, Sparkles } from "lucide-react";
import { Profile } from "../types";
import heroDeskBg from "../assets/images/hero_desk_bg_1783591599734.jpg";

interface IntroSceneProps {
  profile: Profile;
  onNavigate: (view: string, sector?: string | null) => void;
  activeView: string;
}

export default function IntroScene({ profile, onNavigate }: IntroSceneProps) {
  const [copied, setCopied] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      style={{ backgroundImage: `url(${heroDeskBg})` }}
      className="w-full bg-cover bg-center select-none relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-12 lg:px-16 py-16 md:py-24 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Soft Shadow/Gradient Layer to ensure consistent elegant look and readability */}
      <div className="absolute inset-0 bg-slate-950/65 z-0 pointer-events-none" />

      {/* Elegant Atmospheric Backlights matching the hero image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-slate-500/20 blur-[130px] z-0 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-amber-500/15 blur-[100px] z-0 pointer-events-none" />

      {/* Text sits directly on top of the image */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 relative w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-8"
      >
        {/* Typographic Hero Details */}
        <div className="flex flex-col items-center text-center space-y-6 w-full">
          <div className="space-y-4 flex flex-col items-center">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-space font-semibold text-xs sm:text-sm text-slate-300 tracking-[0.2em] uppercase"
            >
              System Engineer Portfolio
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-space font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none tracking-tight uppercase"
            >
              {profile.name}
              <span className="text-white font-light">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-mono text-[10px] sm:text-xs text-slate-300 tracking-widest uppercase font-semibold"
            >
              {profile.subtitle} • {profile.alias}
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-sm sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto font-medium px-2 sm:px-0"
          >
            I am a Software Engineer driven by system complexity, logical precision, and relentless self-improvement. I craft clean, durable architectures and design interfaces where interaction feels like breathing.
          </motion.p>

          {/* Social Direct-Actions Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-full pt-4 flex flex-col items-center gap-6"
          >
            {/* Call to action buttons - Next to each other, white turning black on hover */}
            <div className="hidden sm:flex flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2.5 bg-white hover:bg-slate-950 text-slate-950 hover:text-white font-space text-sm tracking-wider uppercase font-semibold px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white"
              >
                <span>Contact Me</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform animate-pulse text-slate-950 group-hover:text-white" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("missions");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-950 text-slate-950 hover:text-white font-space text-sm tracking-wider uppercase font-semibold px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white"
              >
                Explore Projects
              </button>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-3 pt-2">
              <div
                className="relative flex items-center justify-center"
                onMouseEnter={() => setIsEmailHovered(true)}
                onMouseLeave={() => setIsEmailHovered(false)}
              >
                <AnimatePresence>
                  {isEmailHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute bottom-full mb-3 z-40 bg-white text-slate-800 border border-slate-200/90 px-4 py-2 rounded-full shadow-xl flex items-center gap-2 whitespace-nowrap"
                    >
                      <span className="font-sans text-xs font-semibold select-all">
                        {copied ? "Copied!" : profile.contact.email}
                      </span>
                      {copied ? (
                        <Check size={13} className="text-emerald-600 shrink-0" />
                      ) : (
                        <button
                          onClick={copyEmail}
                          className="font-mono text-[9px] bg-slate-100 hover:bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Copy
                        </button>
                      )}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.5 w-2.5 h-2.5 bg-white border-r border-b border-slate-200 rotate-45 pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={copyEmail}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  aria-label="Copy Email"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Mail size={16} />}
                </button>
              </div>

              <a
                href={profile.contact.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full flex items-center justify-center transition-all shadow-sm"
                title="GitHub"
              >
                <Github size={16} />
              </a>

              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full flex items-center justify-center transition-all shadow-sm"
                title="LinkedIn"
              >
                <Linkedin size={16} />
              </a>

              <a
                href="https://instagram.com/abdeljelil"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full flex items-center justify-center transition-all shadow-sm"
                title="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated scroll down indicator to enhance page flow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-slate-400 hover:text-white transition-colors z-20"
        onClick={() => {
          const el = document.getElementById("missions");
          if (el) {
            const headerOffset = 72;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }}
      >
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase font-bold text-white shadow-xs">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowRight size={14} className="rotate-90 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}
