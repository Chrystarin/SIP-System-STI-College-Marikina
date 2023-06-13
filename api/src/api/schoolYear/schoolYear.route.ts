import { Router } from "express";
import { endSchoolYear, getSchoolYears, startSchoolYear } from "./schoolYear.controller";
import { onlyAdmin } from "../../middlewares/authorize";
import asyncHandler from "../../middlewares/asyncHandler";

const router: Router = Router();

router.get('/', asyncHandler(getSchoolYears));

router.post('/', onlyAdmin, asyncHandler(startSchoolYear));

router.patch('/', onlyAdmin, asyncHandler(endSchoolYear));

export default router;