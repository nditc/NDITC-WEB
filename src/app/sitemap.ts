import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/util/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nditc.net";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/blog",
    "/activities",
    "/notifications",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  let posts: MetadataRoute.Sitemap = [];
  try {
    const published = await getPublishedPosts();
    posts = published.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.timestamp
        ? new Date(post.timestamp * 1000)
        : new Date(),
    }));
  } catch (err) {
    console.error("Error fetching posts for sitemap:", err);
  }

  return [...staticRoutes, ...posts];
}
