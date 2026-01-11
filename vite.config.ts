import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [nitro()],
  nitro: {
    preset: "standard",
  },
  environments: {
    ssr: {
      build: {
        rollupOptions: {
          input: "./src/index.ts",
          external: ["bun"],
        },
      },
      resolve: {
        external: ["bun"],
      },
    },
  },
  resolve: {
    conditions: ["node"],
  },
  ssr: {
    external: ["bun"],
  },
});
