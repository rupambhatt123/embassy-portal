"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  animate,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Landmark, FileCheck, Building2, Clock, ArrowRight, Scale } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import AboutView from "@/components/pages/AboutView";
import websiteData from "@/data/websiteData.json";

// Dynamic Icon Registry
const ICON_MAP = {
  FileCheck,
  Building2,
  Clock,
};

/* ================= Shared helpers ================= */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left: (i * 47 + 5) % 100,
  top: (i * 31 + 13) % 100,
  size: 3 + (i % 3) * 2,
  dur: 4 + (i % 5) * 1.3,
  delay: (i % 7) * 0.6,
  gold: i % 3 === 0,
}));

const wordVariant: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, delay: 0.05 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function RevealWords({
  text,
  start = 0,
  gold = false,
  reduce,
}: {
  text: string;
  start?: number;
  gold?: boolean;
  reduce: boolean;
}) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={w + i} className="inline-block overflow-hidden align-bottom pr-[0.25em] pb-[0.1em]">
          <motion.span variants={wordVariant} custom={start + i} className="inline-block">
            {gold ? (
              <motion.span
                className="inline-block bg-clip-text text-transparent italic font-medium bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600"
                style={{ backgroundSize: "200% 100%" }}
                animate={reduce ? undefined : { backgroundPosition: ["0% 50%", "200% 50%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                {w}
              </motion.span>
            ) : (
              w
            )}
          </motion.span>
        </span>
      ))}
    </>
  );
}

function CountUp({ to, reduce }: { to: number; reduce: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    if (reduce) {
      node.textContent = to.toLocaleString("en-US");
      return;
    }
    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = Math.round(v).toLocaleString("en-US");
      },
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return <span ref={ref}>0</span>;
}

