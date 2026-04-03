import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

/**
 * Permit classes / styles Shiki uses inside code blocks while sanitizing the rest.
 * Content is local `.md` files only; this still reduces risk if frontmatter is ever exposed.
 */
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    span: [...(defaultSchema.attributes?.span ?? []), "className", "style"],
    code: [...(defaultSchema.attributes?.code ?? []), "className", "style"],
    pre: [...(defaultSchema.attributes?.pre ?? []), "className", "style", "dataLine", "dataLanguage", "dataTheme"],
  },
};

/**
 * Turn markdown into an HTML string for article bodies (server-rendered).
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
