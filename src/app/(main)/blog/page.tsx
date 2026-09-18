import type { Metadata } from "next";
import Link from "next/link";
import { LuPenLine } from "react-icons/lu";
import { getPublishedPosts, PostData } from "@/util/posts";

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

const Blog = async () => {
  let posts: PostData[] = [];
  let error: string | null = null;

  try {
    posts = await getPublishedPosts();
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    error = "general";
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F6F6] pb-10 pt-32">
      {/* Header */}
      <div className="container flex w-screen items-center justify-center gap-3 md:justify-start">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-[010px_20px_15px_10px_#00000024]">
          <LuPenLine className="h-12 w-12 text-gray-800 transition-all hover:rotate-12" />
        </div>
        <h1 className="text-4xl xsm:text-5xl md:text-6xl">THE</h1>
        <h1 className="text-4xl text-blue-500 xsm:text-5xl md:text-6xl">
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
                className="group flex w-full max-w-3xl flex-col gap-4 rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg sm:flex-row"
              >
                {post.cover_image_url && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="h-44 w-full rounded-xl object-cover sm:w-56"
                  />
                )}
                <div className="flex flex-1 flex-col justify-between gap-2">
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
                    <h2 className="mt-1.5 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    {post.author && <span>By {post.author}</span>}
                    {post.author && <span>•</span>}
                    <time dateTime={new Date(post.timestamp * 1000).toISOString()}>
                      {formatDate(post.timestamp)}
                    </time>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
