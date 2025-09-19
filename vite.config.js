import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

// Function to safely access environment variables
const getEnvVar = (key, fallback = '') => JSON.stringify(process.env[key] || fallback);

export default defineConfig({
    plugins: [
        eslintPlugin({
            cache: false,
            include: ['./src/**/*.js', './src/**/*.jsx'],
            exclude: ['node_modules', '.eslintrc.js', '.eslintrc.cjs', 'eslint.config.js'],
            formatter: 'stylish',
        }),
    ],
    esbuild: {
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
    },
    // Let Vite use postcss.config.js automatically; no need to import Tailwind/PostCSS here
    build: {
        sourcemap: false,
    },
});
