import { Document, Schema, model, Types } from 'mongoose';
import { UserDocument } from '../user/user.model';

const caseSchema = new Schema(
    {
        type: {
            type: String,
            required: [true, 'Type is required'],
            enum: {
                values: [
                    'Excessive Tardiness/Abseces',
                    'Declining Class Performance',
                    'Unbecoming of an STIer',
                    'Assessment/Exam Concern',
                    'Learning Difficulty',
                ],
                message: '{VALUE} is not supported type',
            },
        },
        quarter: {
            type: String,
            required: [true, 'Quarter is required'],
            enum: {
                values: [
                    'SHSQ1',
                    'SHSQ2',
                    'SHSQ3',
                    'SHSQ4',
                    'TTY1PL',
                    'TTY1M',
                    'TTY1PF',
                    'TTY1F',
                    'TTY2PL',
                    'TTY2M',
                    'TTY2PF',
                    'TTY2F',
                    'TTYSMR',
                ],
                message: '{VALUE} is not supported quarter',
            },
        },
        issuers: [
            {
                type: Types.ObjectId,
                ref: 'User',
                required: [true, 'Issuer is required'],
            },
        ],
    },
    { timestamps: true }
);

enum caseTypes {
    ETA = 'Excessive Tardiness/Absences',
    DCP = 'Declining Class Performance',
    UOAS = 'Unbecoming of an STIer',
    AEC = 'Assessment/Exam Concern',
    LD = 'Learning Difficulty',
}

enum quarters {
    SHSQ1 = 'Senior High School - Quarter 1',
    SHSQ2 = 'Senior High School - Quarter 2',
    SHSQ3 = 'Senior High School - Quarter 3',
    SHSQ4 = 'Senior High School - Quarter 4',
    TTY1PL = 'Tertiary - Term 1 - Prelims',
    TTY1M = 'Tertiary - Term 1 - Midterms',
    TTY1PF = 'Tertiary - Term 1 - Pre-Finals',
    TTY1F = 'Tertiary - Term 1 - Finals',
    TTY2PL = 'Tertiary - Term 2 - Prelims',
    TTY2M = 'Tertiary - Term 2 - Midterms',
    TTY2PF = 'Tertiary - Term 2 - Pre-Finals',
    TTY2F = 'Tertiary - Term 2 - Finals',
    TTYSMR = 'Tertiary - Summer',
}

export interface Case {
    type: caseTypes;
    quarter: quarters;
    issuers: Array<Types.ObjectId | Record<string, unknown>>;
}

export interface CaseDocument extends Case, Document {
    issuers: Array<UserDocument['_id']>;
    createdAt: Date;
    updatedAt: Date;
}

export interface CasePopulatedDocument extends CaseDocument {
    issuers: Array<UserDocument>;
}

export default model<CaseDocument>('Case', caseSchema);
