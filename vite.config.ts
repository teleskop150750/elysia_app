import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'

export default defineConfig({
  plugins: [
    nitro({
      preset: 'aws-lambda',
    }),
  ],
  // environments: {
  //   ssr: {
  //     build: {
  //       rollupOptions: { input: "./src/server.ts" },
  //     },
  //   },
  // },
})
