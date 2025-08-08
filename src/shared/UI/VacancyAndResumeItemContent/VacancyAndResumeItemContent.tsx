import { Link, useNavigate } from 'react-router-dom';
import { CiGlobe, CiLocationOn } from 'react-icons/ci';
import { PiBriefcaseThin } from 'react-icons/pi';

import {
    ResumeWithUserAndExperiencesAndEducations,
    VacancyWithCompany,
} from '@/shared/types/database.types';
import { formatDateToDayAndMonthAndYear } from '@/shared/lib/formatDateToDayAndMonthAndYear';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import Modal from '@/shared/components/Modal/Modal';
import styles from './VacancyAndResumeItemContent.module.scss';

interface IVacancyAndResumeItemContentProps {
    itemData: ResumeWithUserAndExperiencesAndEducations | VacancyWithCompany;
    handleToggleModal: () => void;
    handleDelete: () => void;
    isOpenDeleteModal: boolean;
    type: 'vacancy' | 'resume';
    linkToEdit: string;
    handleDispatchData: () => void;
}

const VacancyAndResumeItemContent = ({
    itemData,
    handleDelete,
    handleToggleModal,
    isOpenDeleteModal,
    type,
    linkToEdit,
    handleDispatchData,
}: IVacancyAndResumeItemContentProps) => {
    const {
        id,
        title,
        views,
        created_at,
        location,
        employment,
        accessibility,
    } = itemData;

    const label = type === 'resume' ? 'resume' : 'vacancy';
    const authorName =
        'users' in itemData
            ? itemData.users?.full_name
            : 'companies' in itemData
            ? itemData.companies?.name
            : 'Unknown';

    const navigate = useNavigate();

    const handleEditItem = () => {
        handleDispatchData();
        navigate(linkToEdit);
    };

    return (
        <li className={styles.item}>
            <Link
                className={styles.item__link}
                to={`/${type === 'resume' ? 'resumes' : 'vacancies'}/${id}`}
                aria-label={`${label} ${title} by ${authorName}`}
            >
                <div className={styles.item__top}>
                    <span className={styles.item__title}>{title}</span>

                    <span className={styles.item__date}>
                        <span>Created </span>
                        {formatDateToDayAndMonthAndYear(created_at)}
                    </span>
                </div>
            </Link>

            <span className={styles.item__views}>
                {views}
                <span> views</span>
            </span>

            <ul
                className={styles.item__info}
                aria-label="Job preferences"
                role="list"
            >
                <li className={styles['item__info-item']}>
                    <CiLocationOn
                        className={styles['item__info-icon']}
                        aria-hidden="true"
                        focusable="false"
                    />
                    <span className={styles['item__item-text']}>
                        {location}
                    </span>
                </li>

                <li className={styles['item__info-item']}>
                    <PiBriefcaseThin
                        className={styles['item__info-icon']}
                        aria-hidden="true"
                        focusable="false"
                    />
                    <span className={styles['item__item-text']}>
                        {employment}
                    </span>
                </li>

                <li className={styles['item__info-item']}>
                    <CiGlobe
                        className={styles['item__info-icon']}
                        aria-hidden="true"
                        focusable="false"
                    />
                    <span className={styles['item__item-text']}>
                        {accessibility}
                    </span>
                </li>
            </ul>

            <div className={styles.item__buttons}>
                <PrimaryButton
                    label={`Edit the ${label}`}
                    aria-label={`Edit the ${label} ${title}`}
                    onClick={handleEditItem}
                    style={{ width: '150px' }}
                />

                <PrimaryButton
                    label="Delete"
                    aria-label={`Delete ${label} ${title}`}
                    onClick={handleToggleModal}
                    style={{ width: '150px' }}
                />
            </div>

            <Modal isOpen={isOpenDeleteModal} onClose={handleToggleModal}>
                <div className={styles.item__modal}>
                    <span className={styles['item__modal-title']}>
                        Delete the {`${label}`} - {title}?
                    </span>

                    <div className={styles['item__modal-buttons']}>
                        <PrimaryButton
                            label="Cancel"
                            onClick={handleToggleModal}
                        />
                        <PrimaryButton label="Delete" onClick={handleDelete} />
                    </div>
                </div>
            </Modal>
        </li>
    );
};

export default VacancyAndResumeItemContent;
