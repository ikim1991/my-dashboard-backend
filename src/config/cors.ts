import { CorsOptions } from "cors"

const whitelist = new Set(['https://example.com']);
const config: CorsOptions = {
    // origin: (origin, cb) => {
    //     if(whitelist.has(origin!)){
    //         cb(null, true)
    //     } else{
    //         cb(new Error('Not allowed by CORS...'))
    //     }
    // },
    origin: false,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST'],
    credentials: true
}

export default config;