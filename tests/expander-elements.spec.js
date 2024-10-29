const { test, expect, firefox } = require('@playwright/test');

test.describe('Information page expander elements', () => {
    test('Check each expander element works individually', async () => {
        const browser = await firefox.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://www.suomi.fi/ohjeet-ja-tuki/yleista-suomifista/saavutettavuus');
        await page.getByRole('button', { name: 'Suomi.fi-palveluiden' }).click();
        await expect(page.getByLabel('Suomi.fi-palveluiden').locator('div').nth(1)).toBeVisible();
        await page.getByRole('button', { name: 'Suomi.fi-palveluiden' }).click();
        await expect(page.getByLabel('Suomi.fi-palveluiden').locator('div').nth(1)).toBeHidden();
        await browser.close();
    });

    test('Expand All button toggles all items', async () => {
        const browser = await firefox.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://www.suomi.fi/ohjeet-ja-tuki/yleista-suomifista/saavutettavuus');
        const expandButton = await page.locator('button.sc-104agys-0.dZpFWr.fi-expander-group_all-button');
        await expandButton.click();
        await expect(page.locator('.fi-expander-group.fi-expander-group--open')).toBeVisible();
        await expandButton.click();
        await expect(page.locator('.fi-expander-group.fi-expander-group--open')).toBeHidden();
        await browser.close();
    });
});
