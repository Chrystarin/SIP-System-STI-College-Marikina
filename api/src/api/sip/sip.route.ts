import { Router } from "express";
import { getSIPs, updateStatus } from "./sip.controller";
import { onlyModerator } from "../../middlewares/authorize";
import asyncHandler from "../../middlewares/asyncHandler";

const router: Router = Router();

router.get('/', asyncHandler(getSIPs));

router.patch('/', onlyModerator, asyncHandler(updateStatus));