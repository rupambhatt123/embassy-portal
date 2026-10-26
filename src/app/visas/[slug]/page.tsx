import { notFound } from "next/navigation";
import websiteData from "@/data/websiteData.json";
import VisaDetailView from "./VisaDetailView";

const visaDetailConfig = (websiteData as any).categories.DiplomaticMission.sections.VisaDetailPage.variants.DiplomaticVisaDetail1;
const ALL_VISAS = visaDetailConfig.visas || [];

export async function generateStaticParams() {
  if (ALL_VISAS.length === 0) {
    return [{ slug: "default-visa" }];
  }
  return ALL_VISAS.map((visa: any) => ({
    slug: visa.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const visa = ALL_VISAS.find((v: any) => v.slug === slug);

  if (!visa) {
    notFound();
  }

  return <VisaDetailView visa={visa} slug={slug} />;
}