const { test, expect, firefox } = require('@playwright/test');
const { JSDOM } = require('jsdom');

test.describe('Validate street addresses using posti.fi', () => {
    test('Validate Brahen address', async () => {
        const browser = await firefox.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        // Go to suomi.fi and search for the address
        await page.goto('https://suomi.fi/etusivu');
        const search = await page.locator('.autosuggest-container');
        await search.click();
        await search.fill('Brahen asuintalo');
        await page.locator('#id-main-search-button').click();

        // Click the link with the specific address name
        await page.getByRole('link', { name: 'Brahen asuintalo' }).click();

        // Extract the address from the page
        const addressHTML = await page.locator('.visiting-address-details').innerHTML();
        const dom = new JSDOM(addressHTML);
        const pElem = dom.window.document.querySelector(
            'p.sc-13pc990-0.fvuVBF.fi-paragraph.sc-1acqefb-0.fa-DuPf'
        );

        const match = pElem.textContent.match(/(.+?)(\s\d{5})/);
        let address = match ? match[1].trim() : '';

        // Verify the postal code on posti.fi
        const newPage = await context.newPage();
        await newPage.goto('https://www.posti.fi/fi/postinumerohaku');
        await newPage.getByRole('button', { name: 'Sulje' }).click();
        await newPage.locator('#zipcode-search-bar').fill(address);
        await newPage.getByRole('button', { name: 'Hae osoitteella tai' }).click();
        await expect(newPage.locator('tbody')).toContainText('00510');

        // Capture a screenshot and compare with a saved snapshot
        const screenshot = await page.screenshot();
        expect(screenshot).toMatchSnapshot('address-validation.png', {
            threshold: 0.1,
        });

        await browser.close();
    });
});
