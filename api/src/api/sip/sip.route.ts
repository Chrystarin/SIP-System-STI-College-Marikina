import { Router } from "express";
import { addCase, getSIPs, updateStatus } from "./sip.controller";
import { onlyModerator } from "../../middlewares/authorize";
import asyncHandler from "../../middlewares/asyncHandler";

const router: Router = Router();

router.get('/', asyncHandler(getSIPs));

router.post('/', asyncHandler(addCase));

router.patch('/', onlyModerator, asyncHandler(updateStatus));

export default router;