import { TAccessibility } from '@/shared/consts/accessibility';
import { TEducationDegree } from '@/shared/consts/educationDegree';
import { TEmployment } from '@/shared/consts/employment';
import { TJobCategories } from '@/shared/consts/jobCategories';

export interface IResumeCreationForm {
    title: string;
    location: string;
    category: TJobCategories;
    employment: TEmployment;
    accessibility: TAccessibility;
    salary_per_month: number;
    date_of_birth: string;
    about_me: string;
    gender: 'Male' | 'Female';
    skills: string[];
    education: {
        institution: string;
        location: string;
        degree: TEducationDegree | null;
        field_of_study: string;
        graduation_year: number | null;
    }[];
    work_experiences: {
        company_name: string;
        position: string;
        start_date: string;
        end_date: string | null;
        location: string;
        description: string;
    }[];
}
