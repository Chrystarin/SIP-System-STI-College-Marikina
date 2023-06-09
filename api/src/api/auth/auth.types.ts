import { Request } from 'express';
import { UserDocument, UserRoles } from '../user/user.model';

export type Requestor = {
    role: UserRoles;
    employeeId: string;
};

export interface UserRequest extends Request {
    user?: UserDocument
}