// Importing required packages and modules
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';



// Importing custom middlewares and utilities
import authenticate from './middlewares/authenticate';
import errorHandler from './middlewares/errorHandler';

import { NotFound } from './utilities/errors';
import env from './utilities/envs';

// Importing routes
import authRoute from './routes/auth';
import userRoute from './routes/user';

// Extracting environment variables
const { PORT, MONGO_URI, CORS_ORIGIN } = env;

// Creating an Express app
const app: Express = express();

// Middleware setup
app.use(cors({ credentials: true, origin: CORS_ORIGIN }));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

// Setting up routes
app.use('/auth', authRoute);
app.use(authenticate);
app.use('/user', userRoute);

// Catch-all route for handling 404 errors
app.use((_req, _res, next) => next(new NotFound()));

// Error handling middleware
app.use(errorHandler);

// Connecting to MongoDB and starting the server
mongoose
	.connect(MONGO_URI) // Connects to MongoDB using the URI from the environment variables
	.then(() => {
		console.log('Connected to MongoDB');
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Starts the server on the specified port
	})
	.catch(console.error); // Logs any connection errors to the console
