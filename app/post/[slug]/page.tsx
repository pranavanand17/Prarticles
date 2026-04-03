import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { ArticleCover } from "@/components/article-cover";
import { markdownToHtml } from "@/lib/markdown";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { estimateReadingMinutes } from "@/lib/reading-time";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function absoluteOgImageUrl(publicPath: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  const path = publicPath.startsWith("/") ? publicPath : `/${publicPath}`;
  return `${base}${path}`;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const ogImage = post.coverImage ? absoluteOgImageUrl(post.coverImage) : undefined;
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      ...(ogImage ? { images: [{ url: ogImage, alt: post.coverAlt ?? post.title }] } : {}),
    },
  };
}

function formatArticleDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export default async function PostPage(props: Props) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await markdownToHtml(post.content);
  const readingMinutes = estimateReadingMinutes(post.content);

  return (
    <article className="mx-auto max-w-read px-5 py-12 sm:px-6 sm:py-16">
      <header className="mb-10 sm:mb-12">
        <h1 className="font-serif text-[2.25rem] font-bold leading-[1.15] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[2.75rem]">
          {post.title}
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-sm text-zinc-400 dark:text-zinc-500">
          <span className="font-medium text-zinc-500 dark:text-zinc-400">{post.author ?? "Editorial"}</span>
          <span aria-hidden className="text-zinc-300 dark:text-zinc-600">
            ·
          </span>
          <time dateTime={post.date}>{formatArticleDate(post.date)}</time>
          <span aria-hidden className="text-zinc-300 dark:text-zinc-600">
            ·
          </span>
          <span>{readingMinutes} min read</span>
        </div>
      </header>

      {post.coverImage ? (
        <ArticleCover
          src={post.coverImage}
          alt={post.coverAlt ?? post.title}
          caption={post.coverCaption}
          href={post.coverHref}
        />
      ) : null}

      <ArticleBody html={html} />
    </article>
  );
}
