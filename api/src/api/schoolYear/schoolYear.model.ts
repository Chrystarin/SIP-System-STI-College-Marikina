import { Document, Schema, Types, model } from 'mongoose';
import { UserDocument } from '../user/user.model';

const schoolYearSchema = new Schema(
    {
        start: {
            type: Date,
            required: [true, 'Start date is required'],
        },
        end: Date,
        admin: {
            type: Types.ObjectId,
            ref: 'User',
            required: [true, 'Admin is required'],
        },
    },
    { timestamps: true }
);

export interface SchoolYear {
    start: Date;
    end: Date;
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
