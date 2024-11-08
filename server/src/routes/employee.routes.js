import express from 'express'
import { deleteEmployee, getEmplyee, newEmployee, singleEmployee, updateEmployee } from '../controllers/emplyee.controllers.js'
import { tokenVerification } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/createNew',  newEmployee)
router.get('/list', getEmplyee)
router.get('/single/:id', singleEmployee)
router.patch('/update/:id', updateEmployee)
router.delete('/delete/:id', deleteEmployee)

export default router