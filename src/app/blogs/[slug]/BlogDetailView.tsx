"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Calendar,
  Check,
  Clock,
  FileText,
  Share2,
  ShieldCheck,
  User,
} from "lucide-react";
import PageBanner from "@/components/PageBanner";

/* ================= Animated newsroom background ================= */
const TICKER_A = "Press bulletins  •  Travel advisories  •  Policy updates  •  Bilateral news  •  ";
const TICKER_B = "Official communiqués  •  Consular notices  •  Strategic dialogue  •  ";

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 47 + 5) % 100,
  top: (i * 31 + 13) % 100,
  size: 3 + (i % 3) * 2,
  dur: 4 + (i % 5) * 1.3,
  delay: (i % 7) * 0.6,
  amber: i % 3 === 0,
}));

function Ticker({ text, className, stroke, reverse, reduce }: { text: string; className: string; stroke: string; reverse?: boolean; reduce: boolean }) {
  const content = text.repeat(4);
  return (
    <div className={`absolute left-0 w-full overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex font-serif font-black text-[50px] sm:text-[120px] leading-none select-none"
        style={{ color: "transparent", WebkitTextStroke: `1px ${stroke}` }}
        animate={reduce ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
      >
        <span>{content}</span>
        <span>{content}</span>
      </motion.div>
    </div>
  );
}

function NewsBackground() {
  const reduce = !!useReducedMotion();
  const loop = (dur: number) => ({ duration: dur, repeat: Infinity, ease: "easeInOut" as const });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(#0284c7_1px,transparent_1px)] [background-size:28px_28px]"
        animate={reduce ? undefined : { backgroundPosition: ["0px 0px", "28px 28px"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute left-1/2 top-[35%] w-[800px] sm:w-[1100px] h-[800px] sm:h-[1100px] -ml-[400px] sm:-ml-[550px] -mt-[400px] sm:-mt-[550px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(125,211,252,0.55), rgba(255,255,255,0) 25%, rgba(252,211,77,0.5) 50%, rgba(255,255,255,0) 75%, rgba(125,211,252,0.55))",
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />

      <Ticker text={TICKER_A} className="top-[24%]" stroke="rgba(2,132,199,0.14)" reduce={reduce} />
      <Ticker text={TICKER_B} className="bottom-[6%]" stroke="rgba(217,119,6,0.20)" reverse reduce={reduce} />

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

/* ================= Motion variants ================= */
const wordVariant: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, delay: 0.05 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
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

const titleCase = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

export default function BlogDetailView({ blog, allBlogsData, data, deskSection, slug }: { blog: any; allBlogsData: any[]; data: any; deskSection: any; slug: string }) {  const reduce = !!useReducedMotion();

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    try {
      setSaved(localStorage.getItem(`dispatch-bookmark:${slug}`) === "1");
    } catch {
      /* ignore */
    }
  }, [slug]);

  const relatedBlogs = allBlogsData.filter((b: any) => b.slug !== slug).slice(0, 2);
  const dateLabel = `${blog.dateDay} ${titleCase(blog.dateMonth)} ${blog.year}`;

  const toggleSave = () => {
    const next = !saved;
    setSaved(next);
    try {
      if (next) localStorage.setItem(`dispatch-bookmark:${slug}`, "1");
      else localStorage.removeItem(`dispatch-bookmark:${slug}`);
    } catch {
      /* ignore */
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: blog.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* ignore */
    }
  };

  return (
    <main className="relative w-full max-w-[100vw] min-h-screen font-sans pb-20 bg-gradient-to-b from-[#eaf4fc] via-white to-[#fffaf0] overflow-hidden">
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-amber-400 via-amber-500 to-sky-400"
        style={{ scaleX: progress }}
      />

      <NewsBackground />

      <div className="relative z-10">
        <PageBanner
          title={blog.title}
          bgImage={blog.image}
          breadcrumbs={[
            { label: "Blogs", href: "/blogs" },
            { label: blog.title },
          ]}
        />

        <div className="max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8">
          <motion.div variants={slideIn} initial="hidden" animate="show" custom={0}>
            <Link
              href={data.backBtnHref}
              className="group relative inline-flex items-center gap-2 pb-1 text-xs sm:text-sm font-semibold text-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
            >
              <ArrowLeft className="w-4 h-4 text-amber-500 transition-transform duration-300 group-hover:-translate-x-1" />
              {data.backBtnText}
              <span className="absolute left-0 bottom-0 h-px w-full bg-sky-200" />
              <span className="absolute left-0 bottom-0 h-px w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
            </Link>
          </motion.div>

          <header className="mt-4 sm:mt-6">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="flex items-center gap-3 mb-3">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
                className="block h-[2px] w-10 sm:w-12 origin-left bg-gradient-to-r from-amber-500 to-sky-500"
              />
              <span className="text-xs sm:text-sm font-semibold text-amber-600">{blog.category}</span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              className="font-serif font-bold text-slate-800 tracking-tight leading-[1.15] text-2xl xs:text-3xl sm:text-4xl lg:text-6xl max-w-5xl"
            >
              {blog.title.split(" ").map((w: string, i: number) => (
                <span key={w + i} className="inline-block overflow-hidden align-bottom pr-[0.2em] sm:pr-[0.25em] pb-[0.1em]">
                  <motion.span variants={wordVariant} custom={i} className="inline-block">
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
              className="mt-4 sm:mt-5 block h-[3px] w-32 sm:w-56 origin-left rounded-full bg-gradient-to-r from-[#d4af37] via-amber-300 to-transparent"
            />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={7}
              className="mt-5 sm:mt-6 flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-sky-100 to-sky-50 text-sky-600 shrink-0">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <div>
                  <p className="font-bold text-slate-900">{blog.author}</p>
                  <p className="text-[11px] sm:text-xs font-medium text-slate-500">{data.authorSubtitle}</p>
                </div>
              </div>

              <span className="flex items-center gap-2 font-semibold text-slate-600">
                <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 shrink-0">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
                {dateLabel}
              </span>
              <span className="flex items-center gap-2 font-semibold text-slate-600">
                <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600 shrink-0">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
                {blog.readTime}
              </span>
            </motion.div>
          </header>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <article className="lg:col-span-8 w-full min-w-0">
              <div className="relative w-full">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900 ring-2 sm:ring-4 ring-white shadow-xl rounded-xl sm:rounded-2xl"
                >
                  <motion.img
                    src={blog.image}
                    alt={blog.title}
                    initial={{ scale: reduce ? 1 : 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </div>

              <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
                {blog.content.map((paragraph: string, i: number) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-sm sm:text-lg text-slate-700 leading-[1.8] sm:leading-[1.85] ${
                      i === 0
                        ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:font-bold first-letter:text-5xl sm:first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-amber-600"
                        : ""
                    }`}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <section className="mt-10 sm:mt-12">
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.6 }}
                  className="mb-4"
                >
                  <h2 className="flex items-center gap-3 font-serif font-bold text-slate-800 text-xl sm:text-3xl">
                    <span className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 shadow-md shrink-0">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                    {data.keyDirectivesTitle}
                  </h2>
                  <motion.span
                    aria-hidden
                    variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, delay: 0.2 } } }}
                    className="mt-3 block h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-amber-400 via-sky-300 to-transparent"
                  />
                </motion.div>

                <motion.ul initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
                  {blog.bulletPoints.map((pt: string, i: number) => (
                    <motion.li key={i} variants={slideIn} custom={i} className="group relative py-3 sm:py-3.5">
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-100/70 via-sky-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative flex items-start gap-3 pl-1 transition-transform duration-300 group-hover:translate-x-1">
                        <motion.span
                          variants={{
                            hidden: { scale: 0, rotate: -90 },
                            show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 380, damping: 16, delay: 0.25 + i * 0.09 } },
                          }}
                          className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full shrink-0 mt-0.5 bg-gradient-to-br from-sky-400 to-cyan-500 text-white transition-all duration-300 group-hover:from-amber-400 group-hover:to-amber-500 group-hover:text-slate-950"
                        >
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                        </motion.span>
                        <span className="text-xs sm:text-base text-slate-700 leading-relaxed">{pt}</span>
                      </div>
                      <span className="absolute left-0 right-0 bottom-0 h-px bg-sky-200" />
                      <span className="absolute left-0 bottom-0 h-px w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                    </motion.li>
                  ))}
                </motion.ul>
              </section>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                className="relative mt-10 sm:mt-12 pt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4"
              >
                <motion.span
                  aria-hidden
                  variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1 } } }}
                  className="absolute left-0 right-0 top-0 h-px origin-left bg-gradient-to-r from-sky-300 via-sky-200 to-transparent"
                />

                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <motion.button
                    variants={fadeUp}
                    custom={0}
                    type="button"
                    onClick={handleShare}
                    className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-sky-800 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
                  >
                    <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 transition-all duration-300 group-hover:from-amber-300 group-hover:to-amber-500 group-hover:text-slate-950 group-hover:scale-110 shrink-0">
                      <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                          <motion.span key="ok" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                            <Check className="w-4 h-4 stroke-[3]" />
                          </motion.span>
                        ) : (
                          <motion.span key="share" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Share2 className="w-4 h-4" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span aria-live="polite">{copied ? data.shareCopiedText : data.shareText}</span>
                  </motion.button>

                  <motion.button
                    variants={fadeUp}
                    custom={1}
                    type="button"
                    onClick={toggleSave}
                    aria-pressed={saved}
                    className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-sky-800 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
                  >
                    <motion.span
                      animate={saved ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-300 shrink-0 ${
                        saved
                          ? "bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 shadow-md"
                          : "bg-gradient-to-br from-sky-100 to-sky-50 text-sky-600 group-hover:scale-110"
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
                    </motion.span>
                    {saved ? data.bookmarkedText : data.bookmarkText}
                  </motion.button>
                </div>

                <motion.div variants={fadeUp} custom={2}>
                  <Link
                    href={data.allFeedsHref}
                    className="group relative inline-flex items-center gap-2 pb-1 text-xs sm:text-sm font-bold text-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500"
                  >
                    {data.allFeedsText}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    <span className="absolute left-0 bottom-0 h-px w-full bg-amber-200" />
                    <span className="absolute left-0 bottom-0 h-px w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                  </Link>
                </motion.div>
              </motion.div>
            </article>

            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 lg:sticky lg:top-24 space-y-8 sm:space-y-10 w-full"
            >
              <div className="relative pl-4 sm:pl-6">
                <motion.span
                  aria-hidden
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="absolute left-0 top-0 bottom-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
                />

                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                    <motion.svg
                      aria-hidden
                      viewBox="0 0 56 56"
                      className="absolute inset-0 w-full h-full"
                      animate={reduce ? undefined : { rotate: 360 }}
                      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    >
                      <circle cx="28" cy="28" r="26" fill="none" stroke="#f59e0b" strokeOpacity="0.6" strokeDasharray="3 6" />
                      <circle cx="28" cy="2" r="3" fill="#f59e0b" />
                    </motion.svg>
                    <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold text-slate-800">{deskSection.title}</h3>
                </div>

                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {deskSection.description}
                </p>

                <motion.ul initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mt-2">
                  {deskSection.rows.map((row: any, i: number) => (
                    <motion.li key={row.label} variants={fadeUp} custom={i} className="group relative py-3">
                      <p className="text-[11px] sm:text-xs font-semibold text-slate-500">{row.label}</p>
                      <p className={`font-serif text-sm sm:text-base font-bold leading-snug ${row.tone}`}>{row.value}</p>
                      <span className="absolute left-0 right-0 bottom-0 h-px bg-sky-200" />
                      <span className="absolute left-0 bottom-0 h-px w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                    </motion.li>
                  ))}
                </motion.ul>

       <div className="mt-5">
                  <Link
                    href={deskSection.ctaHref}
                    className="group/btn relative inline-flex items-center justify-center sm:justify-start gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 pl-6 pr-2 py-3 sm:py-2 w-full sm:w-auto text-xs sm:text-sm font-bold text-slate-950 shadow-md"
                  >
                    <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 blur-sm transition-transform duration-700 group-hover/btn:translate-x-[450%]" />
                    <span className="relative">{deskSection.ctaText}</span>
                    <span className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-950 text-amber-300 transition-transform duration-300 group-hover/btn:translate-x-1">
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-800">{data.relatedTitle}</h4>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="mt-2 block h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-amber-400 via-sky-300 to-transparent"
                />
                <motion.ul initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                  {relatedBlogs.map((rel: any, i: number) => (
                    <motion.li key={rel.slug} variants={fadeUp} custom={i} className="group relative">
                      <Link
                        href={`/blogs/${rel.slug}`}
                        className="flex items-center gap-3 sm:gap-4 py-3.5 sm:py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                      >
                        <span className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-md">
                          <img
                            src={rel.image}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[11px] sm:text-xs font-semibold text-amber-600">
                            {rel.category} / {rel.dateDay} {titleCase(rel.dateMonth)}
                          </span>
                          <span className="block font-serif text-sm sm:text-base font-bold text-slate-800 leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-amber-600">
                            {rel.title}
                          </span>
                        </span>
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
    </main>
  );
}