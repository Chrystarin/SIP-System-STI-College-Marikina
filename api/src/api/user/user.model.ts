import { Document, model, Schema } from 'mongoose';
import { hashSync } from 'bcrypt';

const userSchema = new Schema(
    {
        employeeId: {
            type: String,
            required: [true, 'Employee ID is required'],
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            enum: {
                values: ['admin', 'moderator', 'teacher'],
                message: '{VALUE} is not supported role',
            },
        },
        name: {
            type: {
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
            required: [true, 'Name is required'],
        },
        credentials: {
            type: {
                email: {
                    type: String,
                    required: [true, 'Email is required'],
                    match: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                    unique: true,
                },
                password: {
                    type: String,
                    required: [true, 'Password is required'],
                    set: (value: string): string => hashSync(value, 10),
                },
            },
            required: [true, 'Credentials are required'],
        },
        status: {
            type: String,
            default: 'active',
            enum: {
                values: ['active', 'inactive'],
                message: '{VALUE} is not supported status',
            },
        },
    },
    { timestamps: true }
);

export enum UserRoles {
    Admin = 'admin',
    Moderator = 'moderator',
    Teacher = 'teacher',
}

export enum UserStatus {
    Active = 'active',
    Inactive = 'inactive',
}

export interface User {
    employeeId: string;
    role: UserRoles;
    name: {
        first: string;
        middle?: string;
        last: string;
    };
    credentials: {
        email: string;
        password: string;
    };
    status: UserStatus;
}

export interface UserDocument extends User, Document {
    cretedAt: Date;
    updatedAt: Date;
}

export default model<UserDocument>('User', userSchema);
