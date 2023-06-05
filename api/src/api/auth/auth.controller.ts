import { compareSync } from 'bcrypt';
import { Requestor } from './auth.types';
import { RequestHandler, Request } from 'express';
import { signAccess, signRefresh, cookieOptions, } from '../../utilities/cookies'; // prettier-ignore
import { Unauthorized } from '../../utilities/errors';
import UserModel, { User, UserDocument } from '../user/user.model';

/* prettier-ignore */
export const register: RequestHandler = async (req: Request<{}, {}, User>, res) => {
    await UserModel.create({ ...req.body, status: 'active' });

    res.json({ message: 'Registered successfully' });
};

/* prettier-ignore */
export const login: RequestHandler = async (req: Request<{}, {}, User['credentials']>, res) => {
    const { email, password } = req.body;

    const user: UserDocument | null = await UserModel.findOne(
        { 'credentials.email': email },
        { 'credentials.password': 1, employeeId: 1, role: 1 }
    ).exec();

    if (!user || !compareSync(password, user.credentials.password))
        throw new Unauthorized('Invalid email or password');

    const requestor: Requestor = {
        employeeId: user.employeeId,
        role: user.role,
    };

    res.cookie('access-token', signAccess(requestor), cookieOptions.access)
        .cookie('refresh-token', signRefresh(requestor), cookieOptions.refresh)
        .json({ message: 'Logged in successfully' });
};

export const logout: RequestHandler = (_req, res) => {
    res.cookie('access-token', '', cookieOptions.default)
        .cookie('refresh-token', '', cookieOptions.default)
        .json('Logged out successfully');
};
