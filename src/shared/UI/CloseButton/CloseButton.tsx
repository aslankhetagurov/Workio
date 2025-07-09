import { FaWindowClose } from 'react-icons/fa';

import styles from './CloseButton.module.scss';

interface ICloseButtonProps {
    onClick: () => void;
    size?: number;
    customIconClass?: string;
    ariaLabel?: string;
    title?: string;
}

const CloseButton = ({
    onClick,
    size = 26,
    customIconClass,
    ariaLabel,
    title,
}: ICloseButtonProps) => {
    return (
        <div className={styles['close-button__wrapper']}>
            <button
                className={styles['close-button']}
                onClick={onClick}
                type="button"
                aria-label={ariaLabel || 'Close button'}
                title={title || ''}
            >
                <FaWindowClose
                    className={`${styles['close-button__icon']} ${
                        customIconClass ?? ''
                    }`}
                    style={{ fontSize: `${size}px` }}
                />
            </button>
        </div>
    );
};

export default CloseButton;
