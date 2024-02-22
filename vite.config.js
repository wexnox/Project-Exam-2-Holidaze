import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import eslintPlugin from 'vite-plugin-eslint';
import tailwindcss from 'tailwindcss';

// Function to safely access environment variables
const getEnvVar = (key, fallback = '') => JSON.stringify(process.env[key] || fallback);

export default defineConfig({
    plugins: [

        eslintPlugin({
            cache: false,
            include: ['./src/**/*.js', './src/**/*.jsx'],
            exclude: ['node_modules', '.eslintrc.js'],
            formatter: 'stylish',

        }),
    ],
    esbuild: {
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
    },
    css: {
        postcss: {
            plugins: [autoprefixer({}), tailwindcss()],
        },
    },
    build: {
        sourcemap: false,
    },
});
