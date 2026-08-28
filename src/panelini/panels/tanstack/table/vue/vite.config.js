// Build for panel anywidget.
//
// Deliberately no `assetsInlineLimit` override: the wunderbaum panel raised it to
// 300000 and ended up with 53% of its bundle being a base64 icon font. This panel
// uses inline SVG instead, so the Vite default stays.

import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
    return {
        build: {
            outDir: 'dist',
            lib: {
                name: 'tanstack_table',
                fileName: 'tanstack_table',
                entry: ['src/tanstack_table_component.js'],
                formats: ['es'],
            },
            rollupOptions: {
                // All dependencies are bundled (no CDN).
                external: [],
                output: {
                    assetFileNames: 'tanstack_table.[ext]',
                    globals: {
                        vue: 'vue',
                    },
                },
            },
        },
        plugins: [
            vue(),
        ],
        define: {
            'process.env.NODE_ENV': JSON.stringify(mode),
        },
        resolve: {
            alias: {
                '@/': `${path.resolve(__dirname, 'src')}/`,
            },
        },
    }
});
