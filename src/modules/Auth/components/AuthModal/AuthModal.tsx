import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AuthForm from '../AuthForm/AuthForm';
import { selectAuthModalIsOpen, toggleAuthModal } from '../../store/authSlice';
import CloseButton from '@/shared/UI/CloseButton/CloseButton';
import styles from './AuthModal.module.scss';

const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

export const AuthModal = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectAuthModalIsOpen);

    const handleModalShowToggle = () => dispatch(toggleAuthModal());

    useEffect(() => {
        if (!isOpen) return;

        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleModalShowToggle();
            }
        };
        window.addEventListener('keydown', handleEscKey);

        document.body.classList.add('body-scroll-lock');

        return () => {
            window.removeEventListener('keydown', handleEscKey);
            document.body.classList.remove('body-scroll-lock');
        };
    }, [isOpen]);

    return (
        <div
            className={`${styles['auth-modal-overlay']} ${
                isOpen && styles['auth-modal-overlay_show']
            }`}
            onClick={handleModalShowToggle}
        >
            <div
                className={`${styles['auth-modal']} ${
                    isOpen && styles['auth-modal_show']
                }`}
                onClick={stopPropagation}
            >
                <CloseButton onClick={handleModalShowToggle} />
                <AuthForm />
            </div>
        </div>
    );
};
