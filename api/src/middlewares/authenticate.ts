import { cookieOptions, signAccess, signRefresh } from '../utilities/cookies';
import { Forbidden, NotFound, Unauthorized } from '../utilities/errors';
import { JwtPayload, verify } from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { Requestor } from '../api/auth/auth.types';
import env from '../utilities/envs';
import UserModel, { UserDocument, UserStatus } from '../api/user/user.model';

const { JWT_ACCESS, JWT_REFRESH } = env;
const authenticate: RequestHandler = async (req, res, next) => {
    const { 'access-token': accessToken, 'refresh-token': refreshToken } =
        req.cookies;

    if (!refreshToken)
        return next(new Unauthorized('This action requires logging in first'));

    let user: Requestor | undefined;

    try {
        user = <Requestor>verify(accessToken, JWT_ACCESS);
    } catch (error) {}

    if (!user) {
        try {
            const {
                role,
                employeeId,
                exp = Date.now(),
            } = <JwtPayload & Requestor>verify(refreshToken, JWT_REFRESH);
            user = { role, employeeId };

            res.cookie('access-token', signAccess(user), cookieOptions.access);

            if (Date.now() - new Date(exp).getTime() > 5 * 24 * 60 * 60 * 1000)
                res.cookie(
                    'refresh-token',
                    signRefresh(user),
                    cookieOptions.refresh
                );
        } catch (error) {
            /* prettier-ignore */
            res.cookie('access-token', '', cookieOptions.default)
                .cookie('refresh-token', '', cookieOptions.default);

            next(error);
        }
    }

    if (user) {
        const userFound: UserDocument | null = await UserModel.findOne({
            employeeId: user.employeeId,
            role: user.role,
            status: UserStatus.Active,
        });

        if (!userFound) return next(new NotFound('User not found'));

        if (userFound.status === UserStatus.Inactive)
            return next(new Forbidden('User is not active'));

        req.user = userFound;
        return next();
    }

    next(new Unauthorized('This action requires logging in first'));
};

export default authenticate;
