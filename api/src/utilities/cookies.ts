import { Requestor } from '../api/auth/auth.types';
import { sign } from 'jsonwebtoken';
import env from './envs';

const duration = {
	access: 60 * 1000, // 1 minute
	refresh: 7 * 24 * 60 * 60 * 1000 // 7 days
};

type TCookieOption = {
	httpOnly: boolean;
	sameSite: 'none';
	maxAge: number;
};

const options: TCookieOption = {
	httpOnly: true,
	sameSite: 'none',
	maxAge: 0
};

const cookieOptions: {
	access: TCookieOption;
	refresh: TCookieOption;
	default: TCookieOption;
} = {
	access: { ...options, maxAge: duration.access },
	refresh: { ...options, maxAge: duration.refresh },
	default: options
};

const signCookie = (
	payload: Requestor,
	secret: string,
	expiresIn: number
): string => sign({ ...payload, createdAt: new Date() }, secret, { expiresIn });

const signAccess = (payload: Requestor): string =>
	signCookie(payload, env.JWT_ACCESS, duration.access);

const signRefresh = (payload: Requestor): string =>
	signCookie(payload, env.JWT_REFRESH, duration.refresh);

export { signAccess, signRefresh, TCookieOption, cookieOptions };
