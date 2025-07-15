export const gender = ['Male', 'Female'] as const;

export type TGender = (typeof gender)[number];
