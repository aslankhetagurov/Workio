import { useState } from 'react';
import { toast } from 'sonner';

import { VacancyWithCompany } from '@/shared/types/database.types';
import VacancyAndResumeItemContent from '@/shared/UI/VacancyAndResumeItemContent/VacancyAndResumeItemContent';
import { useDeleteVacancyMutation } from '@/modules/Vacancies';

interface IEmployerVacanciesItemProps {
    vacancyData: VacancyWithCompany;
    refetch: () => void;
}

const EmployerVacanciesItem = ({
    vacancyData,
    refetch,
}: IEmployerVacanciesItemProps) => {
    const { id } = vacancyData;

    const [deleteVacancy] = useDeleteVacancyMutation();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const handleToggleModal = () => setIsOpenDeleteModal((prev) => !prev);

    const handleDelete = async () => {
        try {
            await deleteVacancy(id).unwrap();
            refetch();
            toast.success('Vacancy deleted successfully');
        } catch (error) {
            console.error(error);
        } finally {
            handleToggleModal();
        }
    };

    const handleDispatchData = () => {};

    return (
        <VacancyAndResumeItemContent
            itemData={vacancyData}
            handleDelete={handleDelete}
            handleToggleModal={handleToggleModal}
            isOpenDeleteModal={isOpenDeleteModal}
            type="vacancy"
            linkToEdit="/employer/vacancy-editing"
            handleDispatchData={handleDispatchData}
        />
    );
};

export default EmployerVacanciesItem;
