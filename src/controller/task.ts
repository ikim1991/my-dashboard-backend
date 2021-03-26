import { Request, Response, NextFunction } from "express"
import ApiError from "../error/ApiError"
import Task from '../model/task';

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const { userId } = req.session
        const { description, deadline } = req.body

        const tasks = await Task.createNewTask(description, deadline, userId!)

        if(tasks instanceof ApiError){
            return next(tasks)
        }

        res.send(tasks)


    }catch(err){
        return ApiError.badRequest('Error in Creating New Task...')
    }
}

export const toggleTask = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const { userId } = req.session
        const { _id } = req.body
        
        const tasks = await Task.toggleTaskComplete(_id, userId!)

        if(tasks instanceof ApiError){
            return next(tasks)
        }

        res.send(tasks)

    }catch(err){
        return ApiError.badRequest('Error in Completing Task...')
    }
}

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const { userId } = req.session

        const tasks = await Task.getTasks(userId!)

        if(tasks instanceof ApiError){
            return next(tasks)
        }

        res.send(tasks)

    }catch(err){
        return ApiError.badRequest('Error in Getting Tasks...')
    }
}


export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const { userId } = req.session
        const { _id } = req.body

        const tasks = await Task.deleteTask(_id, userId!)

        if(tasks instanceof ApiError){
            return next(tasks)
        }

        res.send(tasks)

    }catch(err){
        return ApiError.badRequest('Error in Deleting Task...')
    }
}