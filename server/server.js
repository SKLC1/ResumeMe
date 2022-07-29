import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { resumeRouter } from './routes/resume.js'
import cors from 'cors'
import bodyParser from 'body-parser';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/resumeme',{useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', (error)=> console.log(error))
db.once('open', ()=> console.log('Connected to db'))

app.use(cors())
app.use(bodyParser.json())
app.use('/resume', resumeRouter)

app.listen(PORT,()=>{
  console.log(`server running on ${PORT}`);
});
