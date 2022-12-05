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
        additionalData: `$primaryColor: #000000;
        $secondaryColor: #343a40;
        $secondaryLightColor: #6c757d;
        $errorColor: #ffd166;
        $infoColor: #cedbdd;
        $infoLightColor: #ffffff;
        $bg-color: #ff006e;
        $robotTongueColor: #f9bbbb;`,
      },
    },
  },
});
