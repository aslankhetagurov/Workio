export const employment = [
    'Full time',
    'Part time',
    'Freelance',
    'Internship',
    'Contract',
] as const;

export type TEmployment = (typeof employment)[number];

export const employmentWithAll = [
    'All',
    'Full time',
    'Part time',
    'Freelance',
    'Internship',
    'Contract',
] as const;

export type TEmploymentWithAll = (typeof employmentWithAll)[number];
