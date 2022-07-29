import PuppeteerExtra from 'puppeteer-extra'
import stealthPlugin from 'puppeteer-extra-plugin-stealth'

async function scrapeProfile(urlObj){
  const bot = {email: "tamirgalim@gmail.com",password: "asdfasdf12345"};
  try {
  if (!urlObj) {
    throw "Please provide URL as a first argument";
  } 
  PuppeteerExtra.use(stealthPlugin())
  const browser = await PuppeteerExtra.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.linkedin.com/')
  // login
  await page.click(".nav__button-secondary")
  await page.waitForTimeout(1000);
  await page.type("#username",bot.email,{delay: 15})
  await page.type("#password",bot.password,{delay: 15})
  await page.waitForTimeout(1000);
  await page.click(".btn__primary--large")
  await page.waitForTimeout(4000);
  // get data from user
  await page.goto(`${urlObj.profileLink}`)
    // browser.close();
    console.log('scraped');
    return 'scraped'
    
  } catch (error) {
    throw error
  }
}
// scrapeProfile({profileLink: 'https://www.linkedin.com/in/ari-wolf/'})

export default scrapeProfile