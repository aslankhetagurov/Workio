import { useState } from 'react';
import { GiMoneyStack } from 'react-icons/gi';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';

import { ApplicationWithRelations } from '@/shared/types/database.types';
import { formatDateToDayAndMonthAndYear } from '@/shared/lib/formatDateToDayAndMonthAndYear';
import { formatDateToTimeAgo } from '@/shared/lib/formatDateToTimeAgo';
import { formatToK } from '@/shared/lib/formatToK';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import Modal from '@/shared/components/Modal/Modal';
import { useSetApplicationStatusMutation } from '@/store/api/applicationsApi';
import styles from './EmployerApplicationItem.module.scss';

interface IEmployerApplicationItemProps {
    application: ApplicationWithRelations;
}

const EmployerApplicationItem = ({
    application,
}: IEmployerApplicationItemProps) => {
    const { created_at, status, id, resumes, users } = application;

    const [actionType, setActionType] = useState<'approve' | 'reject'>(
        'approve'
    );
    const [setApplicationStatus] = useSetApplicationStatusMutation();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const handleToggleModal = () => setIsOpenDeleteModal((prev) => !prev);

    const newStatus = actionType === 'approve' ? 'approved' : 'rejected';

    const handleSetApplicationStatus = async () => {
        try {
            await setApplicationStatus({
                applicationId: id,
                status: newStatus,
            }).unwrap();
            toast.success(`The application has been ${newStatus}`);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : `Failed to ${actionType} application`
            );
        }
    };

    if (!resumes || !application) return null;

    return (
        <li className={styles.application}>
            <div className={styles.application__top}>
                <p className={styles.application__date}>
                    Received on: {formatDateToDayAndMonthAndYear(created_at)}
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
                    to={`/resumes/${resumes?.id}`}
                >
                    <div className={styles.application__resume}>
                        <span className={styles.application__subtitle}>
                            Resume
                        </span>
                        <h4 className={styles.application__username}>
                            {users?.full_name}
                        </h4>
                        <ul className={styles.application__info}>
                            <li className={styles['application__info-item']}>
                                <span
                                    className={`${styles.application__text} ${styles.application__title}`}
                                >
                                    {resumes.title}
                                </span>
                            </li>
                            <li className={styles['application__info-item']}>
                                <IoLocationOutline aria-hidden="true" />
                                <span className={styles.application__text}>
                                    {resumes.location}
                                </span>
                            </li>
                            <li className={styles['application__info-item']}>
                                <IoTimeOutline aria-hidden="true" />
                                <span className={styles.application__text}>
                                    {formatDateToTimeAgo(created_at)}
                                </span>
                            </li>
                            <li className={styles['application__info-item']}>
                                <GiMoneyStack
                                    className={
                                        styles['application__salary-icon']
                                    }
                                    aria-hidden="true"
                                />
                                <span className={styles.application__text}>
                                    {formatToK(resumes.salary_per_month)} /
                                    month
                                </span>
                            </li>
                        </ul>
                    </div>
                </Link>

                {status === 'pending' && (
                    <div className={styles.application__buttons}>
                        <PrimaryButton
                            label="Approve"
                            style={{ width: '200px' }}
                            onClick={() => {
                                handleToggleModal();
                                setActionType('approve');
                            }}
                            greenStyle={true}
                        />

                        <PrimaryButton
                            label="Reject"
                            style={{ width: '200px' }}
                            onClick={() => {
                                handleToggleModal();
                                setActionType('reject');
                            }}
                            redStyle={true}
                        />
                    </div>
                )}

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
                                onClick={handleSetApplicationStatus}
                                redStyle={actionType === 'reject'}
                                greenStyle={actionType === 'approve'}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        </li>
    );
};

export default EmployerApplicationItem;
