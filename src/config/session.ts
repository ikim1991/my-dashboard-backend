import connectRedis from 'connect-redis';
import session, { SessionOptions } from 'express-session';
import redisClient from '../database/redis';

const RedisStore = connectRedis(session)

const sessionsConfig: SessionOptions = {
   store: new RedisStore({ client: redisClient }),
   saveUninitialized: false,
   resave: false,
   secret: 'SECRET_KEY',
   name: 'sessionID',
   cookie: {
       secure: false,
       sameSite: true,
       httpOnly: true,
       maxAge: +process.env.SESSION_EXPIRY
   }
}

export default sessionsConfig;