export const educationDegree = [
    'Associate Degree',
    "Bachelor's Degree",
    "Master's Degree",
    'Doctorate',
    'Diploma',
    'Certificate',
    'High School',
    'Other',
] as const;
export type TEducationDegree = (typeof educationDegree)[number];
