import { notFound } from "next/navigation";
import websiteData from "@/data/websiteData.json";
import ServiceDetailView from "./ServiceDetailView";

export async function generateStaticParams() {
  const data = (websiteData as any)?.categories?.DiplomaticMission?.sections?.Services?.variants?.DiplomaticServices1?.items || [];
  
  if (data.length === 0) {
    return [{ slug: "default-service" }];
  }

  return data.map((service: any) => ({
    slug: service.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const servicesData = (websiteData as any)?.categories?.DiplomaticMission?.sections?.Services?.variants?.DiplomaticServices1?.items || [];
  const service = servicesData.find((s: any) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailView service={service} allServices={servicesData} slug={slug} />;
}