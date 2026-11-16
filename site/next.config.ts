import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build a fully static site into `out/` for GitHub Pages.
  output: "export",
  // Emit /projects/index.html instead of /projects.html, which GitHub Pages serves most reliably.
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
