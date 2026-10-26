import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sentry from '@sentry/astro';
import sitemap from '@astrojs/sitemap';
import spotlightjs from '@spotlightjs/astro';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Stamps a unique build id into dist/sw.js so each deploy invalidates the old caches.
const serviceWorkerVersion = () => ({
    name: 'service-worker-version',
    hooks: {
        'astro:build:done': async ({ dir }) => {
            const swPath = fileURLToPath(new URL('sw.js', dir));
            const buildId = process.env.GITHUB_SHA?.slice(0, 12) ?? Date.now().toString(36);
            const source = await readFile(swPath, 'utf8');
            await writeFile(swPath, source.replace('__BUILD_ID__', buildId));
        },
    },
});

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

    integrations: [
        ...(process.env.NODE_ENV !== 'development' ? [sentry()] : []),
        ...(process.env.NODE_ENV === 'development' && !process.env.CI ? [spotlightjs()] : []),
        mdx(),
        sitemap({ filter: page => !page.endsWith('/offline/') }),
        serviceWorkerVersion(),
    ],

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
        // Polling required in dev containers where native FS events aren't forwarded
        server: {
            watch: {
                usePolling: true,
            },
        },
    },

    // Navigation Optimization
    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'hover',
    },
});
