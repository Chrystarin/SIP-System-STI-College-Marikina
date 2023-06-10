import { User } from "./user.model";

export type Login = {
    email: string;
    password: string;
}

export type Reset = {
    employeeId: string;
    password: string;
}

export type UserQuery = {
    employeeId?: User['employeeId'];
    role?: User['role'];
}