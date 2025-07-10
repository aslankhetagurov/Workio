export const accessibility = ['Remote', 'Hybrid', 'On-site'] as const;

export type TAccessibility = (typeof accessibility)[number];

export const accessibilityWithAll = [
    'All',
    'Remote',
    'Hybrid',
    'On-site',
] as const;

export type TAccessibilityWithAll = (typeof accessibilityWithAll)[number];
