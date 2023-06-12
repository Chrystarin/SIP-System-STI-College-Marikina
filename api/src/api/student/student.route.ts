import { Router } from "express";
import { addStudent, getStudents } from "./student.controller";
import asyncHandler from "../../middlewares/asyncHandler";

const router: Router = Router();

router.get('/', asyncHandler(getStudents));

router.post('/', asyncHandler(addStudent));

export default router;