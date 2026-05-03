export const SEARCH_OPTIONS = ['Vacancies', 'Resumes', 'Companies'] as const;

export type TSearchOptionValue = (typeof SEARCH_OPTIONS)[number];
