export const applicationStatus = [
    'pending',
    'approved',
    'rejected',
    'cancelled',
] as const;

export type TApplicationStatus = (typeof applicationStatus)[number];
