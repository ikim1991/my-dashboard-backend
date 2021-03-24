import { ClientOpts } from 'redis';

const redisConfig: ClientOpts = {
   host: process.env.REDIS_HOST!,
   port: +process.env.REDIS_PORT!
}

export default redisConfig;