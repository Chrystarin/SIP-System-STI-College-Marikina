import { getUsers, updatePassword } from '../controllers/userController';
import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler';

const router: Router = Router();

router.get('/', asyncHandler(getUsers));

router.patch('/', asyncHandler(updatePassword));

export default router;
