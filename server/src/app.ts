import express, { Application } from 'express';
import { config } from "dotenv"
const app: Application = express()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'

config()
app.use(express.json())
// app.use(cors())
app.use(cors({
    origin: ['https://mern-auth-seven.vercel.app'],
    credentials: true

}))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// cookie middleware
app.use(cookieParser())


// import all routes here
const user = require('./routes/user')

// router middleware
app.use('/api', user)

module.exports = app