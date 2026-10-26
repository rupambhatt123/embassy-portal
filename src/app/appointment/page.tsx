"use client";

// Save as: src/app/appointment/page.tsx
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import {
  Calendar,
  User,
  Mail,
  Phone,
  FileText,
  ShieldCheck,
  Download,
  ArrowRight,
  Building2,
  AlertCircle,
  ChevronDown,
  Clock,
  Check,
} from "lucide-react";
import websiteData from "@/data/websiteData.json";

/* ---------- Animated background: calendar & clock theme ---------- */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 47 + 5) % 100,
  top: (i * 31 + 13) % 100,
  size: 3 + (i % 3) * 2,
  dur: 4 + (i % 5) * 1.3,
  delay: (i % 7) * 0.6,
  amber: i % 3 === 0,
}));

const FLOATERS = [
  { left: "3%", top: "22%", size: 110, dur: 11, rot: -12, amber: false, kind: "cal" },
  { left: "88%", top: "55%", size: 130, dur: 13, rot: 10, amber: true, kind: "cal" },
  { left: "6%", top: "72%", size: 90, dur: 12, rot: 8, amber: true, kind: "clock" },
  { left: "90%", top: "86%", size: 100, dur: 14, rot: -8, amber: false, kind: "clock" },
];

function ClockFace({ reduce }: { reduce: boolean }) {
  const ticks = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      <circle cx="150" cy="150" r="140" fill="none" stroke="#38bdf8" strokeOpacity="0.45" strokeWidth="2" />
      <circle cx="150" cy="150" r="118" fill="none" stroke="#f59e0b" strokeOpacity="0.35" strokeDasharray="3 9" />
      {ticks.map((i) => (
        <line
          key={i}
          x1="150"
          y1="22"
          x2="150"
          y2={i % 3 === 0 ? 40 : 32}
          stroke="#0369a1"
          strokeOpacity="0.5"
          strokeWidth={i % 3 === 0 ? 4 : 2}
          strokeLinecap="round"
          transform={`rotate(${i * 30} 150 150)`}
        />
      ))}
      {/* hour hand */}
      <motion.line
        x1="150"
        y1="150"
        x2="150"
        y2="84"
        stroke="#0369a1"
        strokeOpacity="0.7"
        strokeWidth="6"
        strokeLinecap="round"
        style={{ transformOrigin: "150px 150px" }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
      />
      {/* minute hand */}
      <motion.line
        x1="150"
        y1="150"
        x2="150"
        y2="52"
        stroke="#f59e0b"
        strokeOpacity="0.85"
        strokeWidth="4"
        strokeLinecap="round"
        style={{ transformOrigin: "150px 150px" }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <circle cx="150" cy="150" r="8" fill="#f59e0b" />
    </svg>
  );
}

function AnimatedBackground({ reduce }: { reduce: boolean }) {
  const loop = (dur: number) => ({ duration: dur, repeat: Infinity, ease: "easeInOut" as const });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden print:hidden">
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
        className="absolute top-[8%] -left-24 w-[460px] h-[460px] rounded-full bg-sky-300/40 blur-[110px]"
        animate={reduce ? undefined : { x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
        transition={loop(15)}
      />
      <motion.div
        className="absolute bottom-[4%] -right-24 w-[460px] h-[460px] rounded-full bg-amber-200/60 blur-[110px]"
        animate={reduce ? undefined : { x: [0, -70, 0], y: [0, -50, 0], scale: [1, 1.25, 1] }}
        transition={loop(17)}
      />

      {/* Large ticking clock, top-right */}
      <div className="absolute -top-16 -right-16 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] opacity-60">
        <ClockFace reduce={reduce} />
      </div>

      {/* Floating calendar and clock glyphs */}
      {FLOATERS.map((f, i) => {
        const Icon = f.kind === "cal" ? Calendar : Clock;
        return (
          <motion.div
            key={i}
            className="absolute hidden sm:block"
            style={{ left: f.left, top: f.top }}
            animate={reduce ? undefined : { y: [0, -28, 0], rotate: [f.rot, -f.rot, f.rot] }}
            transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.9 }}
          >
            <Icon
              style={{ width: f.size, height: f.size }}
              strokeWidth={0.9}
              className={f.amber ? "text-amber-500/30" : "text-sky-500/25"}
            />
          </motion.div>
        );
      })}

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
    transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ---------- Underline-style form field ---------- */
function Field({
  label,
  htmlFor,
  icon: Icon,
  className = "",
  chevron = false,
  children,
}: {
  label: string;
  htmlFor: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  chevron?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeUp} className={`group/field relative ${className}`}>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-slate-700 mb-0.5 transition-colors group-focus-within/field:text-amber-700">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-600 transition-colors duration-300 group-focus-within/field:text-amber-500 pointer-events-none" />
        )}
        {children}
        {chevron && (
          <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-500 pointer-events-none transition-transform duration-300 group-focus-within/field:rotate-180 group-focus-within/field:text-amber-500" />
        )}
        <span className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-sky-200" />
        <span className="absolute left-0 bottom-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-sky-400 transition-all duration-500 group-focus-within/field:w-full" />
      </div>
    </motion.div>
  );
}

