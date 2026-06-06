import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const frontendDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(frontendDir, "..");

const nextConfig: NextConfig = {
  output: "standalone",
  // Monorepo: trace files from repo root for standalone Docker/Vercel output.
  outputFileTracingRoot: repoRoot,
};

export default nextConfig;
