export const experienceDuration = [
    'Less than a year',
    '1-2 years',
    '3-5 years',
    '5-10 years',
    'More than 10 years',
] as const;

export type TExperienceDuration = (typeof experienceDuration)[number];
