import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import preload from "vite-plugin-preload";

export default defineConfig({
  plugins: [react(), preload()],
  envPrefix: "CH_",
  envDir: "./",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "/src/css/global.scss";`,
      },
    },
  },
});
