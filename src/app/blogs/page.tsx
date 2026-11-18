"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import websiteData from "@/data/websiteData.json";

/* ---------- Animated background (Optimized for performance) ---------- */
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 47 + 5) % 100,
  top: (i * 31 + 13) % 100,
  size: 3 + (i % 3) * 2,
  dur: 6 + (i % 5) * 1.5,
  delay: (i % 7) * 0.6,
  amber: i % 3 === 0,
}));

function AnimatedBackground({ reduce }: { reduce: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#0284c7_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute left-1/2 top-[40%] w-[900px] h-[900px] -ml-[450px] -mt-[450px] rounded-full opacity-30 blur-3xl bg-sky-200/50" />
      
      {!reduce && PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full ${p.amber ? "bg-amber-400" : "bg-sky-400"}`}
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
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
    transition: { duration: 0.5, delay: 0.03 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const textIn = (dir: number): Variants => ({
  hidden: { opacity: 0, x: 20 * dir },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
});

const BLOBS = [
  "rounded-[58%_42%_55%_45%/50%_55%_45%_50%]",
  "rounded-[42%_58%_45%_55%/55%_45%_55%_45%]",
];

export default function BlogsPage() {
  const reduce = !!useReducedMotion();

  // 100% Strict JSON Data Connection[cite: 14]
  const data = (websiteData as any).categories.DiplomaticMission.sections.BlogsPage.variants.DiplomaticBlogsPage1;
  const allBlogs = data.blogs || [];

  const headingWords = data.headingLine1.split(" ");
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeBlog = allBlogs[currentSlide] || allBlogs[0];

  return (
    <div className="relative w-full font-sans pb-20 bg-gradient-to-b from-[#f0f9ff] via-white to-[#fffaf0] overflow-hidden">
      <AnimatedBackground reduce={reduce} />

      <div className="relative z-10">
        <PageBanner
          title={data.banner.title}
          breadcrumbs={data.banner.breadcrumbs}
        />

        <div className="max-w-[1300px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* ================= Intro ================= */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-12 text-center max-w-3xl mx-auto px-2"
          >
            <motion.div variants={fadeUp} custom={-2} className="flex items-center justify-center gap-3 mb-3">
              <span className="block h-[2px] w-10 bg-gradient-to-l from-amber-500 to-transparent" />
              <span className="text-sm font-semibold text-sky-800">{data.badge}</span>
              <span className="block h-[2px] w-10 bg-gradient-to-r from-amber-500 to-transparent" />
            </motion.div>

            <h2 className="font-serif font-bold text-slate-800 tracking-tight leading-[1.2] text-3xl sm:text-4xl lg:text-5xl">
              {headingWords.map((w: string, i: number) => (
                <span key={w + i} className="inline-block overflow-hidden align-bottom pr-[0.25em] pb-[0.08em]">
                  <motion.span variants={wordVariant} custom={i} className="inline-block">
                    {w}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block overflow-hidden align-bottom pr-[0.35em] pb-[0.15em] mx-[0.05em]">
                <motion.span variants={wordVariant} custom={headingWords.length} className="inline-block">
                  <span className="inline-block bg-clip-text text-transparent italic font-medium bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 px-1">
                    {data.headingHighlight}
                  </span>
                </motion.span>
              </span>
            </h2>
          </motion.div>

          {/* ================= MOBILE SLIDER / CAROUSEL VIEW ================= */}
          <div className="mt-10 lg:hidden">
            <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-sky-100">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-900 mb-4 shadow-md">
                <img
                  src={activeBlog.image}
                  alt={activeBlog.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-sm text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                  {activeBlog.category}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-sky-800 mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  {activeBlog.dateDay} {activeBlog.dateMonth} {activeBlog.year}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  {activeBlog.readTime}
                </span>
              </div>

              <h3 className="font-serif font-bold text-slate-900 text-lg leading-snug">{activeBlog.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">{activeBlog.description}</p>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 truncate max-w-[150px]">
                  {activeBlog.author}
                </span>
                <Link
                  href={`/blogs/${activeBlog.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 shrink-0"
                >
                  <span>{data.readDispatchBtnText || "Read More"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Dots Indicator */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {allBlogs.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? "w-8 bg-amber-500" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ================= DESKTOP EDITORIAL ROWS (Hidden on mobile) ================= */}
          <div className="mt-14 hidden lg:block">
            {allBlogs.map((item: any, idx: number) => {
              const reversed = idx % 2 === 1;
              const dir = reversed ? -1 : 1;
              const tv = textIn(dir);

              return (
                <motion.article
                  key={item.slug}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="group relative py-10 sm:py-12"
                >
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-100/60 via-sky-100/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    {/* ---------- Image ---------- */}
                    <div className={`lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}>
                      <div className="relative mx-auto w-full max-w-[400px]">
                        <span
                          aria-hidden
                          className={`absolute -top-8 ${reversed ? "-right-4" : "-left-4"} z-0 font-serif font-black leading-none text-[120px] text-transparent select-none transition-transform duration-500 group-hover:-translate-y-1`}
                          style={{ WebkitTextStroke: "1.5px rgba(217,119,6,0.5)" }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>

                        <div className="relative z-10">
                          <div
                            className={`relative aspect-[5/4] w-full overflow-hidden bg-slate-900 ring-4 ring-white shadow-[0_28px_55px_-20px_rgba(12,74,110,0.5)] transition-shadow duration-500 group-hover:shadow-[0_35px_65px_-18px_rgba(217,119,6,0.55)] ${BLOBS[idx % 2]}`}
                          >
                            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover object-center"
                              />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ---------- Text ---------- */}
                    <div className={`lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}>
                      <motion.p variants={tv} custom={0} className="flex items-center gap-2 text-sm font-semibold text-sky-800">
                        <span className="block h-[2px] w-8 bg-gradient-to-r from-amber-500 to-sky-500" />
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        {item.category}
                      </motion.p>

                      <motion.h3
                        variants={tv}
                        custom={1}
                        className="mt-2 font-serif font-bold text-slate-900 tracking-tight leading-[1.15] text-2xl sm:text-3xl lg:text-4xl transition-colors duration-300 group-hover:text-amber-600"
                      >
                        {item.title}
                      </motion.h3>

                      <motion.p variants={tv} custom={2} className="mt-1 text-sm font-semibold text-slate-400">
                        {item.author}
                      </motion.p>

                      <motion.div variants={tv} custom={3} className="relative mt-4 pl-5 max-w-xl">
                        <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400" />
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{item.description}</p>
                      </motion.div>

                      <motion.div variants={tv} custom={4} className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold">
                        <span className="flex items-center gap-2 text-emerald-700">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600">
                            <Calendar className="w-4 h-4" />
                          </span>
                          {item.dateDay} {item.dateMonth} {item.year}
                        </span>
                        <span className="h-5 w-px bg-sky-200 hidden sm:block" />
                        <span className="flex items-center gap-2 text-sky-700">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-sky-100 to-sky-50 text-sky-600">
                            <Clock className="w-4 h-4" />
                          </span>
                          {item.readTime}
                        </span>
                      </motion.div>

                      <motion.div variants={tv} custom={5} className="mt-6">
                        <Link
                          href={`/blogs/${item.slug}`}
                          className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 pl-6 pr-2 py-2 text-sm font-bold text-slate-950 shadow-[0_12px_30px_-10px_rgba(217,119,6,0.7)] transition-transform duration-300 hover:scale-[1.04]"
                        >
                          <span className="relative">{data.readDispatchBtnText}</span>
                          <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-slate-950 text-amber-300 transition-transform duration-300 group-hover/btn:translate-x-1">
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  </div>

                  {idx < allBlogs.length - 1 && (
                    <span className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}