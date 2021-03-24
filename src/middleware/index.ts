import cors from './cors';
import session from './session';
import errorHandler from './errorHandler';

const middleware = {
    cors,
    session,
    errorHandler
}

export default middleware;