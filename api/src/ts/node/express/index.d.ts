import * as express from 'express';
import { Requestor } from '../../src/utilities/constants';
import { IUser } from '../../src/models/User';
import { HydratedDocument } from 'mongoose';

declare global {
	namespace Express {
		interface Request {
			user: HydratedDocument<IUser>;
		}
	}
}
