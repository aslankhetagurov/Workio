import { IResumeForm } from '@/shared/components/ResumeForm/ResumeForm';

export const emptyEducation: IResumeForm['education'][0] = {
    institution: '',
    location: '',
    degree: null,
    field_of_study: '',
    graduation_year: null,
};
