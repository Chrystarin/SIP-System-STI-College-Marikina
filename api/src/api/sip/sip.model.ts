import { Document, Schema, Types, model } from 'mongoose';
import { SchoolYearDocument, SchoolYearPopulatedDocument } from '../schoolYear/schoolYear.model';
import { UserDocument } from '../user/user.model';
import { StudentDocument } from '../student/student.model';
import { CaseKeys, Quarters, SIPStatus } from './sip.types';

const issuerSchema = new Schema({
    issuer: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Issuer is required']
    },
    quarter: {
        type: String,
        required: [true, 'Quarter is required'],
        enum: {
            values: [
                'Senior High School - Quarter 1',
                'Senior High School - Quarter 2',
                'Senior High School - Quarter 3',
                'Senior High School - Quarter 4',
                'Tertiary - Semester 1 - Prelims',
                'Tertiary - Semester 1 - Midterms',
                'Tertiary - Semester 1 - Pre-Finals',
                'Tertiary - Semester 1 - Finals',
                'Tertiary - Semester 2 - Prelims',
                'Tertiary - Semester 2 - Midterms',
                'Tertiary - Semester 2 - Pre-Finals',
                'Tertiary - Semester 2 - Finals',
                'Tertiary - Summer'
            ],
            message: '{VALUE} is not supported quarter'
        }
    },
    issuedAt: {
        type: Date,
        required: [true, 'Issued at is required']
    }
});

const sipSchema = new Schema(
    {
        sipId: {
            type: String,
            required: [true, 'SIP ID is required'],
            unique: true
        },
        schoolYear: {
            type: Types.ObjectId,
            ref: 'School Year',
            required: [true, 'School Year is required']
        },
        student: {
            type: Types.ObjectId,
            ref: 'Student',
            required: [true, 'Student is required']
        },
        cases: {
            ETA: { type: [issuerSchema], default: [] },
            DCP: { type: [issuerSchema], default: [] },
            UoaS: { type: [issuerSchema], default: [] },
            AEC: { type: [issuerSchema], default: [] },
            LD: { type: [issuerSchema], default: [] }
        },
        status: {
            type: String,
            default: 'pending',
            enum: {
                values: ['pending', 'resolved', 'no response'],
                message: '{VALUE} is not supported status'
            }
        },
        closed: {
            type: {
                at: {
                    type: Date,
                    required: [true, 'Closed at is required']
                },
                by: {
                    type: Types.ObjectId,
                    ref: 'User',
                    required: [true, 'Closed by is required']
                }
            },
            default: () => ({})
        }
    },
    { timestamps: true }
);

interface Issuer {
    issuer: Types.ObjectId | Record<string, unknown>;
    quarter: Quarters;
    issuedAt: Date;
}

export interface IssuerDocument extends Issuer {
    issuer: UserDocument['_id'];
}

interface IssuerPopulatedDocument extends IssuerDocument {
    issuer: UserDocument;
}

export interface SIP {
    sipId: string;
    schoolYear: Types.ObjectId | Record<string, unknown>;
    student: Types.ObjectId | Record<string, unknown>;
    cases: Record<CaseKeys, Array<Issuer>>;
    status: SIPStatus;
    closed?: {
        at: Date;
        by: Types.ObjectId | Record<string, unknown>;
    };
}

export interface SIPDocument extends SIP, Document {
    schoolYear: SchoolYearDocument['_id'];
    student: StudentDocument['_id'];
    cases: Record<CaseKeys, Array<IssuerDocument>>;
    closed?: {
        at: Date;
        by: UserDocument['_id'];
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface SIPPopulatedDocument extends SIPDocument {
    schoolYear: SchoolYearPopulatedDocument;
    student: StudentDocument;
    cases: Record<CaseKeys, Array<IssuerPopulatedDocument>>;
    closed?: {
        at: Date;
        by: UserDocument;
    };
}

export default model<SIPDocument>('SIP', sipSchema);
