"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { Plus } from "lucide-react";
import websiteData from "@/data/websiteData.json";

/* ---------- Animated background: floating question marks ---------- */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left: (i * 47 + 5) % 100,
  top: (i * 31 + 13) % 100,
  size: 3 + (i % 3) * 2,
  dur: 4 + (i % 5) * 1.3,
  delay: (i % 7) * 0.6,
  amber: i % 3 === 0,
}));

const QUESTION_MARKS = [
  { left: "4%", top: "10%", size: 150, dur: 9, amber: false },
  { left: "88%", top: "6%", size: 110, dur: 11, amber: true },
  { left: "46%", top: "52%", size: 90, dur: 13, amber: false },
  { left: "92%", top: "58%", size: 160, dur: 10, amber: false },
  { left: "2%", top: "66%", size: 120, dur: 12, amber: true },
  { left: "70%", top: "88%", size: 100, dur: 14, amber: false },
];

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

      {QUESTION_MARKS.map((q, i) => (
        <motion.span
          key={i}
          className="absolute hidden sm:block font-serif font-black leading-none select-none"
          style={{
            left: q.left,
            top: q.top,
            fontSize: q.size,
            color: "transparent",
            WebkitTextStroke: `1.5px ${q.amber ? "rgba(217,119,6,0.28)" : "rgba(2,132,199,0.22)"}`,
          }}
          animate={reduce ? undefined : { y: [0, -34, 0], rotate: [-10, 10, -10] }}
          transition={{ duration: q.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
        >
          ?
        </motion.span>
      ))}

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

const rowVariant: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FaqRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: any;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.li variants={rowVariant} custom={index} className="relative group">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-100/70 via-sky-100/30 to-transparent"
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
      <motion.span
        aria-hidden
        className="absolute left-0 top-2 bottom-2 w-[3px] origin-top rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
        animate={{ scaleY: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="relative w-full flex items-start gap-4 py-4 pl-4 pr-2 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
      >
        <motion.span
          className="font-serif text-2xl font-bold leading-none tabular-nums pt-0.5 shrink-0 w-9"
          animate={{ color: isOpen ? "#d97706" : "#7dd3fc", x: isOpen ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {String(item.id).padStart(2, "0")}
        </motion.span>

        <span
          className={`flex-1 text-sm sm:text-base font-semibold leading-snug transition-all duration-300 ${
            isOpen ? "text-slate-900" : "text-slate-700 group-hover:text-sky-700 group-hover:translate-x-1"
          }`}
        >
          {item.question}
        </span>

        <motion.span
          className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-colors duration-300 ${
            isOpen
              ? "bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-[0_8px_20px_-6px_rgba(217,119,6,0.7)]"
              : "bg-sky-100/80 text-sky-700 group-hover:bg-amber-100 group-hover:text-amber-700"
          }`}
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <motion.p
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="pl-[3.75rem] pr-12 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed"
            >
              {item.answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.span
        aria-hidden
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.9, delay: 0.3 + index * 0.08 } },
        }}
        className="absolute left-0 right-0 bottom-0 h-px origin-left bg-sky-200"
      />
      <span
        aria-hidden
        className={`absolute left-0 bottom-0 h-px bg-amber-500 transition-all duration-500 ${
          isOpen ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </motion.li>
  );
}

export default function FaqsView() {
  const reduce = !!useReducedMotion();
  const [openId, setOpenId] = useState<number | null>(null);

  // 100% Strict JSON Data Connection
  const data = (websiteData as any).categories.DiplomaticMission.sections.FAQ.variants.DiplomaticFAQ1;
  const faqItems = data.items;

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  const half = Math.ceil(faqItems.length / 2);
  const leftColumn = faqItems.slice(0, half);
  const rightColumn = faqItems.slice(half);

  const line1Words = data.headingLine1.split(" ");

  return (
    <section
      id="faqs"
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-10 sm:py-12 px-5 sm:px-8 lg:px-14 flex flex-col justify-center items-center bg-gradient-to-b from-[#eaf4fc] via-white to-[#fffaf0] overflow-hidden"
    >
      <AnimatedBackground reduce={reduce} />

      <div className="relative z-10 w-full max-w-[1300px] mx-auto">
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
            <span className="text-sm font-semibold text-sky-800">{data.badge}</span>
            <motion.span
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } } }}
              className="block h-[2px] w-10 origin-left bg-gradient-to-r from-amber-500 to-transparent"
            />
          </motion.div>

          <h2 className="font-serif font-bold text-slate-800 tracking-tight leading-[1.1] text-3xl sm:text-4xl lg:text-5xl">
            {line1Words.map((w: string, i: number) => (
              <span key={w + i} className="inline-block overflow-hidden align-bottom pr-[0.25em] pb-[0.08em]">
                <motion.span variants={wordVariant} custom={i} className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden align-bottom pb-[0.1em]">
              <motion.span variants={wordVariant} custom={line1Words.length} className="inline-block">
                <motion.span
                  className="inline-block bg-clip-text text-transparent italic font-medium bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={reduce ? undefined : { backgroundPosition: ["0% 50%", "200% 50%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  {data.headingHighlight}
                </motion.span>
              </motion.span>
            </span>
          </h2>

          <motion.p variants={fadeUp} custom={3} className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            {data.description}
          </motion.p>
        </motion.div>

        {/* ================= Two open columns ================= */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-x-14 items-start">
          {[leftColumn, rightColumn].map((column, ci) => (
            <motion.ul
              key={ci}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="relative"
            >
              {column.map((item: any, i: number) => (
                <FaqRow
                  key={item.id}
                  item={item}
                  index={i}
                  isOpen={openId === item.id}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </motion.ul>
          ))}
        </div>
      </div>
    </section>
  );
}