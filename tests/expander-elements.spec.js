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

        // Capture a screenshot with an increased threshold
        const screenshot = await page.screenshot();
        expect(screenshot).toMatchSnapshot('expander-individual-element.png', {
            threshold: 0.7,
        });

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

        // Capture a screenshot with an increased threshold
        const screenshot = await page.screenshot();
        expect(screenshot).toMatchSnapshot('expander-expand-all.png', {
            threshold: 0.7,
        });

        await browser.close();
    });
});
