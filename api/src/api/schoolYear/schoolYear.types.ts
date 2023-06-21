import { SchoolYear } from "./schoolYear.model";

export type SchoolYearQuery = {
    schoolYearStart?: string;
    schoolYearEnd?: string;
    active?: string;
}

export type SchoolYearModelQuery = {
    start?: SchoolYear["start"] | { $gte: number };
    end?: SchoolYear["end"] | { $lte: number } | { $exists: false };
}