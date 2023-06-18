"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIPStatus = exports.Terms = exports.CaseTypes = exports.CaseKeys = void 0;
var CaseKeys;
(function (CaseKeys) {
    CaseKeys["Excessive Tardiness/Absences"] = "ETA";
    CaseKeys["Declining Class Performance"] = "DCP";
    CaseKeys["Unbecoming of an STIer"] = "UoaS";
    CaseKeys["Assessment/Exam Concern"] = "AEC";
    CaseKeys["Learning Difficulty"] = "LD";
})(CaseKeys || (exports.CaseKeys = CaseKeys = {}));
var CaseTypes;
(function (CaseTypes) {
    CaseTypes["ETA"] = "Excessive Tardiness/Absences";
    CaseTypes["DCP"] = "Declining Class Performance";
    CaseTypes["UoaS"] = "Unbecoming of an STIer";
    CaseTypes["AEC"] = "Assessment/Exam Concern";
    CaseTypes["LD"] = "Learning Difficulty";
})(CaseTypes || (exports.CaseTypes = CaseTypes = {}));
var Terms;
(function (Terms) {
    Terms["SHSQ1"] = "Senior High School - Quarter 1";
    Terms["SHSQ2"] = "Senior High School - Quarter 2";
    Terms["SHSQ3"] = "Senior High School - Quarter 3";
    Terms["SHSQ4"] = "Senior High School - Quarter 4";
    Terms["TTY1PL"] = "Tertiary - Semester 1 - Prelims";
    Terms["TTY1M"] = "Tertiary - Semester 1 - Midterms";
    Terms["TTY1PF"] = "Tertiary - Semester 1 - Pre-Finals";
    Terms["TTY1F"] = "Tertiary - Semester 1 - Finals";
    Terms["TTY2PL"] = "Tertiary - Semester 2 - Prelims";
    Terms["TTY2M"] = "Tertiary - Semester 2 - Midterms";
    Terms["TTY2PF"] = "Tertiary - Semester 2 - Pre-Finals";
    Terms["TTY2F"] = "Tertiary - Semester 2 - Finals";
    Terms["TTYSMR"] = "Tertiary - Summer";
})(Terms || (exports.Terms = Terms = {}));
var SIPStatus;
(function (SIPStatus) {
    SIPStatus["Pending"] = "pending";
    SIPStatus["Resolved"] = "resolved";
    SIPStatus["NoResponse"] = "no response";
})(SIPStatus || (exports.SIPStatus = SIPStatus = {}));
