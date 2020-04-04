import express from 'express'
const router = express.Router()

import {signUp} from '../controllers/auth'

const {userSignupValidator} = require('../validators/auth')
const {runValidation} = require('../validators')

router.post('/signup', userSignupValidator, runValidation, signUp)

export default router
