import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import { useAuth } from '../../hooks/useAuth';
import { selectAuthModalIsOpen } from '../../store/authSlice';
import { useAppSelector } from '@/store/hooks';
import styles from './AuthForm.module.scss';

interface IFormInputs {
    fullName: string;
    email: string;
    password: string;
    role: 'employer' | 'applicant';
}

type TMode = 'logIn' | 'signUp';

const AuthForm = () => {
    const [mode, setMode] = useState<TMode>('logIn');
    const [toggleShowPassword, setToggleShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<IFormInputs>({
        mode: 'onBlur',
    });

    const { handleAuth, isLoading } = useAuth();
    const modalIsOpen = useAppSelector(selectAuthModalIsOpen);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const fullNameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        reset();

        if (mode === 'signUp') {
            fullNameInputRef.current?.focus();
        } else {
            emailInputRef.current?.focus();
        }
    }, [modalIsOpen, mode]);

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        const { email, password, fullName, role } = data;
        handleAuth(mode, { email, password, fullName, role });
    };

    const handleToggleShowPassword = () =>
        setToggleShowPassword((prev) => !prev);

    const handleSetMode = (mode: TMode) => {
        reset();
        setMode(mode);
    };

    return (
        <div className={styles.auth}>
            <h2 className={styles.auth__title}>
                {mode === 'logIn'
                    ? 'Log in to Workio'
                    : 'Create a Workio account'}
            </h2>

            <div className={styles['auth__mode-buttons']}>
                <button
                    className={`${styles['auth__mode-button']} ${
                        mode === 'logIn'
                            ? styles['auth__mode-button-active']
                            : ''
                    }`}
                    onClick={() => handleSetMode('logIn')}
                    type="button"
                >
                    Log In
                </button>

                <button
                    className={`${styles['auth__mode-button']} ${
                        mode === 'signUp'
                            ? styles['auth__mode-button-active']
                            : ''
                    }`}
                    onClick={() => handleSetMode('signUp')}
                    type="button"
                >
                    Sign Up
                </button>
            </div>

            <form
                className={styles.auth__form}
                onSubmit={handleSubmit(onSubmit)}
            >
                {mode === 'signUp' && (
                    <div className={styles['auth__input-wrapper']}>
                        <label htmlFor="fullName">Full Name</label>

                        <input
                            id="fullName"
                            className={styles.auth__input}
                            placeholder="Daniel Smith"
                            aria-invalid={!!errors.fullName}
                            aria-describedby="fullName-error"
                            {...register('fullName', {
                                required: true,
                                pattern: /^[\p{L}]+(\s[\p{L}]+)+$/u,
                                minLength: 3,
                            })}
                            ref={(e) => {
                                register('fullName').ref(e);
                                fullNameInputRef.current = e;
                            }}
                        />

                        {errors.fullName && (
                            <span
                                id="fullName-error"
                                className={styles['auth__form-error']}
                            >
                                {errors.fullName.type === 'required'
                                    ? 'This field is required'
                                    : errors.fullName.type === 'pattern'
                                      ? 'Enter at least two words (letters only)'
                                      : errors.fullName.type === 'minLength'
                                        ? 'Min 3 characters'
                                        : ''}
                            </span>
                        )}
                    </div>
                )}

                <div className={styles['auth__input-wrapper']}>
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        className={styles.auth__input}
                        placeholder="example@gmail.com"
                        aria-invalid={!!errors.email}
                        aria-describedby="email-error"
                        {...register('email', {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                        })}
                        ref={(e) => {
                            register('email').ref(e);
                            emailInputRef.current = e;
                        }}
                    />

                    {errors.email && (
                        <span
                            id="email-error"
                            className={styles['auth__form-error']}
                        >
                            {errors.email.type === 'required'
                                ? 'This field is required'
                                : errors.email.type === 'pattern'
                                  ? 'Invalid email address'
                                  : ''}
                        </span>
                    )}
                </div>

                <div className={styles['auth__input-wrapper']}>
                    <label htmlFor="password">Password</label>

                    <div className={styles['auth__password-wrapper']}>
                        <input
                            id="password"
                            className={`${styles.auth__input} ${styles.auth__password}`}
                            type={toggleShowPassword ? 'text' : 'password'}
                            aria-invalid={!!errors.password}
                            aria-describedby="password-error"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern:
                                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
                            })}
                        />

                        <button
                            className={styles['auth__form-eye']}
                            onClick={handleToggleShowPassword}
                            type="button"
                            aria-label="Toggle password visibility"
                        >
                            {toggleShowPassword ? (
                                <FaRegEyeSlash />
                            ) : (
                                <FaRegEye />
                            )}
                        </button>
                    </div>

                    {errors.password && (
                        <span
                            id="password-error"
                            className={styles['auth__form-error']}
                        >
                            {errors.password.type === 'required'
                                ? 'This field is required'
                                : errors.password.type === 'pattern'
                                  ? 'Password must be 6-20 characters long and contain at least one letter and one number'
                                  : ''}
                        </span>
                    )}
                </div>

                {mode === 'signUp' && (
                    <div className={styles['auth__input-wrapper']}>
                        <label htmlFor="role">Select Role</label>

                        <select
                            id="role"
                            className={styles.auth__select}
                            aria-describedby="role-error"
                            {...register('role', { required: true })}
                        >
                            <option value="" hidden>
                                -- Select Role --
                            </option>
                            <option value="applicant">Applicant</option>
                            <option value="employer">Employer</option>
                        </select>

                        {errors.role?.type === 'required' && (
                            <span
                                id="role-error"
                                className={styles['auth__form-error']}
                            >
                                This field is required
                            </span>
                        )}
                    </div>
                )}

                <PrimaryButton
                    label={mode === 'logIn' ? 'Log In' : 'Sign Up'}
                    type="submit"
                    ariaLabel={mode === 'logIn' ? 'Log In' : 'Sign Up'}
                    isLoading={isLoading}
                    disabled={isSubmitting}
                />
            </form>
        </div>
    );
};

export default AuthForm;
