import express from 'express'
import { deleteEmployee, getEmplyee, newEmployee, singleEmployee, updateEmployee } from '../controllers/emplyee.controllers.js'
import { tokenVerification } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/createNew', tokenVerification,  newEmployee)
router.get('/list', tokenVerification, getEmplyee)
router.get('/single/:id', tokenVerification, singleEmployee)
router.patch('/update/:id', tokenVerification, updateEmployee)
router.delete('/delete/:id', tokenVerification, deleteEmployee)

export default router