import { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, Mail, Github, Linkedin } from "lucide-react";

interface ContactSceneProps {
  contact: {
    title: string;
    github: string;
    email: string;
    linkedin: string;
  };
}

export default function ContactScene({ contact }: ContactSceneProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact-scene" className="relative min-h-[calc(100vh-100px)] w-full bg-slate-100 text-slate-800 pt-10 pb-24 px-4 sm:px-12 lg:px-16 flex flex-col justify-center select-none overflow-hidden max-w-7xl mx-auto">
      
      {/* Decorative clean ambient dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40 z-0" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* Rounded Contact Card Wrapper */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 md:p-16 space-y-16">
          
          {/* Header Split */}
          <div className="flex flex-col items-center justify-center text-center gap-4 border-b border-slate-100 pb-10">
            <div className="max-w-md">
              <span className="font-mono text-[9px] tracking-[0.28em] text-slate-400 uppercase mb-3 font-bold block text-center">
                Chapter 07 // DIRECT TRANSMISSION
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-slate-800 tracking-tight leading-none uppercase text-center">
                {contact.title}
              </h2>
            </div>
          </div>

          {/* Huge Central Interactive Email Link */}
          <div className="text-center py-8 space-y-6">

            <button
              onClick={copyToClipboard}
              className="group relative block mx-auto text-lg sm:text-xl md:text-2xl font-sans font-bold text-slate-800 hover:text-slate-600 transition-colors duration-300 tracking-tight cursor-pointer focus:outline-none break-all px-4"
              title="Click to Copy Email"
            >
              {contact.email}
              {/* Highlight underline */}
              <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-24 h-[3px] bg-slate-500 rounded-full group-hover:w-48 transition-all duration-300" />
            </button>

            <div className="flex justify-center items-center pt-2">
              <button
                onClick={copyToClipboard}
                className="bg-slate-50 hover:bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-semibold tracking-wider flex items-center gap-2 border border-slate-200 shadow-sm cursor-pointer transition-all"
              >
                {copied ? (
                  <span className="text-emerald-600 flex items-center gap-1.5">
                    <Check size={12} /> COPIED SECURELY
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Copy size={12} /> CLICK TO COPY EMAIL
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Connections & System Diagnostics Footer inside Card */}
          <div className="space-y-12">
            
            {/* Social Links Row styled to match the hero section */}
            <div className="flex flex-col items-center gap-4 border-t border-slate-100 pt-8">
              <span className="font-mono text-[8px] tracking-[0.25em] text-slate-400 uppercase font-bold">
                Connect Directly
              </span>
              <div className="flex items-center gap-3">
                {/* Mail Icon - Bright Sky Blue filled circle container with glow */}
                <button
                  onClick={copyToClipboard}
                  className="w-10 h-10 bg-[#0ea5e9] hover:bg-sky-500 text-white rounded-full flex items-center justify-center transition-all shadow-[0_4px_12px_rgba(14,165,233,0.35)] hover:shadow-[0_4px_16px_rgba(14,165,233,0.5)] cursor-pointer"
                  title="Copy Email"
                >
                  <Mail size={16} />
                </button>

                {/* GitHub - Borderless / transparent */}
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-10 h-10 text-slate-400 hover:text-slate-800 rounded-full flex items-center justify-center transition-all bg-transparent hover:bg-slate-50"
                  title="GitHub"
                >
                  <Github size={16} />
                </a>

                {/* LinkedIn - Borderless / transparent */}
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-10 h-10 text-slate-400 hover:text-slate-800 rounded-full flex items-center justify-center transition-all bg-transparent hover:bg-slate-50"
                  title="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            {/* Copyright block */}
            <div className="text-center space-y-2">
              <p className="font-serif italic text-xs text-slate-400">
                “Becoming Unavoidable”
              </p>
              <div className="flex justify-center items-center gap-2 text-[8px] font-mono text-slate-400 tracking-[0.25em] uppercase">
                <span>© 2026 ALDRIC REALM</span>
                <span>·</span>
                <span>ALL PROTOCOLS ONLINE</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
