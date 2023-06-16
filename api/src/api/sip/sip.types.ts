import { SchoolYearDocument } from '../schoolYear/schoolYear.model';
import { IssuerDocument, SIPDocument } from './sip.model';
import { Student, StudentDocument } from '../student/student.model';
import { User, UserDocument } from '../user/user.model';

/* ENUMS */

export enum CaseKeys {
    'Excessive Tardiness/Absences' = 'ETA',
    'Declining Class Performance' = 'DCP',
    'Unbecoming of an STIer' = 'UoaS',
    'Assessment/Exam Concern' = 'AEC',
    'Learning Difficulty' = 'LD'
}

export enum CaseTypes {
    ETA = 'Excessive Tardiness/Absences',
    DCP = 'Declining Class Performance',
    UoaS = 'Unbecoming of an STIer',
    AEC = 'Assessment/Exam Concern',
    LD = 'Learning Difficulty'
}

export enum Quarters {
    SHSQ1 = 'Senior High School - Quarter 1',
    SHSQ2 = 'Senior High School - Quarter 2',
    SHSQ3 = 'Senior High School - Quarter 3',
    SHSQ4 = 'Senior High School - Quarter 4',
    TTY1PL = 'Tertiary - Term 1 - Prelims',
    TTY1M = 'Tertiary - Term 1 - Midterms',
    TTY1PF = 'Tertiary - Term 1 - Pre-Finals',
    TTY1F = 'Tertiary - Term 1 - Finals',
    TTY2PL = 'Tertiary - Term 2 - Prelims',
    TTY2M = 'Tertiary - Term 2 - Midterms',
    TTY2PF = 'Tertiary - Term 2 - Pre-Finals',
    TTY2F = 'Tertiary - Term 2 - Finals',
    TTYSMR = 'Tertiary - Summer'
}

export enum SIPStatus {
    Pending = 'pending',
    Resolved = 'resolved',
    NoResponse = 'no response'
}

/* TYPES */

export type SIPQuery = {
    sipId?: SIPDocument['sipId'];
    employeeId?: User['employeeId'];
    studentId?: StudentDocument['studentId'];
    status?: SIPDocument['status'];
    schoolYearStart?: string;
    schoolYearEnd?: string;
};

export type SIPModelQuery = {
    sipId?: SIPDocument['sipId'];
    student?: StudentDocument['_id'];
    status?: SIPDocument['status'];
    schoolYear?: { $in: Array<SchoolYearDocument['_id']> } | SchoolYearDocument['_id'];
    $or?: [
        { 'cases.ETA.issuer': IssuerDocument['issuer'] },
        { 'cases.DCP.issuer': IssuerDocument['issuer'] },
        { 'cases.UoaS.issuer': IssuerDocument['issuer'] },
        { 'cases.AEC.issuer': IssuerDocument['issuer'] },
        { 'cases.LD.issuer': IssuerDocument['issuer'] }
    ];
};

export type AddCase = {
    studentId: Student['studentId'];
    sipCase: CaseTypes;
    quarter: Quarters;
};
