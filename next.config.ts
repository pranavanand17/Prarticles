import path from "path";
import type { NextConfig } from "next";

/**
 * GitHub Pages hosts only static files. `output: "export"` produces an `out/` directory.
 *
 * For project sites (`username.github.io/repo-name`), set NEXT_BASE_PATH=/repo-name when building
 * (the included workflow does this automatically). User/org sites named `username.github.io` use
 * an empty base path at the domain root.
 */
const basePathRaw = process.env.NEXT_BASE_PATH?.trim();
const basePath =
  basePathRaw && basePathRaw.length > 0
    ? basePathRaw.startsWith("/")
      ? basePathRaw
      : `/${basePathRaw}`
    : undefined;

const nextConfig: NextConfig = {
  /* Prefer this repo as the tracing root when another lockfile exists in a parent folder. */
  outputFileTracingRoot: path.join(__dirname),
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: {
    /**
     * GitHub Pages deploys a static export; we don’t want deploys blocked by local ESLint plugin
     * resolution issues. Run `npm run lint` separately if you want lint-gated builds.
     */
    ignoreDuringBuilds: true,
  },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
