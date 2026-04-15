import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaBuilding } from 'react-icons/fa';

import {
    jobCategories as companyCategories,
    TJobCategories as TCompanyCategories,
} from '@/shared/consts/jobCategories';
import { useAppDispatch } from '@/store/hooks';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import LocationInput from '@/shared/components/LocationInput/LocationInput';
import { setCompaniesSearchFilters } from '../../store/companiesSlice';
import CloseButton from '@/shared/UI/CloseButton/CloseButton';
import styles from './CompaniesSearchForm.module.scss';

export interface ICompanySearchForm {
    companyName: string;
    location: string;
    category: '' | TCompanyCategories;
}

const CompaniesSearchForm = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, setValue, watch } =
        useForm<ICompanySearchForm>({
            mode: 'onBlur',
        });

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

    const handleFormSubmit: SubmitHandler<ICompanySearchForm> = (filters) => {
        dispatch(setCompaniesSearchFilters(filters));
        window.scrollTo({ top: 0 });
    };

    const handleResetForm = () => {
        reset();
    };

    const toggleForm = () => setIsOpen(!isOpen);
    const closeForm = () => setIsOpen(false);

    return (
        <aside className={styles.search} role="search">
            <PrimaryButton
                label="Search"
                onClick={toggleForm}
                className={styles.search__button}
            />

            <div
                className={`${styles.search__form} ${isOpen ? styles['search__form--open'] : ''}`}
            >
                <CloseButton
                    onClick={toggleForm}
                    customIconClass={styles.search__close}
                    size={26}
                />

                <form
                    className={styles['search-form']}
                    onSubmit={handleSubmit(handleFormSubmit)}
                >
                    <div className={styles['search-form__field']}>
                        <label
                            className={styles['search-form__label']}
                            htmlFor="companyName"
                        >
                            <span className={styles['search-form__label-text']}>
                                Company
                            </span>
                            <div
                                className={styles['search-form__input-wrapper']}
                            >
                                <FaBuilding
                                    className={styles['search-form__icon']}
                                />
                                <input
                                    className={styles['search-form__input']}
                                    type="text"
                                    {...register('companyName')}
                                    placeholder="Company name"
                                    aria-label="Company name"
                                    id="companyName"
                                />
                            </div>
                        </label>
                    </div>

                    <LocationInput<ICompanySearchForm>
                        register={register}
                        setValue={setValue}
                        watch={watch}
                        customLabelClass={styles['search-form__label']}
                        customInputClass={styles['search-form__input']}
                        placeholder="City"
                        name="location"
                        label="Location"
                    />

                    <label
                        className={styles['search-form__label']}
                        htmlFor="category"
                    >
                        <span className={styles['search-form__label-text']}>
                            Category
                        </span>
                        <select
                            className={styles['search-form__select']}
                            id="category"
                            {...register('category')}
                        >
                            <option key="All categories" value="">
                                All categories
                            </option>

                            {companyCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className={styles['search-form__actions']}>
                        <PrimaryButton
                            label="Search"
                            ariaLabel="Search company"
                            type="submit"
                            onClick={closeForm}
                        />
                        <PrimaryButton
                            label="Reset"
                            ariaLabel="Reset form"
                            onClick={handleResetForm}
                        />
                    </div>
                </form>
            </div>
        </aside>
    );
};

export default CompaniesSearchForm;
