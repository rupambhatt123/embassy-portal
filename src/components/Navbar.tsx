"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Menu, X } from "lucide-react";
import websiteData from "@/data/websiteData.json";

export default function Navbar() {
  const pathname = usePathname();
  const [clickedPath, setClickedPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Reset clickedPath when the route fully changes
  useEffect(() => {
    setClickedPath(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerData =
    (websiteData as any)?.categories?.DiplomaticMission?.sections?.Header?.variants?.DiplomaticHeader1 || {};
  
  const navLinks = headerData?.navLinks || [];
  const ctaButton = headerData?.ctaButton || { text: "BOOK APPOINTMENT", path: "/appointment" };

  // Use clickedPath immediately on click, fallback to pathname
  const activeRoute = clickedPath !== null ? clickedPath : pathname;

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#07182b]/95 backdrop-blur-md shadow-xl border-b border-[#d4af37]/30 h-20" 
          : "bg-transparent h-24"
      }`}
    >
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 h-full flex items-center justify-between">
        
        {/* Left Side: Logo (Large on Desktop, Compact on Phone) */}
        <Link href="/" onClick={() => setClickedPath("/")} className="h-full flex items-center group shrink-0 py-1">
          <img
            src="/logo.png"
            alt="Global Diplomatic Mission"
            className="h-[90%] sm:h-[105%] w-auto max-w-[240px] sm:max-w-[480px] md:max-w-[640px] xl:max-w-[800px] object-contain drop-shadow-2xl transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Middle: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 shadow-lg mx-auto">
          {navLinks.map((link: { title: string; path: string }, index: number) => {
            const isActive = activeRoute === link.path;
            return (
              <Link
                key={`${link.title}-${index}`}
                href={link.path}
                onClick={() => setClickedPath(link.path)}
                className={`px-4 py-1.5 rounded-full text-[14px] font-black tracking-wider uppercase transition-all ${
                  isActive ? "bg-[#d4af37] text-[#07182b]" : "text-white hover:text-[#d4af37] hover:bg-white/10"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={ctaButton.path || "/appointment"}
            onClick={() => setClickedPath(ctaButton.path || "/appointment")}
            className="hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e2a32d] to-[#d4af37] text-[#07182b] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shrink-0"
          >
            <Calendar className="w-4 h-4 text-[#07182b] stroke-[2.5]" />
            <span>{ctaButton.text || "BOOK APPOINTMENT"}</span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="xl:hidden p-2.5 rounded-xl bg-white/10 border border-white/20 text-white hover:text-[#d4af37] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-[#d4af37]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {isOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-[#07182b]/98 backdrop-blur-xl border-b border-[#d4af37]/30 shadow-2xl px-6 py-6 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link: { title: string; path: string }, index: number) => {
              const isActive = activeRoute === link.path;
              return (
                <Link
                  key={`mob-${link.title}-${index}`}
                  href={link.path}
                  onClick={() => {
                    setClickedPath(link.path);
                    setIsOpen(false);
                  }}
                  className={`text-sm font-black tracking-wider uppercase py-3 px-4 rounded-xl transition-colors ${
                    isActive 
                      ? "bg-[#d4af37] text-[#07182b]" 
                      : "text-slate-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-white/10 sm:hidden">
              <Link
                href={ctaButton.path || "/appointment"}
                onClick={() => {
                  setClickedPath(ctaButton.path || "/appointment");
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2.5 w-full rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e2a32d] to-[#d4af37] py-3 text-xs font-black text-[#07182b] uppercase tracking-wider shadow-lg"
              >
                <Calendar className="w-4 h-4 stroke-[2.5]" />
                <span>{ctaButton.text || "BOOK APPOINTMENT"}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}