import bcryptjs from 'bcryptjs'
import User from "../modals/user.modals.js"
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const login = async(req, res, next) => {
    const {username, password} = req.body
    if(!username || !password) {
        return res.status(400).json({
            statusCode: 400,
            success: false,
            message: "Bad requesr! All fields are required"
        })
    }

    try {
            const validUser = await User.findOne({username})
            if (!validUser) return next(errorHandler(404, 'Admin not found'))
            const validPassword = bcryptjs.compareSync(password, validUser.password)
            if(!validPassword) return next(errorHandler(401, "Either username or password is wrong"))
            const token =  jwt.sign({id: validUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
            const {password: key, ...rest} = validUser._doc
            res.cookie(
                "access_token", 
                token,
                {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000, 
                    secure: false
                }
            ).status(200).json(rest)
           
    } catch (error) {
            next(error)
    }
}

export const logout = (req, res, next) =>{
    try {
        res.clearCookie("access_token").status(200).json('User has been logged out!')
    } catch (error) {
        next(error)
    }
}