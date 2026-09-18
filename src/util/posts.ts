/**
 * Server-side helpers for fetching blog posts from the Flask API.
 */

export interface PostData {
  id: string;
  timestamp: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  author: string | null;
  tags: string[];
  published: boolean;
  meta_title: string | null;
  meta_description: string | null;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://nditc.pythonanywhere.com";

export async function getPublishedPosts(): Promise<PostData[]> {
  const res = await fetch(`${BASE_URL}/api/v1/posts/?published=true`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export async function getPublishedPostBySlug(
  slug: string
): Promise<PostData | null> {
  const res = await fetch(
    `${BASE_URL}/api/v1/posts/by-slug/${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}
