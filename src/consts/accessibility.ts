const accessibility = ['Remote', 'Hybrid', 'On-site'] as const;

export type TAccessibility = (typeof accessibility)[number];
