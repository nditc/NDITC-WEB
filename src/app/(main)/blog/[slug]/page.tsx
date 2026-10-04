import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPublishedPostBySlug, PostData } from "@/util/posts";

type ParamType = { slug: string };

const inter = Inter({ subsets: ["latin"], display: "swap" });
const manrope = Manrope({ subsets: ["latin"], display: "swap" });

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nditc.net";
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
      <article className={`${inter.className} mx-auto w-full max-w-5xl px-4`}>
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

        <h1
          className={`${manrope.className} text-3xl font-bold leading-tight tracking-tighter text-gray-900 md:text-5xl`}
        >
          {post.title}
        </h1>

        {post.excerpt && (
          <p
            className={`${inter.className} mt-4 text-lg leading-relaxed text-gray-600`}
          >
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

        <div className="markdown mb-10 mt-8 min-h-[30vh] text-left text-lg normal-case">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  {...props}
                  className={`${manrope.className} mb-6 mt-10 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-4xl`}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  {...props}
                  className={`${manrope.className} mb-4 mt-8 text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl`}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  {...props}
                  className={`${manrope.className} mb-3 mt-6 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl`}
                />
              ),
              h4: ({ node, ...props }) => (
                <h4
                  {...props}
                  className={`${manrope.className} mb-2 mt-5 text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl`}
                />
              ),
              h5: ({ node, ...props }) => (
                <h5
                  {...props}
                  className={`${manrope.className} mb-2 mt-4 text-base font-bold leading-tight tracking-tight text-gray-900 md:text-lg`}
                />
              ),
              h6: ({ node, ...props }) => (
                <h6
                  {...props}
                  className={`${manrope.className} mb-2 mt-4 text-sm font-bold uppercase leading-tight tracking-tight text-gray-700 md:text-base`}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  {...props}
                  className={`${inter.className} mb-4 leading-relaxed text-gray-800`}
                />
              ),
            }}
          >
            {post.content || ""}
          </Markdown>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
