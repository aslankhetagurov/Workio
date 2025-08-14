import { createRef, useRef, useState } from 'react';
import {
    FieldErrors,
    SubmitHandler,
    useFieldArray,
    useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { jobCategories, TJobCategories } from '@/shared/consts/jobCategories';
import { employment, TEmployment } from '@/shared/consts/employment';
import { accessibility, TAccessibility } from '@/shared/consts/accessibility';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import ProfessionInput from '@/shared/components/ProfessionInput/ProfessionInput';
import LocationInput from '@/shared/components/LocationInput/LocationInput';
import CustomSelect from '@/shared/components/CustomSelect/CustomSelect';
import DropDownList from '@/shared/UI/DropDownList/DropDownList';
import CloseButton from '@/shared/UI/CloseButton/CloseButton';
import {
    educationDegree,
    TEducationDegree,
} from '@/shared/consts/educationDegree';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUserData } from '@/modules/Auth';
import { gender, TGender } from '@/shared/consts/gender';
import {
    selectEditableResume,
    setEditableResume,
    useCreateResumeMutation,
    useEditResumeMutation,
} from '@/modules/Resumes';
import { emptyEducation, emptyWorkExperiences } from '@/modules/ResumeCreation';
import styles from './ResumeForm.module.scss';

interface IResumeFormProps {
    type: 'create' | 'edit';
}

export interface IResumeForm {
    title: string;
    location: string;
    category: TJobCategories;
    employment: TEmployment;
    accessibility: TAccessibility;
    salary_per_month: number;
    date_of_birth: string;
    about_me: string;
    gender: 'Male' | 'Female';
    skills: string[];
    education: {
        institution: string;
        location: string;
        degree: TEducationDegree | null;
        field_of_study: string;
        graduation_year: number | null;
        id?: string;
    }[];
    work_experiences: {
        company_name: string;
        position: string;
        start_date: string;
        end_date: string | null;
        location: string;
        description: string;
        id?: string;
    }[];
}

