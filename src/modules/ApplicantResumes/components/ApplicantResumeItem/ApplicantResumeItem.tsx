import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiGlobe, CiLocationOn } from 'react-icons/ci';
import { PiBriefcaseThin } from 'react-icons/pi';
import { toast } from 'sonner';

import { ResumeWithUser } from '@/shared/types/database.types';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import Modal from '@/shared/components/Modal/Modal';
import { formatDateToDayAndMonthAndYear } from '@/shared/lib/formatDateToDayAndMonthAndYear';
import { useDeleteResumeMutation } from '@/modules/Resumes';
import styles from './ApplicantResumeItem.module.scss';

interface IApplicantResumeItemProps {
    resumeData: ResumeWithUser;
    refetch: () => void;
}
const ApplicantResumeItem = ({
    resumeData,
    refetch,
}: IApplicantResumeItemProps) => {
    const {
        id,
        title,
        users,
        views,
        created_at,
        location,
        employment,
        accessibility,
    } = resumeData;

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

    return (
        <li className={styles.resume}>
            <Link
                className={styles.resume__link}
                to={`/resumes/${id}`}
                aria-label={`Resume ${title} by ${users?.full_name}`}
            >
                <div className={styles.resume__top}>
                    <span className={styles.resume__title}>{title}</span>

                    <span className={styles.resume__date}>
                        <span>Created </span>
                        {formatDateToDayAndMonthAndYear(created_at)}
                    </span>
                </div>
            </Link>

            <span className={styles.resume__views}>
                {views}
                <span> views</span>
            </span>

            <ul
                className={styles.resume__info}
                aria-label="Job preferences"
                role="list"
            >
                <li className={styles['resume__info-item']}>
                    <CiLocationOn
                        className={styles['resume__info-icon']}
                        aria-hidden="true"
                        focusable="false"
                    />
                    <span className={styles['resume__item-text']}>
                        {location}
                    </span>
                </li>

                <li className={styles['resume__info-item']}>
                    <PiBriefcaseThin
                        className={styles['resume__info-icon']}
                        aria-hidden="true"
                        focusable="false"
                    />
                    <span className={styles['resume__item-text']}>
                        {employment}
                    </span>
                </li>

                <li className={styles['resume__info-item']}>
                    <CiGlobe
                        className={styles['resume__info-icon']}
                        aria-hidden="true"
                        focusable="false"
                    />
                    <span className={styles['resume__item-text']}>
                        {accessibility}
                    </span>
                </li>
            </ul>

            <div className={styles.resume__buttons}>
                <PrimaryButton
                    label="Delete"
                    aria-label={`Delete resume ${title}`}
                    onClick={handleToggleModal}
                    style={{ width: '150px' }}
                />
            </div>

            <Modal isOpen={isOpenDeleteModal} onClose={handleToggleModal}>
                <div className={styles.resume__modal}>
                    <span className={styles['resume__modal-title']}>
                        Delete the resume - {title}?
                    </span>

                    <div className={styles['resume__modal-buttons']}>
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

export default ApplicantResumeItem;
