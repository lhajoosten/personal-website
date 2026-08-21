import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import { contactApiPlugin } from "./scripts/contact-api-plugin.ts";
import { writeSiteFiles } from "./scripts/write-site-files.ts";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.RESEND_API_KEY ??= env.RESEND_API_KEY;
  process.env.CONTACT_TO_EMAIL ??= env.CONTACT_TO_EMAIL;
  process.env.CONTACT_FROM_EMAIL ??= env.CONTACT_FROM_EMAIL;

  return {
    plugins: [
      react(),
      tailwindcss(),
      contactApiPlugin(),
      {
        name: "site-files",
        buildStart() {
          writeSiteFiles();
        },
      },
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ["@duckdb/duckdb-wasm"],
    },
    worker: {
      format: "es",
    },
    test: {
      environment: "node",
      include: ["src/**/*.test.ts"],
    },
  };
});
