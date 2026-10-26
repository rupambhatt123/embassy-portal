"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import websiteData from "@/data/websiteData.json";

/* ---------- Embers (deterministic, so SSR matches the client) ---------- */
const EMBERS = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 41 + 9) % 100,
  top: 40 + ((i * 29) % 60),
  size: 2 + (i % 3) * 2,
  dur: 6 + (i % 6) * 1.4,
  delay: (i % 9) * 0.7,
  gold: i % 4 !== 0,
}));

/* ---------- Headline letter animation ---------- */
const lineVariants: Variants = {
  hidden: {},
  show: (base: number) => ({ transition: { staggerChildren: 0.035, delayChildren: base } }),
  exit: { transition: { staggerChildren: 0.012, staggerDirection: -1 } },
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 46, rotateX: -80, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: -24, filter: "blur(8px)", transition: { duration: 0.35 } },
};

function AnimatedLine({
  text,
  base,
  className,
  style,
}: {
  text: string;
  base: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.span
      variants={lineVariants}
      custom={base}
      className={`block ${className ?? ""}`}
      style={{ perspective: 800, ...style }}
    >
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap mr-[0.28em]">
          {word.split("").map((ch, ci) => (
            <motion.span key={ci} variants={charVariants} className="inline-block will-change-transform">
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

export default function HeroSection() {
  const reduce = !!useReducedMotion();

  // 100% Strict JSON Data Connection
  const data = (websiteData as any).categories.DiplomaticMission.sections.Banner.variants.DiplomaticBanner1;
  const slides = data.slides;

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setCurrentSlide((p) => (p + 1) % slides.length), data.slideMs);
    return () => clearTimeout(t);
  }, [currentSlide, slides.length, data.slideMs]);

  const slide = slides[currentSlide];
  const loop = (dur: number) => ({ duration: dur, repeat: Infinity, ease: "easeInOut" as const });

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#07182b] pt-36 sm:pt-44 pb-24">
      {/* ================= Photos: circular reveal + Ken Burns ================= */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          initial={{ clipPath: reduce ? "circle(150% at 78% 50%)" : "circle(0% at 78% 50%)" }}
          animate={{ clipPath: "circle(150% at 78% 50%)" }}
          exit={{ opacity: 0, transition: { delay: 1.7, duration: 0.1 } }}
          transition={{ duration: 1.7, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0"
        >
          <motion.img
            src={slide.image}
            alt={slide.titleLine1}
            initial={{ scale: reduce ? 1.05 : 1.28 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 9, ease: "linear" }}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* ================= Overlays & ambient animation ================= */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#07182b]/95 via-[#07182b]/75 to-[#07182b]/30" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#07182b] to-transparent" />

        {/* Drifting dot grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#00c4d6_1px,transparent_1px)] [background-size:28px_28px]"
          animate={reduce ? undefined : { backgroundPosition: ["0px 0px", "28px 28px"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />

        {/* Aurora glows */}
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

        {/* Sweeping light beams */}
        {!reduce &&
          [0, 7].map((delay) => (
            <motion.div
              key={delay}
              className="absolute -top-[20%] h-[140%] w-28 rotate-[22deg] bg-gradient-to-b from-transparent via-cyan-200/15 to-transparent blur-2xl"
              initial={{ left: "-15%" }}
              animate={{ left: "115%" }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear", delay }}
            />
          ))}

        {/* Orbit rings */}
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[720px] h-[720px] hidden lg:block">
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

        {/* Rising embers */}
        {EMBERS.map((e, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-full ${e.gold ? "bg-[#d4af37]" : "bg-cyan-300"}`}
            style={{ left: `${e.left}%`, top: `${e.top}%`, width: e.size, height: e.size }}
            animate={reduce ? { opacity: 0.35 } : { y: [0, -220], opacity: [0, 0.9, 0] }}
            transition={{ duration: e.dur, repeat: Infinity, ease: "easeOut", delay: e.delay }}
          />
        ))}
      </div>

      {/* ================= Headline ================= */}
      <div className="relative z-10 max-w-[1700px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={slide.id}
              initial="hidden"
              animate="show"
              exit="exit"
              className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-white leading-[1.12] tracking-tight drop-shadow-xl"
            >
              <AnimatedLine text={slide.titleLine1} base={0.35} />
              <AnimatedLine
                text={slide.titleHighlight}
                base={0.75}
                className="text-[#d4af37] italic font-bold"
                style={{ textShadow: "0 0 40px rgba(212,175,55,0.35)" }}
              />

              <motion.span
                aria-hidden
                variants={{
                  hidden: { scaleX: 0, opacity: 0 },
                  show: { scaleX: 1, opacity: 1, transition: { duration: 1.1, delay: 1.5, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="mt-5 block h-[3px] w-40 sm:w-56 origin-left rounded-full bg-gradient-to-r from-[#d4af37] via-amber-300 to-transparent"
              />
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}