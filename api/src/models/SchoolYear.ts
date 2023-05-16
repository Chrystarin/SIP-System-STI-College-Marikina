import { InferSchemaType, Schema, model } from 'mongoose';

const { ObjectId, Date } = Schema.Types;

const schoolYearSchema = new Schema(
	{
		start: {
			type: Date,
			required: [true, 'Start date is required']
		},
		end: Date,
		admin: {
			type: ObjectId,
			ref: 'User',
			required: [true, 'Admin is required']
		}
	},
	{ timestamps: true }
);

type TSchoolYear = InferSchemaType<typeof schoolYearSchema>;
interface ISchoolYear extends TSchoolYear {}

export { TSchoolYear, ISchoolYear }

export default model<TSchoolYear>('School Year', schoolYearSchema);
