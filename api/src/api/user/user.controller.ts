import { NotFound } from '../../utilities/errors';
import { RequestHandler, Request } from 'express';
import { Reset } from './user.types';
import UserModel, { User, UserDocument } from './user.model';

const getUsers: RequestHandler = async (
    req: Request<{}, {}, {}, unknown>,
    res
) => {
    const { employeeId, role } = <User>req.query;

    const users: Array<UserDocument> | null = await UserModel.find(
        { employeeId, role },
        { credentials: 0 }
    ).exec();

    res.json(users);
};

const resetPassword: RequestHandler = async (
    req: Request<{}, {}, Reset>,
    res
) => {
    const { employeeId, password } = req.body;

    const { modifiedCount } = await UserModel.updateOne(
        { employeeId },
        {
            $set: {
                'credentials.password': password,
            },
        }
    );

    if (modifiedCount === 0) throw new NotFound('User not found');

    res.json({ message: 'Password reset successfully' });
};

/* prettier-ignore */
const updatePassword: RequestHandler = async (req: Request<{}, {}, User['credentials']>, res) => {
    const { password } = req.body;
    const user: UserDocument = req.user;

    user.credentials.password = password;
    await user.save();

    res.json({ message: 'Password updated successfully' });
};

export { getUsers, updatePassword, resetPassword };
