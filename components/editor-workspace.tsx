"use client";

import { useMemo, useState } from "react";
import { MarkdownPreview } from "@/components/markdown-preview";

const STARTER = `---
title: "Draft in the editor"
date: "2026-04-01"
slug: "draft-example"
author: "You"
excerpt: "Paste frontmatter and body here to preview."
---

## Why this exists

Use the **split** layout on a wide screen, or switch to **preview** when you are on the go.

- Lists work
- *Emphasis* works
- \`inline code\` works

\`\`\`ts
export function greet(name: string) {
  return \`Hello, $\{name}\`;
}
\`\`\`

> Blockquotes stay calm and readable.
`;

type LayoutMode = "split" | "preview" | "edit";

/**
 * Simple markdown workspace: textarea + live preview with a responsive layout toggle.
 */
export function EditorWorkspace() {
  const [markdown, setMarkdown] = useState(STARTER);
  const [layout, setLayout] = useState<LayoutMode>("split");

  const charCount = useMemo(() => markdown.length, [markdown]);
  const wordCount = useMemo(() => {
    const w = markdown.trim().split(/\s+/).filter(Boolean);
    return w.length;
  }, [markdown]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 max-w-read">
        <h1 className="font-serif text-[2rem] font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[2.25rem]">
          Markdown editor
        </h1>
        <p className="mt-2 font-sans text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Compose in the pane below. Preview updates instantly. Articles on the site live in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">/content</code> as
          markdown files.
        </p>
        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-sans text-xs text-zinc-400 dark:text-zinc-500">
          <div>
            <dt className="inline font-medium text-zinc-500 dark:text-zinc-400">Words</dt>
            <dd className="ml-1 inline">{wordCount}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-zinc-500 dark:text-zinc-400">Characters</dt>
            <dd className="ml-1 inline">{charCount}</dd>
          </div>
        </dl>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-2 font-sans text-sm">
        <span className="mr-1 text-zinc-500 dark:text-zinc-400">Layout</span>
        {(
          [
            ["split", "Split"],
            ["edit", "Edit only"],
            ["preview", "Preview only"],
          ] as const
        ).map(([mode, label]) => (
          <button
            key={mode}
            type="button"
            onClick={() => setLayout(mode)}
            className={`rounded-full border px-3 py-1.5 transition-all duration-200 ease-smooth ${
              layout === mode
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        className={`grid min-h-[60vh] gap-6 ${layout === "split" ? "lg:grid-cols-2" : "grid-cols-1"}`}
      >
        {(layout === "split" || layout === "edit") && (
          <label className="flex min-h-0 flex-col font-sans">
            <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
              Markdown
            </span>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              spellCheck={false}
              className="min-h-[50vh] w-full flex-1 resize-y rounded-xl border border-zinc-200 bg-white p-4 font-mono text-sm leading-relaxed text-zinc-900 shadow-sm outline-none transition-[border-color,box-shadow] duration-200 ease-smooth placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
              placeholder="Write markdown..."
            />
          </label>
        )}

        {(layout === "split" || layout === "preview") && (
          <div className="flex min-h-0 min-h-[50vh] flex-col overflow-auto rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/30 sm:p-6">
            <span className="mb-4 block font-sans text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
              Preview
            </span>
            <div className="min-w-0 flex-1">
              <MarkdownPreview source={markdown} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
