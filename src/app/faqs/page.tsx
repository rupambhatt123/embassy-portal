"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Plus, HelpCircle, ShieldAlert } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import websiteData from "@/data/websiteData.json";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const rowVariant: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FaqRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.li variants={rowVariant} custom={index} className="relative group list-none">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-100/70 via-sky-100/30 to-transparent"
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        aria-hidden
        className="absolute left-0 top-2 bottom-2 w-[3px] origin-top rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-sky-400"
        animate={{ scaleY: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="relative w-full flex items-start gap-4 py-4 pl-4 pr-2 text-left cursor-pointer outline-none rounded-md"
      >
        <motion.span
          className="font-serif text-2xl font-bold leading-none tabular-nums pt-0.5 shrink-0 w-9"
          animate={{ color: isOpen ? "#d97706" : "#7dd3fc", x: isOpen ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {String(item.id).padStart(2, "0")}
        </motion.span>

        <span
          className={`flex-1 text-sm sm:text-base font-semibold leading-snug transition-colors duration-200 ${
            isOpen ? "text-slate-900" : "text-slate-700 group-hover:text-sky-700"
          }`}
        >
          {item.question}
        </span>

        <motion.span
          className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-colors duration-200 ${
            isOpen
              ? "bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-[0_6px_15px_-4px_rgba(217,119,6,0.6)]"
              : "bg-sky-100/80 text-sky-700 group-hover:bg-amber-100 group-hover:text-amber-700"
          }`}
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <motion.p
              initial={{ y: -6 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
              className="pl-[3.75rem] pr-10 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal"
            >
              {item.answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="absolute left-0 right-0 bottom-0 h-px bg-sky-200" />
      <span
        className={`absolute left-0 bottom-0 h-px bg-amber-500 transition-all duration-300 ${
          isOpen ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </motion.li>
  );
}

export default function FaqsPage() {
  // 100% Strict JSON Data Connection
  const data = (websiteData as any).categories.DiplomaticMission.sections.FaqsPage.variants.DiplomaticFaqsPage1;
  const banner = data.banner;
  const faqItems: FaqItem[] = data.faqs;
  const helpNotice = data.helpNotice;

  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  const midpoint = Math.ceil(faqItems.length / 2);
  const leftColumn = faqItems.slice(0, midpoint);
  const rightColumn = faqItems.slice(midpoint);

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#eaf4fc]/40 via-white to-[#fffaf0]/40 text-slate-900 font-sans pb-24">
      {/* 1. Page Banner with Flying Title */}
      <PageBanner
        title={banner.title}
        bgImage={banner.bgImage}
        breadcrumbs={banner.breadcrumbs}
      />

      <div className="max-w-[1350px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 space-y-8">
        
        {/* 2-Column Accordion Layout */}
        {faqItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 items-start">
            <motion.ul initial="hidden" animate="show" className="space-y-1">
              {leftColumn.map((item, i) => (
                <FaqRow
                  key={item.id}
                  item={item}
                  index={i}
                  isOpen={openId === item.id}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </motion.ul>

            <motion.ul initial="hidden" animate="show" className="space-y-1">
              {rightColumn.map((item, i) => (
                <FaqRow
                  key={item.id}
                  item={item}
                  index={i + midpoint}
                  isOpen={openId === item.id}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </motion.ul>
          </div>
        ) : (
          <div className="py-16 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-sky-300 mx-auto" />
            <p className="text-sm font-medium text-slate-500">
              {data.emptyStateText}
            </p>
          </div>
        )}

        {/* Consular Desk Help Notice */}
        <div className="mt-8 rounded-2xl border border-sky-200 bg-sky-50/70 p-5 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{helpNotice.text}</span>
          </div>
          <Link
            href={helpNotice.buttonHref}
            className="px-4 py-2 rounded-xl bg-sky-800 hover:bg-slate-900 text-white font-mono font-bold uppercase tracking-wider transition-colors shrink-0"
          >
            {helpNotice.buttonLabel}
          </Link>
        </div>

      </div>
    </main>
  );
}