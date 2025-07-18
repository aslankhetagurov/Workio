import { MouseEvent, ReactNode, useEffect } from 'react';

import CloseButton from '@/shared/UI/CloseButton/CloseButton';
import styles from './Modal.module.scss';

const stopPropagation = (e: MouseEvent) => e.stopPropagation();

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: IModalProps) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
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
            className={`${styles.overlay} ${isOpen && styles.overlay_show}`}
            onClick={onClose}
        >
            <div
                className={`${styles.modal} ${isOpen && styles.modal_show}`}
                onClick={stopPropagation}
            >
                <CloseButton onClick={onClose} />
                {children}
            </div>
        </div>
    );
};

export default Modal;
