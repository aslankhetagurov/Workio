import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { GiMoneyStack } from 'react-icons/gi';

import { InvitationWithRelations } from '@/shared/types/database.types';
import { formatDateToDayAndMonthAndYear } from '@/shared/lib/formatDateToDayAndMonthAndYear';
import { formatDateToTimeAgo } from '@/shared/lib/formatDateToTimeAgo';
import { formatToK } from '@/shared/lib/formatToK';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import Modal from '@/shared/components/Modal/Modal';
import {
    useDeleteInvitationMutation,
    useSetInvitationStatusMutation,
} from '@/store/api/invitationsApi';
import styles from './EmployerInvitationItem.module.scss';

interface IEmployerInvitationItemProps {
    invitation: InvitationWithRelations;
}

const EmployerInvitationItem = ({
    invitation,
}: IEmployerInvitationItemProps) => {
    const { created_at, status, id, resumes } = invitation;

    const [setInvitationStatus] = useSetInvitationStatusMutation();
    const [deleteInvitation] = useDeleteInvitationMutation();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const handleToggleModal = () => setIsOpenDeleteModal((prev) => !prev);

    const handleSetInvitationStatus = async () => {
        try {
            await setInvitationStatus({
                invitationId: id,
                status: 'cancelled',
            }).unwrap();
            toast.success(`The invitation has been cancelled`);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : `Failed to cancel invitation`
            );
        }
    };

    const handleDeleteInvitation = async () => {
        await deleteInvitation(id);
        handleToggleModal();
        toast.success('The invitation has been deleted');
    };

    if (!resumes || !invitation) return null;

    return (
        <li className={styles.invitation}>
            <div className={styles.invitation__top}>
                <p className={styles.invitation__date}>
                    Sent on: {formatDateToDayAndMonthAndYear(created_at)}
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
                    to={`/resumes/${resumes?.id}`}
                >
                    <div className={styles.invitation__resume}>
                        <span className={styles.invitation__subtitle}>
                            Resume
                        </span>
                        <h4 className={styles.invitation__username}>
                            {resumes.users?.full_name}
                        </h4>
                        <ul className={styles.invitation__info}>
                            <li className={styles['invitation__info-item']}>
                                <span
                                    className={`${styles.invitation__text} ${styles.invitation__title}`}
                                >
                                    {resumes.title}
                                </span>
                            </li>
                            <li className={styles['invitation__info-item']}>
                                <IoLocationOutline aria-hidden="true" />
                                <span className={styles.invitation__text}>
                                    {resumes.location}
                                </span>
                            </li>
                            <li className={styles['invitation__info-item']}>
                                <IoTimeOutline aria-hidden="true" />
                                <span className={styles.invitation__text}>
                                    {formatDateToTimeAgo(created_at)}
                                </span>
                            </li>
                            <li className={styles['invitation__info-item']}>
                                <GiMoneyStack
                                    className={
                                        styles['invitation__salary-icon']
                                    }
                                    aria-hidden="true"
                                />
                                <span className={styles.invitation__text}>
                                    {formatToK(resumes.salary_per_month)} /
                                    month
                                </span>
                            </li>
                        </ul>
                    </div>
                </Link>

                {status === 'cancelled' ? (
                    <PrimaryButton
                        label="Delete invitation"
                        style={{ width: '200px' }}
                        onClick={handleToggleModal}
                        redStyle={true}
                    />
                ) : status === 'pending' ? (
                    <PrimaryButton
                        label="Cancel invitation"
                        ariaLabel="Cancel apply to job vacancy"
                        style={{ width: '200px' }}
                        onClick={handleToggleModal}
                    />
                ) : null}

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
                                onClick={
                                    status === 'cancelled'
                                        ? handleDeleteInvitation
                                        : handleSetInvitationStatus
                                }
                                redStyle={true}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        </li>
    );
};

export default EmployerInvitationItem;
