import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import astroPlugin from 'eslint-plugin-astro';
import astroEslintParser from 'astro-eslint-parser';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

// Patch to trim whitespace from global keys
function safeTrimGlobals(obj) {
    if (!obj) return {};
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k.trim(), v]));
}

export default [
    // Ignore build output and other non-source files
    {
        ignores: [
            'dist/',
            'public/',
            'node_modules/',
            '**/*.min.js',
            '**/*.min.css',
            '**/package-lock.json',
            '**/yarn.lock',
            '**/pnpm-lock.yaml',
        ],
    },
    // JS/TS config
    {
        ...eslint.configs.recommended,
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: tseslintParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                ...safeTrimGlobals(globals.browser),
                ...safeTrimGlobals(globals.node),
                ...safeTrimGlobals(globals.es2021),
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-unused-expressions': 'off',
            'no-empty': ['error', { allowEmptyCatch: true }],
            '@typescript-eslint/no-this-alias': 'off',
            'no-prototype-builtins': 'off',
            'no-constant-binary-expression': 'off',
            'no-cond-assign': 'off',
            'no-setter-return': 'off',
            'no-control-regex': 'off',
        },
    },
    // Astro config
    {
        files: ['**/*.astro'],
        plugins: {
            astro: astroPlugin,
        },
        languageOptions: {
            parser: astroEslintParser,
            parserOptions: {
                parser: '@typescript-eslint/parser',
                extraFileExtensions: ['.astro'],
            },
            globals: {
                ...safeTrimGlobals(globals.browser),
                ...safeTrimGlobals(globals.node),
                ...safeTrimGlobals(globals.es2021),
            },
        },
        rules: {
            ...astroPlugin.configs.recommended.rules,
            ...astroPlugin.configs['jsx-a11y-recommended'].rules,
        },
    },
    prettier,
];
