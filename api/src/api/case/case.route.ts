import { Router } from "express";
import { addCase } from "./case.controller";
import asyncHandler from "../../middlewares/asyncHandler";

const router: Router = Router();

router.post('/', asyncHandler(addCase));

export default router