import express from 'express'
import { newEmployee } from '../controllers/emplyee.controllers.js'
import { tokenVerification } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/createNew', tokenVerification,  newEmployee)

export default router