import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPublishedPostBySlug, PostData } from "@/util/posts";

type ParamType = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<ParamType>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post: PostData | null = null;
  try {
    post = await getPublishedPostBySlug(slug);
  } catch (err) {
    console.error("Error fetching post for metadata:", err);
  }

  if (!post) {
    return { title: "Post Not Found | NDITC" };
  }

  const title = post.meta_title || `${post.title} | NDITC`;
  const description = post.meta_description || post.excerpt || undefined;
  const url = `/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: post.tags?.length ? post.tags : undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.timestamp
        ? new Date(post.timestamp * 1000).toISOString()
        : undefined,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags?.length ? post.tags : undefined,
      images: post.cover_image_url
        ? [{ url: post.cover_image_url, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const BlogPost = async ({ params }: { params: Promise<ParamType> }) => {
  const { slug } = await params;

  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://nditc.net";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description || post.excerpt || undefined,
    image: post.cover_image_url || undefined,
    datePublished: post.timestamp
      ? new Date(post.timestamp * 1000).toISOString()
      : undefined,
    author: post.author ? { "@type": "Person", name: post.author } : undefined,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F6F6] pb-10 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto w-full max-w-3xl px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>
        </nav>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            {post.excerpt}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-400">
          {post.author && <span>By {post.author}</span>}
          {post.author && <span>•</span>}
          <time dateTime={new Date(post.timestamp * 1000).toISOString()}>
            {formatDate(post.timestamp)}
          </time>
        </div>

        {post.cover_image_url && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="mt-8 w-full rounded-2xl object-cover shadow-md"
          />
        )}

        <div className="markdown mb-10 mt-8 min-h-[30vh] text-left font-Nunito text-lg">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content || ""}</Markdown>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
