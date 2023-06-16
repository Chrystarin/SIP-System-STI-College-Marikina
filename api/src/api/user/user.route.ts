import { getUsers, resetPassword, updatePassword, updateStatus } from './user.controller';
import { onlyAdmin } from '../../middlewares/authorize';
import { Router } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';

const router: Router = Router();

router.get('/', asyncHandler(getUsers));

router.patch('/updatePassword', asyncHandler(updatePassword));

router.patch('/updateStatus', onlyAdmin, asyncHandler(updateStatus));

router.patch('/reset', onlyAdmin, asyncHandler(resetPassword));

export default router;
