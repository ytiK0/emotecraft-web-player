import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({

  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src/lib'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./src/lib/index.ts"),
      fileName: (format) => `emotecraft-web-player.${format}.js`,
      formats: ["cjs", "es"]
    },
    minify: true,
    rollupOptions: {
      external: ["react", "react-dom", "three", "@react-three/fiber", "@react-three/drei"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          three: "THREE",
          "@react-three/fiber": "ReactThreeFiber",
          "@react-three/drei": "ReactThreeDrei"
        },
      },
      treeshake: true,

    }
  }
});
