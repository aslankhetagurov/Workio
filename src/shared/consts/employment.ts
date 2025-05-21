const employment = [
    'Full time',
    'Part time',
    'Freelance',
    'Internship',
    'Contract',
] as const;

export type TEmployment = (typeof employment)[number];
