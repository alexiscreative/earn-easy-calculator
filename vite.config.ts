
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Add a separate entry point for webflow embedding
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        webflowEmbed: path.resolve(__dirname, 'src/webflow-embed.tsx')
      },
      output: {
        // Generate standalone file for the webflow embed
        manualChunks: undefined,
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'webflowEmbed' 
            ? 'assets/webflow-embed.[hash].js' 
            : 'assets/[name].[hash].js';
        },
        format: 'iife', // Use immediately-invoked function expression format for direct browser use
        inlineDynamicImports: chunkInfo => chunkInfo.name === 'webflowEmbed' // Inline imports for the webflow embed
      }
    },
    // Don't minify the webflow embed for better debugging
    minify: mode === 'production' ? 'esbuild' : false
  }
}));
