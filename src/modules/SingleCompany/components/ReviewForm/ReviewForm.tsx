import { useParams } from 'react-router-dom';
import styles from './ReviewForm.module.scss';
import {
    Controller,
    FieldErrors,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import { useAppSelector } from '@/store/hooks';
import { selectUserData } from '@/modules/Auth';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import CustomSelect from '@/shared/components/CustomSelect/CustomSelect';
import ProfessionInput from '@/shared/components/ProfessionInput/ProfessionInput';
import LocationInput from '@/shared/components/LocationInput/LocationInput';
import { useAddCompanyReviewMutation } from '@/modules/Companies';
import {
    experienceDuration,
    TExperienceDuration,
} from '../../consts/experienceDuration';
import CloseButton from '@/shared/UI/CloseButton/CloseButton';
import DropDownList from '@/shared/UI/DropDownList/DropDownList';
import StarRating from '@/shared/components/StarRating/StarRating';
import { IReviewForm } from '../../types/IReviewForm.types';

interface IReviewFormProps {
    onClose: () => void;
}

const ReviewForm = ({ onClose }: IReviewFormProps) => {
    const params = useParams();
    const user = useAppSelector(selectUserData);
    const [benefitsInput, setBenefitsInput] = useState<string>('');
    const [benefits, setBenefits] = useState<string[] | []>([]);

    const [addCompanyReview, { error }] = useAddCompanyReviewMutation();

    const { register, handleSubmit, reset, setValue, watch, control } =
        useForm<IReviewForm>({
            mode: 'onBlur',
            defaultValues: {
                rating_growth_opportunities: 0,
                rating_management: 0,
                rating_team: 0,
                rating_salary_level: 0,
                rating_work_conditions: 0,
                rating_relax_conditions: 0,
            },
        });

    const experienceRef = useRef<HTMLButtonElement>(null);
    const benefitsRef = useRef<HTMLInputElement>(null);

    const selectRefs = {
        experience_duration: experienceRef,
        benefits: benefitsRef,
    };

    const onError = (errors: FieldErrors<IReviewForm>) => {
        for (const key of Object.keys(
            selectRefs
        ) as (keyof typeof selectRefs)[]) {
            if (errors[key]) {
                selectRefs[key]?.current?.focus();
                break;
            }
        }
    };

    const handleFormSubmit: SubmitHandler<IReviewForm> = async (formData) => {
        if (!formData || !user || !benefits) return;

        const allData = {
            ...formData,
            benefits,
            company_id: params?.companyId!,
            user_id: user?.id,
        };

        try {
            const newReview = await addCompanyReview(allData).unwrap();
            console.log(newReview);

            toast.success(`Review successfully created!`);
        } catch (err) {
            toast.error(`Failed to create Review`);
            console.error(err);
        } finally {
            onClose();
            handleResetForm();
        }
    };

    const handleResetForm = () => {
        reset();
    };

    const handleSetBenefits = () => {
        setBenefits((prev) => {
            return [...prev, benefitsInput];
        });
        setBenefitsInput('');
    };

    const handleDeleteBenefits = (skill: string) => {
        const newBenefits = benefits.slice().filter((item) => item !== skill);
        setBenefits(newBenefits);
    };

    if (error) {
        toast.error(`Failed to create review`);
        console.error(error);
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles['form-title']}>Anonymous review</p>

            <form
                className={styles.form}
                onSubmit={handleSubmit(handleFormSubmit, onError)}
            >
                <ProfessionInput<IReviewForm>
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    customLabelClass={styles.form__label}
                    customInputClass={styles.form__input}
                    placeholder="lawyer"
                    name="position"
                    label="Position"
                    icon={false}
                    required={true}
                />

                <LocationInput<IReviewForm>
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    customLabelClass={styles.form__label}
                    customInputClass={styles.form__input}
                    placeholder="City"
                    name="region"
                    label="Location"
                    icon={false}
                    required={true}
                />

                <CustomSelect<TExperienceDuration, IReviewForm>
                    name="experience_duration"
                    control={control}
                    options={experienceDuration}
                    customSelectClass={styles.form__input}
                    customSelectWrapperClass={styles.form__label}
                    label="Experience duration"
                    required={true}
                    customSelectRef={experienceRef}
                />

                <div className={styles['form__checkbox-wrapper']}>
                    <label
                        className={styles['form__checkbox-label']}
                        htmlFor="current_employee"
                    >
                        Is current employee
                    </label>

                    <input
                        className={styles.form__checkbox}
                        type="checkbox"
                        id="current_employee"
                        {...register('is_current_employee')}
                    />
                </div>

                <div className={styles['form__textarea-wrapper']}>
                    <label
                        className={styles['form__label-title']}
                        htmlFor="pros"
                    >
                        What you like
                    </label>

                    <textarea
                        className={styles.form__textarea}
                        id="cons"
                        {...register('pros', {
                            required: true,
                        })}
                    />
                </div>

                <div className={styles['form__textarea-wrapper']}>
                    <label
                        className={styles['form__label-title']}
                        htmlFor="cons"
                    >
                        What can be improved
                    </label>

                    <textarea
                        className={styles.form__textarea}
                        id="cons"
                        {...register('cons', {
                            required: true,
                        })}
                    />
                </div>

                <div className={styles.form__benefits}>
                    <label
                        className={styles['form__label-title']}
                        htmlFor="benefits"
                    >
                        Benefits and advantages
                    </label>
                    <input
                        className={styles.form__input}
                        type="text"
                        id="benefits"
                        value={benefitsInput}
                        onChange={(e) => setBenefitsInput(e.target.value)}
                        placeholder="Mental health support, parking spot..."
                        ref={benefitsRef}
                    />
                    {benefits && (
                        <ul className={styles['form__benefits-saved']}>
                            {benefits.map((item, i) => (
                                <li
                                    className={styles['form__benefit']}
                                    key={item + i}
                                >
                                    <span
                                        className={styles['form__benefit-text']}
                                    >
                                        {item}
                                    </span>

                                    <CloseButton
                                        onClick={() =>
                                            handleDeleteBenefits(item)
                                        }
                                        size={18}
                                        customIconClass={
                                            styles['form__benefit-delete']
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                    )}

                    <DropDownList
                        list={[benefitsInput]}
                        showDropDown={!!benefitsInput}
                        handleSetValue={handleSetBenefits}
                        topMargin={84}
                    />
                </div>

                <div className={styles.form__ratings}>
                    <p className={styles['form__ratings-title']}>Ratings</p>

                    <div className={styles['form__ratings-list']}>
                        <div className={styles.form__rating}>
                            <label>Growth Opportunities</label>
                            <Controller
                                control={control}
                                name="rating_growth_opportunities"
                                render={({ field }) => (
                                    <StarRating
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>

                        <div className={styles.form__rating}>
                            <label>Management</label>
                            <Controller
                                control={control}
                                name="rating_management"
                                render={({ field }) => (
                                    <StarRating
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>

                        <div className={styles.form__rating}>
                            <label>Team</label>
                            <Controller
                                control={control}
                                name="rating_team"
                                render={({ field }) => (
                                    <StarRating
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>

                        <div className={styles.form__rating}>
                            <label>Salary Level</label>
                            <Controller
                                control={control}
                                name="rating_salary_level"
                                render={({ field }) => (
                                    <StarRating
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>

                        <div className={styles.form__rating}>
                            <label>Working Conditions</label>
                            <Controller
                                control={control}
                                name="rating_work_conditions"
                                render={({ field }) => (
                                    <StarRating
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                        <div className={styles.form__rating}>
                            <label>Relax Conditions</label>
                            <Controller
                                control={control}
                                name="rating_relax_conditions"
                                render={({ field }) => (
                                    <StarRating
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.form__buttons}>
                    <PrimaryButton label="Send review" type="submit" />

                    <PrimaryButton
                        label="Reset"
                        ariaLabel="Reset form"
                        onClick={handleResetForm}
                    />
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
