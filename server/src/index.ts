import { Server } from "http"
import { config } from "dotenv"
const app = require('./app')
const connectWithDB = require('./config/db')

config()
connectWithDB()

const server: Server = app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
})
