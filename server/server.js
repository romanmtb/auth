import * as fs from 'fs'
import * as dotenv from 'dotenv'
import express from 'express'

import auth from './routes/auth'

dotenv.config()

const app = express()

app.use('/api', auth)

const port = dotenv.parse(fs.readFileSync(`${process.env.NODE_ENV}.env`)).PORT

app.listen(port, () => {
    console.log(`API is running on port ${port}`)
})
