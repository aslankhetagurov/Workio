import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { FaCheck } from 'react-icons/fa';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { CiCalendarDate } from 'react-icons/ci';
import { GiSmartphone } from 'react-icons/gi';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import {
    CiBadgeDollar,
    CiCalendar,
    CiGlobe,
    CiLocationOn,
    CiViewList,
} from 'react-icons/ci';
import { PiBriefcaseThin } from 'react-icons/pi';
import { GoHeartFill } from 'react-icons/go';

import { ResumeWithUserAndExperiencesAndEducations } from '@/shared/types/database.types';
import defaultAvatar from '@/shared/assets/images/default-avatar.png';
import { formatDateToTimeAgo } from '@/shared/lib/formatDateToTimeAgo';
import { formatToK } from '@/shared/lib/formatToK';
import { formatDateToDayAndMonthAndYear } from '@/shared/lib/formatDateToDayAndMonthAndYear';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import DropDownList from '@/shared/UI/DropDownList/DropDownList';
import { useAppSelector } from '@/store/hooks';
import { selectCompanyData, selectUserData } from '@/modules/Auth';
import {
    useGetFavoriteResumesQuery,
    useToggleFavoriteResumeMutation,
} from '@/modules/Resumes';
import { useGetEmployerVacanciesQuery } from '@/modules/Vacancies';
import {
    useGetInvitationsQuery,
    useSetInvitationMutation,
} from '@/store/api/invitationsApi';
import { useCloseViaClickOutsideAndEsc } from '@/shared/hooks/useCloseViaClickOutsideAndEsc';
import styles from './SingleResumeMain.module.scss';

interface SingleResumeMainProps {
    resumeData: ResumeWithUserAndExperiencesAndEducations;
}

