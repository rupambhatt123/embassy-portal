"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Plane,
  Building,
  Award,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import websiteData from "@/data/websiteData.json";

// Dynamic Icon Registry
const ICON_MAP = {
  Plane,
  GraduationCap,
  Briefcase,
  Building,
  Award,
  TrendingUp,
};

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left: (i * 47 + 5) % 100,
  top: (i * 31 + 13) % 100,
  size: 3 + (i % 3) * 2,
  dur: 4 + (i % 5) * 1.3,
  delay: (i % 7) * 0.6,
  amber: i % 3 === 0,
}));

function AnimatedBackground({ reduce, flightPath, marqueeText }: { reduce: boolean; flightPath: string; marqueeText: string }) {
  const loop = (dur: number) => ({ duration: dur, repeat: Infinity, ease: "easeInOut" as const });
  const ticker = marqueeText.repeat(4);
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
        className="absolute -top-28 -right-24 w-[460px] h-[460px] rounded-full bg-amber-200/50 blur-[110px]"
        animate={reduce ? undefined : { x: [0, -80, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={loop(15)}
      />
      <motion.div
        className="absolute -bottom-28 -left-24 w-[460px] h-[460px] rounded-full bg-sky-300/40 blur-[110px]"
        animate={reduce ? undefined : { x: [0, 70, 0], y: [0, -50, 0], scale: [1, 1.25, 1] }}
        transition={loop(17)}
      />

      <div className="absolute left-0 bottom-[2%] w-full overflow-hidden whitespace-nowrap">
        <motion.div
          className="inline-flex font-serif font-black text-[70px] sm:text-[120px] leading-none select-none"
          style={{ color: "transparent", WebkitTextStroke: "1px rgba(217,119,6,0.20)" }}
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <span>{ticker}</span>
          <span>{ticker}</span>
        </motion.div>
      </div>

      <div className="absolute left-1/2 top-[4%] -translate-x-1/2 w-[1800px] h-[500px] hidden md:block">
        <svg viewBox="0 0 1800 500" className="absolute inset-0 w-full h-full overflow-visible">
          <motion.path
            d={flightPath}
            fill="none"
            stroke="#0ea5e9"
            strokeOpacity="0.45"
            strokeWidth="2"
            strokeDasharray="6 12"
            animate={reduce ? undefined : { strokeDashoffset: [0, -36] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
          <circle cx="0" cy="380" r="6" fill="#f59e0b" />
          <circle cx="1800" cy="120" r="6" fill="#f59e0b" />
        </svg>
        {!reduce && (
          <motion.div
            className="absolute left-0 top-0"
            style={{ offsetPath: `path('${flightPath}')`, offsetRotate: "auto" }}
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <Plane className="w-8 h-8 text-amber-500 rotate-45 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg" />
          </motion.div>
        )}
      </div>

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

const wordVariant: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, delay: 0.05 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const detailParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.22 } },
};

const detailChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function VisaView() {
  const reduce = !!useReducedMotion();

  // 100% Strict JSON Data Connection
  const data = (websiteData as any).categories.DiplomaticMission.sections.Visa.variants.DiplomaticVisa1;
  const allVisas = data.visas;
  const count = allVisas.length;

  const [activeId, setActiveId] = useState<number>(allVisas[0].id);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const t = setTimeout(() => {
      setActiveId((prev) => {
        const currentIndex = allVisas.findIndex((v: any) => v.id === prev);
        const nextIndex = (currentIndex + 1) % count;
        return allVisas[nextIndex].id;
      });
    }, data.autoplayMs);
    return () => clearTimeout(t);
  }, [isPaused, activeId, count, allVisas, data.autoplayMs]);

  const visa = allVisas.find((v: any) => v.id === activeId);

  return (
    <section
      id="visas"
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-10 sm:py-14 px-4 sm:px-8 lg:px-14 flex flex-col justify-center items-center bg-gradient-to-b from-[#f0f9ff] via-white to-[#fffaf0] overflow-hidden"
    >
      <AnimatedBackground reduce={reduce} flightPath={data.flightPath} marqueeText={data.marqueeText} />

      <div className="w-full max-w-[1350px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif font-black text-slate-900 tracking-tight leading-tight text-3xl sm:text-4xl lg:text-5xl">
            {data.headingWords.map((w: string, i: number) => (
              <span key={w + i} className="inline-block overflow-hidden align-bottom pr-[0.25em]">
                <motion.span variants={wordVariant} custom={i} className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        {/* Orbit Selector & Details */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Orbit Photo Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[280px] h-[280px] xs:w-[320px] xs:h-[320px] sm:w-[380px] sm:h-[380px]">
              
              <motion.svg
                aria-hidden
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full pointer-events-none"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="200" cy="200" r="184" fill="none" stroke="#38bdf8" strokeOpacity="0.5" strokeDasharray="4 10" />
                <circle cx="200" cy="200" r="150" fill="none" stroke="#f59e0b" strokeOpacity="0.3" strokeDasharray="2 12" />
              </motion.svg>

              {/* Centre Image */}
              <motion.div
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[18%] rounded-full overflow-hidden bg-slate-900 ring-4 ring-white shadow-xl"
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={visa.id}
                    initial={{ clipPath: reduce ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)" }}
                    animate={{ clipPath: "circle(150% at 50% 50%)" }}
                    exit={{ opacity: 0, transition: { delay: 0.9, duration: 0.1 } }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0"
                  >
                    <motion.img
                      src={visa.image}
                      alt={visa.title}
                      initial={{ scale: reduce ? 1.05 : 1.3 }}
                      animate={{ scale: 1.05 }}
                      transition={{ duration: 6, ease: "linear" }}
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Satellites Buttons */}
              {allVisas.map((v: any, i: number) => {
                const Icon = ICON_MAP[v.icon as keyof typeof ICON_MAP] || Plane;
                const active = v.id === activeId;
                const angle = (-90 + i * (360 / count)) * (Math.PI / 180);
                const left = 50 + 46 * Math.cos(angle);
                const top = 50 + 46 * Math.sin(angle);
                return (
                  <motion.button
                    key={v.id}
                    onClick={() => {
                      setActiveId(v.id);
                      setIsPaused(true);
                    }}
                    onFocus={() => setActiveId(v.id)}
                    aria-label={`${v.code}: ${v.title}`}
                    aria-pressed={active}
                    title={v.code}
                    animate={{ scale: active ? 1.18 : 1 }}
                    whileHover={{ scale: active ? 1.18 : 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-amber-400 touch-manipulation"
                    style={{ left: `${left}%`, top: `${top}%` }}
                  >
                    <span
                      className={`absolute inset-[3px] sm:inset-[4px] flex items-center justify-center rounded-full transition-all duration-300 ${
                        active
                          ? "bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 shadow-md shadow-amber-500/50"
                          : "bg-white text-sky-600 shadow-md shadow-sky-900/10"
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </span>
                    <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                      <circle cx="32" cy="32" r="29" fill="none" stroke={active ? "#fde68a" : "#bae6fd"} strokeWidth="2" />
                      {active && (
                        <motion.circle
                          key={`ring-${activeId}-${isPaused}`}
                          cx="32"
                          cy="32"
                          r="29"
                          fill="none"
                          stroke="#0f172a"
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={{ pathLength: isPaused ? 1 : 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: isPaused ? 0.3 : data.autoplayMs / 1000, ease: "linear" }}
                        />
                      )}
                    </svg>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right: Active Visa Details */}
          <div className="lg:col-span-7 min-h-[260px] flex items-center px-1 sm:px-0">
            <AnimatePresence mode="wait">
              <motion.article
                key={visa.id}
                variants={detailParent}
                initial="hidden"
                animate="show"
                exit="exit"
                className="w-full space-y-3"
              >
                <motion.h3
                  variants={detailChild}
                  className="font-serif font-black leading-none text-4xl sm:text-6xl text-transparent"
                  style={{ WebkitTextStroke: "2px #d97706" }}
                >
                  {visa.code}
                </motion.h3>

                <motion.h4 variants={detailChild} className="font-serif font-bold text-slate-900 text-xl sm:text-2xl leading-tight">
                  {visa.title}
                </motion.h4>

                <motion.div variants={detailChild} className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs sm:text-sm font-semibold">
                  <span className="text-amber-600">{visa.fee}</span>
                  <span className="h-3 w-px bg-sky-200" />
                  <span className="text-sky-700">{visa.tag}</span>
                  <span className="h-3 w-px bg-sky-200" />
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    {visa.validity}
                  </span>
                </motion.div>

                <motion.div variants={detailChild} className="relative pl-3.5 sm:pl-4 max-w-xl">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-amber-400 to-sky-400"
                  />
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{visa.description}</p>
                </motion.div>

                <motion.div variants={detailChild} className="pt-1">
                  <Link
                    href={data.protocolsHref}
                    className="group relative inline-flex items-center gap-1.5 pb-0.5 text-xs sm:text-sm font-bold text-sky-800"
                  >
                    {data.protocolsLinkText}
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span className="absolute left-0 bottom-0 h-px w-full bg-sky-200" />
                    <span className="absolute left-0 bottom-0 h-px w-0 bg-amber-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              </motion.article>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom CTA Button */}
        <div className="flex justify-center mt-8">
          <Link
            href={data.bottomBtnHref}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 pl-6 pr-1.5 py-1.5 text-xs sm:text-sm font-bold text-slate-950 shadow-md transition-transform duration-200 hover:scale-[1.03]"
          >
            <span className="relative">{data.bottomBtnText}</span>
            <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-slate-950 text-amber-300 transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}