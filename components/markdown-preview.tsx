"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * Client-side preview for the editor; mirrors article typography where practical.
 */
export function MarkdownPreview({ source }: { source: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const codeStyle = !mounted || resolvedTheme !== "dark" ? oneLight : oneDark;

  return (
    <div className="prose prose-lg max-w-none font-serif text-[1.0625rem] leading-[1.7] text-zinc-800 prose-headings:font-bold prose-headings:tracking-tight dark:prose-invert dark:text-zinc-200 sm:text-[1.125rem]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className ?? "");
            const language = match?.[1];
            const code = String(children).replace(/\n$/, "");
            const isBlock = Boolean(className?.includes("language-"));

            if (!isBlock) {
              return (
                <code
                  className="rounded-md border border-zinc-200/80 bg-zinc-100/90 px-1.5 py-0.5 font-mono text-[0.85em] dark:border-zinc-700/80 dark:bg-zinc-800/70"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <SyntaxHighlighter
                style={codeStyle}
                language={language ?? "text"}
                PreTag="div"
                customStyle={{
                  marginTop: "1.5rem",
                  marginBottom: "1.5rem",
                  borderRadius: "0.75rem",
                  fontSize: "0.88em",
                  lineHeight: 1.6,
                }}
              >
                {code}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
