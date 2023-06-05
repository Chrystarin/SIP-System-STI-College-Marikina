import { Document, Schema, Types, model } from 'mongoose';
import { SchoolYearDocument } from '../schoolYear/schoolYear.model';
import { UserDocument } from '../user/user.model';
import { StudentDocument } from '../student/student.model';
import { CaseDocument } from '../case/case.model';

const sipSchema = new Schema(
    {
        sipId: {
            type: String,
            required: [true, 'SIP ID is required'],
            unique: true,
        },
        schoolYear: {
            type: Types.ObjectId,
            ref: 'School Year',
            required: [true, 'School Year is required'],
        },
        student: {
            type: Types.ObjectId,
            ref: 'Student',
            required: [true, 'Student is required'],
        },
        cases: [
            {
                type: Types.ObjectId,
                ref: 'Case',
                required: [true, 'Case is required'],
            },
        ],
        status: {
            type: String,
            default: 'pending',
            enum: {
                values: ['pending', 'resolved', 'no response'],
                message: '{VALUE} is not supported status',
            },
        },
        closed: {
            at: Date,
            by: {
                type: Types.ObjectId,
                ref: 'User',
            },
        },
    },
    { timestamps: true }
);

enum SIPStatus {
    Pending = 'pending',
    Resolved = 'resolved',
    NoResponse = 'no response',
}

export interface SIP {
    sipId: string;
    schoolYear: Types.ObjectId | Record<string, unknown>;
    student: Types.ObjectId | Record<string, unknown>;
    cases: Array<Types.ObjectId | Record<string, unknown>>;
    status: SIPStatus;
    closed?: {
        at: Date;
        by: Types.ObjectId | Record<string, unknown>;
    };
}

export interface SIPDocument extends SIP, Document {
    schoolYear: SchoolYearDocument['_id'];
    student: StudentDocument['_id'];
    cases: Array<CaseDocument['_id']>;
    closed: {
        at: Date;
        by: UserDocument['_id'];
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface SIPPopulatedDocument extends SIPDocument {
    schoolYear: SchoolYearDocument;
    student: StudentDocument;
    cases: Array<CaseDocument>;
    closed: {
        at: Date;
        by: UserDocument;
    };
}

export default model<SIPDocument>('SIP', sipSchema);
