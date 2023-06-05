type Login = {
    email: string;
    password: string;
}

type Reset = {
    employeeId: string;
    password: string;
}

export { Login, Reset };