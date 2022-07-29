import puppeteer from 'puppeteer'

async function scrapeProfile(url){

  try {
  if (!url) {
    throw "Please provide URL as a first argument";
  }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    browser.close();
    return 'scraped'
    
  } catch (error) {
    throw error
  }
}

export default scrapeProfile