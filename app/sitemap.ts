import { MetadataRoute } from "next";
import prisma from "@/lib/database";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://akash-m.vercel.app";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Fetch all works from the database
  const works = await prisma.works.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  // Generate dynamic routes for individual works
  const workRoutes: MetadataRoute.Sitemap = works.map((work) => ({
    url: `${baseUrl}/works/${work.id}`,
    lastModified: work.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...workRoutes];
}
