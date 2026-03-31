// Build for panel anywidget

// vite.config.js
import path from 'path'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
    return {
        build: {
            outDir: "dist",
            assetsInlineLimit: 300000,  // Inline bootstrap-icons font as base64
            lib: {
                name: 'wunderbaum_vue',
                fileName: 'wunderbaum_vue',
                entry: ["src/wunderbaum_component.js"],
                formats: ["es"],
            },
            rollupOptions: {
                // All dependencies are bundled (no CDN)
                external: [],
                output: {
                    assetFileNames: "wunderbaum_vue.[ext]",
                    globals: {
                        vue: "vue",
                    },
                }
            }
        },
        plugins: [
            vue(),
        ],
        // https://stackoverflow.com/questions/74120349/building-bundle-for-web-in-vite
        define: {
            'process.env.NODE_ENV': JSON.stringify(mode),
        },
        resolve: {
            alias: {
                '@/': `${path.resolve(__dirname, 'src')}/`
            },
        },
    }
});
