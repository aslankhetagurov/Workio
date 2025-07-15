import { IResumeCreationForm } from '../types/IResumeCreationForm.types';

export const emptyWorkExperiences: IResumeCreationForm['work_experiences'][0] =
    {
        company_name: '',
        position: '',
        start_date: '',
        end_date: null,
        location: '',
        description: '',
    };
