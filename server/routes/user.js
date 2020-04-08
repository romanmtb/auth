import express from 'express'
const router = express.Router()

import {read, update} from '../controllers/user'

const {userUpdateValidation} = require('../validators/auth')
const {runValidation} = require('../validators')

const {requireSignin} = require('../controllers/auth')

router.get('/user/:id', requireSignin, read)
router.put('/user/update', [requireSignin, userUpdateValidation, runValidation], update)

export default router
