"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStudent = exports.getStudents = void 0;
const student_model_1 = __importDefault(require("./student.model"));
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.query;
    const modelQuery = {};
    if (studentId)
        modelQuery.studentId = studentId;
    const students = yield student_model_1.default.find(modelQuery).exec();
    res.json(students);
});
exports.getStudents = getStudents;
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield student_model_1.default.create(req.body);
    res.json({ message: 'Student added successfully' });
});
exports.addStudent = addStudent;
