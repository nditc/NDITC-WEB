import Link from "next/link";
import { LuPenLine } from "react-icons/lu";
import { getPublishedPosts, PostData } from "@/util/posts";

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const LatestBlogs = async () => {
  let posts: PostData[] = [];
  try {
    posts = (await getPublishedPosts()).slice(0, 3);
  } catch (err) {
    console.error("Error fetching latest blog posts:", err);
  }

  if (posts.length === 0) return null;

  return (
    <section className="mt-16 w-full">
      <div className="flex w-screen items-center justify-center gap-3 md:justify-start">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-[010px_20px_15px_10px_#00000024]">
          <LuPenLine className="h-12 w-12 text-gray-800 transition-all hover:rotate-12" />
        </div>
        <h1 className="text-4xl xsm:text-5xl md:text-6xl">LATEST</h1>
        <h1 className="text-4xl text-blue-500 xsm:text-5xl md:text-6xl">
          BLOGS
        </h1>
      </div>

      <div className="mt-10 grid w-full grid-cols-1 gap-7 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.id}
            className="group flex flex-col rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            {post.cover_image_url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="mb-4 h-40 w-full rounded-xl object-cover"
              />
            )}
            <div className="flex flex-wrap items-center gap-2">
              {post.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="mt-1.5 text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="mt-1 line-clamp-3 text-sm text-gray-600">
                {post.excerpt}
              </p>
            )}
            <div className="mt-auto flex items-center gap-2 pt-3 text-xs text-gray-400">
              {post.author && <span>By {post.author}</span>}
              {post.author && <span>•</span>}
              <time dateTime={new Date(post.timestamp * 1000).toISOString()}>
                {formatDate(post.timestamp)}
              </time>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex w-full justify-center">
        <Link
          href="/blog"
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary_light hover:text-primary"
        >
          View all blogs
        </Link>
      </div>
    </section>
  );
};

export default LatestBlogs;
