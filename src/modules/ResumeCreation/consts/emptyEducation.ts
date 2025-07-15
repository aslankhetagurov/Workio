import { IResumeCreationForm } from '../types/IResumeCreationForm.types';

export const emptyEducation: IResumeCreationForm['education'][0] = {
    institution: '',
    location: '',
    degree: null,
    field_of_study: '',
    graduation_year: null,
};
