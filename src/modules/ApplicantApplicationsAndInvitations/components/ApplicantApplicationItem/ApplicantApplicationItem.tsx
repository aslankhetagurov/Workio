import { useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { FaBuilding } from 'react-icons/fa';
import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { GiMoneyStack } from 'react-icons/gi';

import { ApplicationWithRelations } from '@/shared/types/database.types';

import { formatDateToDayAndMonthAndYear } from '@/shared/lib/formatDateToDayAndMonthAndYear';
import { formatDateToTimeAgo } from '@/shared/lib/formatDateToTimeAgo';
import { formatToK } from '@/shared/lib/formatToK';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import Modal from '@/shared/components/Modal/Modal';
import {
    useDeleteApplicationMutation,
    useSetApplicationStatusMutation,
} from '@/store/api/applicationsApi';
import styles from './ApplicantApplicationItem.module.scss';

interface IApplicantApplicationsItemProps {
    applicationData: ApplicationWithRelations;
}

const ApplicantApplicationItem = ({
    applicationData,
}: IApplicantApplicationsItemProps) => {
    const [setApplicationStatus] = useSetApplicationStatusMutation();
    const [deleteApplication] = useDeleteApplicationMutation();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const handleToggleModal = () => setIsOpenDeleteModal((prev) => !prev);

    const handleSetApplicationStatus = async () => {
        try {
            await setApplicationStatus({
                applicationId: id,
                status: 'cancelled',
            }).unwrap();
            toast.success('The application has been cancelled');
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to cancel application'
            );
        }
    };
    const handleDeleteApplication = async () => {
        await deleteApplication(id);
        handleToggleModal();
        toast.success('The application has been deleted');
    };

    const { vacancies, created_at, status, id } = applicationData;

    if (!vacancies || !applicationData) return null;

    return (
        <li className={styles.application}>
            <div className={styles.application__top}>
                <p className={styles.application__date}>
                    Applied on: {formatDateToDayAndMonthAndYear(created_at)}
                </p>

                <p
                    className={`${styles.application__status} ${
                        styles[`application__status-${status}`]
                    }`}
                >
                    Status: {status}
                </p>
            </div>

            <div className={styles.application__content}>
                <Link
                    className={styles.application__link}
                    to={`/vacancies/${vacancies?.id}`}
                >
                    <div className={styles.application__vacancy}>
                        <div className={styles['application__vacancy-top']}>
                            <span className={styles.application__subtitle}>
                                Vacancy
                            </span>
                            <h4 className={styles.application__title}>
                                {vacancies?.title}
                            </h4>
                        </div>
                        <ul className={styles.application__info}>
                            <li className={styles['application__info-item']}>
                                <span aria-hidden="true">
                                    <FaBuilding />
                                </span>
                                <span className={styles.application__text}>
                                    {vacancies?.companies?.name}
                                </span>
                            </li>
                            <li className={styles['application__info-item']}>
                                <span aria-hidden="true">
                                    <IoLocationOutline />
                                </span>
                                <span className={styles.application__text}>
                                    {vacancies?.location}
                                </span>
                            </li>
                            <li className={styles['application__info-item']}>
                                <span aria-hidden="true">
                                    <IoTimeOutline />
                                </span>
                                <span className={styles.application__text}>
                                    {formatDateToTimeAgo(vacancies.created_at)}
                                </span>
                            </li>
                            <li className={styles['application__info-item']}>
                                <span aria-hidden="true">
                                    <GiMoneyStack
                                        style={{ fontSize: '16px' }}
                                    />
                                </span>

                                <span className={styles.application__text}>
                                    {formatToK(vacancies?.salary_per_month)} per
                                    Month
                                </span>
                            </li>
                        </ul>
                    </div>
                </Link>

                {status === 'cancelled' ? (
                    <PrimaryButton
                        label="Delete application"
                        ariaLabel="Delete application"
                        style={{ width: '200px' }}
                        onClick={handleToggleModal}
                    />
                ) : status === 'pending' ? (
                    <PrimaryButton
                        label="Cancel application"
                        ariaLabel="Cancel apply to job vacancy"
                        style={{ width: '200px' }}
                        onClick={handleToggleModal}
                    />
                ) : null}

                <Modal isOpen={isOpenDeleteModal} onClose={handleToggleModal}>
                    <div className={styles.application__modal}>
                        <span className={styles['application__modal-title']}>
                            Are you sure?
                        </span>

                        <div className={styles['application__modal-buttons']}>
                            <PrimaryButton
                                label="No"
                                onClick={handleToggleModal}
                            />
                            <PrimaryButton
                                label="Yes"
                                onClick={
                                    status === 'cancelled'
                                        ? handleDeleteApplication
                                        : handleSetApplicationStatus
                                }
                                className={styles['application__modal-cancel']}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        </li>
    );
};

export default ApplicantApplicationItem;
