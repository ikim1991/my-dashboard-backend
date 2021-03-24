  
declare global {
    namespace NodeJS {
       interface ProcessEnv {
          NODE_ENV: 'development' | 'test' | 'production';
          PORT: number;
          MONGODB_URL: string;
          REDIS_HOST: string;
          REDIS_PORT: number;
       }
    }
 }

 export {}