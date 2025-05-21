export const citySlugMap = {
    london: 'London',
    paris: 'Paris',
    berlin: 'Berlin',
    madrid: 'Madrid',
    rome: 'Rome',
    tokyo: 'Tokyo',
    'new-york': 'New York',
    'los-angeles': 'Los Angeles',
    moscow: 'Moscow',
    amsterdam: 'Amsterdam',
} as const;

export type TCitySlug = keyof typeof citySlugMap;
