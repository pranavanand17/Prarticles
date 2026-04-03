---
title: "Welcome to Prarticles"
date: "2026-04-01"
slug: "welcome-to-prarticles"
author: "Editorial"
excerpt: "A calm reading surface with markdown on disk—no database, no noise."
---

This site is a **minimal, Medium-style** reader built with [Next.js](https://nextjs.org/) and Tailwind CSS. Articles live as markdown files under `content/`, and the layout stays narrow so your eyes stay relaxed.

## What you get

- Serif typography for long-form text
- Sans-serif chrome for navigation and metadata
- Light and dark themes with a single toggle
- Code blocks with syntax highlighting

## A small code sample

```ts
function readingMinutes(body: string, wpm = 200): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wpm));
}
```

## Pull quotes

> Great typography is about rhythm. Give paragraphs room to breathe and readers will stay longer.

Happy writing.
