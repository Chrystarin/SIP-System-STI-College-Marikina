import { SchoolYear } from "./schoolYear.model";

export type SchoolYearQuery = {
    schoolYearStart?: Date;
    schoolYearEnd?: Date;
}

export type SchoolYearModelQuery = {
    start?: SchoolYear["start"] | { $gte: number };
    end?: SchoolYear["end"] | { $lte: number };
}