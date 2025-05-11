import { test, expect } from '@playwright/test';

test('home page loads and has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Rob op den Kelder/);
});
