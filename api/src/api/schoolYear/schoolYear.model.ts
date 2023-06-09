import { Document, Schema, Types, model } from 'mongoose';
import { UserDocument } from '../user/user.model';

const schoolYearSchema = new Schema(
    {
        start: {
            type: Number,
            unique: true,
            required: [true, 'Start date is required'],
        },
        end: {
            type: Number,
            index: { unique: true, sparse: true },
        },
        admin: {
            type: Types.ObjectId,
            ref: 'User',
            required: [true, 'Admin is required'],
        },
    },
    { timestamps: true }
);

export interface SchoolYear {
    start: number;
    end: number;
    admin: Types.ObjectId | Record<string, unknown>;
}

export interface SchoolYearDocument extends SchoolYear, Document {
    admin: UserDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface SchoolYearPopulatedDocument extends SchoolYearDocument {
    admin: UserDocument;
}

export default model<SchoolYearDocument>('School Year', schoolYearSchema);
