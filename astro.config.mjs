import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';

export default defineConfig({
    integrations: [
        sentry(),
        spotlightjs(),
        mdx()
    ],
});
