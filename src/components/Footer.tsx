"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, type Variants } from "framer-motion";
import { ArrowUp, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import websiteData from "@/data/websiteData.json";

/* ---------- Animated background: dark diplomatic theme ---------- */
const TICKER = "Consular services  •  Visa protocols  •  Citizen care  •  Trade accords  •  ";

const EMBERS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 47 + 5) % 100,
  top: 35 + ((i * 29) % 65),
  size: 2 + (i % 3) * 2,
  dur: 6 + (i % 6) * 1.4,
  delay: (i % 9) * 0.7,
  gold: i % 4 !== 0,
}));

function FooterBackground({ reduce }: { reduce: boolean }) {
  const loop = (dur: number) => ({ duration: dur, repeat: Infinity, ease: "easeInOut" as const });
  const ticker = TICKER.repeat(4);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(#00c4d6_1px,transparent_1px)] [background-size:28px_28px]"
        animate={reduce ? undefined : { backgroundPosition: ["0px 0px", "28px 28px"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-28 -left-20 w-[320px] sm:w-[480px] h-[320px] sm:h-[420px] rounded-full bg-sky-500/20 blur-[90px] sm:blur-[110px]"
        animate={reduce ? undefined : { x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={loop(15)}
      />
      <motion.div
        className="absolute -top-28 -right-20 w-[320px] sm:w-[460px] h-[320px] sm:h-[420px] rounded-full bg-[#d4af37]/15 blur-[90px] sm:blur-[110px]"
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, 30, 0], scale: [1, 1.25, 1] }}
        transition={loop(18)}
      />
      <div className="absolute left-0 bottom-[12%] w-full overflow-hidden whitespace-nowrap">
        <motion.div
          className="inline-flex font-serif font-black text-[50px] sm:text-[120px] leading-none select-none"
          style={{ color: "transparent", WebkitTextStroke: "1px rgba(212,175,55,0.12)" }}
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        >
          <span>{ticker}</span>
          <span>{ticker}</span>
        </motion.div>
      </div>
      {EMBERS.map((e, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full ${e.gold ? "bg-[#d4af37]" : "bg-cyan-300"}`}
          style={{ left: `${e.left}%`, top: `${e.top}%`, width: e.size, height: e.size }}
          animate={reduce ? { opacity: 0.35 } : { y: [0, -140], opacity: [0, 0.8, 0] }}
          transition={{ duration: e.dur, repeat: Infinity, ease: "easeOut", delay: e.delay }}
        />
      ))}
    </div>
  );
}

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 sm:mb-6">
      <h4 className="text-white text-base sm:text-lg font-serif font-bold tracking-wide">{children}</h4>
      <motion.span
        aria-hidden
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, delay: 0.3 } } }}
        className="mt-2 block h-[3px] w-12 origin-left rounded-full bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#00c4d6]"
      />
    </div>
  );
}

export default function Footer() {
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll();
  const ringProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 100% JSON Integration
  const footerData =
    (websiteData as any)?.categories?.DiplomaticMission?.sections?.Footer?.variants?.DiplomaticFooter1 || {};

  const logo = footerData?.logo || { src: "/logo.webp", alt: "Global Diplomatic Mission" };
  const aboutText = footerData?.aboutText || "Official sovereign representation facilitating diplomatic clearances.";
  const servicesHeading = footerData?.servicesHeading || "Our Services";
  const servicesLinks = footerData?.servicesLinks || [];
  const quickNavHeading = footerData?.quickNavHeading || "Quick Navigation";
  const quickNavLinks = footerData?.quickNavLinks || [];
  const contactHeading = footerData?.contactHeading || "Consular Desk";
  const contact = footerData?.contactDetails || {};
  const legal = footerData?.legal || {};

  const emailAddress = contact?.email?.address || "consular@globaldiplomatic.org";
  const phoneNumber = contact?.phone?.number || "+1 (800) 555-0199";

  const socials = [
    {
      label: "Instagram",
      href: footerData?.socialLinks?.[0]?.href || "https://instagram.com",
      bg: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
      glow: "hover:shadow-[0_10px_25px_-6px_rgba(238,42,123,0.8)]",
      size: "w-[18px] h-[18px]",
      d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
    {
      label: "Twitter / X",
      href: footerData?.socialLinks?.[1]?.href || "https://twitter.com",
      bg: "bg-black border border-slate-600",
      glow: "hover:shadow-[0_10px_25px_-6px_rgba(255,255,255,0.35)]",
      size: "w-4 h-4",
      d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
      label: "WhatsApp",
      href: footerData?.socialLinks?.[2]?.href || "https://whatsapp.com",
      bg: "bg-[#25D366]",
      glow: "hover:shadow-[0_10px_25px_-6px_rgba(37,211,102,0.8)]",
      size: "w-[18px] h-[18px]",
      d: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z",
    },
  ];

  const contactRows = [
    {
      icon: Mail,
      primary: emailAddress,
      href: `mailto:${emailAddress}`,
      label: contact?.email?.label || "Diplomatic Clearance Query",
    },
    {
      icon: Phone,
      primary: phoneNumber,
      href: `tel:${String(phoneNumber).replace(/[^\d+]/g, "")}`,
      label: contact?.phone?.label || "24/7 Consular Emergency Line",
    },
    {
      icon: MapPin,
      primary: contact?.address?.location || "Chancery Enclave, Diplomatic District",
      href: undefined as string | undefined,
      label: contact?.address?.label || "Official Consular Premises",
    },
  ];

  const linkClass =
    "group relative inline-flex items-center gap-2 py-1 text-xs sm:text-sm text-slate-300 transition-colors duration-300 hover:text-[#d4af37]";

  return (
    <footer className="relative w-full max-w-[100vw] overflow-hidden bg-gradient-to-b from-[#07182b] via-[#06152a] to-[#040e1a] text-slate-300 font-sans pt-10 sm:pt-20">
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-[#d4af37]/25 overflow-hidden">
        {!reduce && (
          <motion.span
            className="absolute top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
            initial={{ left: "-33%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>

      <FooterBackground reduce={reduce} />

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 pb-10 sm:pb-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-x-10 lg:gap-12"
        >
          {/* Column 1: Brand */}
          <motion.div variants={columnVariants} custom={0} className="flex flex-col items-start space-y-4">
            <Link href="/" className="inline-flex items-center group py-1">
              <img
                src={typeof logo === "string" ? logo : logo.src}
                alt={typeof logo === "string" ? "Logo" : logo.alt}
                className="h-12 sm:h-20 lg:h-28 w-auto max-w-[260px] sm:max-w-[480px] object-contain drop-shadow-md"
              />
            </Link>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-sm">{aboutText}</p>
            <div className="flex items-center gap-3 pt-1">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white shadow-md transition-shadow duration-300 ${s.bg} ${s.glow}`}
                >
                  <svg className={`${s.size} fill-current`} viewBox="0 0 24 24" aria-hidden>
                    <path d={s.d} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Services */}
          <motion.div variants={columnVariants} custom={1}>
            <ColumnHeading>{servicesHeading}</ColumnHeading>
            <ul>
              {servicesLinks.map((service: { name: string; href: string }, i: number) => (
                <motion.li key={service.name} variants={itemVariants} custom={i}>
                  <Link href={service.href} className={linkClass}>
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#d4af37]" />
                    <span className="leading-snug">{service.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Quick Navigation */}
          <motion.div variants={columnVariants} custom={2}>
            <ColumnHeading>{quickNavHeading}</ColumnHeading>
            <ul>
              {quickNavLinks.map((link: { name: string; href: string }, i: number) => (
                <motion.li key={link.name} variants={itemVariants} custom={i}>
                  <Link href={link.href} className={`${linkClass} font-medium`}>
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#d4af37]" />
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Desk */}
          <motion.div variants={columnVariants} custom={3}>
            <ColumnHeading>{contactHeading}</ColumnHeading>
            <ul className="space-y-4 sm:space-y-5">
              {contactRows.map((row, i) => {
                const Icon = row.icon;
                const body = (
                  <>
                    <span className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full shrink-0 text-[#d4af37] ring-1 ring-[#d4af37]/40 bg-[#d4af37]/10">
                      <Icon className="relative w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs sm:text-sm font-semibold text-white leading-snug break-words">
                        {row.primary}
                      </span>
                      <span className="block text-[11px] sm:text-xs text-[#00c4d6] mt-0.5">{row.label}</span>
                    </span>
                  </>
                );
                return (
                  <motion.li key={row.label} variants={itemVariants} custom={i}>
                    {row.href ? (
                      <a href={row.href} className="group flex items-start gap-3">
                        {body}
                      </a>
                    ) : (
                      <div className="group flex items-start gap-3">{body}</div>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#d4af37]/20 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            {legal?.copyright || "© 2026 Global Diplomatic Mission & Consular Corp. All rights reserved."}
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 cursor-pointer rounded-full"
          >
            <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden>
              <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="2" />
              <motion.circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="#d4af37"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength: ringProgress }}
              />
            </svg>
            <span className="absolute inset-[6px] sm:inset-[7px] flex items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] to-[#e2a32d] text-[#07182b] shadow-lg">
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}