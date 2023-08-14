/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "priority-3": "#E03130",
                "priority-2": "#FFB000",
                "priority-1": "#4772F9",
                "priority-0": "#A2A2A2",
            },
        },
    },
    plugins: [],
};
