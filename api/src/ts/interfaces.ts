import { RequestHandler } from 'express';
import { IUser } from '../models/User';

interface UserRequestHandler extends RequestHandler<unknown, unknown, IUser> {}

export { UserRequestHandler }