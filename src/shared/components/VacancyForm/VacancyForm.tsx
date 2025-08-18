import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCompanyData } from '@/modules/Auth';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import CustomSelect from '@/shared/components/CustomSelect/CustomSelect';
import ProfessionInput from '@/shared/components/ProfessionInput/ProfessionInput';
import LocationInput from '@/shared/components/LocationInput/LocationInput';
import { jobCategories, TJobCategories } from '@/shared/consts/jobCategories';
import { employment, TEmployment } from '@/shared/consts/employment';
import { accessibility, TAccessibility } from '@/shared/consts/accessibility';
import {
    selectEditableVacancy,
    setEditableVacancy,
    useCreateVacancyMutation,
    useEditVacancyMutation,
} from '@/modules/Vacancies';
import styles from './VacancyForm.module.scss';

export interface IVacancyForm {
    category: TJobCategories;
    title: string;
    location: string;
    employment: TEmployment;
    accessibility: TAccessibility;
    urgent: string;
    hours: number;
    salary_per_month: number;
    description: string;
    key_responsibilities: string;
    skill_and_experience: string;
}

interface IVacancyFormProps {
    type: 'create' | 'edit';
}

const VacancyForm = ({ type }: IVacancyFormProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const companyData = useAppSelector(selectCompanyData);

    const editableVacancy = useAppSelector(selectEditableVacancy);

    const [createVacancy, { error }] = useCreateVacancyMutation();
    const [editVacancy, { error: editVacancyError }] = useEditVacancyMutation();

    const { register, handleSubmit, reset, setValue, watch, control } =
        useForm<IVacancyForm>({
            mode: 'onBlur',
            defaultValues: editableVacancy ?? undefined,
        });

    const categoryRef = useRef<HTMLButtonElement>(null);
    const employmentRef = useRef<HTMLButtonElement>(null);
    const accessibilityRef = useRef<HTMLButtonElement>(null);
    const urgentRef = useRef<HTMLButtonElement>(null);

    const selectRefs = {
        category: categoryRef,
        employment: employmentRef,
        accessibility: accessibilityRef,
        urgent: urgentRef,
    };

    const onError = (errors: FieldErrors<IVacancyForm>) => {
        for (const key of Object.keys(
            selectRefs
        ) as (keyof typeof selectRefs)[]) {
            if (errors[key]) {
                selectRefs[key]?.current?.focus();
                break;
            }
        }
    };

    const handleFormSubmit: SubmitHandler<IVacancyForm> = async (formData) => {
        if (!formData) return;

        const allData = {
            ...formData,
            company_id: companyData?.id,
        };

        if (!companyData?.id) {
            toast.error('You must be logged in to create a vacancy');
            return;
        }

        try {
            type === 'create' &&
                (await createVacancy({
                    vacancyData: allData,
                }).unwrap());

            type === 'edit' &&
                editableVacancy &&
                (await editVacancy({
                    data: allData,
                    vacancyId: editableVacancy.id,
                }).unwrap());

            toast.success(
                `Vacancy successfully ${
                    type === 'create' ? 'created' : 'edited'
                }!`
            );
            navigate('/employer/vacancies');
        } catch (err) {
            toast.error(`Failed to ${type} vacancy`);
            console.error(err);
        } finally {
            editableVacancy && handleClearEditableVacancy();
        }
    };

    const handleClearEditableVacancy = () => {
        dispatch(setEditableVacancy(null));
    };

    const handleCancelEdit = () => {
        navigate(-1);
        handleClearEditableVacancy();
    };

    const handleResetForm = () => {
        reset();
    };

    if (error || editVacancyError) {
        toast.error(`Failed to ${type} vacancy`);
        console.error(error);
        return null;
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(handleFormSubmit, onError)}
        >
            <CustomSelect<TJobCategories, IVacancyForm>
                name="category"
                control={control}
                options={jobCategories}
                customSelectClass={styles.form__input}
                customSelectWrapperClass={styles.form__label}
                label="Category"
                required={true}
                customSelectRef={categoryRef}
            />

            <ProfessionInput<IVacancyForm>
                register={register}
                setValue={setValue}
                watch={watch}
                customLabelClass={styles.form__label}
                customInputClass={styles.form__input}
                placeholder="lawyer"
                name="title"
                label="Title"
                icon={false}
                required={true}
            />

            <LocationInput<IVacancyForm>
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

            <CustomSelect<TEmployment, IVacancyForm>
                name="employment"
                control={control}
                options={employment}
                customSelectClass={styles.form__input}
                customSelectWrapperClass={styles.form__label}
                label="Employment"
                required={true}
                customSelectRef={employmentRef}
            />

            <CustomSelect<TAccessibility, IVacancyForm>
                name="accessibility"
                control={control}
                options={accessibility}
                customSelectClass={styles.form__input}
                customSelectWrapperClass={styles.form__label}
                label="Accessibility"
                required={true}
                customSelectRef={accessibilityRef}
            />

            <CustomSelect<'Yes' | 'No', IVacancyForm>
                name="urgent"
                control={control}
                options={['Yes', 'No']}
                customSelectClass={styles.form__input}
                customSelectWrapperClass={styles.form__label}
                label="Urgent"
                required={true}
                customSelectRef={urgentRef}
            />

            <div>
                <label className={styles['form__label-title']} htmlFor="hours">
                    Hours / week
                </label>

                <input
                    className={styles.form__input}
                    placeholder="36"
                    type="number"
                    id="hours"
                    {...register('hours', {
                        min: 0,
                        required: true,
                    })}
                />
            </div>

            <div className={styles.form__salary}>
                <label
                    className={styles['form__label-title']}
                    htmlFor="salary_per_month"
                >
                    Salary Per Month
                </label>

                <input
                    className={styles.form__input}
                    placeholder="Month / $"
                    type="number"
                    id="salary_per_month"
                    {...register('salary_per_month', {
                        min: 0,
                        required: true,
                    })}
                />
            </div>

            <div className={styles['form__textarea-wrapper']}>
                <label
                    className={styles['form__label-title']}
                    htmlFor="description"
                >
                    Description
                </label>

                <textarea
                    className={styles.form__textarea}
                    id="description"
                    {...register('description', {
                        required: true,
                    })}
                />
            </div>

            <div className={styles['form__textarea-wrapper']}>
                <label
                    className={styles['form__label-title']}
                    htmlFor="key_responsibilities"
                >
                    Key Responsibilities
                </label>

                <textarea
                    className={styles.form__textarea}
                    id="key_responsibilities"
                    {...register('key_responsibilities', {
                        required: true,
                    })}
                />
            </div>

            <div className={styles['form__textarea-wrapper']}>
                <label
                    className={styles['form__label-title']}
                    htmlFor="skill_and_experience"
                >
                    Skill and Experience
                </label>

                <textarea
                    className={styles.form__textarea}
                    id="skill_and_experience"
                    {...register('skill_and_experience', {
                        required: true,
                    })}
                />
            </div>

            <div className={styles.form__buttons}>
                <PrimaryButton
                    label={`${type === 'create' ? 'Create' : 'Edit'} Vacancy`}
                    ariaLabel={`${type} Vacancy`}
                    type="submit"
                />

                {type === 'create' ? (
                    <PrimaryButton
                        label="Reset"
                        ariaLabel="Reset form"
                        onClick={handleResetForm}
                    />
                ) : (
                    <PrimaryButton
                        label="Cancel"
                        ariaLabel="Cancel vacancy edit"
                        onClick={handleCancelEdit}
                    />
                )}
            </div>
        </form>
    );
};

export default VacancyForm;
