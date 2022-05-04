const { TestWatcher } = require('jest')
const puppeteer = require('puppeteer')
const login = require('./login')
const history = require('./history')
const printaddress = require('./printaddress')
const profile = require('./profile')
const validation = require('./validations')
jest.setTimeout(1000000);





test('cloning user...', async () => {
    const browser = await puppeteer.launch({
        headless: false,
    })
    const page = await browser.newPage()
    //start
    await page.goto('http://localhost:3000')
    await page.waitForTimeout(2000);
    await page.click('#login')
    await page.waitForTimeout(1000);
    //let url = page.url();
    //expect(url).toEqual('http://localhost:3000/menu.html');
    
    
    //register
    await page.waitForSelector('button#register');
    await page.click('button#register')
    await page.waitForTimeout(1000);
    await page.waitForSelector('input#user');
    await page.click('input#user')
    await page.type('input#user', 'test1', {delay: 100})
    await page.waitForSelector('input#pw');
    await page.click('input#pw')
    await page.type('input#pw', 'Test1', {delay: 100})
    await page.waitForSelector('input#confPw');
    await page.click('input#confPw')
    await page.type('input#confPw', 'Test1', {delay: 100})
    await page.waitForSelector('button#register');
    await page.click('button#register')
    await page.waitForTimeout(2000);

    //complete profile
    await page.waitForSelector('input#fullname');
    await page.click('input#fullname')
    await page.type('input#fullname', 'NGHIEP NGHIA LUU', {delay: 100})
    await page.waitForSelector('input#address1');
    await page.click('input#address1')
    await page.type('input#address1', '12345 Bellaire Blvd', {delay: 100})
    await page.waitForSelector('input#city');
    await page.click('input#city')
    await page.type('input#city', 'Houston', {delay: 100})
    await page.waitForSelector('select#state');
    await page.select('#state', 'TX')
    await page.waitForSelector('input#zipcode');
    await page.click('input#zipcode')
    await page.type('input#zipcode', '77072', {delay: 100})
    await page.waitForTimeout(2000);
    await page.waitForSelector('button#update');
    await page.click('button#update');
    await page.waitForTimeout(2000);

    //log out
    await page.waitForSelector('a#logout');
    await page.click('a#logout')
    await page.waitForTimeout(2000);
    
    //log in
    await page.waitForSelector('input#user');
    await page.click('input#user')
    await page.type('input#user', 'nghialuu1', {delay: 100})
    await page.waitForSelector('input#pw');
    await page.click('input#pw')
    await page.type('input#pw', 'Nghia1', {delay: 100})
    await page.waitForSelector('[type=button]');
    await page.click('[type=button]')
    await page.waitForTimeout(2000);

    //update profile
    await page.waitForSelector('a#menu-clientprofile');
    await page.click('a#menu-clientprofile')

    await page.waitForSelector('a#clickhere');
    await page.click('a#clickhere')
    await page.waitForTimeout(2000);
    await page.waitForSelector('input#fullname');
    await page.click('input#fullname')
    await page.type('input#fullname', 'NGHIEP NGHIA LUU', {delay: 100})
    await page.waitForSelector('input#address1');
    await page.click('input#address1')
    await page.type('input#address1', '12345 Bellaire Blvd', {delay: 100})
    await page.waitForSelector('input#city');
    await page.click('input#city')
    await page.type('input#city', 'Houston', {delay: 100})
    await page.waitForSelector('select#state');
    await page.select('#state', 'TX')
    await page.waitForSelector('input#zipcode');
    await page.click('input#zipcode')
    await page.type('input#zipcode', '77072', {delay: 100})
    await page.waitForTimeout(2000);
    await page.waitForSelector('button#update');
    await page.click('button#update')
    await page.waitForTimeout(2000);

    //submit quote form
    await page.waitForSelector('a#menu-fuelquoteform');
    await page.click('a#menu-fuelquoteform')
    await page.waitForTimeout(2000);
    await page.waitForSelector('input#gallonRequest');
    await page.click('input#gallonRequest')
    await page.type('input#gallonRequest', '1020', {delay: 100})
    await page.waitForTimeout(2000);
    await page.waitForSelector('button#calculategallonrq');
    await page.click('button#calculategallonrq')
    await page.waitForTimeout(3000);
    await page.waitForSelector('button#submitgallonrq');
    await page.click('button#submitgallonrq')
    await page.waitForTimeout(2000);

    //check quote form history
    await page.waitForTimeout(2000);
    await page.waitForSelector('a#menu-fuelquotehistory');
    await page.click('a#menu-fuelquotehistory')
    await page.waitForTimeout(1000);
    
    //scroll down to bottom of the page
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
    });
    await page.waitForTimeout(3000);

    //log out
    await page.waitForSelector('a#logout');
    await page.click('a#logout')
    await page.waitForTimeout(2000);
    await browser.close()

})



test('tests if username and password inputed in the gui are sent to the server', async () => {
  const mock = jest.fn();
  login(mock);
  expect(mock).toHaveBeenCalled();
})

test('tests for input validations', async () => {
  expect(validation.containsChar('a1423@$b')).toEqual(true);
  expect(validation.containsChar('512@$%^*(')).toEqual(false);
  expect(validation.containsSpecialChars('njguw224!')).toEqual(true);
  expect(validation.containsSpecialChars('7278grvv')).toEqual(false);
  expect(validation.containsSpecialCharsNumbers('rhi2aaa')).toEqual(true);
  expect(validation.containsSpecialCharsNumbers('hwongwo')).toEqual(false);
  expect(validation.containsSpace('hrjr tot')).toEqual(true);
  expect(validation.containsSpace('gwegjweio')).toEqual(false);
})

test('tests if username exists', async () => {
  const mock = jest.fn();
  validation.UserNameExist(mock,'nghialuu1');
  expect(mock).toHaveBeenCalled();
})

test('tests if username and password are valid', async () => {
  const mock = jest.fn();
  validation.checkValidsUserPwd(mock, 'nghialuu1', 'Nghia1', 'Nghia1');
  expect(mock).toHaveBeenCalled();
})

test('tests if zip code is valid', async () => {
  const mock = jest.fn();
  validation.checkZip(mock);
  expect(mock).toHaveBeenCalled();
})

test('tests for password reset', async () => {
  const mock = jest.fn();
  validation.pwRetrieve(mock);
  expect(mock).toHaveBeenCalled();
})


test('tests to print out address of the user', async () => {
  const mock = jest.fn();
  printaddress(mock);
  expect(mock).toHaveBeenCalled();
})

test('tests to print out profile of the user', async () => {
  const mock = jest.fn();
  profile(mock);
  expect(mock).toHaveBeenCalled();
})

test('tests for user to submit a fuel quote form', async () => {
  const mock = jest.fn();
  history.calPrice(mock);
  history.gallonCal(mock);
  history.fuelQuoteHist(mock);
  expect(mock).toHaveBeenCalled();
})