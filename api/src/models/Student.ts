import { InferSchemaType, Schema, model } from 'mongoose';

const { String } = Schema.Types;

const studentSchema = new Schema(
	{
		studentId: {
			type: String,
			required: [true, 'Student ID is required'],
			unique: true
		},
		name: {
			first: {
				type: String,
				required: [true, 'First name is required']
			},
			middle: String,
			last: {
				type: String,
				required: [true, 'Last name is required']
			}
		}
	},
	{ timestamps: true }
);

type TStudent = InferSchemaType<typeof studentSchema>;
interface IStudent extends TStudent {}

export { TStudent, IStudent };

export default model<TStudent>('Student', studentSchema);
