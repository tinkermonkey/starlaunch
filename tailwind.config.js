module.config = {
    content: [
        './imports/ui/**/*.{html,js,svelte,ts}',
        './client/**/*.{html,js,svelte,ts}',
        './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    100: '#FF6363',
                    200: '#888883',
                },
                secondary: {
                    100: '#E2E2D5',
                    200: '#888883',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('flowbite/plugin')],
}