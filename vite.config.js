import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
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
            plugins: [autoprefixer({})],
        },
    },
    build: {
        sourcemap: true,
        // rollupOptions: {
        //   output: {
        //     manualChunks: undefined,
        //   },
        // },
    },
});
