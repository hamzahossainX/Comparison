/**
 * Next.js configuration — Claude build.
 *
 * PAGES_BASE_PATH contract (shared by all three builds in this repository):
 *
 *   Set PAGES_BASE_PATH ONLY in the GitHub Pages deployment workflow, to the subpath this
 *   build is served from — e.g. "/Comparison/claude". It switches the build to a fully
 *   static export (`out/`) and rewrites every asset and route URL for that subpath.
 *
 *   Left unset (the normal case) nothing changes: `npm run dev` and `npm run build` behave
 *   exactly as they always have, served from the root path.
 *
 * This build renders all of its product visuals procedurally, so it pulls no remote images
 * and needs no image-optimizer configuration.
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
  reactStrictMode: true,
  // three ships untranspiled ESM examples; let Next handle them.
  transpilePackages: ['three'],
};

export default nextConfig;
