export const jobCategories = [
    'All categories',
    'Engineering',
    'Design',
    'Product Management',
    'Marketing',
    'Sales',
    'Customer Support',
    'Data & Analytics',
    'Human Resources',
    'Finance',
    'Operations',
    'Legal',
    'Education',
    'Healthcare',
    'Content / Copywriting',
    'Project Management',
    'IT',
] as const;

export type TJobCategories = (typeof jobCategories)[number];
