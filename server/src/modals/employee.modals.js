import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Mobile number must be exactly 10 digits']
    },
    designation: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
})

 const Emplyee = mongoose.model("Employee", employeeSchema)

 export default Emplyee