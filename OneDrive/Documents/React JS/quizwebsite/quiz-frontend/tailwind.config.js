/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6B46C1", // Violet
                secondary: "#EC4899", // Pink
                accent: "#06B6D4", // Cyan
                dark: "#1F2937",
                light: "#F3F4F6"
            },
            fontFamily: {
                heading: ['Inter', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
