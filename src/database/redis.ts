import redis from 'redis';
import config from '../config/redis';

const redisClient = redis.createClient(config)

redisClient.on('connect', () => {
   console.log('Connected to Redis...')
})

redisClient.on('error', (err: Error) => {
   console.error(`${err.name} - ${err.message}`)
})

export default redisClient;