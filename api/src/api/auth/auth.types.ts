import { UserRoles } from '../user/user.model';

export type Requestor = {
    role: UserRoles;
    employeeId: string;
};
