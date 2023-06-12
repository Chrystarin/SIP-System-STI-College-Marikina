import { onlyAdmin } from '../../middlewares/authorize';
import { register, login, logout } from './auth.controller';
import { Router } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import authenticate from '../../middlewares/authenticate';

const router: Router = Router();

router.post('/login', asyncHandler(login));

router.use(authenticate);

router.post('/register', onlyAdmin, asyncHandler(register));

router.post('/logout', asyncHandler(logout));

export default router;
