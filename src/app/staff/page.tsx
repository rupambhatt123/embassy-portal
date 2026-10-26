"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Mail, Building, ShieldCheck } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import websiteData from "@/data/websiteData.json";

/* ---------- Animated background: mission org-chart orbit theme ---------- */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
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
        className="absolute left-1/2 top-[40%] w-[1100px] h-[1100px] -ml-[550px] -mt-[550px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(125,211,252,0.55), rgba(255,255,255,0) 25%, rgba(252,211,77,0.5) 50%, rgba(255,255,255,0) 75%, rgba(125,211,252,0.55))",
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[10%] -left-24 w-[460px] h-[460px] rounded-full bg-sky-300/40 blur-[110px]"
        animate={reduce ? undefined : { x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
        transition={loop(15)}
      />
      <motion.div
        className="absolute bottom-[4%] -right-24 w-[460px] h-[460px] rounded-full bg-amber-200/60 blur-[110px]"
        animate={reduce ? undefined : { x: [0, -70, 0], y: [0, -50, 0], scale: [1, 1.25, 1] }}
        transition={loop(17)}
      />

      {/* Counter-rotating orbit rings with small satellite dots */}
      <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] hidden lg:block opacity-70">
        <motion.svg
          viewBox="0 0 1100 1100"
          className="absolute inset-0 w-full h-full"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="550" cy="550" r="530" fill="none" stroke="#38bdf8" strokeOpacity="0.30" strokeDasharray="4 12" />
          <circle cx="550" cy="20" r="7" fill="#f59e0b" />
          <circle cx="1030" cy="740" r="5" fill="#0ea5e9" />
        </motion.svg>
        <motion.svg
          viewBox="0 0 1100 1100"
          className="absolute inset-0 w-full h-full"
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="550" cy="550" r="400" fill="none" stroke="#f59e0b" strokeOpacity="0.30" strokeDasharray="2 14" />
          <circle cx="150" cy="550" r="6" fill="#0ea5e9" />
          <circle cx="550" cy="950" r="5" fill="#f59e0b" />
        </motion.svg>
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

export default function StaffPage() {
  const reduce = !!useReducedMotion();

  // 100% Strict JSON Data Connection
  const data = (websiteData as any).categories.DiplomaticMission.sections.StaffPage.variants.DiplomaticStaffPage1;
  const banner = data.banner;
  const staffMembers = data.staffMembers;

  const headingWords = data.headingLine1.split(" ");
  const highlightWords = data.headingHighlight.split(" ");

  return (
    <div className="relative w-full font-sans pb-20 bg-gradient-to-b from-[#f0f9ff] via-white to-[#fffaf0] overflow-hidden">
      <AnimatedBackground reduce={reduce} />

      <div className="relative z-10">
        {/* ================= 1. Page header with breadcrumbs ================= */}
        <PageBanner
          title={banner.title}
          description={banner.description}
          bgImage={banner.bgImage}
          breadcrumbs={banner.breadcrumbs}
        />

        <div className="max-w-[1350px] mx-auto px-5 sm:px-8 lg:px-12">
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
              <span className="text-sm font-semibold text-sky-800">{data.badge}</span>
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
              <span className="block">
                {highlightWords.map((w: string, i: number) => (
                  <span key={w + i} className="inline-block overflow-hidden align-bottom pr-[0.25em] pb-[0.1em]">
                    <motion.span variants={wordVariant} custom={i + headingWords.length} className="inline-block">
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
              </span>
            </h2>
          </motion.div>

          {/* ================= 2. Six members, no cards ================= */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {staffMembers.map((staff: any, idx: number) => (
              <motion.article
                key={staff.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className={`group relative flex flex-col items-center text-center ${
                  idx % 3 === 1 ? "lg:mt-14" : ""
                }`}
              >
                {/* Portrait */}
                <motion.div
                  variants={fadeUp}
                  custom={0}
                  className="relative w-full max-w-[300px]"
                >
                  {/* Big outlined number behind the arch */}
                  <span
                    aria-hidden
                    className="absolute -left-6 -top-6 z-0 font-serif font-black leading-none text-[100px] text-transparent select-none transition-transform duration-700 group-hover:-translate-y-2"
                    style={{ WebkitTextStroke: "1.5px rgba(217,119,6,0.5)" }}
                  >
                    {String(staff.id).padStart(2, "0")}
                  </span>

                  {/* Rotating dashed ring: appears on hover */}
                  <motion.svg
                    aria-hidden
                    viewBox="0 0 400 400"
                    className="absolute -inset-5 w-[calc(100%+2.5rem)] h-[calc(100%+2.5rem)] opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                    animate={reduce ? undefined : { rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    <circle cx="200" cy="200" r="190" fill="none" stroke="#38bdf8" strokeOpacity="0.55" strokeDasharray="4 10" />
                    <circle cx="200" cy="10" r="6" fill="#f59e0b" />
                  </motion.svg>

                  <motion.div
                    animate={reduce ? undefined : { y: [0, -7, 0] }}
                    transition={{ duration: 6 + (idx % 3), repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                    className="relative z-10"
                  >
                    <div className="relative h-[320px] w-full overflow-hidden rounded-t-[999px] rounded-b-[36px] bg-slate-900 ring-4 ring-white shadow-[0_25px_50px_-20px_rgba(12,74,110,0.5)] transition-shadow duration-500 group-hover:shadow-[0_35px_60px_-18px_rgba(217,119,6,0.55)]">
                      <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-110">
                        <motion.img
                          src={staff.image}
                          alt={staff.name}
                          initial={{ scale: reduce ? 1 : 1.3 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Identity */}
                <motion.p
                  variants={fadeUp}
                  custom={1}
                  className="mt-7 flex items-center gap-1.5 text-xs font-semibold text-sky-700"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  {staff.clearance}
                </motion.p>

                <motion.h3
                  variants={fadeUp}
                  custom={2}
                  className="mt-1 font-serif text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-amber-600"
                >
                  {staff.name}
                </motion.h3>

                <motion.p variants={fadeUp} custom={3} className="mt-1 text-sm font-semibold text-amber-600">
                  {staff.role}
                </motion.p>

                <motion.p variants={fadeUp} custom={4} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Building className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  {staff.department}
                </motion.p>

                <motion.p variants={fadeUp} custom={5} className="mt-3 max-w-xs text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {staff.bio}
                </motion.p>

                <motion.span
                  aria-hidden
                  variants={{
                    hidden: { scaleX: 0 },
                    show: { scaleX: 1, transition: { duration: 0.9, delay: 0.7 } },
                  }}
                  className="mt-5 block h-px w-48 origin-center bg-gradient-to-r from-transparent via-sky-300 to-transparent"
                />

                <motion.div variants={fadeUp} custom={6} className="mt-3">
                  <a
                    href={`mailto:${staff.email}`}
                    className="group/mail relative inline-flex items-center gap-2 pb-1 text-sm font-semibold text-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
                  >
                    <Mail className="w-4 h-4 text-amber-500 transition-transform duration-300 group-hover/mail:-rotate-12 group-hover/mail:scale-110" />
                    {staff.email}
                    <span className="absolute left-0 bottom-0 h-px w-full bg-sky-200" />
                    <span className="absolute left-0 bottom-0 h-px w-0 bg-amber-500 transition-all duration-500 group-hover/mail:w-full" />
                  </a>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}