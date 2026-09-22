/**
 * Next.js configuration — KIMI-K3 build.
 *
 * PAGES_BASE_PATH contract (shared by all three builds in this repository):
 *
 *   Set PAGES_BASE_PATH ONLY in the GitHub Pages deployment workflow, to the subpath this
 *   build is served from — e.g. "/Comparison/kimi-k3". It switches the build to a fully
 *   static export (`out/`) and rewrites every asset and route URL for that subpath.
 *
 *   Left unset (the normal case) nothing changes: `npm run dev` and `npm run build` behave
 *   exactly as they always have, served from the root path.
 */

/** @type {import('next').NextConfig} */
const basePath = process.env.PAGES_BASE_PATH ?? '';
const isExport = basePath !== '';

const nextConfig = {
  ...(isExport && {
    output: 'export',
    basePath,
    assetPrefix: `${basePath}/`,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
  transpilePackages: ["three"],
};

export default nextConfig;
