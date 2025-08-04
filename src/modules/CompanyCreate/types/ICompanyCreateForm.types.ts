import { TCompanySizeRanges } from '@/shared/consts/companySizeRanges';
import { TJobCategories } from '@/shared/consts/jobCategories';

export interface ICompanyCreateForm {
    name: string;
    industry: TJobCategories;
    description: string;
    location: string;
    founded_year: number;
    size_range: TCompanySizeRanges;
    website: string;
}
