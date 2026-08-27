// Build for panel anywidget

// vite.config.js
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
    return {
        build: {
            outDir: "dist",
            // `_esm` is an inline string with no sibling files, so the codicon font
            // has to end up base64-encoded inside the emitted CSS.
            assetsInlineLimit: 1024 * 1024,
            lib: {
                name: 'monacoeditor',
                fileName: 'monacoeditor',
                entry: "src/monacoeditor_component.js",
                formats: ["es"],
            },
            rollupOptions: {
                // All dependencies are bundled (no CDN)
                external: [],
                output: {
                    assetFileNames: "monacoeditor.[ext]",
                    // monaco loads its JSON mode via a dynamic import; fold it in so
                    // dist is a single .mjs that `_esm` can inline.
                    inlineDynamicImports: true,
                }
            }
        },
        // https://stackoverflow.com/questions/74120349/building-bundle-for-web-in-vite
        define: {
            'process.env.NODE_ENV': JSON.stringify(mode),
        },
    }
});
