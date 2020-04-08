import express from 'express'
const router = express.Router()

import {read} from '../controllers/user'

router.get('/user/:id', read)

export default router
