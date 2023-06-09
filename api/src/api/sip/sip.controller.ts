import { AddCase, CaseKeys, CaseTypes, SIPModelQuery, SIPQuery, SIPStatus } from './sip.types';
import { genSIPid } from '../../utilities/generateId';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { Request, RequestHandler } from 'express';
import { UserDocument } from '../user/user.model';
import SchoolYearModel, { SchoolYearDocument } from '../schoolYear/schoolYear.model';
import SipModel, { IssuerDocument, SIP, SIPDocument, SIPPopulatedDocument } from './sip.model';
import StudentModel, { StudentDocument } from '../student/student.model';

export const getSIPs: RequestHandler = async (req, res) => {
    const { sipId, studentId, status, schoolYearStart, schoolYearEnd } = <SIPQuery>(<unknown>req.query);

    const modelQuery: SIPModelQuery = {};

    if (sipId) modelQuery.sipId = sipId;
    if (status) modelQuery.status = status;

    if (studentId) {
        const student: StudentDocument | null = await StudentModel.findOne({ studentId }, { _id: 1 }).exec();

        if (!student) throw new NotFound('Student not saved yet');

        modelQuery.student = student._id;
    }

    if (schoolYearStart && schoolYearEnd) {
        const start = schoolYearStart.getFullYear();
        const end = schoolYearEnd.getFullYear();

        if (start >= end) throw new UnprocessableEntity('School Year range invalid');

        const schoolYears: Array<SchoolYearDocument> = await SchoolYearModel.find({ start, end }, { _id: 1 }).exec();

        modelQuery.schoolYear = { $in: schoolYears.map((schoolYear) => schoolYear._id) };
    } else {
        const schoolYear: [Date | undefined, 'start' | 'end'] = schoolYearStart ? [schoolYearStart, 'start'] : [schoolYearEnd, 'end'];
        if (schoolYear[0] === undefined) throw new UnprocessableEntity('School Year not started yet');

        const [year, prop] = schoolYear;

        const SY: SchoolYearDocument | null = await SchoolYearModel.findOne({ [prop]: year }, { _id: 1 }).exec();
        if (SY === null) throw new UnprocessableEntity("School Year doesn't saved yet");

        modelQuery.schoolYear = SY._id;
    }

    const SIPs: Array<SIPPopulatedDocument> = await SipModel.find(modelQuery)
        .populate([{ path: 'schoolYear', populate: { path: 'admin' } }, { path: 'closed.by' }])
        .exec();

    res.json(SIPs);
};

export const updateStatus: RequestHandler = async (req: Request<{}, {}, SIP>, res) => {
    const { sipId, status } = req.body;

    const { modifiedCount } = await SipModel.updateOne({ sipId }, { $set: { status } }).exec();
    if (modifiedCount === 0) throw new NotFound('SIP not existing');

    res.json({ message: 'SIP status updated' });
};

const getCaseKey = (caseType: CaseTypes): CaseKeys => {
    switch (caseType) {
        case CaseTypes.ETA:
            return CaseKeys[CaseTypes.ETA];
        case CaseTypes.DCP:
            return CaseKeys[CaseTypes.DCP];
        case CaseTypes.UoaS:
            return CaseKeys[CaseTypes.UoaS];
        case CaseTypes.AEC:
            return CaseKeys[CaseTypes.AEC];
        case CaseTypes.LD:
            return CaseKeys[CaseTypes.LD];
        default:
            throw new UnprocessableEntity('Invalid case type');
    }
};

export const addCase: RequestHandler = async (req: Request<{}, {}, AddCase>, res) => {
    const { studentId, sipCase, quarter } = req.body;

    if (req.user === undefined) throw new Unauthorized('Login first');
    const user: UserDocument = req.user;

    const student: StudentDocument | null = await StudentModel.findOne({ studentId }, { _id: 1 }).exec();
    if (student === null) throw new NotFound('Student not saved yet');

    let activeSIP: SIPDocument | null = await SipModel.findOne({ student: student._id, status: SIPStatus.Pending }).exec();
    if (activeSIP === null) {
        const schoolYear: SchoolYearDocument | null = await SchoolYearModel.findOne({ end: { $exists: false } }, { _id: 1 }).exec();
        if (schoolYear === null) throw new UnprocessableEntity('School Year not started yet');

        activeSIP = await SipModel.create({
            sipId: genSIPid(),
            schoolYear: schoolYear._id,
            student: student._id
        });
    }

    const matchedCase: Array<IssuerDocument> = activeSIP.cases[getCaseKey(sipCase)];
    if (matchedCase.find((issuer: IssuerDocument) => issuer.issuer === user._id)) throw new UnprocessableEntity('Case already added');

    matchedCase.push({
        issuer: user._id,
        quarter,
        issuedAt: new Date()
    });

    await activeSIP.save();

    res.json({ message: 'Case added' });
};
