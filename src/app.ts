import express from 'express';
import middleware from './middleware';
import './database/mongoose';

const app = express();

// Check CORS Middleware
app.options('*', middleware.cors)
app.use(middleware.cors)

// JSON Parsing Middleware
app.use(express.json())

export default app;