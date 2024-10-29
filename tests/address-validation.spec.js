const { test, expect, firefox } = require('@playwright/test');
const { JSDOM } = require('jsdom');

test.describe('Validate street addresses using posti.fi', () => {
    test('Validate Etu-Töölö address', async () => {
        const browser = await firefox.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://suomi.fi/etusivu');
        const search = await page.locator('.autosuggest-container');
        await search.click();
        await search.fill('asuintalo');
        await page.locator('#id-main-search-button').click();
        await page.getByRole('link', { name: 'Etu-Töölön asuintalo' }).click();

        const addressHTML = await page.locator('.visiting-address-details').innerHTML();
        const dom = new JSDOM(addressHTML);
        const pElem = dom.window.document.querySelector(
            'p.sc-13pc990-0.fvuVBF.fi-paragraph.sc-1acqefb-0.fa-DuPf'
        );

        const match = pElem.textContent.match(/(.+?)(\s\d{5})/);
        let address = match ? match[1].trim() : '';

        const newPage = await context.newPage();
        await newPage.goto('https://www.posti.fi/fi/postinumerohaku');
        await newPage.getByRole('button', { name: 'Sulje' }).click();
        await newPage.locator('#zipcode-search-bar').fill(address);
        await newPage.getByRole('button', { name: 'Hae osoitteella tai' }).click();
        await expect(newPage.locator('tbody')).toContainText('00100');
        await browser.close();
    });
});
