import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routes from '../routes'
import dotenv from 'dotenv'
import { connectDB } from './db'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/', routes)

app.set('PORT', process.env.PORT || 5000)

connectDB()

export default app
