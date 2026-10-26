import Link from "next/link";
import { ArrowRight } from "lucide-react";
import websiteData from "@/data/websiteData.json";

export default function AppointmentView() {
  const data = (websiteData as any).categories.DiplomaticMission.sections.Appointment.variants.DiplomaticAppointment1;

  return (
    <section id="appointment" className="w-full min-h-[92vh] flex items-center justify-center py-12">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
        
        {/* Left Column: Heading, Text, Button & Landscape Photo */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-700">
                {data.badge}
              </span>
              <span className="w-12 h-[1.5px] bg-amber-600/40" />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-slate-900 leading-[1.12]">
              {data.headingLine}{" "}
              <span className="text-amber-600 font-normal">
                {data.headingHighlight}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl">
              {data.description}
            </p>

            <div className="pt-2">
              <Link
                href={data.button.href}
                className="inline-flex items-center gap-2.5 rounded-md bg-[#996533] hover:bg-[#805429] text-white px-7 py-3 text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-sm hover:shadow"
              >
                {data.button.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="w-full h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-sm border border-sky-200/60 mt-4">
            <img
              src={data.images.landscape.src}
              alt={data.images.landscape.alt}
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Right Column: Tall Vertical Portrait Photo */}
        <div className="lg:col-span-6 h-full min-h-[480px] lg:min-h-[640px] rounded-2xl overflow-hidden shadow-sm border border-sky-200/60">
          <img
            src={data.images.portrait.src}
            alt={data.images.portrait.alt}
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
          />
        </div>

      </div>
    </section>
  );
}