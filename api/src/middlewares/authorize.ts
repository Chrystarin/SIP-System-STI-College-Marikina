import { RequestHandler } from 'express';
import { Unauthorized } from '../utilities/errors';
import { UserRoles } from '../api/user/user.model';

export const onlyAdmin: RequestHandler = (req, _res, next) => {
    if (req.user?.role === UserRoles.Admin) return next();

    next(new Unauthorized('This action requires admin privileges'));
};

export const onlyModerator: RequestHandler = (req, _res, next) => {
    switch (req.user?.role) {
        case UserRoles.Admin:
        case UserRoles.Moderator:
            return next();
    }

    next(new Unauthorized(`This action requires moderator privileges`));
};
