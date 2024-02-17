/** @type {import('tailwindcss').Config} */
export default {
    // purge: [],
    // darkMode: 'class', // Enables dark mode based on the class applied to the HTML tag
    // theme: {
    //     extend: {},
    // },
    // variants: {},
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    plugins: [
        require('@tailwindcss/typography'),
        // ...
    ],
};
