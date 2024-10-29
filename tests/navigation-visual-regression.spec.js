const { test, expect } = require('@playwright/test');

const languages = [
    { name: 'Finnish', url: 'https://suomi.fi/etusivu' },
    { name: 'Swedish', url: 'https://www.suomi.fi/hemsidan' },
    { name: 'English', url: 'https://www.suomi.fi/frontpage' },
];

test.describe('Navigation visual regression', () => {
    for (const lang of languages) {
        test(`Navigation check for ${lang.name}`, async ({ page }) => {
            await page.goto(lang.url);
            const ulElement = await page.locator('ul.role-selection-items');
            const liElements = await ulElement.locator('li').all();

            for (const li of liElements) {
                const hasChildren = (await li.locator('ul, ol, div').count()) > 0;
                if (hasChildren) {
                    await li.click();
                    await li.locator('ul, ol, div').first().waitFor();
                }
            }

            const screenshot = await page.screenshot();
            expect(screenshot).toMatchSnapshot(`nav-${lang.name}.png`, {
                threshold: 0.1,
            });
        });
    }
});
