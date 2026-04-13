import { useEffect, useState } from 'react';

import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import CloseButton from '@/shared/UI/CloseButton/CloseButton';
import JobSearchForm, { IJobSearchForm } from '../JobSearchForm/JobSearchForm';
import styles from './VacanciesAndResumesSearch.module.scss';

interface IVacanciesAndResumesSearchProps {
    onSubmit: (filters: IJobSearchForm) => void;
}

export const VacanciesAndResumesSearch = ({
    onSubmit,
}: IVacanciesAndResumesSearchProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                toggleForm();
            }
        };
        window.addEventListener('keydown', handleEscKey);

        document.body.classList.add('body-scroll-lock');

        return () => {
            window.removeEventListener('keydown', handleEscKey);
            document.body.classList.remove('body-scroll-lock');
        };
    }, [isOpen]);

    const toggleForm = () => setIsOpen(!isOpen);
    const closeForm = () => setIsOpen(false);

    return (
        <aside className={styles.search} role="search">
            <PrimaryButton
                label="Search"
                onClick={toggleForm}
                className={styles['search__search-btn']}
            />

            <div
                className={`${styles['search__form-wrapper']} ${isOpen ? styles['search__form-wrapper_show'] : ''}`}
            >
                <CloseButton
                    onClick={toggleForm}
                    customIconClass={styles['search__close-btn']}
                    size={26}
                />
                <JobSearchForm onSubmit={onSubmit} closeForm={closeForm} />
            </div>
        </aside>
    );
};
