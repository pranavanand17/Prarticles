import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur-md transition-colors duration-200 dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-read items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <Link
          href="/"
          className="font-sans text-sm font-semibold tracking-tight text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
        >
          Prarticles
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="font-sans text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Articles
          </Link>
          <Link
            href="/about"
            className="font-sans text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            About Me
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
