import PuppeteerExtra from "puppeteer-extra";
import stealthPlugin from 'puppeteer-extra-plugin-stealth'
import fs from 'fs'

//bots
const user1 = {email: "tamirgalim@gmail.com",password: "asdfasdf12345"};
const user2 = {email: "ukd5880@gmail.com",password: ")x-B=MV_X%dtw3="};
const user3 = {email: "davidglaritz@gmail.com",password: "David5101!"};


async function scrapePosts(bot, userConfig, iteration){
  let data = []; 
  let done = false;
  const desiredAmountOfLinks = userConfig.config.scrollCount
  
  async function openLinkedIn(bot, { config }, category) {
    console.log(config);
  try {
  PuppeteerExtra.use(stealthPlugin())
  const browser = await PuppeteerExtra.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.linkedin.com/')
  // login
  await page.click(".nav__button-secondary")
  await page.waitForTimeout(1000 + randomWait());
  await page.type("#username",bot.email,{delay: 15})
  await page.type("#password",bot.password,{delay: 15})
  await page.waitForTimeout(1000 + randomWait());
  await page.click(".btn__primary--large")
  await page.waitForTimeout(5000 + randomWait());
  // search for desired title
  page.waitForSelector('.search-global-typeahead__input', {visible: true})
  await page.type(".search-global-typeahead__input",`${config.keywords[iteration]}`,{delay: 15})
  await page.keyboard.press('Enter');
  //filter by posts
  await page.waitForTimeout(4000 + randomWait());
  page.waitForSelector("#search-reusables__filters-bar > ul > li", {visible: true})
  const buttons = await page.$$("#search-reusables__filters-bar > ul > li")
  for (const li of buttons) {
    let value = await page.evaluate(el => el.textContent, li)
    if(value.includes(category)){
      await li.click()
    }
  }
  await page.waitForTimeout(2000 + randomWait());
  // //! filter by past week
  // page.waitForSelector('[aria-label="Date posted filter. Clicking this button displays all Date posted filter options."]', {visible: true})
  // await page.click('[aria-label="Date posted filter. Clicking this button displays all Date posted filter options."]')
  // await page.waitForTimeout(1000); 
  // const past_week = await page.$("#datePosted-past-week")
  // await past_week.click()
  // await page.waitForTimeout(1000);
  // //? only this line doesn't work
  // await page.$eval(`[aria-label="Apply current filter to show results"]`, element => element.click())
  
  await captureResponse(page,browser,config)
    
  } catch (error) {
     throw error  
  }
}

async function captureResponse(page,browser,config){
  
  await page.on('response', async (response)=> {    
    if (response.url().includes('SearchClusterCollection')){
      // console.log("response code: ", response.status());
      const data = await response.json();
      if(response.status() === 200){
        getRelevantPostURN(data, config)
      } else {
        console.log('error while getting data');
      }
    } 
  });
  for (let i = 0; i <= 15; i++) {
      await page.waitForTimeout(3000);
      await loadMoreData(page)
    if(data.length > config.scrollCount){
      returnDataOnEnd(data)
      return;
    }
  }

}

async function returnDataOnEnd(){
  console.log('SCRAPING COMPLETE');
  done = true;
}

async function loadMoreData(page){
  //scroll down
  await page.evaluate(() => new Promise((resolve) => {
    var scrollTop = -1;
    const interval = setInterval(() => {
      window.scrollBy(0, 100);
      if(document.documentElement.scrollTop !== scrollTop) {
        scrollTop = document.documentElement.scrollTop;
        return;
      }
      clearInterval(interval);
      resolve();
    }, 10);
  }));
}

function getRelevantPostURN(data, config){
  const all_posts = data.included;
  const relevant_posts = []
  const accepted_posts_refs = []
  all_posts.forEach((post)=>{
    if("numLikes" in post){
      relevant_posts.push(post);
    } 
  })
  relevant_posts.forEach((post)=>{
    if(post.numLikes >= config.threshold){
      accepted_posts_refs.push({urn: post.entityUrn, numLikes: post.numLikes})
    }
  })
  convertURNtoLink(accepted_posts_refs)
  console.log(`${accepted_posts_refs.length} posts accepted out of ${relevant_posts.length} relevant posts`);
}

function convertURNtoLink(arrOfURN){
  const baseURL = 'https://www.linkedin.com/feed/update/';
  if(arrOfURN.length > 0 ){
    const links = arrOfURN.map(postObj =>{
      const relevantURN = postObj.urn.split('Counts:')
      return {url:`${baseURL}${relevantURN[1]}`, numLikes: postObj.numLikes ,saved: false}
    })
    // console.log('ACCEPTED LINKS:');
    // console.log(links);
    data = data.concat(links);
  } else {
    console.log('no relevant posts found') 
  }
}

 openLinkedIn(user1, userConfig, "Posts")

  const waitUntil = (condition) => {
   return new Promise((resolve) => {
      let interval = setInterval(() => {
          if (!condition()) {
            return
          }

          clearInterval(interval)
          resolve()
      }, 100)
   })
  }

 await waitUntil(() => done)
 return data.slice(0, desiredAmountOfLinks)
}

function randomWait(){
  const random = Math.random() * (2000 - 500) + 500;
  console.log(random);
  return random
}

export default scrapePosts