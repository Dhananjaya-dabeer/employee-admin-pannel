import express from 'express'
import { addCourse, deleteCourse, EditCourse, getCourse, singleCourse } from '../controllers/course.controllers.js'

const router = express.Router()

router.get('/get', getCourse)
router.post('/add', addCourse)
router.get('/single/:id', singleCourse)
router.put('/edit/:id', EditCourse)
router.delete('/delete/:id', deleteCourse)


export default router