import express from 'express'
import { Resume } from '../models/resume.js'
import openLinkedIn from '../scraper/scraper.js'
export const resumeRouter = express.Router()

resumeRouter.post('/scrape', async (req,res)=>{
  try {
    const resumes = await Resume.find()
    console.log(req.body);
    const scrapeResult = await openLinkedIn({email: "tamirgalim@gmail.com",password: "asdfasdf12345"}, parseInt(req.body.scrollCount))
    console.log(scrapeResult);
    res.json(scrapeResult)
  } catch (error) {
    res.json({message: error.message})
  }
})