/* ---------- Section heading ---------- */
function SectionHeading({ num, icon: Icon, text }: { num: string; icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <motion.div variants={fadeUp} className="mb-6">
      <div className="flex items-end gap-3">
        <span
          className="font-serif font-black leading-none text-4xl sm:text-5xl text-transparent select-none shrink-0"
          style={{ WebkitTextStroke: "1.5px #d97706" }}
        >
          {num}
        </span>
        <h3 className="flex items-center gap-2 font-serif font-bold text-slate-800 tracking-tight leading-[1.2] text-lg sm:text-2xl pb-0.5 min-w-0">
          <Icon className="w-5 h-5 text-amber-500 shrink-0" />
          <span>{text}</span>
        </h3>
      </div>
      <motion.span
        aria-hidden
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, delay: 0.3 } } }}
        className="mt-3 block h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-amber-400 via-sky-300 to-transparent"
      />
    </motion.div>
  );
}

const inputBase =
  "w-full bg-transparent py-3 text-base text-slate-800 placeholder-slate-400 outline-none";

export default function AppointmentPage() {
  const reduce = !!useReducedMotion();

  // 100% Strict JSON Data Connection
  const data = (websiteData as any).categories.DiplomaticMission.sections.AppointmentPage.variants.DiplomaticAppointmentPage1;
  const banner = data.banner;
  const headerStrip = data.headerStrip;
  const consularServices: string[] = data.services;
  const timeSlots: string[] = data.timeSlots;
  const enclaveLocations: string[] = data.enclaveLocations;
  const confirmation = data.confirmation;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    passportNumber: "",
    serviceType: consularServices[0],
    preferredDate: "",
    preferredTime: timeSlots[0],
    enclaveLocation: enclaveLocations[0],
    notes: "",
  });

  const [bookingRef, setBookingRef] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = "GDM-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setSubmitted(true);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  // Completion tracking for the progress ring
  const requiredKeys = ["fullName", "passportNumber", "email", "phone", "preferredDate"] as const;
  const filled = requiredKeys.filter((k) => String(formData[k]).trim() !== "").length;
  const progress = filled / requiredKeys.length;

  const summary = [
    { label: "Service", value: formData.serviceType },
    { label: "Date & time", value: formData.preferredDate ? `${formData.preferredDate} (${formData.preferredTime})` : `Pick a date (${formData.preferredTime})` },
    { label: "Enclave", value: formData.enclaveLocation },
  ];

  const pillBase =
    "group/btn relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-sm font-bold text-slate-950 shadow-[0_12px_30px_-10px_rgba(217,119,6,0.7)] transition-transform duration-300 hover:scale-[1.03] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600";

  return (
    <main className="relative w-full min-h-screen font-sans text-slate-900 pb-20 bg-gradient-to-b from-[#f0f9ff] via-white to-[#fffaf0] overflow-hidden">
      <AnimatedBackground reduce={reduce} />

      <div className="relative z-10">
        {/* 1. Page banner */}
        <PageBanner
          title={banner.title}
          description={banner.description}
          bgImage={banner.bgImage}
          breadcrumbs={banner.breadcrumbs}
        />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-10">
          <AnimatePresence mode="wait">
            {!submitted ? (
              /* ================= STEP 1: FORM ================= */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Header strip: open */}
                <motion.header
                  initial="hidden"
                  animate="show"
                  className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-center sm:text-left"
                >
                  <div>
                    <motion.p variants={fadeUp} custom={0} className="flex items-center justify-center sm:justify-start gap-3 text-sm font-semibold text-sky-800">
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8 }}
                        className="block h-[2px] w-10 origin-left bg-gradient-to-r from-amber-500 to-sky-500"
                      />
                      {headerStrip.badge}
                    </motion.p>
                    <h2 className="mt-2 font-serif font-bold text-slate-800 tracking-tight leading-[1.1] text-3xl sm:text-5xl">
                      {String(headerStrip.title)
                        .split(" ")
                        .map((w: string, i: number) => (
                          <span key={w + i} className="inline-block overflow-hidden align-bottom pr-[0.25em] pb-[0.1em]">
                            <motion.span variants={wordVariant} custom={i} className="inline-block">
                              {w}
                            </motion.span>
                          </span>
                        ))}
                    </h2>
                  </div>

                  <motion.p variants={fadeUp} custom={3} className="flex items-center justify-center gap-2 text-sm font-semibold text-amber-700">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    {headerStrip.protocolTag}
                  </motion.p>
                </motion.header>

                {/* Overall progress line */}
                <div className="relative mt-5 h-[3px] w-full rounded-full bg-sky-100 overflow-hidden" aria-hidden>
                  <motion.span
                    className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-sky-400"
                    animate={{ scaleX: progress }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>

                <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  {/* ---------- Form ---------- */}
                  <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-12">
                    {/* Section 1 */}
                    <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} transition={{ staggerChildren: 0.08 }}>
                      <SectionHeading num="01" icon={User} text="Applicant Identification & Contact Details" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        <Field label="Full Legal Name (as per Passport) *" htmlFor="fullName" icon={User}>
                          <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            required
                            autoComplete="name"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="e.g. Alexander Vance"
                            className={`${inputBase} pl-9`}
                          />
                        </Field>

                        <Field label="Current Passport / National ID Number *" htmlFor="passportNumber" icon={FileText}>
                          <input
                            id="passportNumber"
                            type="text"
                            name="passportNumber"
                            required
                            value={formData.passportNumber}
                            onChange={handleChange}
                            placeholder="e.g. Z12345678"
                            className={`${inputBase} pl-9`}
                          />
                        </Field>

                        <Field label="Official Email Address *" htmlFor="email" icon={Mail}>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@domain.com"
                            className={`${inputBase} pl-9`}
                          />
                        </Field>

                        <Field label="Phone Number (with Country Code) *" htmlFor="phone" icon={Phone}>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            required
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className={`${inputBase} pl-9`}
                          />
                        </Field>
                      </div>
                    </motion.section>

                    {/* Section 2 */}
                    <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} transition={{ staggerChildren: 0.08 }}>
                      <SectionHeading num="02" icon={Calendar} text="Consular Service & Appointment Scheduling" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        <Field label="Select Consular Adjudication Service *" htmlFor="serviceType" className="sm:col-span-2" chevron>
                          <select
                            id="serviceType"
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleChange}
                            className={`${inputBase} appearance-none pr-8 cursor-pointer`}
                          >
                            {consularServices.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </Field>

                        <Field label="Preferred Date of Appearance *" htmlFor="preferredDate" icon={Calendar}>
                          <input
                            id="preferredDate"
                            type="date"
                            name="preferredDate"
                            required
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className={`${inputBase} pl-9 [color-scheme:light]`}
                          />
                        </Field>

                        <Field label="Preferred Time Slot *" htmlFor="preferredTime" icon={Clock} chevron>
                          <select
                            id="preferredTime"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            className={`${inputBase} pl-9 appearance-none pr-8 cursor-pointer`}
                          >
                            {timeSlots.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </Field>

                        <Field label="Consular Mission Enclave Location" htmlFor="enclaveLocation" icon={Building2} className="sm:col-span-2" chevron>
                          <select
                            id="enclaveLocation"
                            name="enclaveLocation"
                            value={formData.enclaveLocation}
                            onChange={handleChange}
                            className={`${inputBase} pl-9 appearance-none pr-8 cursor-pointer`}
                          >
                            {enclaveLocations.map((loc) => (
                              <option key={loc} value={loc}>
                                {loc}
                              </option>
                            ))}
                          </select>
                        </Field>

                        <Field label="Special Legal Assistance / Case Notes (Optional)" htmlFor="notes" className="sm:col-span-2">
                          <textarea
                            id="notes"
                            name="notes"
                            rows={3}
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Mention any expedited travel urgency, disabled applicant accommodations, or specific document dossier notes..."
                            className={`${inputBase} resize-none`}
                          />
                        </Field>
                      </div>
                    </motion.section>

                    {/* Submit */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.7 }}
                      className="relative pt-6 flex flex-col sm:flex-row items-center justify-between gap-5"
                    >
                      <motion.span
                        aria-hidden
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1 }}
                        className="absolute left-0 right-0 top-0 h-px origin-left bg-gradient-to-r from-amber-400 via-sky-300 to-transparent"
                      />
                      <p className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{data.noticeText}</span>
                      </p>

                      <button type="submit" className={`${pillBase} w-full sm:w-auto justify-between gap-3 pl-7 pr-2 py-2 shrink-0`}>
                        <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 blur-sm transition-transform duration-700 group-hover/btn:translate-x-[450%]" />
                        <span className="relative">{data.submitBtnText}</span>
                        <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-950 text-amber-300 transition-transform duration-300 group-hover/btn:rotate-12">
                          <Calendar className="w-4 h-4" />
                        </span>
                      </button>
                    </motion.div>
                  </form>

                  {/* ---------- Live progress + summary ---------- */}
                  <motion.aside
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="lg:col-span-4 lg:sticky lg:top-24 order-first lg:order-none"
                  >
                    <div className="relative pl-5 sm:pl-6">
                      <motion.span
                        aria-hidden
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        className="absolute left-0 top-0 bottom-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
                      />

                      <div className="flex items-center gap-4">
                        <span className="relative w-16 h-16 shrink-0">
                          <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden>
                            <circle cx="32" cy="32" r="28" fill="none" stroke="#bae6fd" strokeWidth="4" />
                            <motion.circle
                              cx="32"
                              cy="32"
                              r="28"
                              fill="none"
                              stroke="#f59e0b"
                              strokeWidth="4"
                              strokeLinecap="round"
                              animate={{ pathLength: progress }}
                              initial={{ pathLength: 0 }}
                              transition={{ type: "spring", stiffness: 120, damping: 20 }}
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center font-serif text-sm font-bold text-slate-800 tabular-nums">
                            {Math.round(progress * 100)}%
                          </span>
                        </span>
                        <div>
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-800">Your request</h4>
                          <p className="text-sm font-medium text-slate-500" aria-live="polite">
                            {filled} of {requiredKeys.length} required fields complete
                          </p>
                        </div>
                      </div>

                      <ul className="mt-3">
                        {summary.map((row) => (
                          <li key={row.label} className="relative py-3">
                            <p className="text-xs font-semibold text-slate-500">{row.label}</p>
                            <AnimatePresence mode="wait" initial={false}>
                              <motion.p
                                key={row.value}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="font-serif text-base font-bold text-slate-800 leading-snug break-words"
                              >
                                {row.value}
                              </motion.p>
                            </AnimatePresence>
                            <span className="absolute left-0 right-0 bottom-0 h-px bg-sky-200" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.aside>
                </div>
              </motion.div>
            ) : (
              /* ================= STEP 2: CONFIRMATION ================= */
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-3xl mx-auto"
              >
                {/* Status */}
                <div className="relative text-center">
                  {/* Success burst */}
                  <div className="relative mx-auto w-24 h-24 print:hidden">
                    {!reduce &&
                      Array.from({ length: 12 }, (_, i) => {
                        const angle = (i / 12) * Math.PI * 2;
                        return (
                          <motion.span
                            key={i}
                            className={`absolute left-1/2 top-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full ${i % 2 ? "bg-amber-400" : "bg-sky-400"}`}
                            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                            animate={{ x: Math.cos(angle) * 80, y: Math.sin(angle) * 80, opacity: 0, scale: 0.4 }}
                            transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
                          />
                        );
                      })}
                    <svg viewBox="0 0 96 96" className="absolute inset-0 w-full h-full">
                      <circle cx="48" cy="48" r="44" fill="#ecfdf5" />
                      <motion.circle
                        cx="48"
                        cy="48"
                        r="44"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        style={{ rotate: -90, transformOrigin: "48px 48px" }}
                      />
                      <motion.path
                        d="M28 50 L42 63 L68 35"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                      />
                    </svg>
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-700"
                  >
                    <Check className="w-4 h-4" />
                    {confirmation.statusTag}
                  </motion.p>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.7 }}
                    className="mt-2 font-serif font-bold text-slate-900 tracking-tight leading-[1.1] text-3xl sm:text-5xl break-words"
                  >
                    {confirmation.headingPrefix},{" "}
                    <span className="bg-clip-text text-transparent italic font-medium bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600">
                      {formData.fullName}!
                    </span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.15, duration: 0.7 }}
                    className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed"
                  >
                    {confirmation.description}
                  </motion.p>
                </div>

                {/* Clearance slip: open ticket, no card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mt-10 sm:mt-12"
                >
                  <div className="relative pl-5 sm:pl-6">
                    <motion.span
                      aria-hidden
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 1.2, delay: 1.5 }}
                      className="absolute left-0 top-0 bottom-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-5">
                      <div>
                        <p className="text-sm font-semibold text-slate-500">{confirmation.trackingLabel}</p>
                        <p className="font-serif text-3xl sm:text-4xl font-black text-[#d4af37] tracking-wide" aria-label={bookingRef}>
                          {bookingRef.split("").map((ch, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.6 + i * 0.07, duration: 0.4 }}
                              className="inline-block"
                            >
                              {ch}
                            </motion.span>
                          ))}
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-sm font-semibold text-slate-500">{confirmation.securityClearanceLabel}</p>
                        <p className="inline-flex items-center gap-2 text-base font-bold text-emerald-700">
                          <span className="relative flex w-2.5 h-2.5">
                            {!reduce && <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />}
                            <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          </span>
                          {confirmation.securityClearanceValue}
                        </p>
                      </div>
                    </div>

                    {/* Tear-off perforation */}
                    <div aria-hidden className="border-t-2 border-dashed border-sky-300" />

                    <motion.dl
                      initial="hidden"
                      animate="show"
                      transition={{ staggerChildren: 0.08, delayChildren: 1.8 }}
                      className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8"
                    >
                      {[
                        { l: confirmation.applicantLabel, v: formData.fullName },
                        { l: confirmation.passportLabel, v: formData.passportNumber },
                        { l: confirmation.serviceLabel, v: formData.serviceType },
                        { l: confirmation.appearanceSlotLabel, v: `${formData.preferredDate} (${formData.preferredTime})` },
                        { l: confirmation.enclaveLabel, v: formData.enclaveLocation, wide: true },
                      ].map((row, i) => (
                        <motion.div
                          key={i}
                          variants={fadeUp}
                          className={`relative py-3.5 ${row.wide ? "sm:col-span-2" : ""}`}
                        >
                          <dt className="text-xs font-semibold text-slate-400">{row.l}</dt>
                          <dd className="font-serif text-base sm:text-lg font-bold text-slate-900 break-words">{row.v}</dd>
                          <span className="absolute left-0 right-0 bottom-0 h-px bg-sky-200" />
                        </motion.div>
                      ))}
                    </motion.dl>

                    <p className="mt-5 flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                      <ShieldCheck className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                      <span>{confirmation.noteTemplate.replace("{email}", formData.email)}</span>
                    </p>
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.1, duration: 0.7 }}
                  className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 print:hidden"
                >
                  <button
                    onClick={() => window.print()}
                    className="group relative inline-flex items-center gap-2.5 pb-1 text-sm font-bold text-sky-800 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 transition-all duration-300 group-hover:from-amber-300 group-hover:to-amber-500 group-hover:text-slate-950 group-hover:scale-110">
                      <Download className="w-4 h-4" />
                    </span>
                    {confirmation.printBtnText}
                  </button>

                  <Link href={confirmation.returnHomeHref} className={`${pillBase} w-full sm:w-auto justify-between gap-3 pl-7 pr-2 py-2`}>
                    <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 blur-sm transition-transform duration-700 group-hover/btn:translate-x-[450%]" />
                    <span className="relative">{confirmation.returnHomeBtnText}</span>
                    <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-950 text-amber-300 transition-transform duration-300 group-hover/btn:translate-x-1">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}