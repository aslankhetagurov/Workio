import JobSearchForm, {
    IJobSearchForm,
} from '@/shared/components/JobSearchForm/JobSearchForm';
import { setFilters } from '../../store/vacanciesSlice';
import { useAppDispatch } from '@/store/hooks';

const VacanciesSearch = () => {
    const dispatch = useAppDispatch();

    const onSubmit = (filters: IJobSearchForm) => {
        dispatch(setFilters(filters));
    };

    return <JobSearchForm onSubmit={onSubmit} />;
};

export default VacanciesSearch;
