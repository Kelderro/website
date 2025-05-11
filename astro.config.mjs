import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';

export default defineConfig({
    integrations: [sentry(), spotlightjs(), mdx()],
    // Enable image optimization
    image: {
        // Enable image optimization
        service: {
            entrypoint: 'astro/assets/services/sharp',
        },
        // Define image quality
        quality: 80,
        // Enable WebP format
        format: ['webp'],
        // Enable responsive images
        remotePatterns: [
            {
                protocol: 'https',
            },
        ],
    },
    // Enable build optimization
    build: {
        // Enable inline stylesheets
        inlineStylesheets: 'auto',
        // Enable asset optimization
        assets: '_assets',
    },
    // Enable compression
    compressHTML: true,
    // Enable source maps for better debugging
    vite: {
        build: {
            sourcemap: true,
            // Enable source maps for CSS
            cssSourceMap: true,
            // Enable source maps for JavaScript
            jsSourceMap: true,
            // Enable source maps for TypeScript
            tsSourceMap: true,
            // Enable source maps for Astro files
            astroSourceMap: true,
        },
        // Enable source maps in development
        server: {
            sourcemapIgnoreList: false,
        },
        // Configure source map options
        css: {
            devSourcemap: true,
        },
    },
});
