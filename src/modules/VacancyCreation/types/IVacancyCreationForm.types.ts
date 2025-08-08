import { TAccessibility } from '@/shared/consts/accessibility';
import { TEmployment } from '@/shared/consts/employment';
import { TJobCategories } from '@/shared/consts/jobCategories';

export interface IVacancyCreationForm {
    category: TJobCategories;
    title: string;
    location: string;
    employment: TEmployment;
    accessibility: TAccessibility;
    urgent: string;
    hours: number;
    salary_per_month: number;
    description: string;
    key_responsibilities: string;
    skill_and_experience: string;
}