const SingleResumeMain = ({ resumeData }: SingleResumeMainProps) => {
    const user = useAppSelector(selectUserData);
    const isApplicant = user?.role === 'applicant';
    const companyData = useAppSelector(selectCompanyData);
    const [toggleFavoriteResume] = useToggleFavoriteResumeMutation();
    const { data: favoriteResumes } = useGetFavoriteResumesQuery(
        user?.id ?? '',
        { skip: !user }
    );
    const { data: vacancies } = useGetEmployerVacanciesQuery(
        companyData?.id ?? '',
        {
            skip: !companyData || isApplicant,
        }
    );
    const { data: invitations } = useGetInvitationsQuery(user?.id ?? '', {
        skip: !user,
    });
    const [setInvitation] = useSetInvitationMutation();
    const [showVacancies, setShowVacancies] = useState(false);
    const toggleShowVacancies = () => setShowVacancies((prev) => !prev);
    const resumesRef = useRef(null);

    useCloseViaClickOutsideAndEsc(resumesRef, showVacancies, setShowVacancies);

    if (!resumeData || !user) return null;

    const isFavorite = favoriteResumes?.some(
        (resume) => resume.resume_id === resumeData.id
    );

    const isInvited = invitations?.some(
        (invitation) =>
            invitation.resume_id === resumeData.id &&
            invitation.status === 'pending'
    );

    const {
        users,
        gender,
        date_of_birth,
        title,
        employment,
        accessibility,
        location,
        category,
        created_at,
        salary_per_month,
        skills,
    } = resumeData;

    const handleToggleFavoriteResume = async () => {
        try {
            const { status } = await toggleFavoriteResume({
                resume_id: resumeData.id,
                user_id: user.id,
            }).unwrap();

            toast.success(
                status === 'added'
                    ? 'Resume added to favorites'
                    : 'Resume removed from favorites'
            );
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to toggle favorite status'
            );
        }
    };

    const transformVacanciesToOptions = () => {
        return vacancies?.map((vacancy) => ({
            label: vacancy.title,
            value: vacancy.id,
        }));
    };

    const handleSetInvitation = async (vacancyId: string) => {
        const res = await setInvitation({
            user_id: user.id,
            vacancy_id: vacancyId,
            resume_id: resumeData.id,
        });

        toggleShowVacancies();

        if (res.data?.invitationId)
            toast.success('Invitation send successfully');
    };

    return (
        <article className={styles['resume-main']}>
            <div className={styles['resume-main__left-side']}>
                <img
                    className={styles['resume-main__avatar']}
                    src={users?.avatar_url || defaultAvatar}
                    alt={`${users?.full_name || 'User'} avatar`}
                />

                {!isApplicant && (
                    <div className={styles['resume-main__buttons']}>
                        <div className={styles['resume-main__invite']}>
                            <PrimaryButton
                                label={isInvited ? 'Invited' : 'Invite'}
                                ariaLabel={` ${
                                    isInvited ? 'Invited' : 'Invite'
                                } for a vacancy`}
                                style={{ width: '200px' }}
                                onClick={toggleShowVacancies}
                                icon={<FaCheck />}
                                isShowIcon={isInvited}
                                disabled={isInvited}
                            />

                            <div
                                className={`${
                                    styles['resume-main__vacancies']
                                } ${
                                    showVacancies &&
                                    styles['resume-main__vacancies-show']
                                } `}
                                ref={resumesRef}
                            >
                                <p>Choose a Vacancy</p>
                                <DropDownList
                                    list={transformVacanciesToOptions() ?? []}
                                    showDropDown={showVacancies}
                                    handleSetValue={handleSetInvitation}
                                    customClass={
                                        styles['resume-main__dropdown']
                                    }
                                />
                            </div>
                        </div>

                        <button
                            className={
                                isFavorite
                                    ? styles['resume-main__favorite-active']
                                    : styles['resume-main__favorite']
                            }
                            aria-label="Save resume to bookmarks"
                            type="button"
                            onClick={handleToggleFavoriteResume}
                        >
                            <GoHeartFill />
                        </button>
                    </div>
                )}
            </div>

            <div className={styles['resume-main__inner']}>
                <div className={styles['resume-main__header']}>
                    <div className={styles['resume-main__username-wrapper']}>
                        <p className={styles['resume-main__label']}>
                            Applicant
                        </p>
                        <h2 className={styles['resume-main__username']}>
                            {users?.full_name}
                        </h2>
                    </div>

                    <h1
                        className={styles['resume-main__resume-title']}
                        id="resume-heading"
                    >
                        {title}
                    </h1>
                </div>

                <div className={styles['resume-main__info-wrapper']}>
                    <ul
                        className={styles['resume-main__info-items']}
                        aria-label="User contact information"
                        role="list"
                    >
                        <li className={styles['resume-main__info-item']}>
                            <BsGenderAmbiguous
                                className={styles['resume-main__info-icon']}
                                aria-hidden="true"
                                focusable="false"
                            />
                            {gender}
                        </li>
                        <li className={styles['resume-main__info-item']}>
                            <CiCalendarDate
                                className={styles['resume-main__info-icon']}
                                aria-hidden="true"
                                focusable="false"
                            />
                            {formatDateToDayAndMonthAndYear(date_of_birth)}
                        </li>
                        <li className={styles['resume-main__info-item']}>
                            <GiSmartphone
                                className={styles['resume-main__info-icon']}
                                aria-hidden="true"
                                focusable="false"
                            />
                            {users?.phone}
                        </li>
                        <li className={styles['resume-main__info-item']}>
                            <MdOutlineAlternateEmail
                                className={styles['resume-main__info-icon']}
                                aria-hidden="true"
                                focusable="false"
                            />
                            {users?.email}
                        </li>
                    </ul>

                    <ul
                        className={styles['resume-main__other-info-items']}
                        aria-label="Job preferences"
                        role="list"
                    >
                        <li className={styles['resume-main__other-info-item']}>
                            <CiViewList
                                className={styles['resume-main__info-icon']}
                                aria-hidden="true"
                                focusable="false"
                            />
                            <div className={styles['resume-main__other-info']}>
                                <span
                                    className={
                                        styles['resume-main__other-item-title']
                                    }
                                >
                                    Category:
                                </span>
                                <span
                                    className={
                                        styles['resume-main__other-item-text']
                                    }
                                >
                                    {category}
                                </span>
                            </div>
                        </li>

                        <li className={styles['resume-main__other-info-item']}>
                            <CiCalendar
                                className={styles['resume-main__info-icon']}
                                aria-hidden="true"
                                focusable="false"
                            />
                            <div className={styles['resume-main__other-info']}>
                                <span
                                    className={
                                        styles['resume-main__other-item-title']
                                    }
                                >
                                    Date Posted:
                                </span>
                                <span
                                    className={
                                        styles['resume-main__other-item-text']
                                    }
                                >
                                    {formatDateToTimeAgo(created_at)}
                                </span>
                            </div>
                        </li>

                        <li className={styles['resume-main__other-info-item']}>
                            <CiLocationOn
                                className={styles['resume-main__info-icon']}
                                aria-hidden="true"
                                focusable="false"
                            />
                            <div className={styles['resume-main__other-info']}>
                                <span
                                    className={
                                        styles['resume-main__other-item-title']
                                    }
                                >
                                    Location:
                                </span>
                                <span
                                    className={
                                        styles['resume-main__other-item-text']
                                    }
                                >
                                    {location}
                                </span>
                            </div>
                        </li>

                        <li className={styles['resume-main__other-info-item']}>
                            <CiBadgeDollar
                                className={styles['resume-main__info-icon']}
                                aria-hidden="true"
                                focusable="false"
                            />
                            <div className={styles['resume-main__other-info']}>
                                <span
                                    className={
                                        styles['resume-main__other-item-title']
                                    }
                                >
                                    Salary:
                                </span>
                                <span
                                    className={
                                        styles['resume-main__other-item-text']
                                    }
                                >
                                    {formatToK(salary_per_month)}
                                </span>
                            </div>
                        </li>
                        <li className={styles['resume-main__other-info-item']}>
                            <PiBriefcaseThin
                                className={styles['resume-main__info-icon']}
                                aria-hidden="true"
                                focusable="false"
                            />
                            <div className={styles['resume-main__other-info']}>
                                <span
                                    className={
                                        styles['resume-main__other-item-title']
                                    }
                                >
                                    Employment:
                                </span>
                                <span
                                    className={
                                        styles['resume-main__other-item-text']
                                    }
                                >
                                    {employment}
                                </span>
                            </div>
                        </li>
                        <li className={styles['resume-main__other-info-item']}>
                            <CiGlobe
                                className={styles['resume-main__info-icon']}
                                aria-hidden="true"
                                focusable="false"
                            />
                            <div className={styles['resume-main__other-info']}>
                                <span
                                    className={
                                        styles['resume-main__other-item-title']
                                    }
                                >
                                    Accessibility:
                                </span>
                                <span
                                    className={
                                        styles['resume-main__other-item-text']
                                    }
                                >
                                    {accessibility}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={styles['resume-main__skills']}>
                    <h4 className={styles['resume-main__skills-title']}>
                        Skills
                    </h4>

                    <ul className={styles['resume-main__skills-items']}>
                        {skills?.map((item, i) => (
                            <li
                                className={styles['resume-main__skills-item']}
                                key={item + i}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </article>
    );
};

export default SingleResumeMain;
