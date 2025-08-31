import { Link, useNavigate } from 'react-router-dom';

import { CompanyWithUser } from '@/shared/types/database.types';
import companyLogo from '@/shared/assets/images/company-logo.webp';
import styles from './CompanyInfo.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUserData, setCompanyData } from '@/modules/Auth';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import {
    setEditableCompany,
    useDeleteCompanyMutation,
} from '@/modules/Companies';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { toast } from 'sonner';

interface CompanyInfoProps {
    companyData: CompanyWithUser;
    isSingleCompany?: boolean;
}

const CompanyInfo = ({
    companyData,
    isSingleCompany = false,
}: CompanyInfoProps) => {
    const {
        logo_url,
        name,
        id,
        industry,
        size_range,
        founded_year,
        location,
        website,
    } = companyData;

    const { users, ...mainData } = companyData;

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const navigate = useNavigate();

    const handleToggleModal = () => setIsOpenDeleteModal((prev) => !prev);

    const dispatch = useAppDispatch();
    const userData = useAppSelector(selectUserData);
    const [deleteCompany] = useDeleteCompanyMutation();

    const handleDispatchCompanyData = () => {
        dispatch(setEditableCompany(mainData));
    };

    const handleDeleteCompany = async () => {
        try {
            const { error } = await deleteCompany(id);

            if (error) throw error;

            dispatch(setCompanyData(null));
            handleToggleModal();
            toast.success('The company has been deleted');
            navigate('/');
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? `Failed to delete company: ${error.message}`
                    : 'Failed to delete company'
            );
        }
    };

    return (
        <article className={styles.company}>
            <header className={styles.company__header}>
                <img
                    className={`${styles.company__logo} ${
                        isSingleCompany ? styles['company__single-logo'] : ''
                    }`}
                    src={logo_url || companyLogo}
                    alt={`${name} logo`}
                />
                {!isSingleCompany && (
                    <div className={styles['company__header-info']}>
                        <h4 className={styles.company__title}>{name}</h4>
                        <Link
                            className={styles.company__link}
                            to={`/companies/${id}`}
                        >
                            View company profile
                        </Link>
                    </div>
                )}
            </header>

            <ul className={styles.company__info}>
                <li className={styles['company__info-item']}>
                    <span className={styles['company__info-title']}>
                        Industry:
                    </span>
                    <span className={styles['company__info-text']}>
                        {industry}
                    </span>
                </li>

                <li className={styles['company__info-item']}>
                    <span className={styles['company__info-title']}>
                        Company size:
                    </span>
                    <span className={styles['company__info-text']}>
                        {size_range}
                    </span>
                </li>

                <li className={styles['company__info-item']}>
                    <span className={styles['company__info-title']}>
                        Founded in:
                    </span>
                    <span className={styles['company__info-text']}>
                        {founded_year}
                    </span>
                </li>

                <li className={styles['company__info-item']}>
                    <span className={styles['company__info-title']}>
                        Phone:
                    </span>
                    <span className={styles['company__info-text']}>
                        {users?.phone}
                    </span>
                </li>

                <li className={styles['company__info-item']}>
                    <span className={styles['company__info-title']}>
                        Email:
                    </span>
                    <span className={styles['company__info-text']}>
                        {users?.email}
                    </span>
                </li>

                <li className={styles['company__info-item']}>
                    <span className={styles['company__info-title']}>
                        Location:
                    </span>
                    <span className={styles['company__info-text']}>
                        {location}
                    </span>
                </li>
            </ul>

            {website && (
                <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.company__website}
                    aria-label={`Open ${name} website`}
                >
                    {website}
                </a>
            )}

            {users?.id === userData?.id && isSingleCompany && (
                <>
                    <Link
                        className={styles.company__edit}
                        to="/employer/company-editing"
                        onClick={handleDispatchCompanyData}
                        aria-label="Edit the Company"
                    >
                        Edit
                    </Link>

                    <PrimaryButton
                        label="Delete"
                        ariaLabel="Delete the Company"
                        className={styles.company__delete}
                        onClick={handleToggleModal}
                    />
                </>
            )}

            <Modal isOpen={isOpenDeleteModal} onClose={handleToggleModal}>
                <div className={styles.application__modal}>
                    <span className={styles['company__modal-title']}>
                        Delete the company - {name}?
                    </span>

                    <div className={styles['company__modal-buttons']}>
                        <PrimaryButton
                            label="Cancel"
                            onClick={handleToggleModal}
                        />
                        <PrimaryButton
                            label="Delete"
                            onClick={handleDeleteCompany}
                        />
                    </div>
                </div>
            </Modal>
        </article>
    );
};

export default CompanyInfo;
