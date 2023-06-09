import { RequestHandler } from 'express';
import { SchoolYearModelQuery, SchoolYearQuery } from './schoolYear.types';
import { Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { UserDocument } from '../user/user.model';
import SchoolYearModel, { SchoolYearPopulatedDocument } from './schoolYear.model';

export const getSchoolYears: RequestHandler = async (req, res) => {
    let { schoolYearStart, schoolYearEnd } = <SchoolYearQuery>(<unknown>req.query);

    let modelQuery: SchoolYearModelQuery = {};

    if (schoolYearStart && schoolYearEnd) {
        modelQuery.start = { $gte: new Date(schoolYearStart).getFullYear() };
        modelQuery.end = { $lte: new Date(schoolYearEnd).getFullYear() };
    } else {
        const schoolYear: [string | undefined, 'start' | 'end'] = schoolYearStart ? [schoolYearStart, 'start'] : [schoolYearEnd, 'end'];
        if (schoolYear[0] === undefined) throw new UnprocessableEntity('School Year not started yet');

        const [year, prop] = schoolYear;
        modelQuery[prop] = new Date(year).getFullYear();
    }

    const schoolYears: Array<SchoolYearPopulatedDocument> | null = await SchoolYearModel.find(modelQuery).populate({ path: 'admin', select: 'employeeId role name' }).exec();

    res.json(schoolYears);
};

export const startSchoolYear: RequestHandler = async (req, res) => {
    const user: UserDocument | undefined = req.user;
    if (user === undefined) throw new Unauthorized();

    await SchoolYearModel.create({ start: new Date().getFullYear(), admin: user._id });

    res.status(201).json({ message: 'School Year started' });
};

export const endSchoolYear: RequestHandler = async (_req, res) => {
    const { modifiedCount } = await SchoolYearModel.updateOne(
        {
            end: { $exists: false }
        },
        {
            $set: { end: new Date().getFullYear() }
        }
    ).exec();

    if (modifiedCount === 0) throw new UnprocessableEntity('School Year not started yet');

    res.json({ message: 'School Year ended' });
};
