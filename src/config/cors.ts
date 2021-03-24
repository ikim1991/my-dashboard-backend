import { CorsOptions } from "cors"
import ApiError from '../error/ApiError';

const whitelist = new Set(['https://example.com']);
const config: CorsOptions = {
    // origin: (origin, cb) => {
    //     if(whitelist.has(origin!)){
    //         cb(null, true)
    //     } else{
    //         cb(ApiError.internal('Not Allowed by CORS'))
    //     }
    // },
    origin: false,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST'],
    credentials: true
}

export default config;