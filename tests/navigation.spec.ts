import { test, expect } from '@playwright/test';

test('navigation contains expected links', async ({ page, isMobile }) => {
    await page.goto('/');

    if (isMobile) {
        await page.getByRole('button', { name: 'Menu' }).click();
    }

    await expect(page.getByRole('link', { name: /services/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /selected engagements/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
});

test('theme toggle switches dark mode', async ({ page, isMobile }) => {
    await page.goto('/');
    const html = page.locator('html');

    if (isMobile) {
        await page.getByRole('button', { name: 'Menu' }).click();
    }

    const button = page.getByRole('button', { name: 'Dark theme' });
    const initialIsDark = (await html.getAttribute('class'))?.includes('theme-dark') ?? false;
    await button.click();

    if (initialIsDark) {
        await expect(html).not.toHaveClass(/theme-dark/);
    } else {
        await expect(html).toHaveClass(/theme-dark/);
    }
});

test('theme preference persists on navigation', async ({ page, isMobile }) => {
    await page.goto('/');

    if (isMobile) {
        await page.getByRole('button', { name: 'Menu' }).click();
    }

    // Enable dark mode if not already active
    const html = page.locator('html');
    const isDark = (await html.getAttribute('class'))?.includes('theme-dark') ?? false;
    if (!isDark) {
        await page.getByRole('button', { name: 'Dark theme' }).click();
        await expect(html).toHaveClass(/theme-dark/);
    }

    // Navigate to another page and verify theme persists via localStorage
    await page.goto('/about');
    await expect(page.locator('html')).toHaveClass(/theme-dark/);
});
