"use client";

import React from "react";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import websiteData from "@/data/websiteData.json";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  pageKey?: string;
  title?: string;
  description?: string;
  bgImage?: string;
  breadcrumbs?: BreadcrumbItem[];
}

// Letter animation variants with explicit any assertion
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.025, delayChildren: 0.1 * i },
  }),
};

const letterVariants: any = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: -40,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 16,
      stiffness: 140,
    },
  },
};

export default function PageBanner({
  pageKey,
  title: propTitle,
  description: propDescription,
  bgImage: propBgImage,
  breadcrumbs: propBreadcrumbs,
}: PageBannerProps) {
  // 100% JSON Integration with fallback props support
  const bannerConfigs = (websiteData as any)?.categories?.DiplomaticMission?.pageBanners || {};
  const config = pageKey && bannerConfigs[pageKey] ? bannerConfigs[pageKey] : null;

  const defaultBg = bannerConfigs?.default?.bgImage || "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1920&auto=format&fit=crop";

  const title = propTitle || config?.title || "Diplomatic Mission";
  const bgImage = propBgImage || config?.bgImage || defaultBg;
  const breadcrumbs: BreadcrumbItem[] = propBreadcrumbs || config?.breadcrumbs || [];

  const letters = Array.from(title);

  return (
    <div className="relative w-full overflow-hidden bg-[#07182b] pt-32 sm:pt-40 pb-12 sm:pb-16 border-b border-[#d4af37]/30">
      
      {/* Background Image with Deep Sovereign Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#07182b]/95 via-[#07182b]/85 to-[#07182b]/65" />
        <div className="absolute inset-0 bg-[radial-gradient(#00c4d6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      </div>

      {/* Main Banner Content */}
      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 w-full space-y-3">
        
        {/* Breadcrumbs Navigation */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold tracking-wide">
          <Link
            href="/"
            className="flex items-center gap-1 text-slate-300 hover:text-[#d4af37] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          {breadcrumbs.map((crumb) => (
            <React.Fragment key={crumb.label}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-slate-300 hover:text-[#d4af37] transition-colors truncate max-w-[200px]"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#d4af37] font-bold truncate max-w-[220px]">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Flying Letters Title Animation */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-xl sm:text-3xl lg:text-4xl font-serif font-black text-white tracking-tight leading-snug drop-shadow-md flex flex-wrap max-w-5xl"
        >
          {letters.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className={`inline-block ${char === " " ? "w-2 sm:w-3" : ""}`}
            >
              {String(char === " " ? "\u00A0" : char)}
            </motion.span>
          ))}
        </motion.h1>

      </div>
    </div>
  );
}