import connectRedis from 'connect-redis';
import session, { SessionOptions } from 'express-session';
import redisClient from '../database/redis';

const RedisStore = connectRedis(session)

const sessionsConfig: SessionOptions = {
   store: new RedisStore({ client: redisClient }),
   secret: process.env.SESSION_SECRET!,
   saveUninitialized: false,
   resave: false,
   name: 'sessionID',
   cookie: {
       secure: false,
       sameSite: true,
       httpOnly: true,
       maxAge: +process.env.SESSION_EXPIRY
   }
}

export default sessionsConfig;