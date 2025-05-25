import { CSSProperties, FC } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import styles from './PrimaryButton.module.scss';

interface PrimaryButtonProps {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    ariaLabel?: string;
    isLoading?: boolean;
    style?: CSSProperties;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
    label,
    onClick,
    disabled = false,
    type = 'button',
    ariaLabel = label,
    isLoading = false,
    style,
}) => {
    return (
        <button
            type={type}
            aria-label={ariaLabel}
            onClick={onClick}
            disabled={disabled}
            className={`${styles['primary-button']} ${
                label === 'Reset' ? styles['primary-button-reset'] : ''
            }`}
            style={style}
        >
            {isLoading ? (
                <ImSpinner2 className={styles['primary-button__spinner']} />
            ) : (
                label
            )}
        </button>
    );
};

export default PrimaryButton;
