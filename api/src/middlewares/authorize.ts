import { RequestHandler } from 'express';
import { Unauthorized } from '../utilities/errors';

const onlyAdmin: RequestHandler = (req, _res, next) => {
	// If the user exists and their role is 'admin', call the next middleware
	if (req.user?.role === 'admin') return next();

	// If the user does not have admin privileges, return an Unauthorized error
	next(new Unauthorized('This action requires admin privileges'));
};

const onlyModerator: RequestHandler = (req, _res, next) => {
	// Using a switch statement to check the user's role
	switch (req.user?.role) {
		// If the user's role is a moderator or an admin, call the next middleware in the chain
		case 'moderator':
		case 'admin':
			return next();
	}

	// If the user's role is not a moderator or an admin, return an Unauthorized error
	next(new Unauthorized(`This action requires moderator privileges`));
};

export { onlyAdmin, onlyModerator };
