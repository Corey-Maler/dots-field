import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'DotsField',
            fileName: (format) => `field.${format}.js`
        },
    }, 
})