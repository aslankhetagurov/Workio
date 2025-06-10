import JobSearchForm, {
    IJobSearchForm,
} from '@/shared/components/JobSearchForm/JobSearchForm';
import { useAppDispatch } from '@/store/hooks';
import { setResumesSearchFilters } from '../../store/resumesSlice';

const ResumesSearch = () => {
    const dispatch = useAppDispatch();

    const onSubmit = (filters: IJobSearchForm) => {
        dispatch(setResumesSearchFilters(filters));
    };

    return <JobSearchForm onSubmit={onSubmit} />;
};

export default ResumesSearch;
