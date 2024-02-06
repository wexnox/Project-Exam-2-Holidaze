import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import eslintPlugin from 'vite-plugin-eslint';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
// https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md
export default defineConfig({
    plugins: [
        react(),
        eslintPlugin({
            cache: false,
            include: ['./src/**/*.js', './src/**/*.jsx'],
            exclude: [],
        }),
    ],
    // server: {
    //      port: 3000,
    //       proxy: {
    //      '/api': {
    //           target: 'http://localhost:5000',
    //               changeOrigin: true,
    //               secure: false,
    //             },
    //     },
    // },
    css: {
        postcss: {
            plugins: [autoprefixer({}), tailwindcss()],
        },
    },
    build: {
        sourcemap: false,
        // rollupOptions: {
        //   output: {
        //     manualChunks: undefined,
        //   },
        // },
    },
});
