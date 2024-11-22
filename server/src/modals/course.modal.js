import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true,
        unique: true
    }
})

 const Course = mongoose.model("Course", CourseSchema)

 export default Course