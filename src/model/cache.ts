import { promisify } from 'util';
import redisClient from '../database/redis';

export const GET_SESSION = promisify(redisClient.get).bind(redisClient)
export const SET_SESSION = promisify(redisClient.set).bind(redisClient)