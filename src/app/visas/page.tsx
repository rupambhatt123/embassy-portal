"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Plane,
  Building,
  Award,
  TrendingUp,
  ArrowRight,
  Clock,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import PageBanner from "@/components/PageBanner";
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

function Ticker({ text, className, stroke, reverse, reduce }: { text: string; className: string; stroke: string; reverse?: boolean; reduce: boolean }) {
  const content = text.repeat(4);
  return (
    <div className={`absolute left-0 w-full overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex font-serif font-black text-[88px] sm:text-[120px] leading-none select-none"
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

function AnimatedBackground({ reduce, routeA, routeB, tickerText }: { reduce: boolean; routeA: string; routeB: string; tickerText: string }) {
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

      <Ticker text={tickerText} className="top-[30%]" stroke="rgba(2,132,199,0.14)" reduce={reduce} />
      <Ticker text={tickerText} className="bottom-[6%]" stroke="rgba(217,119,6,0.20)" reverse reduce={reduce} />

      <FlightRoute path={routeA} top="12%" duration={24} delay={0} reduce={reduce} />
      <FlightRoute path={routeB} top="52%" duration={28} delay={4} reduce={reduce} />

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
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function VisaPage() {
  const reduce = !!useReducedMotion();

  // 100% Strict JSON Data Connection
  const data = (websiteData as any).categories.DiplomaticMission.sections.VisaPage.variants.DiplomaticVisaPage1;
  const banner = data.banner;
  const allVisas = data.visas;

  const headingWords = data.headingLine1.split(" ");

  return (
    <div className="relative w-full font-sans pb-20 bg-gradient-to-b from-[#f0f9ff] via-white to-[#fffaf0] overflow-hidden">
      <AnimatedBackground
        reduce={reduce}
        routeA={data.routes.routeA}
        routeB={data.routes.routeB}
        tickerText={data.ticker}
      />

      <div className="relative z-10">
        <PageBanner
          title={banner.title}
          description={banner.description}
          bgImage={banner.bgImage}
          breadcrumbs={banner.breadcrumbs}
        />

        <div className="max-w-[1300px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* ================= Intro ================= */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-12 text-center max-w-3xl mx-auto"
          >
            <motion.div variants={fadeUp} custom={-2} className="flex items-center justify-center gap-3 mb-3">
              <motion.span
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } } }}
                className="block h-[2px] w-10 origin-right bg-gradient-to-l from-amber-500 to-transparent"
              />
              <span className="flex items-center gap-1.5 text-sm font-semibold text-sky-800">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                {data.badge}
              </span>
              <motion.span
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8 } } }}
                className="block h-[2px] w-10 origin-left bg-gradient-to-r from-amber-500 to-transparent"
              />
            </motion.div>

            <h2 className="font-serif font-bold text-slate-800 tracking-tight leading-[1.1] text-3xl sm:text-4xl lg:text-5xl">
              {headingWords.map((w: string, i: number) => (
                <span key={w + i} className="inline-block overflow-hidden align-bottom pr-[0.25em] pb-[0.1em]">
                  <motion.span variants={wordVariant} custom={i} className="inline-block">
                    {w}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block overflow-hidden align-bottom pb-[0.1em]">
                <motion.span variants={wordVariant} custom={headingWords.length} className="inline-block">
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
          </motion.div>

          {/* ================= Visa list ================= */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-4">
            {allVisas.map((item: any, idx: number) => {
              const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] || Plane;
              return (
                <motion.article
                  key={item.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  className="group relative py-8"
                >
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-100/60 via-sky-100/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                    {/* Round photo with link to slug */}
                    <Link href={`/visas/${item.slug}`} className="block relative w-44 h-44 sm:w-48 sm:h-48 shrink-0 cursor-pointer">
                      <span
                        aria-hidden
                        className="absolute -left-4 -top-7 z-0 font-serif font-black leading-none text-[78px] text-transparent select-none transition-transform duration-700 group-hover:-translate-y-2"
                        style={{ WebkitTextStroke: "1.5px rgba(217,119,6,0.5)" }}
                      >
                        {String(item.id).padStart(2, "0")}
                      </span>

                      <motion.svg
                        aria-hidden
                        viewBox="0 0 200 200"
                        className="absolute -inset-3 w-[calc(100%+1.5rem)] h-[calc(100%+1.5rem)] opacity-70"
                        animate={reduce ? undefined : { rotate: idx % 2 ? -360 : 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      >
                        <circle cx="100" cy="100" r="96" fill="none" stroke="#38bdf8" strokeOpacity="0.5" strokeDasharray="3 8" />
                        <circle cx="100" cy="4" r="4" fill="#f59e0b" />
                      </motion.svg>

                      <motion.div
                        animate={reduce ? undefined : { y: [0, -7, 0] }}
                        transition={{ duration: 6 + (idx % 3), repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                        className="relative z-10 w-full h-full"
                      >
                        <div className="relative w-full h-full overflow-hidden rounded-full bg-slate-900 ring-4 ring-white shadow-[0_25px_50px_-20px_rgba(12,74,110,0.5)] transition-shadow duration-500 group-hover:shadow-[0_30px_55px_-18px_rgba(217,119,6,0.55)]">
                          <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-110">
                            <motion.img
                              src={item.image}
                              alt={item.title}
                              initial={{ scale: reduce ? 1 : 1.3 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent pointer-events-none" />
                        </div>

                        <span className="absolute bottom-1 right-1 flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 ring-4 ring-white shadow-[0_10px_25px_-6px_rgba(245,158,11,0.8)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                          <Icon className="w-5 h-5" />
                        </span>
                      </motion.div>
                    </Link>

                    {/* Text Details */}
                    <div className="min-w-0 flex-1 text-center sm:text-left">
                      <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-sky-700">
                        {item.tag}
                      </motion.p>

                      <motion.h3
                        variants={fadeUp}
                        custom={1}
                        className="mt-1 font-serif font-black leading-[1.05] text-3xl sm:text-4xl text-transparent"
                        style={{ WebkitTextStroke: "1.5px #d97706" }}
                      >
                        {item.code}
                      </motion.h3>

                      <motion.h4
                        variants={fadeUp}
                        custom={2}
                        className="mt-2 font-serif font-bold text-slate-900 text-lg sm:text-xl leading-snug transition-colors duration-300 group-hover:text-amber-600"
                      >
                        <Link href={`/visas/${item.slug}`}>
                          {item.title}
                        </Link>
                      </motion.h4>

                      <motion.p variants={fadeUp} custom={3} className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </motion.p>

                      <motion.div
                        variants={fadeUp}
                        custom={4}
                        className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm font-semibold"
                      >
                        <span className="flex items-center gap-1.5 text-emerald-700">
                          <DollarSign className="w-4 h-4" />
                          {item.fee}
                        </span>
                        <span className="h-4 w-px bg-sky-200 hidden sm:block" />
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <Clock className="w-4 h-4 text-sky-500" />
                          {item.validity}
                        </span>
                      </motion.div>

                      {/* Working Link Button */}
                      <motion.div variants={fadeUp} custom={5} className="mt-5">
                        <Link
                          href={`/visas/${item.slug}`}
                          className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 pl-6 pr-2 py-2 text-sm font-bold text-slate-950 shadow-[0_12px_30px_-10px_rgba(217,119,6,0.7)] transition-transform duration-300 hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
                        >
                          <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 blur-sm transition-transform duration-700 group-hover/btn:translate-x-[450%]" />
                          <span className="relative">{data.actionBtnText}</span>
                          <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-slate-950 text-amber-300 transition-transform duration-300 group-hover/btn:translate-x-1">
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  </div>

                  <motion.span
                    aria-hidden
                    variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, delay: 0.4 } } }}
                    className="absolute left-0 right-0 bottom-0 h-px origin-left bg-gradient-to-r from-transparent via-sky-300 to-transparent"
                  />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}