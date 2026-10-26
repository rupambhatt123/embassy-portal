"use client";

import React from "react";
import HeroSection from "@/components/pages/HeroSection";
import AboutView from "@/components/pages/AboutView";
import ServicesView from "@/components/pages/ServicesView";
import VisaView from "@/components/pages/VisaView";
import StaffView from "@/components/pages/StaffView";
import BlogsView from "@/components/pages/BlogsView";


export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-[#f8fafc] overflow-x-hidden">
      <HeroSection />
      <AboutView />
      <ServicesView />
      <VisaView />
      <StaffView />
      <BlogsView />
     
    </main>
  );
}