import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type PostMeta = {
  title: string;
  date: string;
  slug: string;
  excerpt?: string;
  author?: string;
  /** Path under `public/`, e.g. `/images/cover.png` */
  coverImage?: string;
  /** Shown under the cover; use with `coverHref` for a linked caption. */
  coverCaption?: string;
  coverHref?: string;
  coverAlt?: string;
};

export type Post = PostMeta & { content: string };

function readMarkdownFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
}

/**
 * All posts sorted by date (newest first). Uses frontmatter only for the list view.
 */
export function getAllPosts(): PostMeta[] {
  const posts = readMarkdownFiles().map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    return {
      title: String(data.title ?? ""),
      date: String(data.date ?? ""),
      slug: String(data.slug ?? ""),
      excerpt: data.excerpt != null ? String(data.excerpt) : undefined,
      author: data.author != null ? String(data.author) : undefined,
      coverImage: data.coverImage != null ? String(data.coverImage) : undefined,
      coverCaption: data.coverCaption != null ? String(data.coverCaption) : undefined,
      coverHref: data.coverHref != null ? String(data.coverHref) : undefined,
      coverAlt: data.coverAlt != null ? String(data.coverAlt) : undefined,
    } satisfies PostMeta;
  });

  return posts.sort((a, b) => {
    const tb = new Date(b.date).getTime();
    const ta = new Date(a.date).getTime();
    return tb - ta;
  });
}

/** Full post by slug, or null if missing. */
export function getPostBySlug(slug: string): Post | null {
  for (const file of readMarkdownFiles()) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    if (String(data.slug) === slug) {
      return {
        title: String(data.title ?? ""),
        date: String(data.date ?? ""),
        slug: String(data.slug ?? ""),
        excerpt: data.excerpt != null ? String(data.excerpt) : undefined,
        author: data.author != null ? String(data.author) : undefined,
        coverImage: data.coverImage != null ? String(data.coverImage) : undefined,
        coverCaption: data.coverCaption != null ? String(data.coverCaption) : undefined,
        coverHref: data.coverHref != null ? String(data.coverHref) : undefined,
        coverAlt: data.coverAlt != null ? String(data.coverAlt) : undefined,
        content: content.trim(),
      };
    }
  }
  return null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
