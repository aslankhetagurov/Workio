import { toast } from 'sonner';
import { GoHeartFill } from 'react-icons/go';
import { FaCheck } from 'react-icons/fa6';
import { useRef, useState } from 'react';

import { VacancyWithCompany } from '@/shared/types/database.types';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import logo from '@/shared/assets/images/company-logo.webp';
import { useAppSelector } from '@/store/hooks';
import { selectUserData } from '@/modules/Auth';
import {
    useGetFavoriteVacanciesQuery,
    useToggleFavoriteVacancyMutation,
} from '@/modules/Vacancies';
import { useGetApplicantResumesQuery } from '@/modules/Resumes';
import DropDownList from '@/shared/UI/DropDownList/DropDownList';
import {
    useGetApplicationsQuery,
    useSetApplicationMutation,
} from '@/modules/Applications/api/applicationsApi';
import { useCloseViaClickOutsideAndEsc } from '@/shared/hooks/useCloseViaClickOutsideAndEsc';
import styles from './SingleVacancyHeader.module.scss';

interface SingleVacancyHeaderProps {
    data: VacancyWithCompany;
}

const SingleVacancyHeader = ({ data }: SingleVacancyHeaderProps) => {
    const user = useAppSelector(selectUserData);
    const [toggleFavoriteVacancy] = useToggleFavoriteVacancyMutation();
    const { data: favoriteVacancies } = useGetFavoriteVacanciesQuery(
        user?.id ?? '',
        { skip: !user }
    );
    const { data: resumes } = useGetApplicantResumesQuery(user?.id ?? '', {
        skip: !user,
    });
    const { data: applications } = useGetApplicationsQuery(user?.id ?? '', {
        skip: !user,
    });
    const [setApplication] = useSetApplicationMutation();
    const [showResumes, setShowResumes] = useState(false);
    const toggleShowResumes = () => setShowResumes((prev) => !prev);
    const resumesRef = useRef(null);

    useCloseViaClickOutsideAndEsc(resumesRef, showResumes, setShowResumes);

    if (!data || !user || !resumes) return null;

    const isFavorite = favoriteVacancies?.some(
        (vacancy) => vacancy.vacancy_id === data.id
    );

    const isApplied = applications?.some(
        (application) =>
            application.vacancy_id === data.id &&
            application.status === 'pending'
    );

    const handleToggleFavoriteVacancy = async () => {
        try {
            const { status } = await toggleFavoriteVacancy({
                vacancy_id: data.id,
                user_id: user.id,
            }).unwrap();

            toast.success(
                status === 'added'
                    ? 'Vacancy added to favorites'
                    : 'Vacancy removed from favorites'
            );
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to toggle favorite status'
            );
        }
    };

    const transformResumesToOptions = () => {
        return resumes.map((resume) => ({
            label: resume.title,
            value: resume.id,
        }));
    };

    const handleSetApplication = async (resumeId: string) => {
        const res = await setApplication({
            user_id: user.id,
            vacancy_id: data.id,
            resume_id: resumeId,
        });

        toggleShowResumes();

        if (res.data?.applicationId)
            toast.success('Application send successfully');
    };

    return (
        <header className={styles.header}>
            <img
                className={styles.header__logo}
                src={data.companies?.logo_url || logo}
                alt={
                    data.companies?.name
                        ? `${data.companies.name} logo`
                        : 'Company logo'
                }
            />

            <h3
                className={styles.header__title}
                aria-label="Vacancy title"
                id="vacancy-heading"
            >
                {data.title}
            </h3>

            {user?.role === 'applicant' && (
                <div className={styles.header__buttons}>
                    <div className={styles.header__apply}>
                        <PrimaryButton
                            label={isApplied ? 'Applied' : 'Apply'}
                            ariaLabel={` ${
                                isApplied ? 'Applied' : 'Apply'
                            } for a vacancy`}
                            style={{ width: '200px' }}
                            onClick={toggleShowResumes}
                            icon={<FaCheck />}
                            isShowIcon={isApplied}
                            disabled={isApplied}
                        />

                        <div
                            className={`${styles.header__resumes} ${
                                showResumes && styles['header__resumes-show']
                            } `}
                            ref={resumesRef}
                        >
                            <p>Choose a Resume</p>
                            <DropDownList
                                list={transformResumesToOptions()}
                                showDropDown={showResumes}
                                handleSetValue={handleSetApplication}
                                customClass={styles.header__dropdown}
                            />
                        </div>
                    </div>

                    <button
                        className={
                            isFavorite
                                ? styles['header__favorite-active']
                                : styles.header__favorite
                        }
                        aria-label="Save vacancy to bookmarks"
                        type="button"
                        onClick={handleToggleFavoriteVacancy}
                    >
                        <GoHeartFill />
                    </button>
                </div>
            )}
        </header>
    );
};

export default SingleVacancyHeader;
