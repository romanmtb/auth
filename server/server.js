const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const cors  = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()

import authRoutes from './routes/auth'

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())
// app.use(cors())
if (process.env.NODE_ENV === 'development') {
    app.use(cors({origin: `http://localhost:3000`}))
}

app.use('/api', authRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`API is running on port ${port} - ${process.env.NODE_ENV}`)
})
