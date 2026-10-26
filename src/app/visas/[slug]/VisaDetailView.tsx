"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  type Variants,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  DollarSign,
  FileText,
  Plane,
  ShieldCheck,
} from "lucide-react";
import PageBanner from "@/components/PageBanner";
import websiteData from "@/data/websiteData.json";

const visaDetailConfig = (websiteData as any).categories.DiplomaticMission.sections.VisaDetailPage.variants.DiplomaticVisaDetail1;
const ALL_VISAS = visaDetailConfig.visas || [];

const ROUTE_A = "M0 380 C 300 40, 800 40, 1100 260 S 1600 420, 1800 120";
const ROUTE_B = "M0 140 C 400 440, 900 440, 1200 220 S 1650 -40, 1800 260";
const TICKER = "B-1 / B-2  •  F-1 / M-1  •  H-1B  •  L-1  •  O-1  •  EB-5  •  ";

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 47 + 5) % 100,
  top: (i * 31 + 13) % 100,
  size: 3 + (i % 3) * 2,
  dur: 4 + (i % 5) * 1.3,
  delay: (i % 7) * 0.6,
  amber: i % 3 === 0,
}));

function FlightRoute({ path, top, duration, delay, reduce }: { path: string; top: string; duration: number; delay: number; reduce: boolean }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 w-[1800px] h-[500px] hidden md:block" style={{ top }}>
      <svg viewBox="0 0 1800 500" className="absolute inset-0 w-full h-full overflow-visible">
        <motion.path
          d={path}
          fill="none"
          stroke="#0ea5e9"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeDasharray="6 12"
          animate={reduce ? undefined : { strokeDashoffset: [0, -36] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      {!reduce && (
        <motion.div
          className="absolute left-0 top-0"
          style={{ offsetPath: `path('${path}')`, offsetRotate: "auto" }}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration, repeat: Infinity, ease: "linear", delay }}
        >
          <Plane className="w-8 h-8 text-amber-500 rotate-45 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg" />
        </motion.div>
      )}
    </div>
  );
}

