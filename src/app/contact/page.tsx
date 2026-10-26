"use client";

// Save as: src/app/contact/page.tsx
import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Building2,
  RefreshCw,
  ChevronDown,
  User,
  Check,
} from "lucide-react";
import PageBanner from "@/components/PageBanner";
import websiteData from "@/data/websiteData.json";

/* ---------- Animated background: communication / signal theme ---------- */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 47 + 5) % 100,
  top: (i * 31 + 13) % 100,
  size: 3 + (i % 3) * 2,
  dur: 4 + (i % 5) * 1.3,
  delay: (i % 7) * 0.6,
  amber: i % 3 === 0,
}));

const FLOATERS = [
  { left: "3%", top: "18%", size: 110, dur: 11, rot: -12, amber: false, Icon: Mail },
  { left: "89%", top: "30%", size: 90, dur: 13, rot: 10, amber: true, Icon: Phone },
  { left: "5%", top: "62%", size: 100, dur: 12, rot: 8, amber: true, Icon: Send },
  { left: "86%", top: "70%", size: 120, dur: 14, rot: -8, amber: false, Icon: MapPin },
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
        className="absolute left-1/2 top-[35%] w-[1100px] h-[1100px] -ml-[550px] -mt-[550px] rounded-full opacity-40 blur-3xl"
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

      {/* Signal ripples radiating from the top-right corner */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] hidden md:block">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border-2 border-amber-400/50"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={reduce ? { scale: 0.3 + i * 0.35, opacity: 0.3 } : { scale: [0.3, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeOut", delay: i * 2.3 }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-amber-500" />
      </div>

      {/* Large outlined contact glyphs drifting and tilting */}
      {FLOATERS.map((f, i) => (
        <motion.div
          key={i}
          className="absolute hidden sm:block"
          style={{ left: f.left, top: f.top }}
          animate={reduce ? undefined : { y: [0, -28, 0], rotate: [f.rot, -f.rot, f.rot] }}
          transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.9 }}
        >
          <f.Icon
            style={{ width: f.size, height: f.size }}
            strokeWidth={0.9}
            className={f.amber ? "text-amber-500/30" : "text-sky-500/25"}
          />
        </motion.div>
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

const inputBase = "w-full bg-transparent py-3 text-base text-slate-800 placeholder-slate-400 outline-none";

export default function ContactPage() {
  const reduce = !!useReducedMotion();

  // 100% Strict JSON Data Connection
  const data = (websiteData as any).categories.DiplomaticMission.sections.ContactPage.variants.DiplomaticContactPage1;
  const banner = data.banner;
  const formSection = data.formSection;
  const chanceryCard = data.chanceryCard;
  const quickAccess = data.quickAccess;
  const mapSection = data.mapSection;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenId, setTokenId] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: formSection.departmentSubjects[0].value,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setTokenId(`CH-IND-${Math.floor(Math.random() * 89999) + 10000}`);
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: formSection.departmentSubjects[0].value,
      message: "",
    });
    setSubmitted(false);
  };

  // Working hours removed completely from quickAccess array
  const accessRows = [
    { icon: Building2, text: quickAccess.gateAccess, href: undefined as string | undefined, ring: "from-sky-100 to-sky-50 text-sky-600", strong: true },
    { icon: Phone, text: quickAccess.phone, href: `tel:${String(quickAccess.phone).replace(/[^\d+]/g, "")}`, ring: "from-amber-100 to-amber-50 text-amber-600", strong: true },
    { icon: Mail, text: quickAccess.email, href: `mailto:${quickAccess.email}`, ring: "from-sky-100 to-sky-50 text-sky-600", strong: false },
  ];

  const pillBase =
    "group/btn relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-sm font-bold text-slate-950 shadow-[0_12px_30px_-10px_rgba(217,119,6,0.7)] transition-transform duration-300 hover:scale-[1.03] cursor-pointer disabled:opacity-60 disabled:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600";

  return (
    <div className="w-full font-sans pb-16 sm:pb-20 bg-gradient-to-b from-[#f0f9ff] via-white to-[#fffaf0] overflow-x-hidden">
      <AnimatedBackground reduce={reduce} />

      <div className="relative z-10 w-full">
        {/* 1. Page header banner */}
        <PageBanner
          title={banner.title}
          description={banner.description}
          bgImage={banner.bgImage}
          breadcrumbs={banner.breadcrumbs}
        />

        <div className="max-w-[1250px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-14 space-y-12 sm:space-y-20">
          {/* ================= Form / thank-you + chancery ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* ---------- Left: form or thank-you ---------- */}
            <div className="lg:col-span-7 w-full min-w-0 overflow-hidden">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Heading */}
                    <motion.div initial="hidden" animate="show" className="text-center sm:text-left">
                      <motion.p variants={fadeUp} custom={0} className="flex items-center justify-center sm:justify-start gap-3 text-sm font-semibold text-sky-800">
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8 }}
                          className="block h-[2px] w-10 origin-left bg-gradient-to-r from-amber-500 to-sky-500"
                        />
                        {formSection.badge}
                      </motion.p>

                      <h2 className="mt-2 font-serif font-bold text-slate-800 tracking-tight leading-[1.1] text-2xl sm:text-5xl">
                        {String(formSection.title)
                          .split(" ")
                          .map((w: string, i: number) => (
                            <span key={w + i} className="inline-block overflow-hidden align-bottom pr-[0.25em] pb-[0.1em]">
                              <motion.span variants={wordVariant} custom={i} className="inline-block">
                                {w}
                              </motion.span>
                            </span>
                          ))}
                      </h2>

                      <motion.span
                        aria-hidden
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-4 block h-[3px] w-28 sm:w-44 origin-left rounded-full bg-gradient-to-r from-[#d4af37] via-amber-300 to-transparent mx-auto sm:mx-0"
                      />

                      <motion.p variants={fadeUp} custom={4} className="mt-4 text-xs sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto sm:mx-0">
                        {formSection.description}
                      </motion.p>
                    </motion.div>

                    <motion.form
                      onSubmit={handleSubmit}
                      initial="hidden"
                      animate="show"
                      transition={{ staggerChildren: 0.08, delayChildren: 0.5 }}
                      className="mt-6 sm:mt-8 space-y-5 sm:space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 sm:gap-y-6">
                        <Field label="Full Legal Name *" htmlFor="fullName" icon={User}>
                          <input
                            id="fullName"
                            type="text"
                            required
                            autoComplete="name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="e.g. Jonathan Doe"
                            className={`${inputBase} pl-9`}
                          />
                        </Field>

                        <Field label="Official Email *" htmlFor="email" icon={Mail}>
                          <input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@example.com"
                            className={`${inputBase} pl-9`}
                          />
                        </Field>

                        <Field label="Contact Number" htmlFor="phone" icon={Phone}>
                          <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            className={`${inputBase} pl-9`}
                          />
                        </Field>

                        <Field label="Department Subject *" htmlFor="subject" icon={Building2} chevron>
                          <select
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className={`${inputBase} pl-9 pr-8 appearance-none cursor-pointer truncate`}
                          >
                            {formSection.departmentSubjects.map((sub: { label: string; value: string }) => (
                              <option key={sub.value} value={sub.value}>
                                {sub.label}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>

                      <Field label="Detailed Message *" htmlFor="message">
                        <textarea
                          id="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Please include relevant passport/DS-160 application or reference details..."
                          className={`${inputBase} resize-none`}
                        />
                      </Field>

                      <motion.div variants={fadeUp} className="pt-2">
                        <button type="submit" disabled={loading} className={`${pillBase} w-full sm:w-auto justify-between gap-3 pl-8 pr-2 py-2`}>
                          <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 blur-sm transition-transform duration-700 group-hover/btn:translate-x-[450%]" />
                          <span className="relative">{loading ? formSection.submittingBtnText : formSection.submitBtnText}</span>
                          <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-950 text-amber-300 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          </span>
                        </button>
                      </motion.div>
                    </motion.form>
                  </motion.div>
                ) : (
                  /* ---------- Thank-you view ---------- */
                  <motion.div
                    key="thank-you-view"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="py-6 flex flex-col items-center text-center px-2"
                  >
                    <div className="relative w-24 h-24">
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
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700"
                    >
                      <Check className="w-4 h-4" />
                      {formSection.thankYou.badge}
                    </motion.p>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.7 }}
                      className="mt-2 font-serif font-bold text-slate-900 tracking-tight leading-[1.1] text-2xl sm:text-5xl break-words max-w-full"
                    >
                      {formSection.thankYou.titlePrefix},{" "}
                      <span className="bg-clip-text text-transparent italic font-medium bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 break-words">
                        {formData.fullName}!
                      </span>
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.15, duration: 0.7 }}
                      className="mt-4 max-w-md text-xs sm:text-base text-slate-600 leading-relaxed"
                    >
                      {formSection.thankYou.messageTemplate
                        .replace("{subject}", formData.subject)
                        .replace("{email}", formData.email)}
                    </motion.p>

                    {/* Token */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      className="relative mt-7 pl-5 text-left w-full max-w-xs"
                    >
                      <motion.span
                        aria-hidden
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.9, delay: 1.4 }}
                        className="absolute left-0 top-1 bottom-1 w-[3px] origin-top rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
                      />
                      <p className="text-sm font-semibold text-slate-500">Token ID</p>
                      <p className="font-serif text-xl sm:text-3xl font-black text-[#d4af37] tracking-wide break-all" aria-label={tokenId}>
                        {tokenId.split("").map((ch, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 + i * 0.06, duration: 0.4 }}
                            className="inline-block"
                          >
                            {ch}
                          </motion.span>
                        ))}
                      </p>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.2, duration: 0.6 }}
                      onClick={handleReset}
                      className="group relative mt-8 inline-flex items-center gap-2.5 pb-1 text-sm font-bold text-sky-800 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 transition-all duration-300 group-hover:from-amber-300 group-hover:to-amber-500 group-hover:text-slate-950 group-hover:scale-110">
                        <RefreshCw className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
                      </span>
                      {formSection.thankYou.resetBtnText}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ---------- Right: chancery photo + quick access ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 w-full min-w-0"
            >
              {/* Arch photo with text on the image */}
              <div className="relative mx-auto w-full max-w-[400px]">
                <motion.svg
                  aria-hidden
                  viewBox="0 0 400 400"
                  className="absolute -inset-2 sm:-inset-5 w-[calc(100%+1rem)] sm:w-[calc(100%+2.5rem)] h-[calc(100%+1rem)] sm:h-[calc(100%+2.5rem)] opacity-70"
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="200" cy="200" r="190" fill="none" stroke="#38bdf8" strokeOpacity="0.5" strokeDasharray="4 10" />
                  <circle cx="200" cy="10" r="7" fill="#f59e0b" />
                </motion.svg>

                <motion.div
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="group relative h-[300px] sm:h-[420px] w-full overflow-hidden rounded-t-[999px] rounded-b-[40px] bg-slate-900 ring-4 ring-white shadow-[0_30px_60px_-20px_rgba(12,74,110,0.55)]">
                    <motion.img
                      src={chanceryCard.image}
                      alt={chanceryCard.title}
                      initial={{ scale: reduce ? 1.04 : 1.3 }}
                      whileInView={{ scale: 1.04 }}
                      viewport={{ once: true }}
                      transition={{ duration: 6, ease: "linear" }}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

                    <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 text-white">
                      <p className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300">
                        <span className="block h-[2px] w-6 bg-amber-400" />
                        {chanceryCard.badge}
                      </p>
                      <p className="mt-1 text-lg sm:text-xl font-serif font-bold leading-snug">{chanceryCard.title}</p>
                      <p className="mt-0.5 text-xs sm:text-sm text-slate-300 leading-snug break-words">{chanceryCard.address}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Quick access rows */}
              <motion.ul
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="relative mt-8 sm:mt-10 pl-5 sm:pl-6"
              >
                <motion.span
                  aria-hidden
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="absolute left-0 top-0 bottom-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
                />
                {accessRows.map((row, i) => {
                  const Icon = row.icon;
                  const body = (
                    <>
                      <span
                        className={`flex items-center justify-center w-9 sm:w-10 h-9 sm:h-10 rounded-full shrink-0 bg-gradient-to-br ${row.ring} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span
                        className={`min-w-0 break-all sm:break-words text-xs sm:text-base leading-snug transition-colors duration-300 group-hover:text-amber-600 ${
                          row.strong ? "font-bold text-slate-800" : "font-medium text-slate-600"
                        }`}
                      >
                        {row.text}
                      </span>
                    </>
                  );
                  return (
                    <motion.li key={i} variants={fadeUp} custom={i} className="group relative">
                      {row.href ? (
                        <a href={row.href} className="flex items-center gap-3.5 py-3 sm:py-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
                          {body}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3.5 py-3 sm:py-3.5">{body}</div>
                      )}
                      <span className="absolute left-0 right-0 bottom-0 h-px bg-sky-200" />
                      <span className="absolute left-0 bottom-0 h-px w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          </div>

          {/* ================= 2. Map ================= */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="w-full overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <motion.h3 variants={fadeUp} custom={0} className="flex items-center gap-3 font-serif font-bold text-slate-800 text-xl sm:text-4xl leading-tight">
                  <span className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                    {!reduce && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-amber-400"
                        animate={{ scale: [1, 1.7], opacity: [0.4, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <span className="relative flex items-center justify-center w-full h-full rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950">
                      <MapPin className="w-4 sm:w-5 h-4 sm:h-5" />
                    </span>
                  </span>
                  {mapSection.title}
                </motion.h3>
                <motion.p variants={fadeUp} custom={1} className="mt-2 text-xs sm:text-base text-slate-600">
                  {mapSection.subtitle}
                </motion.p>
              </div>

              <motion.p variants={fadeUp} custom={2} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-sky-800">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                {mapSection.badge}
              </motion.p>
            </div>

            <motion.span
              aria-hidden
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, delay: 0.3 } } }}
              className="mt-4 block h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-amber-400 via-sky-300 to-transparent"
            />

            <motion.div
              variants={{
                hidden: { clipPath: reduce ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)", opacity: 0 },
                show: { clipPath: "inset(0% 0 0 0)", opacity: 1, transition: { duration: 1.1, delay: 0.3, ease: [0.76, 0, 0.24, 1] } },
              }}
              className="relative mt-6"
            >
              <div className="relative w-full h-[280px] sm:h-[480px] overflow-hidden rounded-[24px] sm:rounded-[44px] bg-slate-100 ring-4 ring-white shadow-[0_30px_60px_-20px_rgba(12,74,110,0.45)]">
                <iframe
                  title={mapSection.title}
                  src={mapSection.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter contrast-[1.02]"
                />
              </div>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}