/* ================= Light Background ================= */
function LightBackground({ reduce }: { reduce: boolean }) {
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
        className="absolute -top-28 -right-24 w-[460px] h-[460px] rounded-full bg-amber-200/55 blur-[110px]"
        animate={reduce ? undefined : { x: [0, -80, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={loop(15)}
      />
      <motion.div
        className="absolute -bottom-28 -left-24 w-[460px] h-[460px] rounded-full bg-sky-300/40 blur-[110px]"
        animate={reduce ? undefined : { x: [0, 70, 0], y: [0, -50, 0], scale: [1, 1.25, 1] }}
        transition={loop(17)}
      />
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full ${p.gold ? "bg-amber-400" : "bg-sky-400"}`}
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={reduce ? { opacity: 0.4 } : { y: [0, -24, 0], opacity: [0.15, 0.8, 0.15] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

/* ================= Dark Background ================= */
function DarkBackground({ reduce, watermarkYear }: { reduce: boolean; watermarkYear: string }) {
  const loop = (dur: number) => ({ duration: dur, repeat: Infinity, ease: "easeInOut" as const });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#00c4d6_1px,transparent_1px)] [background-size:28px_28px]"
        animate={reduce ? undefined : { backgroundPosition: ["0px 0px", "28px 28px"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      <motion.span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif font-black leading-none select-none text-[160px] sm:text-[320px] lg:text-[420px] text-transparent"
        style={{ WebkitTextStroke: "1.5px rgba(212,175,55,0.14)" }}
        animate={reduce ? undefined : { y: [0, -18, 0], scale: [1, 1.03, 1] }}
        transition={loop(12)}
      >
        {watermarkYear}
      </motion.span>

      <motion.div
        className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-cyan-400/20 blur-[120px]"
        animate={reduce ? undefined : { x: [0, 90, 0], y: [0, 60, 0], scale: [1, 1.25, 1] }}
        transition={loop(15)}
      />
      <motion.div
        className="absolute -bottom-32 right-0 w-[560px] h-[560px] rounded-full bg-amber-400/20 blur-[130px]"
        animate={reduce ? undefined : { x: [0, -80, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={loop(18)}
      />

      <div className="absolute right-[-12%] top-1/2 -translate-y-1/2 w-[720px] h-[720px] hidden lg:block">
        <motion.svg
          viewBox="0 0 720 720"
          className="w-full h-full"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="360" cy="360" r="340" fill="none" stroke="#00c4d6" strokeOpacity="0.35" strokeDasharray="4 12" />
          <circle cx="360" cy="360" r="260" fill="none" stroke="#d4af37" strokeOpacity="0.4" strokeDasharray="2 14" />
          <circle cx="360" cy="20" r="6" fill="#d4af37" />
          <circle cx="100" cy="360" r="5" fill="#00c4d6" />
        </motion.svg>
      </div>

      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full ${p.gold ? "bg-[#d4af37]" : "bg-cyan-300"}`}
          style={{ left: `${p.left}%`, top: `${40 + (p.top % 60)}%`, width: p.size, height: p.size }}
          animate={reduce ? { opacity: 0.35 } : { y: [0, -200], opacity: [0, 0.9, 0] }}
          transition={{ duration: p.dur + 3, repeat: Infinity, ease: "easeOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

export default function AboutPage() {
  const reduce = !!useReducedMotion();

  // 100% Strict JSON Data Connection
  const data = (websiteData as any).categories.DiplomaticMission.sections.AboutPage.variants.DiplomaticAboutPage1;
  const banner = data.banner;
  const coop = data.cooperationSection;
  const treaty = data.treatySection;

  return (
    <main className="w-full min-h-screen bg-[#f8fafc] font-sans overflow-x-hidden">
      {/* 1. Header Banner */}
      <PageBanner
        title={banner.title}
        description={banner.description}
        bgImage={banner.bgImage}
        breadcrumbs={banner.breadcrumbs}
      />

      {/* Part 1: Home About Section */}
      <AboutView />

      {/* Part 2: Consular Sovereignty & Defense Cooperation */}
      <section className="relative w-full py-10 sm:py-14 px-4 sm:px-8 lg:px-14 bg-gradient-to-b from-[#fffaf0] via-white to-[#f0f9ff] overflow-hidden">
        <LightBackground reduce={reduce} />

        <div className="relative z-10 max-w-[1350px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Text + Stats */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="lg:col-span-7 space-y-4"
            >
              <motion.div variants={fadeUp} custom={-2} className="flex items-center gap-3">
                <motion.span
                  variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } } }}
                  className="block h-[2px] w-12 origin-left bg-gradient-to-r from-amber-500 to-sky-500"
                />
                <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-800">
                  <Landmark className="w-4 h-4 text-amber-500" />
                  {coop.badge}
                </span>
              </motion.div>

              <h3 className="font-serif font-bold text-slate-900 tracking-tight leading-[1.1] text-3xl sm:text-4xl lg:text-5xl">
                <RevealWords text={coop.headingLine1} reduce={reduce} />
                <span className="block">
                  <RevealWords text={coop.headingHighlight} start={coop.headingLine1.split(" ").length} gold reduce={reduce} />
                </span>
              </h3>

              <motion.div variants={fadeUp} custom={2} className="relative pl-4 max-w-2xl">
                <motion.span
                  aria-hidden
                  variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.9, delay: 0.7 } } }}
                  className="absolute left-0 top-1 bottom-1 w-[3px] origin-top rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
                />
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {coop.description}
                </p>
              </motion.div>

              {/* Stats Counters */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-0 max-w-2xl"
              >
                {coop.stats.map((st: any, i: number) => (
                  <div key={st.label} className={i === 0 ? "sm:pr-6" : "sm:pl-6 sm:border-l sm:border-sky-200"}>
                    <p className={`font-serif font-black leading-none text-3xl sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r ${st.gradient}`}>
                      {st.type === "count" ? (
                        <>
                          <CountUp to={st.value} reduce={reduce} />{st.suffix}
                        </>
                      ) : (
                        st.value
                      )}
                    </p>
                    <p className="mt-2 text-xs sm:text-sm font-medium text-slate-500">{st.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Arch Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[390px]">
                <motion.svg
                  aria-hidden
                  viewBox="0 0 400 400"
                  className="absolute -inset-5 w-[calc(100%+2.5rem)] h-[calc(100%+2.5rem)] opacity-70 pointer-events-none"
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="200" cy="200" r="190" fill="none" stroke="#38bdf8" strokeOpacity="0.45" strokeDasharray="4 10" />
                  <circle cx="200" cy="10" r="6" fill="#f59e0b" />
                </motion.svg>

                <motion.div
                  animate={reduce ? undefined : { y: [0, -6, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-[320px] xs:h-[360px] sm:h-[400px] w-full overflow-hidden rounded-t-[999px] rounded-b-[36px] bg-slate-900 ring-4 ring-white shadow-xl"
                >
                  <motion.img
                    src={coop.image}
                    alt={coop.headingLine1}
                    initial={{ scale: reduce ? 1.05 : 1.3 }}
                    whileInView={{ scale: 1.05 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Part 3: 1963 Vienna Convention */}
      <section className="relative w-full py-12 sm:py-16 px-4 sm:px-8 lg:px-14 bg-gradient-to-b from-[#07182b] via-[#0a2036] to-[#07182b] text-white overflow-hidden">
        <DarkBackground reduce={reduce} watermarkYear={treaty.watermarkYear} />

        <div className="relative z-10 max-w-[1350px] mx-auto space-y-10">
          
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} custom={-2} className="flex items-center gap-3 mb-3">
              <motion.span
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } } }}
                className="block h-[2px] w-12 origin-left bg-gradient-to-r from-[#d4af37] to-[#00c4d6]"
              />
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00c4d6]">
                <Scale className="w-4 h-4 text-[#d4af37]" />
                {treaty.badge}
              </span>
            </motion.div>

            <h3 className="font-serif font-bold text-white tracking-tight leading-[1.15] text-2xl sm:text-4xl lg:text-5xl">
              <RevealWords text={treaty.headingLine1} reduce={reduce} />
              <span className="inline-block overflow-hidden align-bottom pr-[0.22em] pb-[0.08em]">
                <motion.span variants={wordVariant} custom={2} className="inline-block text-[#d4af37] italic font-medium">
                  {treaty.headingHighlight1}
                </motion.span>
              </span>
              <span className="inline-block overflow-hidden align-bottom pr-[0.22em] pb-[0.08em]">
                <motion.span variants={wordVariant} custom={3} className="inline-block text-[#d4af37] italic font-medium">
                  {treaty.headingHighlight2}
                </motion.span>
              </span>
              <RevealWords text={treaty.headingLine2} start={4} reduce={reduce} />
            </h3>

            <motion.p variants={fadeUp} custom={3} className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {treaty.description}
            </motion.p>
          </motion.div>

          {/* Pillars */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0"
          >
            {treaty.pillars.map((p: any, i: number) => {
              const Icon = ICON_MAP[p.icon as keyof typeof ICON_MAP] || FileCheck;
              const gold = p.tone === "gold";
              return (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  custom={i}
                  className="group relative px-0 md:px-8 py-5 md:py-4 first:md:pl-0 last:md:pr-0"
                >
                  {i > 0 && (
                    <>
                      <motion.span
                        aria-hidden
                        variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 1, delay: 0.4 + i * 0.15 } } }}
                        className="hidden md:block absolute left-0 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-transparent via-white/25 to-transparent"
                      />
                      <span aria-hidden className="md:hidden absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </>
                  )}

                  <span
                    aria-hidden
                    className="absolute right-0 md:right-6 top-1 font-serif font-black leading-none text-6xl md:text-7xl text-transparent select-none transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ WebkitTextStroke: `1.5px ${gold ? "rgba(212,175,55,0.35)" : "rgba(0,196,214,0.35)"}` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-full ${
                      gold
                        ? "bg-gradient-to-br from-[#d4af37] to-[#e2a32d] text-[#07182b] shadow-md shadow-[#d4af37]/40"
                        : "bg-gradient-to-br from-[#00c4d6] to-cyan-500 text-[#07182b] shadow-md shadow-cyan-500/40"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <h4 className="mt-4 font-serif text-lg sm:text-xl font-bold text-white transition-colors duration-200 group-hover:text-[#d4af37]">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">{p.text}</p>

                  <span aria-hidden className={`mt-4 block h-px w-0 transition-all duration-300 group-hover:w-full ${gold ? "bg-[#d4af37]" : "bg-[#00c4d6]"}`} />
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>
    </main>
  );
}