import express from 'express'
import {signUp} from '../controllers/auth'

const router = express.Router()

router.get('/signup', signUp)

export default router
