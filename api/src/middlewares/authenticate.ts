import { cookieOptions, signAccess, signRefresh } from '../utilities/cookies';
import { Forbidden, NotFound, Unauthorized } from '../utilities/errors';
import { RequestHandler } from 'express';
import { Requestor } from '../ts/types';
import { verify } from 'jsonwebtoken';
import env from '../utilities/envs';
import User from '../models/User';

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
			const { role, employeeId, createdAt } = <Requestor>(
				verify(refreshToken, JWT_REFRESH)
			);
			user = { role, employeeId, createdAt };

			res.cookie('access-token', signAccess(user), cookieOptions.access);

			if (
				Date.now() - new Date(user.createdAt).getTime() >
				5 * 24 * 60 * 60 * 1000
			)
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
		const userFound = await User.findOne({
			employeeId: user.employeeId,
			role: user.role,
			status: 'active'
		});

		if (!userFound) return next(new NotFound('User not found'));

		if (userFound.status === 'inactive')
			return next(new Forbidden('User is not active'));

		req.user = userFound;
		return next();
	}

	next(new Unauthorized('This action requires logging in first'));
};

export default authenticate;
