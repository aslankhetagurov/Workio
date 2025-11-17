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
import styles from './CompaniesSearchForm.module.scss';

export interface ICompanySearchForm {
    companyName: string;
    location: string;
    category: '' | TCompanyCategories;
}

const CompaniesSearchForm = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, reset, setValue, watch } =
        useForm<ICompanySearchForm>({
            mode: 'onBlur',
        });

    const handleFormSubmit: SubmitHandler<ICompanySearchForm> = (filters) => {
        dispatch(setCompaniesSearchFilters(filters));
        window.scrollTo({ top: 0 });
    };

    const handleResetForm = () => {
        reset();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
            <label className={styles.form__label} htmlFor="companyName">
                <span className={styles['form__label-title']}>Company</span>
                <div className={styles['form__input-wrapper']}>
                    <FaBuilding className={styles.form__icon} />
                    <input
                        className={styles.form__input}
                        type="text"
                        {...register('companyName')}
                        placeholder="Company name"
                        aria-label="Company name"
                        id="companyName"
                    />
                </div>
            </label>

            <LocationInput<ICompanySearchForm>
                register={register}
                setValue={setValue}
                watch={watch}
                customLabelClass={styles.form__label}
                customInputClass={styles.form__input}
                placeholder="City"
                name="location"
                label="Location"
            />

            <label className={styles.form__label} htmlFor="category">
                <span className={styles['form__label-title']}>Category</span>
                <select
                    className={styles.form__categories}
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

            <div className={styles.form__buttons}>
                <PrimaryButton
                    label="Search"
                    ariaLabel="Search company"
                    type="submit"
                />
                <PrimaryButton
                    label="Reset"
                    ariaLabel="Reset form"
                    onClick={handleResetForm}
                />
            </div>
        </form>
    );
};

export default CompaniesSearchForm;
