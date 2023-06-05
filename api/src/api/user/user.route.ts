import { getUsers, resetPassword, updatePassword } from './user.controller';
import { onlyAdmin } from '../../middlewares/authorize';
import { Router } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';

const router: Router = Router();

router.get('/', asyncHandler(getUsers));

router.patch('/update', asyncHandler(updatePassword));

router.patch('/reset', onlyAdmin, asyncHandler(resetPassword));

export default router;