function Ticker({ className, stroke, reverse, reduce }: { className: string; stroke: string; reverse?: boolean; reduce: boolean }) {
  const text = TICKER.repeat(4);
  return (
    <div className={`absolute left-0 w-full overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex font-serif font-black text-[88px] sm:text-[120px] leading-none select-none"
        style={{ color: "transparent", WebkitTextStroke: `1px ${stroke}` }}
        animate={reduce ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
      >
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
}

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
        className="absolute left-1/2 top-[40%] w-[1100px] h-[1100px] -ml-[550px] -mt-[550px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(125,211,252,0.55), rgba(255,255,255,0) 25%, rgba(252,211,77,0.5) 50%, rgba(255,255,255,0) 75%, rgba(125,211,252,0.55))",
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[10%] -right-24 w-[460px] h-[460px] rounded-full bg-amber-200/55 blur-[110px]"
        animate={reduce ? undefined : { x: [0, -80, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={loop(15)}
      />
      <motion.div
        className="absolute bottom-[4%] -left-24 w-[460px] h-[460px] rounded-full bg-sky-300/40 blur-[110px]"
        animate={reduce ? undefined : { x: [0, 70, 0], y: [0, -50, 0], scale: [1, 1.25, 1] }}
        transition={loop(17)}
      />

      <Ticker className="top-[30%]" stroke="rgba(2,132,199,0.14)" reduce={reduce} />
      <Ticker className="bottom-[6%]" stroke="rgba(217,119,6,0.20)" reverse reduce={reduce} />

      <FlightRoute path={ROUTE_A} top="12%" duration={24} delay={0} reduce={reduce} />
      <FlightRoute path={ROUTE_B} top="52%" duration={28} delay={4} reduce={reduce} />

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
    transition: { duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

function SectionHeading({ num, text }: { num: string; text: string }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }} className="mb-4">
      <div className="flex items-end gap-3">
        <span
          className="font-serif font-black leading-none text-3xl sm:text-5xl text-transparent select-none shrink-0"
          style={{ WebkitTextStroke: "1.5px #d97706" }}
        >
          {num}
        </span>
        <h2 className="font-serif font-bold text-slate-800 tracking-tight leading-[1.15] text-lg sm:text-3xl pb-0.5 min-w-0">
          {text.split(" ").map((w, i) => (
            <span key={w + i} className="inline-block overflow-hidden align-bottom pr-[0.25em] pb-[0.1em]">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  show: { y: "0%", opacity: 1, transition: { duration: 0.7, delay: 0.05 + i * 0.08, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h2>
      </div>
      <motion.span
        aria-hidden
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, delay: 0.3 } } }}
        className="mt-3 block h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-amber-400 via-sky-300 to-transparent"
      />
    </motion.div>
  );
}

export default function VisaDetailView({ visa, slug }: { visa: any; slug: string }) {
  const reduce = !!useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [showBar, setShowBar] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (v) => setShowBar(v < 0.9));

  if (!visa) {
    notFound();
  }

  const otherVisas = ALL_VISAS.filter((v: any) => v.slug !== slug).slice(0, 3);

  const facts = [
    { icon: DollarSign, label: visaDetailConfig.metrics.feeLabel, value: visa.fee, ring: "from-amber-100 to-amber-50 text-amber-600" },
    { icon: Clock, label: visaDetailConfig.metrics.validityLabel, value: visa.validity, ring: "from-sky-100 to-sky-50 text-sky-600" },
    { icon: ShieldCheck, label: visaDetailConfig.metrics.processingTimeLabel, value: visa.processingTime, ring: "from-emerald-100 to-emerald-50 text-emerald-600" },
  ];

  const pillBase =
    "group/btn relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-sm font-bold text-slate-950 shadow-[0_12px_30px_-10px_rgba(217,119,6,0.7)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600";

  return (
    <main className="relative w-full min-h-screen font-sans text-slate-900 pb-28 lg:pb-24 bg-gradient-to-b from-[#f0f9ff] via-white to-[#fffaf0] overflow-hidden">
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-amber-400 via-amber-500 to-sky-400"
        style={{ scaleX: progress }}
      />

      <AnimatedBackground reduce={reduce} />

      <div className="relative z-10">
        <PageBanner
          title={`${visa.code} - ${visa.title}`}
          bgImage={visa.image}
          breadcrumbs={[
            { label: "Visas", href: "/visas" },
            { label: visa.code },
          ]}
        />

        <div className="max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8">
          <motion.div variants={slideIn} initial="hidden" animate="show" custom={0}>
            <Link
              href="/visas"
              className="group relative inline-flex items-center gap-2 py-2 text-sm font-semibold text-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
            >
              <ArrowLeft className="w-4 h-4 text-amber-500 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to all categories
              <span className="absolute left-0 bottom-1 h-px w-full bg-sky-200" />
              <span className="absolute left-0 bottom-1 h-px w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
            </Link>
          </motion.div>

          <header className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-full lg:h-auto lg:max-w-[380px] lg:aspect-square">
                <motion.svg
                  aria-hidden
                  viewBox="0 0 400 400"
                  className="absolute -inset-3 sm:-inset-5 w-[calc(100%+1.5rem)] sm:w-[calc(100%+2.5rem)] h-[calc(100%+1.5rem)] sm:h-[calc(100%+2.5rem)] opacity-70"
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="200" cy="200" r="190" fill="none" stroke="#38bdf8" strokeOpacity="0.5" strokeDasharray="4 10" />
                  <circle cx="200" cy="10" r="7" fill="#f59e0b" />
                </motion.svg>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <motion.div
                    animate={reduce ? undefined : { y: [0, -8, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full"
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-full bg-slate-900 ring-4 ring-white shadow-[0_30px_60px_-20px_rgba(12,74,110,0.55)]">
                      <motion.img
                        src={visa.image}
                        alt={visa.title}
                        initial={{ scale: reduce ? 1.05 : 1.3 }}
                        animate={{ scale: 1.05 }}
                        transition={{ duration: 8, ease: "linear" }}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                    </div>
                    <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 ring-4 ring-white shadow-[0_10px_25px_-6px_rgba(245,158,11,0.8)]">
                      <ShieldCheck className="w-5 h-5" />
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-sky-800">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8 }}
                    className="block h-[2px] w-8 origin-left bg-gradient-to-r from-amber-500 to-sky-500"
                  />
                  {visa.tag}
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <span className="relative flex w-2.5 h-2.5">
                    {!reduce && <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />}
                    <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </span>
                  {visaDetailConfig.statusBadge}
                </span>
              </motion.div>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
                className="mt-3 font-serif font-black leading-[1.02] text-4xl sm:text-6xl lg:text-7xl text-transparent break-words"
                style={{ WebkitTextStroke: "2px #d97706" }}
              >
                {visa.code}
              </motion.p>

              <motion.h1
                initial="hidden"
                animate="show"
                className="mt-3 font-serif font-bold text-slate-800 tracking-tight leading-[1.15] text-2xl sm:text-4xl"
              >
                {visa.title.split(" ").map((w: string, i: number) => (
                  <span key={w + i} className="inline-block overflow-hidden align-bottom pr-[0.25em] pb-[0.1em]">
                    <motion.span variants={wordVariant} custom={i + 2} className="inline-block">
                      {w}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>

              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 block h-[3px] w-36 sm:w-56 origin-left rounded-full bg-gradient-to-r from-[#d4af37] via-amber-300 to-transparent mx-auto lg:mx-0"
              />

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={7} className="relative mt-5 pl-5 text-left max-w-2xl mx-auto lg:mx-0">
                <motion.span
                  aria-hidden
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.9, delay: 1.1 }}
                  className="absolute left-0 top-1 bottom-1 w-[3px] origin-top rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
                />
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{visa.overview}</p>
              </motion.div>
            </div>
          </header>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3"
          >
            {facts.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  variants={fadeUp}
                  custom={i}
                  className={`group flex items-center gap-4 py-4 sm:py-2 border-sky-200 ${
                    i > 0 ? "border-t sm:border-t-0 sm:border-l sm:pl-6" : ""
                  } ${i < 2 ? "sm:pr-6" : ""}`}
                >
                  <span
                    className={`flex items-center justify-center w-11 h-11 rounded-full shrink-0 bg-gradient-to-br ${f.ring} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-500">{f.label}</p>
                    <p className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug break-words">{f.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-8 space-y-12 sm:space-y-14 min-w-0">
              <section>
                <SectionHeading num="01" text={visaDetailConfig.sectionTitles.eligibility} />
                <motion.ul initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
                  {visa.eligibility.map((el: string, i: number) => (
                    <motion.li key={i} variants={slideIn} custom={i} className="group relative py-3.5">
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-100/70 via-sky-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative flex items-start gap-3.5 pl-1 transition-transform duration-300 group-hover:translate-x-1">
                        <motion.span
                          variants={{
                            hidden: { scale: 0, rotate: -90 },
                            show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 380, damping: 16, delay: 0.25 + i * 0.09 } },
                          }}
                          className="flex items-center justify-center w-6 h-6 rounded-full shrink-0 mt-0.5 bg-gradient-to-br from-sky-400 to-cyan-500 text-white transition-all duration-300 group-hover:from-amber-400 group-hover:to-amber-500 group-hover:text-slate-950"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </motion.span>
                        <span className="text-sm sm:text-base text-slate-700 leading-relaxed">{el}</span>
                      </div>
                      <span className="absolute left-0 right-0 bottom-0 h-px bg-sky-200" />
                      <span className="absolute left-0 bottom-0 h-px w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                    </motion.li>
                  ))}
                </motion.ul>
              </section>

              <section>
                <SectionHeading num="02" text={visaDetailConfig.sectionTitles.documentation} />
                <motion.ul initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
                  {visa.requiredDocs.map((doc: string, i: number) => (
                    <motion.li key={i} variants={slideIn} custom={i} className="group relative py-3.5">
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-100/70 via-sky-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative flex items-start gap-3.5 pl-1 transition-transform duration-300 group-hover:translate-x-1">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 transition-all duration-300 group-hover:from-amber-300 group-hover:to-amber-500 group-hover:text-slate-950 group-hover:-rotate-6">
                          <FileText className="w-4 h-4" />
                        </span>
                        <span className="text-sm sm:text-base text-slate-700 leading-relaxed pt-1">{doc}</span>
                      </div>
                      <span className="absolute left-0 right-0 bottom-0 h-px bg-sky-200" />
                      <span className="absolute left-0 bottom-0 h-px w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                    </motion.li>
                  ))}
                </motion.ul>
              </section>

              <section>
                <SectionHeading num="03" text={visaDetailConfig.sectionTitles.procedure} />
                <motion.ol initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="relative">
                  <motion.span
                    aria-hidden
                    variants={{
                      hidden: { scaleY: 0 },
                      show: { scaleY: 1, transition: { duration: 1.6 + visa.steps.length * 0.1, ease: "easeInOut" } },
                    }}
                    className="absolute left-5 top-5 bottom-5 w-[2px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-amber-400 via-sky-300 to-amber-400"
                  />
                  {visa.steps.map((st: string, i: number) => (
                    <motion.li key={i} variants={slideIn} custom={i} className="group relative flex items-start gap-4 sm:gap-5 py-3">
                      <span className="relative flex items-center justify-center w-10 h-10 shrink-0">
                        {!reduce && (
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 rounded-full bg-amber-400"
                            animate={{ scale: [1, 1.7], opacity: [0.35, 0] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }}
                          />
                        )}
                        <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 font-serif text-sm font-bold ring-4 ring-white shadow-[0_8px_20px_-6px_rgba(217,119,6,0.7)] transition-transform duration-300 group-hover:scale-110">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </span>
                      <span className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed pt-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-sky-800">
                        {st}
                      </span>
                    </motion.li>
                  ))}
                </motion.ol>
              </section>
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 lg:sticky lg:top-24 space-y-10 min-w-0"
            >
              <div className="relative pl-5 sm:pl-6">
                <motion.span
                  aria-hidden
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="absolute left-0 top-0 bottom-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
                />

                <p className="text-sm font-semibold text-sky-800">{visaDetailConfig.sidebar.appointmentCategoryBadge}</p>
                <h3 className="mt-1 font-serif text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
                  {visaDetailConfig.sidebar.appointmentTitleTemplate.replace("{code}", visa.code)}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {visaDetailConfig.sidebar.appointmentDescription}
                </p>

                <div className="mt-5">
                  <Link href={visaDetailConfig.sidebar.appointmentHref} className={`${pillBase} w-full sm:w-auto justify-between gap-3 pl-6 pr-2 py-2`}>
                    <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 blur-sm transition-transform duration-700 group-hover/btn:translate-x-[450%]" />
                    <span className="relative">{visaDetailConfig.sidebar.appointmentBtnText}</span>
                    <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-950 text-amber-300 transition-transform duration-300 group-hover/btn:rotate-12">
                      <Calendar className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-slate-800">{visaDetailConfig.sidebar.otherVisasTitle}</h3>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="mt-2 block h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-amber-400 via-sky-300 to-transparent"
                />
                <motion.ul initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                  {otherVisas.map((other: any, i: number) => (
                    <motion.li key={other.slug} variants={fadeUp} custom={i} className="group relative">
                      <Link
                        href={`/visas/${other.slug}`}
                        className="flex items-center gap-4 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                      >
                        <span className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-md">
                          <img
                            src={other.image}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-bold text-amber-600">{other.code}</span>
                          <span className="block font-serif font-bold text-slate-800 leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-amber-600">
                            {other.title}
                          </span>
                        </span>
                        <ArrowRight className="w-4 h-4 shrink-0 text-slate-400 transition-all duration-300 group-hover:text-amber-600 group-hover:translate-x-1" />
                      </Link>
                      <span className="absolute left-0 right-0 bottom-0 h-px bg-sky-200" />
                      <span className="absolute left-0 bottom-0 h-px w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="lg:hidden fixed left-4 right-4 bottom-4 z-50"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <Link href={visaDetailConfig.sidebar.appointmentHref} className={`${pillBase} w-full justify-between pl-6 pr-2 py-2 shadow-[0_18px_40px_-12px_rgba(217,119,6,0.85)]`}>
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 blur-sm transition-transform duration-700 group-hover/btn:translate-x-[450%]" />
              <span className="relative">Book {visa.code} appointment</span>
              <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-950 text-amber-300">
                <Calendar className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}