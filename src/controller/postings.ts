import { Request, Response, NextFunction } from "express"
import ApiError from "../error/ApiError"
import getJobPosts from '../api/getJobPosts';
import Posting from '../model/postings';


export const updateJobPosts = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const { userId } = req.session

        const postings = await getJobPosts(req.body)

        if(postings instanceof ApiError){
            return next(postings)
        }

        const jobs = await Posting.updateJobPostings(userId!, postings)

        if(jobs instanceof ApiError){
            return next(jobs)
        }

        res.send(postings)

    }catch(err){
        return ApiError.badRequest('Error in Updating Job Posts...')
    }
}

export const fetchJobPosts = async (req: Request, res: Response, next: NextFunction) => {
    try{
        
        const { userId } = req.session

        const postings = await Posting.getJobPostings(userId!)

        if(postings instanceof ApiError){
            return next(postings)
        }

        res.send(postings)

    }catch(err){
        return ApiError.badRequest('Error in Fetching Job Posts...')
    }
}
