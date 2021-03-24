import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError";

const error = async (err: ApiError, req: Request, res: Response, next: NextFunction) => {

    console.error(`${err.code} - ${err.message}`)

    if(err instanceof ApiError){
        return res.status(err.code).send({ error: err.message })
    }

    res.status(500).send({ error: 'Something went Wrong...' })
}

export default error;