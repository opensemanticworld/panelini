import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    return {
        build: {
            outDir: 'dist',
            lib: {
                name: 'table_vue',
                entry: ["src/table_component.js"],
                formats: ["es"],
                fileName: () => 'table_vue.mjs'
            },
            rollupOptions: {
                external: [],
                output: {
                    assetFileNames: "table_vue.[ext]",
                    globals: {
                        vue: "vue",
                    },
                }
            }
        },
        plugins: [
            vue(),
        ],
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