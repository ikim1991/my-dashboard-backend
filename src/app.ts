import express from 'express';
import middleware from './middleware';
import './database/mongoose';
import route from './route';

const app = express();

// Check CORS Middleware
app.options('*', middleware.cors)
app.use(middleware.cors)

// JSON Parsing Middleware
app.use(express.json())

// Session Middleware
app.use(middleware.session)

// Router End Points
app.use(route.user)
app.use(route.financial)
app.use(route.postings)
app.use(route.task)

// Error Handling Middleware to Catch all Errors
app.use(middleware.errorHandler)

export default app;