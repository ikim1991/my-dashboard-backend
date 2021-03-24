import session from 'express-session';
import configs from '../config/session';

export default session(configs);