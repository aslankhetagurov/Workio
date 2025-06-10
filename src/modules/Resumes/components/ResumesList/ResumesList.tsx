import PaginatedItemsList from '@/shared/components/PaginatedItemsList/PaginatedItemsList';
import { ResumeWithUser } from '@/shared/types/database.types';
import { IJobSearchForm } from '@/shared/components/JobSearchForm/JobSearchForm';
import { useAppSelector } from '@/store/hooks';
import ResumeItem from '@/shared/UI/ResumeItem/ResumeItem';
import { selectResumesSearchFilters } from '../../store/resumesSlice';
import { useGetResumesQuery } from '../../api/resumesApi';

const renderItem = (itemData: ResumeWithUser) => (
    <ResumeItem key={itemData.id} data={itemData} />
);

const ResumesList = () => {
    const resumesSearchFilters = useAppSelector(selectResumesSearchFilters);

    return (
        <PaginatedItemsList<ResumeWithUser, IJobSearchForm | null>
            filters={resumesSearchFilters}
            queryHook={useGetResumesQuery}
            renderItem={renderItem}
            emptyMessage="No resumes found..."
            ariaLabel="Resumes list"
        />
    );
};

export default ResumesList;
