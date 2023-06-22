"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCase = exports.updateStatus = exports.getSIPs = void 0;
const sip_types_1 = require("./sip.types");
const generateId_1 = require("../../utilities/generateId");
const errors_1 = require("../../utilities/errors");
const user_model_1 = __importDefault(require("../user/user.model"));
const schoolYear_model_1 = __importDefault(require("../schoolYear/schoolYear.model"));
const sip_model_1 = __importDefault(require("./sip.model"));
const student_model_1 = __importDefault(require("../student/student.model"));
const getCaseKey = (caseType) => {
    switch (caseType) {
        case sip_types_1.CaseTypes.ETA:
            return sip_types_1.CaseKeys[sip_types_1.CaseTypes.ETA];
        case sip_types_1.CaseTypes.DCP:
            return sip_types_1.CaseKeys[sip_types_1.CaseTypes.DCP];
        case sip_types_1.CaseTypes.UoaS:
            return sip_types_1.CaseKeys[sip_types_1.CaseTypes.UoaS];
        case sip_types_1.CaseTypes.AEC:
            return sip_types_1.CaseKeys[sip_types_1.CaseTypes.AEC];
        case sip_types_1.CaseTypes.LD:
            return sip_types_1.CaseKeys[sip_types_1.CaseTypes.LD];
        default:
            throw new errors_1.UnprocessableEntity('Invalid case type');
    }
};
const getSIPs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sipId, employeeId, studentId, status, schoolYearStart, schoolYearEnd } = req.query;
    const modelQuery = {};
    if (sipId)
        modelQuery.sipId = sipId;
    if (status)
        modelQuery.status = status;
    if (employeeId) {
        const employee = yield user_model_1.default.findOne({ employeeId }, { _id: 1 }).exec();
        if (employee === null)
            throw new errors_1.NotFound('Employee not saved yet');
        modelQuery.$or = [
            { 'cases.ETA.issuer': employee._id },
            { 'cases.DCP.issuer': employee._id },
            { 'cases.UoaS.issuer': employee._id },
            { 'cases.AEC.issuer': employee._id },
            { 'cases.LD.issuer': employee._id }
        ];
    }
    if (studentId) {
        const student = yield student_model_1.default.findOne({ studentId }, { _id: 1 }).exec();
        if (!student)
            throw new errors_1.NotFound('Student not saved yet');
        modelQuery.student = student._id;
    }
    if (schoolYearStart && schoolYearEnd) {
        const start = new Date(schoolYearStart).getFullYear();
        const end = new Date(schoolYearEnd).getFullYear();
        if (start >= end)
            throw new errors_1.UnprocessableEntity('School Year range invalid');
        const schoolYears = yield schoolYear_model_1.default.find({ start, end }, { _id: 1 }).exec();
        modelQuery.schoolYear = { $in: schoolYears.map((schoolYear) => schoolYear._id) };
    }
    else {
        const schoolYear = schoolYearStart ? [schoolYearStart, 'start'] : [schoolYearEnd, 'end'];
        if (schoolYear[0] !== undefined) {
            const [year, prop] = schoolYear;
            const SY = yield schoolYear_model_1.default.findOne({ [prop]: new Date(year).getFullYear() }, { _id: 1 }).exec();
            if (SY === null)
                throw new errors_1.UnprocessableEntity("School Year doesn't saved yet");
            modelQuery.schoolYear = SY._id;
        }
    }
    const SIPs = yield sip_model_1.default.find(modelQuery)
        .populate([
        { path: 'schoolYear', populate: { path: 'admin' } },
        { path: 'closed.by' },
        { path: 'student' },
        { path: 'cases.AEC.issuer' },
        { path: 'cases.DCP.issuer' },
        { path: 'cases.ETA.issuer' },
        { path: 'cases.LD.issuer' },
        { path: 'cases.UoaS.issuer' }
    ])
        .exec();
    res.json(SIPs);
});
exports.getSIPs = getSIPs;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sipId, status } = req.body;
    const { modifiedCount } = yield sip_model_1.default.updateOne({ sipId }, { $set: { status } }).exec();
    if (modifiedCount === 0)
        throw new errors_1.NotFound('SIP not existing');
    res.json({ message: 'SIP status updated' });
});
exports.updateStatus = updateStatus;
const addCase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, sipCase, term } = req.body;
    if (req.user === undefined)
        throw new errors_1.Unauthorized('Login first');
    const user = req.user;
    const student = yield student_model_1.default.findOne({ studentId }, { _id: 1 }).exec();
    if (student === null)
        throw new errors_1.NotFound('Student not saved yet');
    let activeSIP = yield sip_model_1.default.findOne({ student: student._id, status: sip_types_1.SIPStatus.Pending }).exec();
    if (activeSIP === null) {
        const schoolYear = yield schoolYear_model_1.default.findOne({ end: { $exists: false } }, { _id: 1 }).exec();
        if (schoolYear === null)
            throw new errors_1.UnprocessableEntity('School Year not started yet');
        activeSIP = yield sip_model_1.default.create({
            sipId: (0, generateId_1.genSIPid)(),
            schoolYear: schoolYear._id,
            student: student._id
        });
    }
    const matchedCase = activeSIP.cases[getCaseKey(sipCase)];
    if (matchedCase.find((issuer) => issuer.issuer === user._id))
        throw new errors_1.UnprocessableEntity('Case already added');
    matchedCase.push({
        issuer: user._id,
        term,
        issuedAt: new Date()
    });
    yield activeSIP.save();
    res.json({ message: 'Case added' });
});
exports.addCase = addCase;
