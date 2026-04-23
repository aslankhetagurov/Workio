import { SubmitHandler, useForm } from 'react-hook-form';
import { IoIosSearch, IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import ProfessionInput from '@/shared/components/ProfessionInput/ProfessionInput';
import LocationInput from '@/shared/components/LocationInput/LocationInput';
import styles from './HeroSearchForm.module.scss';

interface IHeroSearchForm {
    jobOrCompanyInput: string;
    locationInput: string;
    select: 'vacancies' | 'resumes' | 'companies';
}

export type THeroSearchFormKeys = keyof IHeroSearchForm;

const HeroSearchForm = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue } =
        useForm<IHeroSearchForm>({ mode: 'onBlur' });

    const onSubmit: SubmitHandler<IHeroSearchForm> = (data) => {
        if (!data.jobOrCompanyInput || !data.locationInput) return;

        const { jobOrCompanyInput, locationInput, select } = data;

        const params = new URLSearchParams({
            query: jobOrCompanyInput.trim(),
            location: locationInput.trim(),
        });

        navigate(`/${select.toLowerCase()}?${params.toString()}`);
    };

    const select = watch('select');

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {select === 'companies' ? (
                <label className={styles.form__label} htmlFor="companyInput">
                    <IoIosSearch className={styles.form__icon} />
                    <input
                        className={styles.form__input}
                        type="text"
                        {...register('jobOrCompanyInput')}
                        placeholder="Company name"
                        id="companyInput"
                    />
                </label>
            ) : (
                <ProfessionInput<IHeroSearchForm>
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    customLabelClass={styles.form__label}
                    customInputClass={styles.form__input}
                    placeholder="job title, keywords, or company"
                    name="jobOrCompanyInput"
                />
            )}

            <LocationInput<IHeroSearchForm>
                register={register}
                setValue={setValue}
                watch={watch}
                customLabelClass={styles.form__label}
                customInputClass={styles.form__input}
                placeholder="Location"
                name="locationInput"
            />

            <div className={styles['form__select-wrapper']}>
                <label htmlFor="select" className="sr-only">
                    Select category
                </label>

                <select
                    id="select"
                    className={styles.form__select}
                    {...register('select')}
                >
                    <option value="vacancies">Vacancies</option>
                    <option value="resumes">Resumes</option>
                    <option value="companies">Companies</option>
                </select>
                <IoIosArrowDown
                    className={styles['form__select-icon']}
                    aria-hidden="true"
                />
            </div>

            <PrimaryButton
                label="Find"
                type="submit"
                ariaLabel="Find vacancies, resumes, or companies"
                className={styles.form__btn}
            />
        </form>
    );
};

export default HeroSearchForm;
