import { Request, RequestHandler } from 'express';
import { StudentQuery } from './student.types';
import StudentModel, { Student } from './student.model';

export const getStudents: RequestHandler = async (req, res) => {
    const { studentId } = <Student>(<unknown>req.query);

    const modelQuery: StudentQuery = {}
    if(studentId) modelQuery.studentId = studentId;

    const students: Array<Student> | null = await StudentModel.find(modelQuery).exec();

    res.json(students);
};

export const addStudent: RequestHandler = async (req: Request<{}, {}, Student>, res) => {
    await StudentModel.create(req.body);

    res.json({ message: 'Student added successfully' });
};
