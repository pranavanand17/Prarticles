/**
 * Renders pre-compiled HTML from remark/rehype with Medium-like reading typography.
 * Wrapper uses Tailwind Typography (`prose`) plus custom code-block rounding.
 */
export function ArticleBody({ html }: { html: string }) {
  return (
    <div
      className="article-prose prose prose-lg max-w-none font-serif text-[1.125rem] leading-[1.7] text-zinc-800 prose-headings:font-bold prose-headings:tracking-tight prose-p:text-[1.125rem] prose-p:leading-[1.7] prose-a:text-zinc-900 prose-a:underline prose-a:decoration-zinc-300 prose-a:underline-offset-4 prose-a:transition-colors hover:prose-a:decoration-zinc-500 dark:prose-invert dark:text-zinc-200 dark:prose-a:text-zinc-100 dark:prose-a:decoration-zinc-600 dark:hover:prose-a:decoration-zinc-400 sm:text-[1.25rem] sm:prose-p:text-[1.25rem]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
