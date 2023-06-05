import { Document, Schema, model } from 'mongoose';

const { String } = Schema.Types;

const studentSchema = new Schema(
    {
        studentId: {
            type: String,
            required: [true, 'Student ID is required'],
            unique: true,
        },
        name: {
            first: {
                type: String,
                required: [true, 'First name is required'],
            },
            middle: String,
            last: {
                type: String,
                required: [true, 'Last name is required'],
            },
        },
    },
    { timestamps: true }
);

export interface Student {
    studentId: string;
    name: {
        first: string;
        middle?: string;
        last: string;
    };
}

export interface StudentDocument extends Student, Document {
    creteadAt: Date;
    updatedAt: Date;
}

export default model<StudentDocument>('Student', studentSchema);
