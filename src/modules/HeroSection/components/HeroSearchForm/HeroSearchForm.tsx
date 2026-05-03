import { SubmitHandler, useForm } from 'react-hook-form';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import ProfessionInput from '@/shared/components/ProfessionInput/ProfessionInput';
import LocationInput from '@/shared/components/LocationInput/LocationInput';
import CustomSelect from '@/shared/components/CustomSelect/CustomSelect';
import {
    SEARCH_OPTIONS,
    TSearchOptionValue,
} from '../../shared/consts/searchOptions';
import styles from './HeroSearchForm.module.scss';

interface IHeroSearchForm {
    jobOrCompanyInput?: string;
    locationInput?: string;
    select: TSearchOptionValue;
}

const HeroSearchForm = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue, control } =
        useForm<IHeroSearchForm>({
            mode: 'onBlur',
            defaultValues: {
                select: 'Vacancies',
            },
        });

    const onSubmit: SubmitHandler<IHeroSearchForm> = (data) => {
        const { jobOrCompanyInput, locationInput, select } = data;

        navigate(`/${select.toLowerCase()}`, {
            state: {
                location: locationInput?.trim() || '',
                keyword: jobOrCompanyInput?.trim() || '',
            },
        });
    };

    const select = watch('select');

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {select === 'Companies' ? (
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

            <CustomSelect<TSearchOptionValue, IHeroSearchForm>
                name="select"
                control={control}
                options={SEARCH_OPTIONS}
                customSelectClass={styles.form__select}
                customSelectWrapperClass={styles['form__select-wrapper']}
                required={true}
            />

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
