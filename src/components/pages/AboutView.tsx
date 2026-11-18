"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ShieldCheck, Globe2, Scale, Users2, ArrowRight } from "lucide-react";
import websiteData from "@/data/websiteData.json";

// Dynamic Icon Registry
const ICON_MAP = {
  ShieldCheck,
  Globe2,
  Scale,
  Users2,
};

/* ---------- Motion variants ---------- */
const wordVariant: Variants = {
  hidden: { opacity: 0 },
  show: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: 0.05 + i * 0.04, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ---------- Rotating text badge ---------- */
function SpinBadge({ spin, badgeText }: { spin: boolean; badgeText: string }) {
  return (
    <div className="relative w-24 h-24 sm:w-32 sm:h-32">
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        animate={spin ? { rotate: 360 } : undefined}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <defs>
          <path id="about-badge-circle" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <circle cx="100" cy="100" r="98" fill="#0c4a6e" />
        <text className="fill-amber-300" style={{ fontSize: 15, letterSpacing: "3px", fontWeight: 600 }}>
          <textPath href="#about-badge-circle">
            {badgeText}
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-lg">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-sky-950" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Animated background (Optimized) ---------- */
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  left: (i * 53 + 7) % 100,
  top: (i * 37 + 11) % 100,
  size: 3 + (i % 3) * 2,
  dur: 6 + (i % 3) * 2,
  delay: (i % 5) * 0.5,
  amber: i % 3 === 0,
}));

