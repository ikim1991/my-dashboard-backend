import { GET_SESSION } from '../model/cache';
import ApiError from "../error/ApiError";

export const checkSessionCache = async (sessionId: string) => {
    try{
        const id = `sess:${sessionId}`

        const session = await GET_SESSION(id)

        if(!session){
            return ApiError.unauthorized('Unauthorized Action...')
        }

        return JSON.parse(session)

    } catch(err){
        return ApiError.unauthorized('Unauthorized Action...')
    }
}