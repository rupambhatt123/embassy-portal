"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import websiteData from "@/data/websiteData.json";
import {
  Clock,
  Building2,
  ShieldCheck,
  Check,
  Calendar,
} from "lucide-react";

interface ServiceDetailViewProps {
  service: any;
  allServices: any[];
  slug: string;
}

/* ---------- Animated background ---------- */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 47 + 5) % 100,
  top: (i * 31 + 13) % 100,
  size: 3 + (i % 3) * 2,
  dur: 4 + (i % 5) * 1.3,
  delay: (i % 7) * 0.6,
  amber: i % 3 === 0,
}));

function AnimatedBackground({ reduce, sealText }: { reduce: boolean; sealText: string }) {
  const loop = (dur: number) => ({ duration: dur, repeat: Infinity, ease: "easeInOut" as const });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(#0284c7_1px,transparent_1px)] [background-size:28px_28px]"
        animate={reduce ? undefined : { backgroundPosition: ["0px 0px", "28px 28px"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-[30%] w-[1100px] h-[1100px] -ml-[550px] -mt-[550px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(125,211,252,0.55), rgba(255,255,255,0) 25%, rgba(252,211,77,0.5) 50%, rgba(255,255,255,0) 75%, rgba(125,211,252,0.55))",
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[8%] -left-24 w-[460px] h-[460px] rounded-full bg-sky-300/40 blur-[110px]"
        animate={reduce ? undefined : { x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
        transition={loop(15)}
      />
      <motion.div
        className="absolute bottom-[6%] -right-24 w-[460px] h-[460px] rounded-full bg-amber-200/60 blur-[110px]"
        animate={reduce ? undefined : { x: [0, -70, 0], y: [0, -50, 0], scale: [1, 1.25, 1] }}
        transition={loop(17)}
      />

      <motion.svg
        viewBox="0 0 600 600"
        className="absolute -top-24 -right-24 w-[420px] h-[420px] hidden md:block opacity-60"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path id="service-seal" d="M300,300 m-250,0 a250,250 0 1,1 500,0 a250,250 0 1,1 -500,0" />
        </defs>
        <circle cx="300" cy="300" r="285" fill="none" stroke="#38bdf8" strokeOpacity="0.35" strokeDasharray="4 10" />
        <text style={{ fontSize: 22, letterSpacing: "8px", fontWeight: 600 }} fill="#0369a1" fillOpacity="0.35">
          <textPath href="#service-seal">
            {sealText}
          </textPath>
        </text>
        <circle cx="300" cy="15" r="6" fill="#f59e0b" />
      </motion.svg>

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

const slideIn: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function SectionHeading({ num, text }: { num: string; text: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-end gap-3">
        <span
          className="font-serif font-black leading-none text-3xl sm:text-4xl text-transparent select-none"
          style={{ WebkitTextStroke: "1.5px #d97706" }}
        >
          {num}
        </span>
        <h3 className="font-serif font-bold text-slate-800 tracking-tight leading-tight text-lg sm:text-2xl pb-0.5">
          {text}
        </h3>
      </div>
      <span className="mt-2.5 block h-[2px] w-full rounded-full bg-gradient-to-r from-amber-400 via-sky-300 to-transparent" />
    </div>
  );
}

export default function ServiceDetailView({ service, allServices, slug }: ServiceDetailViewProps) {
  const reduce = !!useReducedMotion();

  // 100% Strict JSON Data Connection
  const config = (websiteData as any).categories.DiplomaticMission.sections.ServiceDetailPage.variants.DiplomaticServiceDetail1;

  const snapshot = [
    { icon: Clock, label: config.labels.time, value: service.time, tone: "text-sky-700", ring: "from-sky-100 to-sky-50 text-sky-600" },
    { icon: Building2, label: config.labels.enclave, value: service.enclave, tone: "text-slate-800", ring: "from-amber-100 to-amber-50 text-amber-600" },
  ];

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-b from-[#f0f9ff] via-white to-[#fffaf0] font-sans pb-16 overflow-hidden">
      <AnimatedBackground reduce={reduce} sealText={config.sealText} />

      <div className="relative z-10">
        {/* ================= 1. Banner ================= */}
        <PageBanner
          title={service.title}
          bgImage={service.image}
          breadcrumbs={[
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
        />

        <div className="max-w-[1350px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-10">
          
          {/* Detailed Overview Card */}
          <div className="relative pl-4 sm:pl-5 max-w-4xl mb-8 sm:mb-12">
            <span
              aria-hidden
              className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
            />
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {service.detailedOverview}
            </p>
          </div>

          {/* ================= 2. Details & Protocol Snapshot ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left: Prerequisites + Procedure */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">
              
              {/* Prerequisites Section */}
              <section>
                <SectionHeading num={config.section1Number} text={config.section1Title} />
                <motion.ul
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-8"
                >
                  {service.prerequisites.map((req: string, i: number) => (
                    <motion.li key={req} variants={slideIn} custom={i} className="group relative py-3">
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-100/70 via-sky-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-start gap-3 pl-1 transition-transform duration-200 group-hover:translate-x-1">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5 bg-gradient-to-br from-sky-400 to-cyan-500 text-white group-hover:from-amber-400 group-hover:to-amber-500 group-hover:text-slate-950 transition-colors">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                        <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">{req}</span>
                      </div>
                      <span className="absolute left-0 right-0 bottom-0 h-px bg-sky-200" />
                      <span className="absolute left-0 bottom-0 h-px w-0 bg-amber-500 transition-all duration-300 group-hover:w-full" />
                    </motion.li>
                  ))}
                </motion.ul>
              </section>

              {/* Procedure Section */}
              <section>
                <SectionHeading num={config.section2Number} text={config.section2Title} />
                <motion.ol
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative space-y-1"
                >
                  <span
                    aria-hidden
                    className="absolute left-4 sm:left-5 top-4 bottom-4 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-400 via-sky-300 to-amber-400"
                  />

                  {service.steps.map((st: string, i: number) => (
                    <motion.li key={st} variants={slideIn} custom={i} className="group relative flex items-center gap-4 py-2.5">
                      <span className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 font-serif text-xs sm:text-sm font-bold ring-4 ring-white shadow-md">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed transition-all duration-200 group-hover:translate-x-1 group-hover:text-sky-800">
                        {st}
                      </span>
                    </motion.li>
                  ))}
                </motion.ol>
              </section>

            </div>

            {/* Right: Protocol Snapshot */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 w-full">
              <div className="relative pl-4 sm:pl-6">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
                />

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 shadow-sm shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-800">{config.snapshotTitle}</h4>
                </div>

                {/* Metric Rows */}
                <div className="mt-4 divide-y divide-sky-100">
                  {snapshot.map((row) => {
                    const Icon = row.icon;
                    return (
                      <div key={row.label} className="py-3 flex items-center gap-3.5">
                        <span className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 bg-gradient-to-br ${row.ring}`}>
                          <Icon className="w-4 h-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{row.label}</p>
                          <p className={`font-serif text-base font-bold leading-snug ${row.tone}`}>{row.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Appointment Action */}
                <div className="mt-6">
                  <Link
                    href={config.appointmentHref}
                    className="group relative inline-flex items-center justify-center gap-2.5 w-full sm:w-auto overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-md transition-transform duration-200 hover:scale-[1.02]"
                  >
                    <span>{config.appointmentBtnText}</span>
                    <Calendar className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </main>
  );
}