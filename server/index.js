import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from "./src/routes/auth.routes.js"
import emplyeeRouter from "./src/routes/employee.routes.js"
import cors from 'cors'

dotenv.config()
mongoose
.connect(process.env.MONGO)
.then((res) => {
    console.log("Connected to DB")
})
.catch((err) => {
    console.log(err)
})

const app = express()
app.use(express.json())
app.use(cors({
    origin: `${process.env.ORIGIN}`,
    credentials: true,
}))
app.use(cookieParser())

app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}` )
})

app.use('/api/auth', authRouter)
app.use('/api/employee', emplyeeRouter)

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500
    const message = error.message || "Internal server error"
    return res.json({
        success: false,
        statusCode,
        message,
    })
})
