import { useGetVacanciesQuery } from '../../api/vacanciesApi';
import { selectVacanciesSearchFilters } from '../../store/vacanciesSlice';
import { useAppSelector } from '@/store/hooks';
import VacancyItem from '@/shared/UI/VacancyItem/VacancyItem';
import { VacancyWithCompany } from '@/shared/types/database.types';
import PaginatedItemsList from '@/shared/components/PaginatedItemsList/PaginatedItemsList';
import { IJobSearchForm } from '@/shared/components/JobSearchForm/JobSearchForm';

const renderItem = (itemData: VacancyWithCompany) => (
    <VacancyItem key={itemData.id} data={itemData} />
);

const VacanciesList = () => {
    const vacanciesSearchFilters = useAppSelector(selectVacanciesSearchFilters);

    return (
        <PaginatedItemsList<VacancyWithCompany, IJobSearchForm | null>
            filters={vacanciesSearchFilters}
            queryHook={useGetVacanciesQuery}
            renderItem={renderItem}
            emptyMessage="No vacancies found..."
            ariaLabel="Vacancies list"
        />
    );
};

export default VacanciesList;
