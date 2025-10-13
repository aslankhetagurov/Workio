import { useState } from 'react';
import { toast } from 'sonner';
import { FaBuilding } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { GiMoneyStack } from 'react-icons/gi';

import { InvitationWithRelations } from '@/shared/types/database.types';
import { formatDateToDayAndMonthAndYear } from '@/shared/lib/formatDateToDayAndMonthAndYear';
import { formatDateToTimeAgo } from '@/shared/lib/formatDateToTimeAgo';
import { formatToK } from '@/shared/lib/formatToK';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import Modal from '@/shared/components/Modal/Modal';
import { useSetInvitationStatusMutation } from '@/store/api/invitationsApi';
import styles from './ApplicantInvitationItem.module.scss';

interface IApplicantInvitationItemProps {
    invitation: InvitationWithRelations;
}
const ApplicantInvitationItem = ({
    invitation,
}: IApplicantInvitationItemProps) => {
    const { created_at, status, id, vacancies } = invitation;

    const [actionType, setActionType] = useState<'approve' | 'reject'>(
        'approve'
    );
    const [setInvitationStatus] = useSetInvitationStatusMutation();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const handleToggleModal = () => setIsOpenDeleteModal((prev) => !prev);

    const newStatus = actionType === 'approve' ? 'approved' : 'rejected';

    const handleSetApplicationStatus = async () => {
        try {
            await setInvitationStatus({
                invitationId: id,
                status: newStatus,
            }).unwrap();
            toast.success(`The invitation has been ${newStatus}`);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : `Failed to ${actionType} invitation`
            );
        }
    };

    if (!vacancies || !invitation) return null;

    return (
        <li className={styles.invitation}>
            <div className={styles.invitation__top}>
                <p className={styles.invitation__date}>
                    Received on: {formatDateToDayAndMonthAndYear(created_at)}
                </p>

                <p
                    className={`${styles.invitation__status} ${
                        styles[`invitation__status-${status}`]
                    }`}
                >
                    Status: {status}
                </p>
            </div>

            <div className={styles.invitation__content}>
                <Link
                    className={styles.invitation__link}
                    to={`/vacancies/${vacancies?.id}`}
                >
                    <div className={styles.invitation__vacancy}>
                        <div className={styles['invitation__vacancy-top']}>
                            <span className={styles.invitation__subtitle}>
                                Vacancy
                            </span>
                            <h4 className={styles.invitation__title}>
                                {vacancies?.title}
                            </h4>
                        </div>
                        <ul className={styles.invitation__info}>
                            <li className={styles['invitation__info-item']}>
                                <span aria-hidden="true">
                                    <FaBuilding />
                                </span>
                                <span className={styles.invitation__text}>
                                    {vacancies?.companies?.name}
                                </span>
                            </li>
                            <li className={styles['invitation__info-item']}>
                                <span aria-hidden="true">
                                    <IoLocationOutline />
                                </span>
                                <span className={styles.invitation__text}>
                                    {vacancies?.location}
                                </span>
                            </li>
                            <li className={styles['invitation__info-item']}>
                                <span aria-hidden="true">
                                    <IoTimeOutline />
                                </span>
                                <span className={styles.invitation__text}>
                                    {formatDateToTimeAgo(vacancies.created_at)}
                                </span>
                            </li>
                            <li className={styles['invitation__info-item']}>
                                <span aria-hidden="true">
                                    <GiMoneyStack
                                        style={{ fontSize: '16px' }}
                                    />
                                </span>

                                <span className={styles.invitation__text}>
                                    {formatToK(vacancies?.salary_per_month)} per
                                    Month
                                </span>
                            </li>
                        </ul>
                    </div>
                </Link>

                {status === 'pending' && (
                    <div className={styles.invitation__buttons}>
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
                    <div className={styles.invitation__modal}>
                        <span className={styles['invitation__modal-title']}>
                            Are you sure?
                        </span>

                        <div className={styles['invitation__modal-buttons']}>
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

export default ApplicantInvitationItem;
