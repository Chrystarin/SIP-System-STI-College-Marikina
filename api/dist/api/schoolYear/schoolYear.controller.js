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
exports.endSchoolYear = exports.startSchoolYear = exports.getSchoolYears = void 0;
const errors_1 = require("../../utilities/errors");
const schoolYear_model_1 = __importDefault(require("./schoolYear.model"));
const getSchoolYears = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { schoolYearStart, schoolYearEnd } = req.query;
    let modelQuery = {};
    if (schoolYearStart && schoolYearEnd) {
        modelQuery.start = { $gte: new Date(schoolYearStart).getFullYear() };
        modelQuery.end = { $lte: new Date(schoolYearEnd).getFullYear() };
    }
    else {
        const schoolYear = schoolYearStart ? [schoolYearStart, 'start'] : [schoolYearEnd, 'end'];
        if (schoolYear[0] === undefined)
            throw new errors_1.UnprocessableEntity('School Year not started yet');
        const [year, prop] = schoolYear;
        modelQuery[prop] = new Date(year).getFullYear();
    }
    const schoolYears = yield schoolYear_model_1.default.find(modelQuery).populate({ path: 'admin', select: 'employeeId role name' }).exec();
    res.json(schoolYears);
});
exports.getSchoolYears = getSchoolYears;
const startSchoolYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user === undefined)
        throw new errors_1.Unauthorized();
    yield schoolYear_model_1.default.create({ start: new Date().getFullYear(), admin: user._id });
    res.status(201).json({ message: 'School Year started' });
});
exports.startSchoolYear = startSchoolYear;
const endSchoolYear = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { modifiedCount } = yield schoolYear_model_1.default.updateOne({
        end: { $exists: false }
    }, {
        $set: { end: new Date().getFullYear() }
    }).exec();
    if (modifiedCount === 0)
        throw new errors_1.UnprocessableEntity('School Year not started yet');
    res.json({ message: 'School Year ended' });
});
exports.endSchoolYear = endSchoolYear;
