import { useEffect, useState } from 'react';

import CloseButton from '@/UI/CloseButton/CloseButton';
import styles from './PromoVideoModal.module.scss';

interface IPromoVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PromoVideoModal = ({ isOpen, onClose }: IPromoVideoModalProps) => {
    const [videoKey, setVideoKey] = useState(1); // To stop the video when the modal window is closed

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
            setVideoKey((prev) => prev + 1);
        };
    }, [isOpen]);

    return (
        <div
            className={`${styles.overlay} ${isOpen && styles.overlay_show}`}
            onClick={onClose}
        >
            <div className={styles['btn-wrapper']}>
                <CloseButton onClick={onClose} />
            </div>

            <div
                className={`${styles.modal} ${isOpen && styles.modal_show}`}
                role="dialog"
                aria-modal="true"
            >
                <iframe
                    key={videoKey}
                    className={styles.modal__iframe}
                    src="https://share.synthesia.io/embeds/videos/8b659619-035b-4bfb-8ece-fe0f85c82d01"
                    loading="lazy"
                    title="Promo video"
                    allow="encrypted-media; fullscreen"
                />
            </div>
        </div>
    );
};

export default PromoVideoModal;
