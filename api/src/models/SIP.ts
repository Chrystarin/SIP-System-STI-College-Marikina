import { InferSchemaType, Schema, model } from 'mongoose';

const { ObjectId, Date, String } = Schema.Types;

const sipSchema = new Schema(
	{
		sipId: {
			type: String,
			required: [true, 'SIP ID is required'],
			unique: true
		},
		schoolYear: {
			type: ObjectId,
			ref: 'School Year',
			required: [true, 'School Year is required']
		},
		semester: {
			type: String,
			required: [true, 'Semester is required'],
			enum: {
				values: ['1st', '2nd', 'Summer'],
				message: '{VALUE} is not supported semester'
			}
		},
		student: {
			type: ObjectId,
			ref: 'Student',
			required: [true, 'Student is required']
		},
		cases: [
			{
				type: ObjectId,
				ref: 'Case',
				required: [true, 'Case is required']
			}
		],
		status: {
			type: String,
			default: 'pending',
			enum: {
				values: ['pending', 'resolved', 'no response'],
				message: '{VALUE} is not supported status'
			}
		},
		closed: {
			at: Date,
			by: {
				type: ObjectId,
				ref: 'User'
			}
		}
	},
	{ timestamps: true }
);

type TSIP = InferSchemaType<typeof sipSchema>;
interface ISIP extends TSIP {}

export { TSIP, ISIP };

export default model<TSIP>('SIP', sipSchema);
