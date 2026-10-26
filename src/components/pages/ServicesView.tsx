"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import websiteData from "@/data/websiteData.json";

/* ---------- Animated background ---------- */
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 47 + 5) % 100,
  top: (i * 31 + 13) % 100,
  size: 3 + (i % 3) * 2,
  dur: 4 + (i % 5) * 1.3,
  delay: (i % 7) * 0.6,
  amber: i % 3 === 0,
}));

function AnimatedBackground({ reduce }: { reduce: boolean }) {
  const loop = (dur: number) => ({ duration: dur, repeat: Infinity, ease: "easeInOut" as const });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(#0284c7_1px,transparent_1px)] [background-size:28px_28px]"
        animate={reduce ? undefined : { backgroundPosition: ["0px 0px", "28px 28px"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 w-[800px] sm:w-[1100px] h-[800px] sm:h-[1100px] -ml-[400px] sm:-ml-[550px] -mt-[400px] sm:-mt-[550px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(125,211,252,0.55), rgba(255,255,255,0) 25%, rgba(252,211,77,0.5) 50%, rgba(255,255,255,0) 75%, rgba(125,211,252,0.55))",
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -top-28 -left-24 w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full bg-sky-300/40 blur-[90px] sm:blur-[110px]"
        animate={reduce ? undefined : { x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={loop(14)}
      />
      <motion.div
        className="absolute -bottom-28 -right-24 w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full bg-amber-200/60 blur-[90px] sm:blur-[110px]"
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.25, 1] }}
        transition={loop(16)}
      />
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full ${p.amber ? "bg-amber-400" : "bg-sky-400"}`}
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={reduce ? { opacity: 0.4 } : { y: [0, -20, 0], opacity: [0.15, 0.8, 0.15] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

/* ---------- Motion variants ---------- */
const wordVariant: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, delay: 0.05 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const rowVariant: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ServicesView() {
  const reduce = !!useReducedMotion();

  // 100% Strict JSON Data Connection
  const data = (websiteData as any).categories.DiplomaticMission.sections.Services.variants.DiplomaticServices1;
  const fullServices = data.items;

  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = fullServices[activeIdx];

  return (
    <section className="relative w-full max-w-[100vw] overflow-hidden bg-gradient-to-br from-[#f0f9ff] via-[#e8f4fe] to-[#fffaf0] text-slate-900 py-10 sm:py-14 font-sans">
      <AnimatedBackground reduce={reduce} />

      <div className="relative z-10 max-w-[1450px] mx-auto px-4 sm:px-8 lg:px-14">
        {/* ================= Header ================= */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8"
        >
          <h2 className="font-serif font-bold tracking-tight text-slate-800 text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">
            <span className="inline-block overflow-hidden align-bottom pr-[0.2em] sm:pr-[0.25em] pb-[0.1em]">
              <motion.span variants={wordVariant} custom={0} className="inline-block">
                {data.headingLine1}
              </motion.span>
            </span>
            <span className="inline-block overflow-hidden align-bottom pr-[0.2em] sm:pr-[0.25em] pb-[0.1em]">
              <motion.span variants={wordVariant} custom={1} className="inline-block">
                <motion.span
                  className="bg-clip-text text-transparent italic font-medium bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={reduce ? undefined : { backgroundPosition: ["0% 50%", "200% 50%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  {data.headingHighlight}
                </motion.span>
              </motion.span>
            </span>
          </h2>

          <motion.div variants={rowVariant} custom={2}>
            <Link
              href={data.viewAllHref}
              className="group relative inline-flex items-center gap-2 pb-1 text-xs sm:text-sm font-semibold text-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
            >
              {data.viewAllText}
              <ArrowUpRight className="w-4 h-4 text-amber-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="absolute left-0 bottom-0 h-px w-full bg-sky-200" />
              <span className="absolute left-0 bottom-0 h-px w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
            </Link>
          </motion.div>
        </motion.div>

        {/* ================= Content ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ---------- Left: open list, no cards ---------- */}
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 w-full"
          >
            {fullServices.map((srv: any, idx: number) => {
              const isActive = activeIdx === idx;
              return (
                <motion.li
                  key={srv.slug}
                  variants={rowVariant}
                  custom={idx}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onFocus={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  tabIndex={0}
                  className="group relative cursor-pointer py-3 sm:py-3.5 pl-3 sm:pl-5 outline-none"
                >
                  {isActive && (
                    <motion.span
                      layoutId="services-active-bar"
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}

                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-amber-100/70 via-sky-100/30 to-transparent rounded-lg"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />

                  <div className="relative flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                      <motion.span
                        className="font-serif text-xl sm:text-3xl font-bold leading-none pt-0.5 tabular-nums shrink-0"
                        animate={{ color: isActive ? "#d97706" : "#bae6fd", x: isActive ? 4 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </motion.span>

                      <div className="min-w-0">
                        <h3
                          className={`font-serif font-bold leading-snug transition-all duration-300 ${
                            isActive ? "text-lg sm:text-2xl text-slate-900" : "text-sm sm:text-lg text-slate-600 group-hover:text-sky-700"
                          }`}
                        >
                          {srv.title}
                        </h3>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.p
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mt-1 max-w-xl"
                            >
                              {srv.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <Link
                      href={`/services/${srv.slug}`}
                      aria-label={`Open ${srv.title}`}
                      className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-[0_8px_20px_-6px_rgba(217,119,6,0.7)] rotate-0"
                          : "text-sky-600 bg-sky-100/70 -rotate-45 group-hover:rotate-0 group-hover:bg-sky-200/80"
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                    </Link>
                  </div>

                  <motion.span
                    variants={{
                      hidden: { scaleX: 0 },
                      show: { scaleX: 1, transition: { duration: 0.9, delay: 0.4 + idx * 0.08 } },
                    }}
                    className="absolute left-0 right-0 bottom-0 h-px origin-left bg-sky-200"
                  />
                </motion.li>
              );
            })}
          </motion.ul>

          {/* ---------- Right: arch showcase + plain-text info ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-24 w-full"
          >
            <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[440px]">
              <motion.svg
                aria-hidden
                viewBox="0 0 400 400"
                className="absolute -inset-4 sm:-inset-6 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] h-[calc(100%+2rem)] sm:h-[calc(100%+3rem)] opacity-70"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="200" cy="200" r="190" fill="none" stroke="#38bdf8" strokeOpacity="0.45" strokeDasharray="4 10" />
                <circle cx="200" cy="10" r="6" fill="#f59e0b" />
              </motion.svg>

              <motion.div
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-[280px] xs:h-[330px] sm:h-[370px] w-full overflow-hidden rounded-t-[999px] rounded-b-[40px] sm:rounded-b-[44px] bg-slate-900 shadow-[0_20px_40px_-15px_rgba(12,74,110,0.45)] sm:shadow-[0_30px_60px_-20px_rgba(12,74,110,0.5)] ring-4 ring-white"
              >
                <AnimatePresence initial={false}>
                  <motion.img
                    key={activeService.slug}
                    src={activeService.image}
                    alt={activeService.title}
                    initial={{ opacity: 0, scale: 1.18 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>

            <div className="relative mt-6 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 px-2"
                >
                  <p className="font-serif text-base sm:text-lg font-bold text-slate-800 truncate">{activeService.enclave}</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm font-semibold">
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <ShieldCheck className="w-4 h-4 text-amber-500" />
                      {activeService.fee}
                    </span>
                    <span className="h-4 w-px bg-sky-200 hidden sm:block" />
                    <span className="flex items-center gap-1.5 text-sky-700">
                      <Clock className="w-4 h-4" />
                      {activeService.time}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <Link
                href={`/services/${activeService.slug}`}
                className="group relative mt-5 inline-flex items-center justify-center w-full sm:w-auto gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 pl-6 pr-2 py-3 sm:py-2 text-xs sm:text-sm font-bold text-slate-950 shadow-[0_12px_30px_-10px_rgba(217,119,6,0.7)] transition-transform duration-300 hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
              >
                <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 blur-sm transition-transform duration-700 group-hover:translate-x-[450%]" />
                <span className="relative">{data.viewDossierText}</span>
                <span className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950 text-amber-300 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}