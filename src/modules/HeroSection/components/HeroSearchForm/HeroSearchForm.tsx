import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoIosSearch, IoIosArrowDown, IoIosPin } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import { useDebouncedWatch } from '@/shared/hooks/useDebouncedWatch';
import { professions, TProfessionsType } from '@/shared/consts/professions';
import {
    ILocationItem,
    TLocationApiResponse,
    useGetLocationsQuery,
} from '@/store/api/locationApi';
import styles from './HeroSearchForm.module.scss';

interface IHeroSearchForm {
    jobOrCompanyInput: string;
    locationInput: string;
    select: 'vacancies' | 'resumes' | 'companies';
}

export type THeroSearchFormKeys = keyof IHeroSearchForm;

const HeroSearchForm = () => {
    const [filteredProfessions, setFilteredProfessions] = useState<
        TProfessionsType[] | null
    >(null);
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue } =
        useForm<IHeroSearchForm>({ mode: 'onBlur' });

    const onSubmit: SubmitHandler<IHeroSearchForm> = (data) => {
        const { jobOrCompanyInput, locationInput, select } = data;

        const params = new URLSearchParams({
            query: jobOrCompanyInput.trim(),
            location: locationInput.trim(),
        });

        navigate(`/${select.toLowerCase()}?${params.toString()}`);
    };

    const jobOrCompanyInput = watch('jobOrCompanyInput');
    const locationInput = watch('locationInput');
    const select = watch('select');

    const debouncedJobOrCompanyInput = useDebouncedWatch(
        jobOrCompanyInput,
        500
    );
    const debouncedLocation = useDebouncedWatch(locationInput, 300);

    const { data: locationList } = useGetLocationsQuery(debouncedLocation, {
        skip: !debouncedLocation,
    });

    const isEquallyLocation =
        !!locationList?.length && debouncedLocation
            ? locationList[0].display_place.toLowerCase().trim() ===
              debouncedLocation.toLowerCase().trim()
            : null;

    useEffect(() => {
        const input = debouncedJobOrCompanyInput?.trim().toLowerCase();

        if (!input || select === 'companies') {
            setFilteredProfessions(null);
            return;
        }

        const filteredProfessions = professions.filter((job) =>
            job.toLowerCase().includes(input)
        );

        if (
            filteredProfessions.length === 1 &&
            filteredProfessions[0].toLowerCase() === input
        ) {
            setFilteredProfessions(null);
        } else {
            setFilteredProfessions(
                filteredProfessions.length > 0 ? filteredProfessions : null
            );
        }
    }, [debouncedJobOrCompanyInput]);

    const handleSetValue = (field: THeroSearchFormKeys, item: string) => {
        setValue(field, item);
        if (field === 'jobOrCompanyInput') {
            setFilteredProfessions(null);
        }
    };

    const renderDropDownItems = (
        items: TProfessionsType[] | TLocationApiResponse
    ) => {
        return (
            <ul className={styles['form__dropdown-list']} role="listbox">
                {items
                    .slice(0, 5)
                    .map((item: TProfessionsType | ILocationItem, i) => {
                        const itemValue =
                            typeof item === 'string'
                                ? item
                                : item.display_place;
                        const field =
                            typeof item === 'string'
                                ? 'jobOrCompanyInput'
                                : 'locationInput';
                        return (
                            <li
                                className={styles['form__dropdown-item']}
                                key={itemValue + i}
                                role="option"
                            >
                                <PrimaryButton
                                    label={itemValue}
                                    ariaLabel={itemValue}
                                    onClick={() =>
                                        handleSetValue(field, itemValue)
                                    }
                                />
                            </li>
                        );
                    })}
            </ul>
        );
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.form__label}>
                <IoIosSearch className={styles.form__icon} />
                <input
                    className={styles.form__input}
                    placeholder="job title, keywords, or company"
                    {...register('jobOrCompanyInput')}
                    aria-expanded={
                        !!filteredProfessions?.length &&
                        select !== 'companies' &&
                        !!jobOrCompanyInput
                    }
                />

                {!!filteredProfessions?.length &&
                    select !== 'companies' &&
                    jobOrCompanyInput &&
                    renderDropDownItems(filteredProfessions)}
            </label>

            <label className={styles.form__label}>
                <IoIosPin className={styles.form__icon} />

                <input
                    className={styles.form__input}
                    placeholder="location"
                    {...register('locationInput')}
                    aria-expanded={
                        !!locationList?.length &&
                        !!locationInput &&
                        !isEquallyLocation
                    }
                />

                {!!locationList?.length &&
                    locationInput &&
                    !isEquallyLocation &&
                    renderDropDownItems(locationList)}
            </label>

            <label className={styles['form__select-label']}>
                <select className={styles.form__select} {...register('select')}>
                    <option value="vacancies" aria-label="vacancies">
                        Vacancies
                    </option>
                    <option value="resumes" aria-label="resumes">
                        Resumes
                    </option>
                    <option value="companies" aria-label="companies">
                        Companies
                    </option>
                </select>
                <IoIosArrowDown className={styles['form__select-icon']} />
            </label>
            <PrimaryButton
                label="Find"
                type="submit"
                ariaLabel="Find vacancies, resumes, or companies"
            />
        </form>
    );
};

export default HeroSearchForm;
