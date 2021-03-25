  
declare global {
    namespace NodeJS {
       interface ProcessEnv {
          NODE_ENV: 'development' | 'test' | 'production';
          PORT: number;
          MONGODB_URL: string;
          REDIS_HOST: string;
          REDIS_PORT: number;
          SESSION_SECERT: string;
          SESSION_EXPIRY: number;
          CACHE_EXPIRY: number;
          HASH_SALT: number;
       }
    }
 }

 declare module 'express-session' {
   interface SessionData {
     userId: string;
   }
 }

 export {}