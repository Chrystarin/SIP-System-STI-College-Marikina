import { Forbidden, NotFound, Unauthorized } from '../../utilities/errors';
import { RequestHandler, Request } from 'express';
import { Reset, UserQuery } from './user.types';
import UserModel, { User, UserDocument } from './user.model';
import { genPassword } from '../../utilities/generateId';

export const getUsers: RequestHandler = async (req, res) => {
    const { employeeId, role } = <UserQuery>(<unknown>req.query);

    const modelQuery: UserQuery = {};
    if(employeeId) modelQuery.employeeId = employeeId;
    if(role) modelQuery.role = role;

    const users: Array<UserDocument> | null = await UserModel.find(modelQuery, { credentials: 0 }).exec();

    res.json(users);
};

export const resetPassword: RequestHandler = async (req: Request<{}, {}, Reset>, res) => {
    const { employeeId, password = genPassword() } = req.body;

    const { modifiedCount } = await UserModel.updateOne(
        { employeeId },
        {
            $set: {
                'credentials.password': password
            }
        }
    );

    if (modifiedCount === 0) throw new NotFound('User not found');

    res.json({ password, message: 'Password reset successfully' });
};

export const updatePassword: RequestHandler = async (req: Request<{}, {}, User['credentials']>, res) => {
    const { password } = req.body;
    const user: UserDocument | undefined = req.user;
    if (user === undefined) throw new Unauthorized();

    user.credentials.password = password;
    await user.save();

    res.json({ message: 'Password updated successfully' });
};

export const updateStatus: RequestHandler = async (req: Request<{}, {}, User>, res) => {
    const { employeeId, status } = req.body;

    const user: UserDocument | undefined = req.user;
    if(user === undefined) throw new Unauthorized();
    if(user.employeeId === employeeId) throw new Forbidden();

    const { modifiedCount } = await UserModel.updateOne({ employeeId }, { $set: { status } }).exec();
    if(modifiedCount === 0) throw new NotFound('Employee not found');

    res.json({ message: 'Status updated successfully' });
}
