"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Newspaper, Calendar, ShieldCheck } from "lucide-react";
import websiteData from "@/data/websiteData.json";

/* ---------- Background Particles ---------- */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left: (i * 47 + 5) % 100,
  top: (i * 31 + 13) % 100,
  size: 3 + (i % 3) * 2,
  dur: 4 + (i % 5) * 1.3,
  delay: (i % 7) * 0.6,
  amber: i % 3 === 0,
}));

function Marquee({
  text,
  reverse,
  stroke,
  reduce,
  className,
}: {
  text: string;
  reverse?: boolean;
  stroke: string;
  reduce: boolean;
  className: string;
}) {
  const content = text.repeat(4);
  return (
    <div className={`absolute left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none select-none ${className}`}>
      <motion.div
        className="inline-flex font-serif font-black text-[80px] sm:text-[110px] leading-none select-none"
        style={{ color: "transparent", WebkitTextStroke: `1px ${stroke}` }}
        animate={reduce ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <span>{content}</span>
        <span>{content}</span>
      </motion.div>
    </div>
  );
}

function AnimatedBackground({ reduce, marqueeA, marqueeB }: { reduce: boolean; marqueeA: string; marqueeB: string }) {
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

      <Marquee text={marqueeA} stroke="rgba(2,132,199,0.12)" reduce={reduce} className="top-[6%]" />
      <Marquee text={marqueeB} stroke="rgba(217,119,6,0.15)" reverse reduce={reduce} className="bottom-[4%]" />

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

export default function BlogsView() {
  const reduce = !!useReducedMotion();

  // 100% Strict JSON Data Connection
  const data = (websiteData as any).categories.DiplomaticMission.sections.Blog.variants.DiplomaticBlog1;
  const posts = data.posts;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const t = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % posts.length);
    }, data.autoplayMs);
    return () => clearTimeout(t);
  }, [isPaused, activeIndex, posts.length, data.autoplayMs]);

  const activePost = posts[activeIndex];
  const heading1Words = data.headingLine1.split(" ");
  const heading2Words = data.headingLine2.split(" ");

  return (
    <section
      id="blogs"
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-10 sm:py-14 px-4 sm:px-8 lg:px-14 flex flex-col justify-center items-center bg-gradient-to-b from-[#eef7fc] via-white to-[#fffaf0] overflow-hidden"
    >
      <AnimatedBackground reduce={reduce} marqueeA={data.marqueeA} marqueeB={data.marqueeB} />

      <div
        className="relative z-10 w-full max-w-[1350px] mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* ================= Header ================= */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} custom={-2} className="flex items-center justify-center gap-3 mb-3">
            <motion.span
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } } }}
              className="block h-[2px] w-10 origin-right bg-gradient-to-l from-amber-500 to-transparent"
            />
            <span className="flex items-center gap-1.5 text-sm font-semibold text-sky-800">
              <Newspaper className="w-4 h-4 text-amber-500" />
              {data.badge}
            </span>
            <motion.span
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } } }}
              className="block h-[2px] w-10 origin-left bg-gradient-to-r from-amber-500 to-transparent"
            />
          </motion.div>

          <h2 className="font-serif font-bold text-slate-800 tracking-tight leading-[1.1] text-3xl sm:text-4xl lg:text-5xl">
            {heading1Words.map((w: string, i: number) => (
              <span key={w + i} className="inline-block overflow-hidden align-bottom pr-[0.25em] pb-[0.08em]">
                <motion.span variants={wordVariant} custom={i} className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
            {heading2Words.map((w: string, i: number) => (
              <span key={w + i} className="inline-block overflow-hidden align-bottom pr-[0.25em] pb-[0.1em]">
                <motion.span variants={wordVariant} custom={i + heading1Words.length} className="inline-block">
                  <motion.span
                    className="inline-block bg-clip-text text-transparent italic font-medium bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600"
                    style={{ backgroundSize: "200% 100%" }}
                    animate={reduce ? undefined : { backgroundPosition: ["0% 50%", "200% 50%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    {w}
                  </motion.span>
                </motion.span>
              </span>
            ))}
          </h2>
        </motion.div>

        {/* ================= Content Showcase ================= */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Active Article Details */}
          <div className="lg:col-span-7 space-y-5">
            <div className="relative pl-4 sm:pl-5 min-h-[220px]">
              <motion.span
                aria-hidden
                variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.9, delay: 0.5 } } }}
                className="absolute left-0 top-1 bottom-1 w-[3.5px] origin-top rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePost.id}
                  variants={detailParent}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="space-y-3"
                >
                  <motion.div variants={detailChild} className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs font-bold uppercase tracking-wider">
                      {activePost.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                      Official Dispatch
                    </span>
                  </motion.div>

                  <motion.h3
                    variants={detailChild}
                    className="font-serif font-bold text-slate-900 tracking-tight text-2xl sm:text-3xl lg:text-4xl leading-snug"
                  >
                    {activePost.title}
                  </motion.h3>

                  <motion.p
                    variants={detailChild}
                    className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal"
                  >
                    {activePost.summary}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Post Selector Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              {posts.map((p: any, i: number) => {
                const active = i === activeIndex;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveIndex(i)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                      active
                        ? "bg-[#07182b] text-[#d4af37] shadow-sm"
                        : "bg-sky-50 text-slate-600 hover:bg-sky-100 hover:text-slate-900 border border-sky-200"
                    }`}
                  >
                    0{i + 1}
                  </button>
                );
              })}
            </div>

            {/* Action CTA */}
            <div className="pt-3">
              <Link
                href={data.viewAllLink}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 pl-7 pr-2 py-2 text-sm sm:text-base font-bold text-slate-950 shadow-md transition-transform duration-200 hover:scale-[1.03]"
              >
                <span className="relative">{data.viewAllBtnText}</span>
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 text-amber-300 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right: Arch Image Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[400px]">
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
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activePost.id}
                    initial={{ clipPath: reduce ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    exit={{ opacity: 0, transition: { delay: 0.8, duration: 0.1 } }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0"
                  >
                    <motion.img
                      src={activePost.image}
                      alt={activePost.title}
                      initial={{ scale: reduce ? 1.05 : 1.25 }}
                      animate={{ scale: 1.05 }}
                      transition={{ duration: 6, ease: "linear" }}
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}