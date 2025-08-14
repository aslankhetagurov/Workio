import { IResumeForm } from '@/shared/components/ResumeForm/ResumeForm';

export const emptyWorkExperiences: IResumeForm['work_experiences'][0] = {
    company_name: '',
    position: '',
    start_date: '',
    end_date: null,
    location: '',
    description: '',
};
