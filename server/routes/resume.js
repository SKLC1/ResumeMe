import express from 'express'
import { Resume } from '../models/resume.js'
import scrapePosts from '../scraper/scraper.js'
export const resumeRouter = express.Router()

resumeRouter.post('/scrape', async (req,res)=>{
  try {
    const resumes = await Resume.find()
    console.log(req.body);
    const scrapeResult = await scrapePosts({email: "tamirgalim@gmail.com",password: "asdfasdf12345"}, req.body)
    console.log(`SCRAPE RES: ${scrapeResult}`);
    res.json(scrapeResult)
  } catch (error) {
    res.json({message: error.message})
  }
})

