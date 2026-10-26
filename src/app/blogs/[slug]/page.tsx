import React from "react";
import websiteData from "@/data/websiteData.json";
import BlogDetailView from "./BlogDetailView";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const data = (websiteData as any).categories.DiplomaticMission.sections.BlogDetailPage.variants.DiplomaticBlogDetail1;
  const allBlogsData = data.blogs || [];
  return allBlogsData.map((blog: any) => ({
    slug: blog.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = (websiteData as any).categories.DiplomaticMission.sections.BlogDetailPage.variants.DiplomaticBlogDetail1;
  const allBlogsData = data.blogs || [];
  const blog = allBlogsData.find((b: any) => b.slug === slug);

  if (!blog) {
    notFound();
  }

return <BlogDetailView blog={blog} allBlogsData={allBlogsData} data={data} deskSection={data.deskSection} slug={slug} />;}