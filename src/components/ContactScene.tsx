import { useState } from "react";
import { Check, Copy, Mail, Github, Linkedin, Sparkles } from "lucide-react";

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
    <div className="w-full bg-slate-50 text-slate-800 py-16 sm:py-24 px-4 sm:px-12 lg:px-16 flex flex-col justify-center select-none overflow-hidden max-w-7xl mx-auto">

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-12">
        
        {/* Central Contact Card Wrapper */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-md p-8 sm:p-12 md:p-16 space-y-12">
          
          <div className="text-center space-y-4">
            <h3 className="font-space font-bold text-3xl sm:text-4xl text-slate-900 max-w-xl mx-auto tracking-tight">
              Contact
            </h3>
          </div>

          {/* Large Central Interactive Email Link */}
          <div className="text-center py-4 space-y-6">
            <button
              onClick={copyToClipboard}
              className="group relative block mx-auto text-xl sm:text-2xl md:text-3xl font-space font-bold text-slate-900 hover:text-black transition-colors duration-300 tracking-tight cursor-pointer focus:outline-none break-all px-4"
              title="Click to Copy Email"
            >
              {contact.email}
              {/* Highlight underline */}
              <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-24 h-[3px] bg-slate-200 rounded-full group-hover:w-48 group-hover:bg-slate-950 transition-all duration-300" />
            </button>

            <div className="flex justify-center items-center pt-2">
              <button
                onClick={copyToClipboard}
                className="bg-slate-50 hover:bg-slate-100 text-slate-600 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider flex items-center gap-2 border border-slate-200 shadow-sm cursor-pointer transition-all"
              >
                {copied ? (
                  <span className="text-slate-950 flex items-center gap-1.5 font-bold">
                    <Check size={12} className="stroke-[2.5]" /> COPIED SECURELY
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Copy size={12} /> CLICK TO COPY EMAIL
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Saying */}
          <div className="text-center">
            <p className="font-sans text-base sm:text-lg text-slate-500 font-medium tracking-tight">
              Let's build something that matters.
            </p>
          </div>

          {/* Connections & Footer block inside Card */}
          <div className="space-y-8 border-t border-slate-100 pt-8">
            <div className="flex flex-col items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.2em] text-slate-400 uppercase font-bold">
                Connect Directly
              </span>
              <div className="flex items-center gap-3">
                {/* Mail Icon */}
                <button
                  onClick={copyToClipboard}
                  className="w-10 h-10 bg-slate-950 hover:bg-slate-800 text-white rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer"
                  title="Copy Email"
                >
                  <Mail size={16} />
                </button>

                {/* GitHub */}
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-full flex items-center justify-center transition-all shadow-sm"
                  title="GitHub"
                >
                  <Github size={16} />
                </a>

                {/* LinkedIn */}
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-full flex items-center justify-center transition-all shadow-sm"
                  title="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            {/* Copyright and signature */}
            <div className="text-center space-y-2 pt-4">
              <p className="font-serif italic text-xs text-slate-400">
                “Becoming Unavoidable”
              </p>
              <div className="flex justify-center items-center gap-2 text-[8px] font-mono text-slate-400 tracking-[0.25em] uppercase">
                <span>© 2026 ABDELJELIL</span>
                <span>·</span>
                <span>ALL PROTOCOLS ONLINE</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
