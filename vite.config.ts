import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({

  plugins: [
    react(),
    dts({
      rollupTypes: true,
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.app.json"
    })
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src/lib'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./src/lib/index.ts"),
      fileName: (format) => `emotecraft-web-player.${format}.js`,
      formats: ["es", "cjs"]
    },
    minify: true,
    rollupOptions: {
      external: [/^react($|\/)/, "react-dom", "three", "@react-three/fiber", "@react-three/drei", "easing-functions"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
          "react/jsx-dev-runtime": "ReactJSXDevRuntime",
          three: "THREE",
          "@react-three/fiber": "ReactThreeFiber",
          "@react-three/drei": "ReactThreeDrei",
          "easing-functions": "EasingFunctions"
        },
      },
      treeshake: true,
    }
  }
});
