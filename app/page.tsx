import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

function formatListDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-read px-5 py-16 sm:px-6 sm:py-20">
      <header className="mb-14 sm:mb-16">
        <h1 className="font-serif text-[2.25rem] font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[2.5rem]">
          Recent writing
        </h1>
        <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          Quiet pages, generous spacing, and typography tuned for long reads.
        </p>
      </header>

      <ul className="flex flex-col gap-12">
        {posts.map((post) => (
          <li key={post.slug}>
            <article>
              <Link
                href={`/post/${post.slug}`}
                className="group block rounded-lg outline-none transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-950"
              >
                <h2 className="font-serif text-2xl font-bold leading-snug text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                  {post.title}
                </h2>
                {post.excerpt ? (
                  <p className="mt-3 font-serif text-[1.0625rem] leading-[1.65] text-zinc-600 dark:text-zinc-400">
                    {post.excerpt}
                  </p>
                ) : null}
                <time
                  dateTime={post.date}
                  className="mt-4 block font-sans text-sm text-zinc-400 dark:text-zinc-500"
                >
                  {formatListDate(post.date)}
                </time>
              </Link>
            </article>
          </li>
        ))}
      </ul>

      {posts.length === 0 ? (
        <p className="font-sans text-zinc-500 dark:text-zinc-400">
          No articles yet. Add markdown files to <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">/content</code>.
        </p>
      ) : null}
    </div>
  );
}
