// Build for panel anywidget

// vite.config.js
import path from 'path'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
    return {
        build: {
            outDir: "dist",
            lib: {
                name: 'visnetwork_vue',
                fileName: 'visnetwork_vue',
                entry: ["src/visnetwork_component.js"],
                formats: ["es"],
            },
            rollupOptions: {
                // All dependencies are bundled (no CDN)
                external: [],
                output: {
                    assetFileNames: "visnetwork_vue.[ext]",
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
