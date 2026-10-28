import { test, expect } from '@playwright/test';

test('legacy about page redirects to the homepage about section', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL(/\/#about$/);
    await expect(page.getByRole('heading', { name: 'About Rob op den Kelder' })).toBeVisible();
});

test('legacy engagements page redirects to the homepage experience section', async ({ page }) => {
    await page.goto('/engagements');
    await expect(page).toHaveURL(/\/#experience$/);
    await expect(page.getByRole('heading', { name: 'Career at a glance' })).toBeVisible();
});

test('404 page renders for unknown routes', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
});

test('404 page provides navigation links', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.getByRole('link', { name: /back to home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /view experience/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about me/i })).toBeVisible();
});
