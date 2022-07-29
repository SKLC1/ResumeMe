import express from 'express'
import { Resume } from '../models/resume.js'
import scrapeProfile from '../scraper.js'
export const resumeRouter = express.Router()

resumeRouter.post('/', async (req,res)=>{
  try {
    const resumes = await Resume.find()
    console.log(req.body);
    const scrapeResult = await scrapeProfile(req.body)
    console.log(scrapeResult);
    res.json(resumes)
  } catch (error) {
    res.json({message: error.message})
  }
})

