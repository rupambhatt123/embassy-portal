"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Phone, Building2 } from "lucide-react";
import websiteData from "@/data/websiteData.json";

export default function ContactView() {
  const data = (websiteData as any).categories.DiplomaticMission.sections.Contact.variants.DiplomaticContact1;
  const consulates = data.consulates;

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % consulates.length);
    }, data.autoplayMs);
    return () => clearInterval(timer);
  }, [consulates.length, data.autoplayMs]);

  const activeLoc = consulates[selectedIndex];
  const prevLoc = consulates[(selectedIndex - 1 + consulates.length) % consulates.length];

  return (
    <section 
      id="contact" 
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[72vh] flex items-center justify-center bg-gradient-to-b from-[#eef7fc] via-[#f7fbfe] to-[#eaf4fb] px-6 sm:px-12 lg:px-20 py-12 overflow-hidden border-b border-sky-100"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.10]" />
      <div className="pointer-events-none absolute -top-24 -left-24 w-[450px] h-[450px] bg-sky-300/30 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[450px] h-[450px] bg-amber-200/35 rounded-full blur-[100px]" />

      <div className="w-full max-w-[1550px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        
        {/* Left Column: Heading, Address Details & Button */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-amber-700 block">
              {data.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-black text-slate-900 tracking-tight leading-[1.08]">
              {data.headingLine} <br />
              <span className="text-amber-600 font-serif font-light text-3xl sm:text-4xl xl:text-5xl">
                {data.headingHighlight}
              </span>
            </h2>
          </div>

          {/* Details Area */}
          <div className="min-h-[170px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLoc.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-3"
              >
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                    {activeLoc.city}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 flex items-start gap-2 mt-2 max-w-xl">
                    <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    {activeLoc.address}
                  </p>
                </div>

                <div className="pt-1">
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-slate-700 bg-white/90 border border-sky-100 px-3.5 py-1.5 rounded-xl shadow-sm">
                    <Phone className="w-3.5 h-3.5 text-amber-600" />
                    {activeLoc.phone}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Clean Action Button */}
          <div className="pt-2">
            <Link
              href={data.button.href}
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black px-8 py-3.5 text-xs sm:text-sm uppercase tracking-widest shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Building2 className="w-4 h-4 text-slate-950" />
              {data.button.label}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>

        </div>

        {/* Right Column: Frame with Architecture Photos */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-[450px] h-[460px] sm:h-[480px] p-2 rounded-[32px] bg-gradient-to-b from-amber-400/50 via-sky-300/40 to-amber-500/60 shadow-xl border border-white">
            
            <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-slate-900 border-2 border-white/80 shadow-inner">
              
              {/* Layer 1: Background Persistent Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={prevLoc.image}
                  alt={prevLoc.city}
                  className="w-full h-full object-cover object-center filter brightness-[0.92]"
                />
              </div>

              {/* Layer 2: Animated Current Photo */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeLoc.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={activeLoc.image}
                    alt={activeLoc.city}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Bottom Location Label */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-white/60 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                    {data.cardTag}
                  </p>
                  <p className="text-base font-serif font-bold text-slate-900 leading-tight">
                    {activeLoc.city}
                  </p>
                </div>
                <div className="h-7 w-1 bg-amber-500 rounded-full" />
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}