function AnimatedBackground({ reduce }: { reduce: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#0284c7_1px,transparent_1px)] [background-size:30px_30px]"
      />
      {!reduce && PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full ${p.amber ? "bg-amber-400" : "bg-sky-400"}`}
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, willChange: "transform, opacity" }}
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

export default function AboutView() {
  const reduce = !!useReducedMotion();

  // 100% Strict JSON Data Extraction
  const aboutData = (websiteData as any).categories.DiplomaticMission.sections.About.variants.DiplomaticAbout1;

  const headingWords1 = (aboutData.headingLine1 || "").split(" ");
  const headingWords2 = (aboutData.headingHighlight || aboutData.headingLine2 || "").split(" ");
  const images = aboutData.images || { arch: aboutData.image, circle: aboutData.image, blob: aboutData.image };
  const highlights = aboutData.highlights || aboutData.bullets || [];
  const ctaButton = aboutData.ctaButton || aboutData.cta || { text: "Explore Mission Architecture", href: "/about" };

  return (
    <section
      id="about"
      className="relative w-full max-w-[100vw] overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#f0f9ff] via-white to-[#fffaf0] px-4 sm:px-8 lg:px-14 py-12 sm:py-16"
    >
      <AnimatedBackground reduce={reduce} />

      <div className="relative z-10 w-full max-w-[1450px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* ================= LEFT: organic image composition ================= */}
        <div className="lg:col-span-6 relative h-[280px] xs:h-[320px] sm:h-[420px] lg:h-[500px] w-full">
          {/* Arch */}
          <div className="absolute left-2 top-0 w-[50%] sm:w-[58%] h-[75%] sm:h-[82%]">
            <div className="w-full h-full">
              <img
                src={images.arch || "/hero2.jpg"}
                alt="Diplomatic bilateral meeting"
                className="w-full h-full object-cover rounded-t-[999px] rounded-b-[30px] sm:rounded-b-[48px] shadow-lg"
              />
            </div>
          </div>

          {/* Circle */}
          <div className="absolute right-2 top-[4%] w-[38%] sm:w-[36%] aspect-square">
            <div className="w-full h-full">
              <img
                src={images.circle || "/hero1.jpg"}
                alt="Delegations in assembly"
                className="w-full h-full object-cover rounded-full ring-[3px] sm:ring-[6px] ring-white shadow-md"
              />
            </div>
          </div>

          {/* Blob */}
          <div className="absolute right-4 bottom-2 w-[44%] sm:w-[50%] h-[38%] sm:h-[42%]">
            <div className="w-full h-full">
              <img
                src={images.blob || "/hero3.png"}
                alt="Mission strategic accord"
                className="w-full h-full object-cover ring-[3px] sm:ring-[6px] ring-white shadow-md rounded-[62%_38%_55%_45%/52%_58%_42%_48%]"
              />
            </div>
          </div>

          {/* Spinning badge */}
          <div className="absolute left-[32%] sm:left-[42%] bottom-0 drop-shadow-lg scale-75 sm:scale-100">
            <SpinBadge spin={!reduce} badgeText={aboutData.badgeText || "DIPLOMATIC MISSION • SECURE •"} />
          </div>
        </div>

        {/* ================= RIGHT: open content ================= */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="lg:col-span-6 w-full text-left"
        >
          {/* Label with growing line */}
          <motion.div variants={fadeUp} custom={-3} className="flex items-center gap-3 mb-3">
            <span className="block h-[2px] w-10 sm:w-12 origin-left bg-gradient-to-r from-amber-500 to-sky-500" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-sky-800 uppercase">{aboutData.badge}</span>
          </motion.div>

          {/* Heading (Fixed cut-off issue by removing overflow-hidden & adding right padding/margin) */}
          <h2 className="font-serif font-bold text-slate-800 tracking-tight leading-[1.2] text-2xl xs:text-3xl sm:text-4xl lg:text-[46px] py-1">
            <span className="block mb-1">
              {headingWords1.map((w: string, i: number) => (
                <span key={w + i} className="inline-block align-bottom pr-[0.25em]">
                  <motion.span variants={wordVariant} custom={i} className="inline-block">
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="block pr-4 mr-2">
              {headingWords2.map((w: string, i: number) => (
                <span key={w + i} className="inline-block align-bottom pr-[0.35em] mr-1 pb-[0.1em]">
                  <motion.span
                    variants={wordVariant}
                    custom={i + headingWords1.length}
                    className="inline-block"
                  >
                    <span
                      className="bg-clip-text text-transparent font-medium italic bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 pr-2"
                      style={{ backgroundSize: "200% 100%" }}
                    >
                      {w}
                    </span>
                  </motion.span>
                </span>
              ))}
            </span>
          </h2>

          {/* Paragraph */}
          <motion.div variants={fadeUp} custom={1} className="relative mt-4 pl-4 sm:pl-5 max-w-xl">
            <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400" />
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              {aboutData.description}
            </p>
          </motion.div>

          {/* Highlights */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 max-w-2xl">
            {highlights.map((item: any, idx: number) => {
              const isString = typeof item === "string";
              const titleText = isString ? item : item.title;
              const subtitleText = isString ? "" : item.subtitle;
              
              const icons = [ShieldCheck, Scale, Globe2, Users2];
              const Icon = (!isString && item.icon && ICON_MAP[item.icon as keyof typeof ICON_MAP]) || icons[idx % icons.length];

              return (
                <motion.div key={titleText || idx} variants={fadeUp} custom={idx + 2} className="group relative pb-2 sm:pb-3">
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                    <span className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-sky-100 to-sky-50 text-sky-600 shrink-0 shadow-sm">
                      <Icon className="relative w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-tight">{titleText}</h4>
                      {subtitleText && <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitleText}</p>}
                    </div>
                  </div>
                  <span className="absolute left-0 right-0 bottom-0 h-px bg-sky-200" />
                  <span className="absolute left-0 bottom-0 h-px w-0 bg-amber-500 group-hover:w-full transition-all duration-300" />
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <motion.div variants={fadeUp} custom={7} className="mt-6 sm:mt-8">
            <Link
              href={ctaButton.href}
              className="group relative inline-flex items-center justify-center w-full sm:w-auto gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 px-7 py-3.5 text-xs sm:text-sm font-bold text-slate-950 shadow-[0_12px_30px_-10px_rgba(217,119,6,0.7)] transition-transform duration-300 hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
            >
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 blur-sm transition-transform duration-700 group-hover:translate-x-[450%]" />
              <span className="relative">{ctaButton.text}</span>
              <span className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950 text-amber-300 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}