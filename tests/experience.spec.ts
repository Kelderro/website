import { test, expect } from '@playwright/test';

const experienceRoutes = [
    {
        slug: 'transavia/freelance-ict-consultant',
        role: 'Freelance Senior ICT Consultant',
    },
    {
        slug: 'cgi/senior-software-engineer',
        role: 'Consultant: Senior Software Engineer',
    },
];

for (const { slug, role } of experienceRoutes) {
    test(`experience detail page loads: ${slug}`, async ({ page }) => {
        const response = await page.goto(`/engagements/${slug}`);
        expect(response?.status()).toBe(200);
        await expect(page).toHaveTitle(new RegExp(role, 'i'));
    });
}

test('experience listing links to detail pages', async ({ page }) => {
    await page.goto('/engagements');
    const links = page.getByRole('link').filter({ hasText: /engineer|consultant|architect/i });
    await expect(links.first()).toBeVisible();
});
