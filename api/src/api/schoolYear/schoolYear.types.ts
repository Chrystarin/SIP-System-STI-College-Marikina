import { SchoolYear } from "./schoolYear.model";

export type SchoolYearQuery = {
    schoolYearStart?: string;
    schoolYearEnd?: string;
}

export type SchoolYearModelQuery = {
    start?: SchoolYear["start"] | { $gte: number };
    end?: SchoolYear["end"] | { $lte: number };
}