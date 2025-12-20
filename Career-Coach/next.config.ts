import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev }) => {
    if (dev && config) {
      // Prevent Watchpack from trying to lstat protected Windows system files
      // which causes EINVAL errors when scanning the root drive.
      // Add common protected files/paths to webpack's ignored watchOptions.
      config.watchOptions = {
        ...(config.watchOptions || {}),
        // Use glob string patterns for Watchpack/webpack validation on Windows.
        ignored: [
          "**/node_modules/**",
          "C:\\DumpStack.log.tmp",
          "C:\\System Volume Information/**",
          "C:\\hiberfil.sys",
          "C:\\pagefile.sys",
          "C:\\swapfile.sys",
        ],
      };
    }

    return config;
  },
};

export default nextConfig;
