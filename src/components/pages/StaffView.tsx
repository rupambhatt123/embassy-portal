"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import websiteData from "@/data/websiteData.json";

/* ---------- Animated background: diplomatic seal theme ---------- */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
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
        className="absolute left-1/2 top-1/2 w-[1100px] h-[1100px] -ml-[550px] -mt-[550px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(125,211,252,0.55), rgba(255,255,255,0) 25%, rgba(252,211,77,0.5) 50%, rgba(255,255,255,0) 75%, rgba(125,211,252,0.55))",
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -top-28 -left-24 w-[460px] h-[460px] rounded-full bg-sky-300/40 blur-[110px]"
        animate={reduce ? undefined : { x: [0, 80, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={loop(15)}
      />
      <motion.div
        className="absolute -bottom-28 -right-24 w-[460px] h-[460px] rounded-full bg-amber-200/60 blur-[110px]"
        animate={reduce ? undefined : { x: [0, -70, 0], y: [0, -50, 0], scale: [1, 1.25, 1] }}
        transition={loop(17)}
      />
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full ${p.amber ? "bg-amber-400" : "bg-sky-400"}`}
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={reduce ? { opacity: 0.4 } : { y: [0, -24, 0], opacity: [0.15, 0.8, 0.15] }}
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const detailParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

const detailChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function StaffView() {
  const reduce = !!useReducedMotion();

  // 100% Strict JSON Data Connection
  const data = (websiteData as any).categories.DiplomaticMission.sections.Staff.variants.DiplomaticStaff1;
  const envoys = data.envoys;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const t = setTimeout(() => setSelectedIndex((p) => (p + 1) % envoys.length), data.autoplayMs);
    return () => clearTimeout(t);
  }, [isPaused, selectedIndex, envoys.length, data.autoplayMs]);

  const envoy = envoys[selectedIndex];

  return (
    <section
      id="staff"
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex items-center justify-center bg-gradient-to-b from-[#eef7fc] via-white to-[#fffaf0] px-4 sm:px-8 lg:px-14 py-10 sm:py-14 overflow-hidden"
    >
      <AnimatedBackground reduce={reduce} />

      <div
        className="relative z-10 w-full max-w-[1350px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* ================= Left: Direct Header + Details ================= */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="lg:col-span-6 space-y-5"
        >
          <div>
            <h2 className="font-serif font-black text-slate-900 tracking-tight leading-none text-4xl sm:text-5xl lg:text-6xl">
              <span className="inline-block overflow-hidden align-bottom pr-[0.25em]">
                <motion.span variants={wordVariant} custom={0} className="inline-block">
                  {data.headingLine1}
                </motion.span>
              </span>
              <span className="inline-block overflow-hidden align-bottom pr-[0.25em]">
                <motion.span variants={wordVariant} custom={1} className="inline-block text-sky-600">
                  {data.headingHighlight}
                </motion.span>
              </span>
            </h2>
          </div>

          {/* Active Envoy Details */}
          <div className="relative pl-4 sm:pl-5 min-h-[190px] sm:min-h-[220px]">
            <motion.span
              aria-hidden
              variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.9, delay: 0.7 } } }}
              className="absolute left-0 top-1 bottom-1 w-[3.5px] origin-top rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
            />
            <AnimatePresence mode="wait">
              <motion.div key={envoy.id} variants={detailParent} initial="hidden" animate="show" exit="exit" className="space-y-2">
                <motion.h3 variants={detailChild} className="font-serif font-bold text-slate-900 tracking-tight text-2xl sm:text-3xl">
                  {envoy.name}
                </motion.h3>
                <motion.p variants={detailChild} className="text-base sm:text-xl font-semibold text-amber-600">
                  {envoy.role}
                </motion.p>
                <motion.p variants={detailChild} className="flex items-center gap-2 text-sm sm:text-base font-medium text-slate-500">
                  <Building2 className="w-4 h-4 text-sky-600 shrink-0" />
                  {envoy.department}
                </motion.p>
                <motion.p variants={detailChild} className="pt-1 max-w-xl text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
                  {envoy.bio}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA */}
          <motion.div variants={fadeUp} custom={4} className="pt-2">
            <Link
              href={data.viewAllHref}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 pl-7 pr-2 py-2 text-sm sm:text-base font-bold text-slate-950 shadow-md transition-transform duration-200 hover:scale-[1.03]"
            >
              <span className="relative">{data.viewAllText}</span>
              <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 text-amber-300 transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ================= Right: Responsive Arch Portrait + Selectors ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 flex flex-col items-center"
        >
          <div className="relative w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[390px]">
            {/* Rotating diplomatic seal text */}
            <motion.svg
              aria-hidden
              viewBox="0 0 600 600"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[125%] max-w-none pointer-events-none"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            >
              <defs>
                <path id="staff-seal" d="M300,300 m-270,0 a270,270 0 1,1 540,0 a270,270 0 1,1 -540,0" />
              </defs>
              <circle cx="300" cy="300" r="290" fill="none" stroke="#38bdf8" strokeOpacity="0.35" strokeDasharray="4 10" />
              <text style={{ fontSize: 20, letterSpacing: "7px", fontWeight: 600 }} fill="#0369a1" fillOpacity="0.4">
                <textPath href="#staff-seal">
                  {data.sealText}
                </textPath>
              </text>
              <circle cx="300" cy="10" r="6" fill="#f59e0b" />
            </motion.svg>

            {/* Outlined index number behind portrait */}
            <AnimatePresence mode="wait">
              <motion.span
                key={envoy.id}
                aria-hidden
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="absolute -left-3 sm:-left-10 top-1 z-0 font-serif font-black leading-none text-[90px] sm:text-[140px] text-transparent select-none pointer-events-none"
                style={{ WebkitTextStroke: "2px rgba(217,119,6,0.45)" }}
              >
                {String(selectedIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>

            {/* Arch with responsive height */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 h-[320px] xs:h-[360px] sm:h-[420px] w-full overflow-hidden rounded-t-[999px] rounded-b-[36px] bg-slate-900 ring-4 ring-white shadow-xl"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={envoy.id}
                  initial={{ clipPath: reduce ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  exit={{ opacity: 0, transition: { delay: 0.9, duration: 0.1 } }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0"
                >
                  <motion.img
                    src={envoy.image}
                    alt={envoy.name}
                    initial={{ scale: reduce ? 1.04 : 1.2 }}
                    animate={{ scale: 1.04 }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* Avatar selector buttons */}
          <div className="relative z-10 mt-6 flex items-center justify-center gap-3 sm:gap-4">
            {envoys.map((e: any, i: number) => {
              const active = i === selectedIndex;
              return (
                <button
                  key={e.id}
                  onClick={() => setSelectedIndex(i)}
                  aria-label={`Show ${e.name}`}
                  className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full cursor-pointer touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <img
                    src={e.image}
                    alt=""
                    className={`absolute inset-[3px] sm:inset-[4px] w-[calc(100%-6px)] sm:w-[calc(100%-8px)] h-[calc(100%-6px)] sm:h-[calc(100%-8px)] rounded-full object-cover object-top transition-all duration-300 ${
                      active ? "scale-100 saturate-100" : "scale-90 saturate-50 opacity-70 group-hover:opacity-100 group-hover:scale-95"
                    }`}
                  />
                  <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                    <circle cx="32" cy="32" r="29" fill="none" stroke="#bae6fd" strokeWidth="2" />
                    {active && (
                      <motion.circle
                        key={`ring-${selectedIndex}-${isPaused}`}
                        cx="32"
                        cy="32"
                        r="29"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: isPaused ? 1 : 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: isPaused ? 0.3 : data.autoplayMs / 1000, ease: "linear" }}
                      />
                    )}
                  </svg>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}