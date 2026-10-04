import type { Metadata } from "next";
import Link from "next/link";
import { LuPenLine } from "react-icons/lu";
import { getPublishedPosts, PostData } from "@/util/posts";

type BlogProps = {
  searchParams: Promise<{ page?: string }>;
};

export const metadata: Metadata = {
  title: "Blog | NDITC",
  description:
    "Stories, updates and articles from the NDC IT Club — written by members, for everyone.",
  alternates: { canonical: "/blog" },
};

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const Blog = async ({ searchParams }: BlogProps) => {
  let posts: PostData[] = [];
  let currentPage = 1;
  let hasPrevious = false;
  let hasNext = false;
  let error: string | null = null;

  try {
    const params = await searchParams;
    currentPage = Math.max(Number(params.page ?? "1") || 1, 1);
    const result = await getPublishedPosts(currentPage, 10);
    posts = result.items;
    hasPrevious = result.has_previous;
    hasNext = result.has_next;
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    error = "general";
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F6F6] pb-10 pt-32">
      {/* Header */}
      <div className="container flex w-screen items-center justify-center gap-3.5 md:justify-start">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white shadow-md">
          <LuPenLine className="h-6 w-6 text-gray-800 transition-all hover:rotate-12" />
        </div>
        <h1 className="text-[2.5rem] leading-none md:text-5xl">THE</h1>
        <h1 className="text-[2.5rem] leading-none text-blue-500 md:text-5xl">
          BLOG
        </h1>
      </div>

      <div className="flex w-screen justify-center">
        <div className="container mt-10 flex flex-col items-center gap-7">
          {/* Error */}
          {error === "general" && (
            <div className="w-full max-w-2xl rounded-xl border border-red-200 bg-red-50 p-4 text-center">
              <p className="text-red-700">
                Failed to load blog posts. Please try again later.
              </p>
            </div>
          )}

          {/* No Data */}
          {!error && posts.length === 0 && (
            <div className="w-full max-w-2xl rounded-xl bg-gray-100 p-8 text-center text-zinc-400">
              <p className="text-lg">No Posts Yet</p>
              <p className="mt-1 text-sm">Check back later for new stories</p>
            </div>
          )}

          {/* Main Data */}
          {!error &&
            posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id}
                className="group flex w-full max-w-5xl flex-col gap-5 rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg sm:flex-row sm:items-center"
              >
                {post.cover_image_url && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="h-48 w-full shrink-0 rounded-xl object-cover sm:h-44 sm:w-64 md:w-72 lg:w-80"
                  />
                )}
                <div className="flex flex-1 flex-col justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      {post.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="mt-2 font-sans text-xl font-bold leading-snug tracking-normal text-gray-900 transition-colors group-hover:text-blue-600 sm:text-2xl">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-600">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
                    {post.author && <span>By {post.author}</span>}
                    {post.author && <span>•</span>}
                    <time dateTime={new Date(post.timestamp * 1000).toISOString()}>
                      {formatDate(post.timestamp)}
                    </time>
                  </div>
                </div>
              </Link>
            ))}

          {!error && posts.length > 0 && (hasPrevious || hasNext) && (
            <nav className="flex items-center gap-4" aria-label="Blog pagination">
              {hasPrevious ? (
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary_light hover:text-primary"
                >
                  Previous
                </Link>
              ) : (
                <span className="px-5 py-2.5 text-sm text-gray-400">Previous</span>
              )}
              <span className="text-sm text-gray-500">Page {currentPage}</span>
              {hasNext ? (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary_light hover:text-primary"
                >
                  Next
                </Link>
              ) : (
                <span className="px-5 py-2.5 text-sm text-gray-400">Next</span>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
