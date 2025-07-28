// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import { componentTagger } from "lovable-tagger";

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   server: {
//     host: "::",
//     port: 8080,
//   },
//   plugins: [
//     react(),
//     mode === 'development' &&
//     componentTagger(),
//   ].filter(Boolean),
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// }));


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./", // use '/' if deploying to root, './' if subdir or file:// protocol
  server: {
    host: true, // allows external access (LAN, containers, etc.)
    port: 8080,
  },
  build: {
    target: "esnext",          // latest JS features
    minify: "esbuild",         // default: fast and effective
    sourcemap: mode !== "production" ? "inline" : false, // easier debugging in dev
    outDir: "dist",            // default is fine unless you want custom
    emptyOutDir: true          // clean build folder
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(), // keep dev-only plugin
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
