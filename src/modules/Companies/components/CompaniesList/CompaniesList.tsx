import { CompanyWithUser } from '@/shared/types/database.types';
import CompanyItem from '@/shared/UI/CompanyItem/CompanyItem';
import { useAppSelector } from '@/store/hooks';
import { selectCompaniesSearchFilters } from '../../store/companiesSlice';
import { useGetCompaniesQuery } from '../../api/companiesApi';
import { ICompanySearchForm } from '../CompaniesSearchForm/CompaniesSearchForm';
import PaginatedItemsList from '@/shared/components/PaginatedItemsList/PaginatedItemsList';

const renderItem = (itemData: CompanyWithUser) => (
    <CompanyItem key={itemData.id} companyData={itemData} />
);

const CompaniesList = () => {
    const companiesSearchFilters = useAppSelector(selectCompaniesSearchFilters);

    return (
        <PaginatedItemsList<CompanyWithUser, ICompanySearchForm | null>
            filters={companiesSearchFilters}
            queryHook={useGetCompaniesQuery}
            renderItem={renderItem}
            emptyMessage="No companies found..."
            ariaLabel="Companies list"
        />
    );
};

export default CompaniesList;
