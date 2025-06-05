import { SubmitHandler, useForm } from 'react-hook-form';

import { jobCategories, TJobCategories } from '@/shared/consts/jobCategories';
import {
    employmentWithAll,
    TEmploymentWithAll,
} from '@/shared/consts/employment';
import {
    accessibilityWithAll,
    TAccessibilityWithAll,
} from '@/shared/consts/accessibility';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import { setFilters } from '../../store/vacanciesSlice';
import { useAppDispatch } from '@/store/hooks';
import ProfessionInput from '@/shared/components/ProfessionInput/ProfessionInput';
import LocationInput from '@/shared/components/LocationInput/LocationInput';
import { getDateHoursAgo } from '@/shared/lib/getDateHoursAgo';
import styles from './VacanciesSearchForm.module.scss';

export interface IVacanciesSearchForm {
    keywords: string;
    location: string;
    category: '' | TJobCategories;
    createdAt: keyof typeof createdAtFilterMap;
    employment: TEmploymentWithAll;
    accessibility: TAccessibilityWithAll;
    salaryMin: number;
    salaryMax: number;
}

const createdAtFilterMap = {
    All: 0,
    'Last Hour': 1,
    'Last 24 Hours': 24,
    'Last 7 days': 24 * 7,
    'Last 30 days': 24 * 30,
} as const;

const VacanciesSearchForm = () => {
    const { register, handleSubmit, reset, setValue, watch } =
        useForm<IVacanciesSearchForm>({
            mode: 'onBlur',
            defaultValues: {
                createdAt: 'All',
                employment: 'All',
                accessibility: 'All',
            },
        });

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<IVacanciesSearchForm> = (filters) => {
        dispatch(setFilters(filters));
    };

    const handleResetForm = () => {
        reset();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <ProfessionInput<IVacanciesSearchForm>
                register={register}
                setValue={setValue}
                watch={watch}
                customLabelClass={styles.form__label}
                customInputClass={styles.form__input}
                placeholder="Job title or keywords"
                name="keywords"
                label="Keyword"
            />

            <LocationInput<IVacanciesSearchForm>
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
                    {jobCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </label>

            <div className={styles.form__salary}>
                <label
                    className={styles['form__label-title']}
                    htmlFor="salaryMin"
                >
                    Salary
                </label>

                <div className={styles.form__inputs}>
                    <input
                        className={styles.form__input}
                        placeholder="Min"
                        type="number"
                        id="salaryMin"
                        {...register('salaryMin', { min: 0 })}
                    />
                    <span>-</span>
                    <input
                        className={styles.form__input}
                        placeholder="Max"
                        type="number"
                        id="salaryMax"
                        {...register('salaryMax')}
                    />
                </div>
            </div>

            <div className={styles['form__radios-wrapper']}>
                <span className={styles['form__label-title']}>Post Date</span>

                <div className={styles.form__radios}>
                    {Object.entries(createdAtFilterMap).map(
                        ([label, hours]) => (
                            <label
                                className={styles['form__radio-label']}
                                key={hours}
                                htmlFor={`createdAt-${hours}`}
                            >
                                <input
                                    className={styles.form__radio}
                                    id={`createdAt-${hours}`}
                                    type="radio"
                                    value={
                                        label === 'All'
                                            ? 'All'
                                            : getDateHoursAgo(hours)
                                    }
                                    {...register('createdAt')}
                                    defaultChecked={label === 'All'}
                                />
                                <span className={styles['form__radio-text']}>
                                    {label}
                                </span>
                            </label>
                        )
                    )}
                </div>
            </div>

            <div className={styles['form__radios-wrapper']}>
                <span className={styles['form__label-title']}>Employment</span>

                <div className={styles.form__radios}>
                    {employmentWithAll.map((item) => {
                        return (
                            <label
                                className={styles['form__radio-label']}
                                key={item}
                                htmlFor={`employment-${item}`}
                            >
                                <input
                                    className={styles.form__radio}
                                    id={`employment-${item}`}
                                    type="radio"
                                    value={item}
                                    {...register('employment')}
                                    defaultChecked={item === 'All'}
                                />
                                <span className={styles['form__radio-text']}>
                                    {item}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>

            <div className={styles['form__radios-wrapper']}>
                <span className={styles['form__label-title']}>
                    Accessibility
                </span>

                <div className={styles.form__radios}>
                    {accessibilityWithAll.map((item) => (
                        <label
                            className={styles['form__radio-label']}
                            key={item}
                            htmlFor={`accessibility-${item}`}
                        >
                            <input
                                className={styles.form__radio}
                                type="radio"
                                id={`accessibility-${item}`}
                                value={item}
                                {...register('accessibility')}
                                defaultChecked={item === 'All'}
                            />
                            <span className={styles['form__radio-text']}>
                                {item}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.form__buttons}>
                <PrimaryButton
                    label="Search"
                    ariaLabel="Search vacancies"
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

export default VacanciesSearchForm;
