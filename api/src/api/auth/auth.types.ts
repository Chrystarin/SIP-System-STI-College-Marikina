import { User, UserRoles } from '../user/user.model';

export type Requestor = {
    role: UserRoles;
    employeeId: string;
};

export type RegisterUser = {
    employeeId: User['employeeId'];
    role: User['role'];
    name: User['name'];
    email: User['credentials']['email'];
}