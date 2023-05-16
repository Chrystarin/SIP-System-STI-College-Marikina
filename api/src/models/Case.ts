import { InferSchemaType, Schema, model } from 'mongoose';

const { ObjectId, String } = Schema.Types;

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
					'Learning Difficulty'
				],
				message: '{VALUE} is not supported type'
			}
		},
		quarter: {
			type: String,
			required: [true, 'Quarter is required'],
			enum: {
				values: ['Prelim', 'Midterm', 'Prefinal', 'Final'],
				message: '{VALUE} is not supported quarter'
			}
		},
		issuers: [
			{
				type: ObjectId,
                ref: 'User',
				required: [true, 'Issuer is required']
			}
		]
	},
	{ timestamps: true }
);

type TCase = InferSchemaType<typeof caseSchema>;
interface ICase extends TCase {}

export { TCase, ICase }

export default model<TCase>('Case', caseSchema);
