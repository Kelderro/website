import { test, expect } from '@playwright/test';

test('about page loads with correct title and heading', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveTitle('About | Rob op den Kelder');
    await expect(page.getByRole('heading', { name: 'About', level: 1 })).toBeVisible();
});

test('experience page loads with correct title and heading', async ({ page }) => {
    await page.goto('/engagements');
    await expect(page).toHaveTitle('Selected Engagements | Rob op den Kelder');
    await expect(
        page.getByRole('heading', { name: 'Selected Engagements', level: 1 })
    ).toBeVisible();
});

test('404 page renders for unknown routes', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
});

test('404 page provides navigation links', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.getByRole('link', { name: /back to home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /view engagements/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about me/i })).toBeVisible();
});
