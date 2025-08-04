import { useRef } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { jobCategories, TJobCategories } from '@/shared/consts/jobCategories';
import {
    companySizeRanges,
    TCompanySizeRanges,
} from '@/shared/consts/companySizeRanges';
import { useAppSelector } from '@/store/hooks';
import { selectUserData } from '@/modules/Auth';
import CustomSelect from '@/shared/components/CustomSelect/CustomSelect';
import LocationInput from '@/shared/components/LocationInput/LocationInput';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import { ICompanyCreateForm } from '../../types/ICompanyCreateForm.types';
import { useCreateCompanyMutation } from '@/modules/Companies';
import styles from './CompanyCreateForm.module.scss';

const CompanyCreateForm = () => {
    const user = useAppSelector(selectUserData);
    const navigate = useNavigate();
    const categoryRef = useRef<HTMLButtonElement>(null);
    const sizeRangeRef = useRef<HTMLButtonElement>(null);

    const selectRefs = {
        industry: categoryRef,
        size_range: sizeRangeRef,
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm<ICompanyCreateForm>({
        mode: 'onBlur',
    });

    const [createCompany, { error }] = useCreateCompanyMutation();

    const onError = (errors: FieldErrors<ICompanyCreateForm>) => {
        for (const key of Object.keys(
            selectRefs
        ) as (keyof typeof selectRefs)[]) {
            if (errors[key]) {
                selectRefs[key]?.current?.focus();
                break;
            }
        }
    };

    const handleFormSubmit: SubmitHandler<ICompanyCreateForm> = async (
        formData
    ) => {
        const allData = { ...formData, user_id: user?.id };

        if (!user?.id) {
            toast.error('You must be logged in to create a company');
            return;
        }

        try {
            const data = await createCompany({
                companyData: allData,
            }).unwrap();
            toast.success('Company successfully created!');
            navigate(`/companies/${data.companyId}`);
        } catch (err) {
            toast.error('Failed to create company');
            console.error(err);
        }
    };

    const handleResetForm = () => {
        reset();
    };

    if (error) {
        toast.error('Failed to create company');
        console.error(error);
        return null;
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(handleFormSubmit, onError)}
        >
            <div>
                <label className={styles['form__label-title']} htmlFor="name">
                    Name
                </label>

                <input
                    className={styles.form__input}
                    type="text"
                    id="name"
                    placeholder="Apple Inc."
                    {...register('name', {
                        required: true,
                    })}
                />
            </div>

            <LocationInput<ICompanyCreateForm>
                register={register}
                setValue={setValue}
                watch={watch}
                customLabelClass={styles.form__label}
                customInputClass={styles.form__input}
                placeholder="City"
                name="location"
                label="Location"
                icon={false}
                required={true}
            />

            <CustomSelect<TJobCategories, ICompanyCreateForm>
                name="industry"
                control={control}
                options={jobCategories}
                customSelectClass={styles.form__input}
                customSelectWrapperClass={styles.form__label}
                label="Industry"
                required={true}
                customSelectRef={categoryRef}
            />

            <CustomSelect<TCompanySizeRanges, ICompanyCreateForm>
                name="size_range"
                control={control}
                options={companySizeRanges}
                customSelectClass={styles.form__input}
                customSelectWrapperClass={styles.form__label}
                label="Size Range"
                required={true}
                customSelectRef={sizeRangeRef}
            />

            <div className={styles['form__input-wrapper']}>
                <label
                    className={styles['form__label-title']}
                    htmlFor="founded_year"
                >
                    Founded Year
                </label>

                <input
                    className={styles.form__input}
                    placeholder="2010"
                    type="number"
                    id="founded_year"
                    {...register('founded_year', {
                        minLength: 4,
                        maxLength: 4,
                        required: true,
                    })}
                />
                {errors.founded_year && (
                    <span className={styles.form__error}>
                        {errors.founded_year.type === 'minLength'
                            ? 'This field must be 4 digits'
                            : errors.founded_year.type === 'maxLength'
                            ? 'This field must be 4 digits'
                            : ''}
                    </span>
                )}
            </div>

            <div>
                <label
                    className={styles['form__label-title']}
                    htmlFor="website"
                >
                    Website URL
                </label>

                <input
                    className={styles.form__input}
                    type="text"
                    id="website"
                    placeholder="https://www.apple.com"
                    {...register('website')}
                />
            </div>

            <div className={styles.form__about}>
                <label
                    className={styles['form__label-title']}
                    htmlFor="description"
                >
                    About company
                </label>

                <textarea
                    className={styles.form__textarea}
                    id="description"
                    {...register('description', {
                        required: true,
                    })}
                />
            </div>

            <div className={styles.form__buttons}>
                <PrimaryButton
                    label="Create Company"
                    ariaLabel="Create Company"
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

export default CompanyCreateForm;
