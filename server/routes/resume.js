import express from 'express'
import { Resume } from '../models/resume.js'
export const resumeRouter = express.Router()

resumeRouter.post('/', async (req,res)=>{
  try {
    const resumes = await Resume.find()
    res.json(resumes)
  } catch (error) {
    res.json({message: error.message})
  }
})

