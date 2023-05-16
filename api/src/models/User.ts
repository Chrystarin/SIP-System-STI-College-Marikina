import { InferSchemaType, Schema, model } from 'mongoose';
import { hashSync } from 'bcrypt';

const { String } = Schema.Types;

const userSchema = new Schema(
	{
		employeeId: {
			type: String,
			required: [true, 'Employee ID is required']
		},
		role: {
			type: String,
			required: [true, 'Role is required'],
			enum: {
				values: ['admin', 'moderator', 'teacher'],
				message: '{VALUE} is not supported role'
			}
		},
		name: {
			type: {
				first: {
					type: String,
					required: [true, 'First name is required']
				},
				middle: String,
				last: {
					type: String,
					required: [true, 'Last name is required']
				}
			},
			required: [true, 'Name is required']
		},
		credentials: {
			type: {
				email: {
					type: String,
					required: [true, 'Email is required'],
					match: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
					unique: true
				},
				password: {
					type: String,
					required: [true, 'Password is required'],
					set: (value: string): string => hashSync(value, 10)
				}
			},
			required: [true, 'Credentials are required']
		},
		status: {
			type: String,
			default: 'active',
			enum: {
				values: ['active', 'inactive'],
				message: '{VALUE} is not supported status'
			}
		}
	},
	{
		timestamps: true,
		toObject: {
			transform: (_doc, ret) => {
				const { credentials, _id, __v, ...rest } = ret;
				return rest;
			}
		}
	}
);

type TUser = InferSchemaType<typeof userSchema>;
interface IUser extends TUser {}

export { IUser };

export default model<TUser>('User', userSchema);
