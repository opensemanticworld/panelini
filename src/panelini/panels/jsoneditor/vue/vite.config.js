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
                name: 'jsoneditor_vue',
                fileName: 'jsoneditor_vue',
                entry: ["src/jsoneditor_component.js"],
                formats: ["es"],
            },
            rollupOptions: {
                // All dependencies are bundled (no CDN)
                external: [],
                output: {
                    assetFileNames: "jsoneditor_vue.[ext]",
                    globals: {
                        vue: "vue",
                        jsoneditor: "@json-editor/json-editor"
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
