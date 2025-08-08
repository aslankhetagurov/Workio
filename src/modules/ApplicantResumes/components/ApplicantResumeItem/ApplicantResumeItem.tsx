import { useState } from 'react';
import { toast } from 'sonner';

import { ResumeWithUserAndExperiencesAndEducations } from '@/shared/types/database.types';
import { useDeleteResumeMutation } from '@/modules/Resumes';
import VacancyAndResumeItemContent from '@/shared/UI/VacancyAndResumeItemContent/VacancyAndResumeItemContent';
import { useAppDispatch } from '@/store/hooks';
import { setEditableResume } from '@/modules/Resumes/store/resumesSlice';

interface IApplicantResumeItemProps {
    resumeData: ResumeWithUserAndExperiencesAndEducations;
    refetch: () => void;
}

const ApplicantResumeItem = ({
    resumeData,
    refetch,
}: IApplicantResumeItemProps) => {
    const dispatch = useAppDispatch();
    const { id } = resumeData;

    const [deleteResume] = useDeleteResumeMutation();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const handleToggleModal = () => setIsOpenDeleteModal((prev) => !prev);

    const handleDelete = async () => {
        try {
            await deleteResume(id).unwrap();
            refetch();
            toast.success('Resume deleted successfully');
        } catch (error) {
            console.error(error);
        } finally {
            handleToggleModal();
        }
    };

    const handleDispatchData = () => {
        dispatch(setEditableResume(resumeData));
    };

    return (
        <VacancyAndResumeItemContent
            itemData={resumeData}
            handleDelete={handleDelete}
            handleToggleModal={handleToggleModal}
            isOpenDeleteModal={isOpenDeleteModal}
            type="resume"
            linkToEdit="/applicant/resume-editing"
            handleDispatchData={handleDispatchData}
        />
    );
};

export default ApplicantResumeItem;
