import { compare } from "bcryptjs"
import { Request, Response, NextFunction } from "express"
import ApiError from "../error/ApiError"
import User from "../model/user"


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const { username, email, password, confirm } = req.body

        if(!username || !email || !password || !confirm){
            return next(ApiError.badRequest('Please Provide Username, Email, and Password...'))
        }

        if(password != confirm){
            return next(ApiError.badRequest('Password must Match...'))
        }

        const registered = await User.registerUser(email, password, username)

        if(registered instanceof ApiError){
            return next(registered)
        }

        res.sendStatus(201)

    }catch(err){
        next(ApiError.internal('Server Error - Could not Register User...'))
    }
}

export const logInUser = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const { email, password } = req.body

        let user = await User.loginUser(email)

        if(user instanceof ApiError){
            return next(user)
        }

        const match = await compare(password, user.password)

        if(match){
            req.session.userId = user._id
            
            return res.send(user)
        }

        next(ApiError.unauthorized('Wrong Email or Password was Provided...'))

    }catch(err){
        next(ApiError.internal('Server Error - Could not Log In User...'))
    }
}

export const getUserData = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const { userId } = req.session

        const user = await User.getUserData(userId!)

        if(user instanceof ApiError){
            return next(user)
        }

        res.send(user)

    }catch(err){
        next(ApiError.internal('Server Error - Could not Get User Data...'))
    }
}

export const logOutUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        req.session.destroy

        res.clearCookie('sessionID')
        res.sendStatus(200)

    }catch(err){
        next(ApiError.internal('Server Error - Could not Log Out User...'))
    }
}