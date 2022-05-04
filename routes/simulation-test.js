const puppeteer = require('puppeteer')
const login = require('./login')
const login2 = require('../public/validations')
const containsChar = require('../public/validations')




test('tests if username and password inputed in the gui are sent to the server', async () => {
   /* const browser = await puppeteer.launch({
        headless: false,
    })
    const page = await browser.newPage()
    await page.goto('http://localhost:3000')
    await page.click('#login')
    await page.waitForSelector('input#user');
    await page.click('input#user')
    await page.type('input#user', 'Nghia', {delay: 100})
    await page.waitForSelector('input#pw');
    await page.click('input#pw')
    await page.type('input#pw', '1', {delay: 100})
    await page.waitForSelector('[type=submit]');
    await page.click('[type=submit]')
    
    await page.waitForTimeout(1000);

    let url = page.url();
    console.log(url);
    expect(url.indexOf('menu.html')).not.toEqual(-1);
    await browser.close()*/
})