const ResumeForm = ({ type }: IResumeFormProps) => {
    const user = useAppSelector(selectUserData);
    const editableResume = useAppSelector(selectEditableResume);
    const dispatch = useAppDispatch();

    const { register, handleSubmit, reset, setValue, watch, control } =
        useForm<IResumeForm>({
            mode: 'onBlur',
            defaultValues:
                type === 'create'
                    ? {
                          education: [
                              {
                                  institution: '',
                                  location: '',
                                  degree: null,
                                  field_of_study: '',
                                  graduation_year: null,
                              },
                          ],
                          work_experiences: [
                              {
                                  company_name: '',
                                  position: '',
                                  start_date: '',
                                  end_date: null,
                                  location: '',
                                  description: '',
                              },
                          ],
                      }
                    : editableResume ?? undefined,
        });

    const categoryRef = useRef<HTMLButtonElement>(null);
    const employmentRef = useRef<HTMLButtonElement>(null);
    const accessibilityRef = useRef<HTMLButtonElement>(null);
    const genderRef = useRef<HTMLButtonElement>(null);
    const skillsRef = useRef<HTMLInputElement>(null);

    const selectRefs = {
        category: categoryRef,
        employment: employmentRef,
        accessibility: accessibilityRef,
        gender: genderRef,
    };

    const degreeRefs = useRef<Array<React.RefObject<HTMLButtonElement | null>>>(
        []
    );

    const {
        fields: educationFields,
        append: educationAppend,
        remove: educationRemove,
    } = useFieldArray({
        control,
        name: 'education',
    });

    const {
        fields: workFields,
        append: workAppend,
        remove: workRemove,
    } = useFieldArray({
        control,
        name: 'work_experiences',
    });

    const [createResume, { error }] = useCreateResumeMutation();
    const [editResume, { error: editResumeError }] = useEditResumeMutation();

    const [skills, setSkills] = useState<string[] | []>(
        editableResume?.skills ?? []
    );
    const [skillInput, setSkillInput] = useState<string>('');
    const navigate = useNavigate();

    const handleSetSkill = () => {
        setSkills((prev) => {
            return [...prev, skillInput];
        });
        setSkillInput('');
    };

    const onError = (errors: FieldErrors<IResumeForm>) => {
        for (const key of Object.keys(
            selectRefs
        ) as (keyof typeof selectRefs)[]) {
            if (errors[key]) {
                selectRefs[key]?.current?.focus();
                break;
            }
        }

        if (Array.isArray(errors.education)) {
            for (let i = 0; i < errors.education.length; i++) {
                if (errors.education[i]?.degree) {
                    degreeRefs.current[i]!.current!.focus();
                    return;
                }
            }
        }
    };

    const handleFormSubmit: SubmitHandler<IResumeForm> = async (formData) => {
        const allData = { ...formData, skills };

        if (!user?.id) {
            toast.error(`You must be logged in to ${type} a resume`);
            return;
        }

        if (!skills.length) {
            skillsRef.current?.focus();
            return;
        }

        try {
            type === 'create' &&
                (await createResume({
                    data: allData,
                    userId: user?.id,
                }).unwrap());

            type === 'edit' &&
                editableResume &&
                (await editResume({
                    data: allData,
                    resumeId: editableResume.id,
                }).unwrap());

            toast.success(
                `Resume successfully ${
                    type === 'create' ? 'created' : 'edited'
                }!`
            );
            navigate('/applicant/resumes');
        } catch (err) {
            toast.error(`Failed to ${type} resume`);
            console.error(err);
        } finally {
            editableResume && handleClearEditableResume();
        }
    };

    const handleClearEditableResume = () => {
        dispatch(setEditableResume(null));
    };

    const handleResetForm = () => {
        reset();
    };

    const handleCancelEdit = () => {
        navigate(-1);
        handleClearEditableResume();
    };

    const deleteSkill = (skill: string) => {
        const newSkills = skills.slice().filter((item) => item !== skill);
        setSkills(newSkills);
    };

    if (error || editResumeError) {
        toast.error(`Failed to ${type} resume`);
        console.error(error || editResumeError);
        return null;
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(handleFormSubmit, onError)}
        >
            <CustomSelect<TJobCategories, IResumeForm>
                name="category"
                control={control}
                options={jobCategories}
                customSelectClass={styles.form__input}
                customSelectWrapperClass={styles.form__label}
                label="Category"
                required={true}
                customSelectRef={categoryRef}
            />

            <ProfessionInput<IResumeForm>
                register={register}
                setValue={setValue}
                watch={watch}
                customLabelClass={styles.form__label}
                customInputClass={styles.form__input}
                placeholder="Job title or keywords"
                name="title"
                label="Profession"
                icon={false}
                required={true}
            />

            <LocationInput<IResumeForm>
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

            <CustomSelect<TEmployment, IResumeForm>
                name="employment"
                control={control}
                options={employment}
                customSelectClass={styles.form__input}
                customSelectWrapperClass={styles.form__label}
                label="Employment"
                required={true}
                customSelectRef={employmentRef}
            />

            <CustomSelect<TAccessibility, IResumeForm>
                name="accessibility"
                control={control}
                options={accessibility}
                customSelectClass={styles.form__input}
                customSelectWrapperClass={styles.form__label}
                label="Accessibility"
                required={true}
                customSelectRef={accessibilityRef}
            />

            <CustomSelect<TGender, IResumeForm>
                name="gender"
                control={control}
                options={gender}
                customSelectClass={styles.form__input}
                customSelectWrapperClass={styles.form__label}
                label="Gender"
                required={true}
                customSelectRef={genderRef}
            />

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

            <div>
                <label
                    className={styles['form__label-title']}
                    htmlFor="date_of_birth"
                >
                    Date of Birth
                </label>

                <input
                    className={styles.form__input}
                    type="date"
                    id="date_of_birth"
                    {...register('date_of_birth', {
                        required: true,
                    })}
                />
            </div>

            <div className={styles.form__skills}>
                <label className={styles['form__label-title']} htmlFor="skills">
                    Skills
                </label>

                <input
                    className={styles.form__input}
                    type="text"
                    id="skills"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder='Skill, for example "Organizational skills"'
                    ref={skillsRef}
                />

                {skills && (
                    <ul className={styles['form__skills-saved']}>
                        {skills.map((item, i) => (
                            <li
                                className={styles['form__skill']}
                                key={item + i}
                            >
                                <span className={styles['form__skill-text']}>
                                    {item}
                                </span>

                                <CloseButton
                                    onClick={() => deleteSkill(item)}
                                    size={18}
                                    customIconClass={
                                        styles['form__skill-delete']
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                )}

                <DropDownList
                    list={[skillInput]}
                    showDropDown={!!skillInput}
                    handleSetValue={handleSetSkill}
                    topMargin={84}
                />
            </div>

            <div className={styles.form__about}>
                <label
                    className={styles['form__label-title']}
                    htmlFor="about_me"
                >
                    About me
                </label>

                <textarea
                    className={styles.form__textarea}
                    id="about_me"
                    {...register('about_me', {
                        required: true,
                    })}
                />
            </div>

            <div className={styles.form__education}>
                <h2 className={styles['form__education-title']}>Education</h2>

                {educationFields.map((field, i) => {
                    if (!degreeRefs.current[i]) {
                        degreeRefs.current[i] = createRef<HTMLButtonElement>();
                    }

                    return (
                        <div
                            className={styles['form__education-fields']}
                            key={field.id}
                        >
                            {!!i && ( // Don't show remove button for the first item
                                <div
                                    className={styles['form__education-remove']}
                                >
                                    <CloseButton
                                        onClick={() => educationRemove(i)}
                                        customIconClass={
                                            styles['form__remove-icon']
                                        }
                                        ariaLabel="Remove education"
                                        title="Remove education"
                                    />
                                </div>
                            )}
                            <div
                                className={
                                    styles['form__education-institution']
                                }
                            >
                                <label
                                    className={styles['form__label-title']}
                                    htmlFor={`institution-${i}`}
                                >
                                    Institute
                                </label>

                                <input
                                    type="text"
                                    className={styles.form__input}
                                    id={`institution-${i}`}
                                    {...register(`education.${i}.institution`, {
                                        required: true,
                                    })}
                                    placeholder="Oxford University"
                                />
                            </div>

                            <LocationInput<IResumeForm>
                                register={register}
                                setValue={setValue}
                                watch={watch}
                                customLabelClass={styles.form__label}
                                customInputClass={styles.form__input}
                                placeholder="City"
                                name={`education.${i}.location`}
                                label="Institute Location"
                                icon={false}
                                required={true}
                            />

                            <CustomSelect<TEducationDegree, IResumeForm>
                                name={`education.${i}.degree`}
                                control={control}
                                options={educationDegree}
                                customSelectClass={styles.form__input}
                                customSelectWrapperClass={styles.form__label}
                                label="Education Degree"
                                required={true}
                                customSelectRef={degreeRefs.current[i]}
                            />

                            <div
                                className={
                                    styles['form__education-field-of-study']
                                }
                            >
                                <label
                                    className={styles['form__label-title']}
                                    htmlFor={`field_of_study-${i}`}
                                >
                                    Field Of Study
                                </label>

                                <input
                                    type="text"
                                    className={styles.form__input}
                                    id={`field_of_study-${i}`}
                                    {...register(
                                        `education.${i}.field_of_study`,
                                        {
                                            required: true,
                                        }
                                    )}
                                    placeholder="Biomedical Engineering"
                                />
                            </div>

                            <div
                                className={
                                    styles['form__education-field-of-study']
                                }
                            >
                                <label
                                    className={styles['form__label-title']}
                                    htmlFor={`graduation_year-${i}`}
                                >
                                    Graduation Year
                                </label>

                                <input
                                    type="number"
                                    className={styles.form__input}
                                    id={`graduation_year-${i}`}
                                    {...register(
                                        `education.${i}.graduation_year`,
                                        {
                                            required: true,
                                        }
                                    )}
                                    placeholder="2010"
                                />
                            </div>
                        </div>
                    );
                })}

                <div className={styles['form__education-btn']}>
                    <PrimaryButton
                        label="Add More"
                        onClick={() => educationAppend(emptyEducation)}
                        style={{ maxWidth: '150px' }}
                    />
                </div>
            </div>

            <div className={styles.form__experiences}>
                <h2 className={styles['form__experiences-title']}>
                    Work Experiences
                </h2>

                {workFields.map((field, i) => (
                    <div
                        className={styles['form__experiences-fields']}
                        key={field.id}
                    >
                        <div className={styles['form__experiences-remove']}>
                            <CloseButton
                                onClick={() => workRemove(i)}
                                customIconClass={styles['form__remove-icon']}
                                ariaLabel="Remove work experience"
                                title="Remove work experience"
                            />
                        </div>

                        <div
                            className={styles['form__experiences-institution']}
                        >
                            <label
                                className={styles['form__label-title']}
                                htmlFor={`company_name-${i}`}
                            >
                                Company Name
                            </label>

                            <input
                                type="text"
                                className={styles.form__input}
                                id={`company_name-${i}`}
                                {...register(
                                    `work_experiences.${i}.company_name`,
                                    {
                                        required: true,
                                    }
                                )}
                                placeholder="Apple"
                            />
                        </div>

                        <ProfessionInput<IResumeForm>
                            register={register}
                            setValue={setValue}
                            watch={watch}
                            customLabelClass={styles.form__label}
                            customInputClass={styles.form__input}
                            placeholder="Physiotherapist"
                            name={`work_experiences.${i}.position`}
                            label="Position"
                            icon={false}
                            required={true}
                        />

                        <LocationInput<IResumeForm>
                            register={register}
                            setValue={setValue}
                            watch={watch}
                            customLabelClass={styles.form__label}
                            customInputClass={styles.form__input}
                            placeholder="City"
                            name={`work_experiences.${i}.location`}
                            label="Location"
                            icon={false}
                            required={true}
                        />

                        <div className={styles['form__experiences-dates']}>
                            <div className={styles['form__experiences-date']}>
                                <label
                                    className={styles['form__label-title']}
                                    htmlFor={`start_date-${i}`}
                                >
                                    Start Date
                                </label>

                                <input
                                    className={styles.form__input}
                                    type="date"
                                    id={`start_date-${i}`}
                                    {...register(
                                        `work_experiences.${i}.start_date`,
                                        {
                                            required: true,
                                        }
                                    )}
                                />
                            </div>

                            <div className={styles['form__experiences-date']}>
                                <label
                                    className={styles['form__label-title']}
                                    htmlFor={`end_date-${i}`}
                                >
                                    End Date
                                </label>

                                <input
                                    className={styles.form__input}
                                    type="date"
                                    id={`end_date-${i}`}
                                    {...register(
                                        `work_experiences.${i}.end_date`
                                    )}
                                />
                            </div>
                        </div>

                        <div className={styles.form__about}>
                            <label
                                className={styles['form__label-title']}
                                htmlFor={`workDescription-${i}`}
                            >
                                Work Description
                            </label>

                            <textarea
                                className={styles.form__textarea}
                                id={`workDescription-${i}`}
                                {...register(
                                    `work_experiences.${i}.description`,
                                    {
                                        required: true,
                                    }
                                )}
                            />
                        </div>
                    </div>
                ))}

                <div className={styles['form__education-btn']}>
                    <PrimaryButton
                        label={`${
                            !workFields.length
                                ? 'Add Work Experience'
                                : 'Add More'
                        }`}
                        onClick={() => workAppend(emptyWorkExperiences)}
                        style={{ maxWidth: 'max-content', minWidth: '150px' }}
                    />
                </div>
            </div>

            <div className={styles.form__buttons}>
                <PrimaryButton
                    label={`${type === 'create' ? 'Create' : 'Edit'} Resume`}
                    ariaLabel={`${type} Resume`}
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
                        ariaLabel="Cancel resume change"
                        onClick={handleCancelEdit}
                    />
                )}
            </div>
        </form>
    );
};

export default ResumeForm;
