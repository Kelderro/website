import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sentry from '@sentry/astro';
import sitemap from '@astrojs/sitemap';
import spotlightjs from '@spotlightjs/astro';

export default defineConfig({
    site: 'https://kelderro.nl',
    // Environment Variable Schema (Astro 5.0+)
    env: {
        schema: {
            // Available in the browser (client-side)
            VITE_SOURCEMAP: envField.boolean({
                context: 'client',
                access: 'public',
                default: false,
            }),
            // Available only during the build process (server-side context)
            VITE_DEBUG: envField.boolean({
                context: 'server',
                access: 'public',
                default: false,
            }),
        },
    },

    // Deployment Output
    output: 'static',
    adapter: cloudflare({
        mode: 'directory',
        imageService: 'compile',
    }),

    integrations: [sentry(), spotlightjs(), mdx(), sitemap()],

    // Image Optimization
    image: {
        // Astro uses Sharp by default
        service: {
            entrypoint: 'astro/assets/services/sharp',
        },
        // Define image quality
        quality: 80,
        // Enable WebP and AVIF formats
        formats: ['webp', 'avif'],
        // Enable responsive images
        remotePatterns: [
            {
                protocol: 'https',
            },
        ],
    },

    // Build & HTML Optimization
    build: {
        // Enable inline stylesheets
        inlineStylesheets: 'auto',
        // Enable asset optimization
        assets: '_assets',
    },

    // Enable compression
    compressHTML: true,

    // Vite Configuration
    vite: {
        build: {
            sourcemap: true,
        },
        css: {
            devSourcemap: true,
        },
    },

    // Navigation Optimization
    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'hover',
    },
});
