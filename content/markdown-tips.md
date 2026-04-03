---
title: "Markdown tips for this template"
date: "2026-03-15"
slug: "markdown-tips"
author: "Editorial"
excerpt: "Frontmatter fields, lists, and fences—everything the renderer understands out of the box."
---

Every post starts with YAML **frontmatter**:

- `title` — display headline
- `date` — ISO date string
- `slug` — URL segment at `/post/[slug]`
- `author` — shown under the title (optional)
- `excerpt` — short line on the home list (optional)

## GFM extras

Tables render cleanly:

| Feature        | Status |
| -------------- | ------ |
| GitHub tables  | Yes    |
| Task lists     | Yes    |
| Fenced code    | Yes    |

Task list example:

- [x] Ship the reader
- [ ] Write your next essay

## Inline formatting

Use *italics*, **bold**, and `inline code` when you need emphasis without shouting.

```bash
# Clone and run locally
npm install
npm run dev
```

That is enough to get started—keep files in `content/` and refresh the home page.
