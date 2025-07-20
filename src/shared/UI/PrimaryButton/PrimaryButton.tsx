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
    active?: boolean;
    className?: string;
    counter?: number;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
    label,
    onClick,
    disabled = false,
    type = 'button',
    ariaLabel = label,
    isLoading = false,
    style,
    active = false,
    className,
    counter,
}) => {
    return (
        <button
            type={type}
            aria-label={ariaLabel}
            onClick={onClick}
            disabled={disabled}
            className={`${styles['primary-button']} ${
                label === 'Reset' || label === 'Delete'
                    ? styles['primary-button-reset']
                    : ''
            } ${active ? styles['primary-button-active'] : ''} ${
                className ?? ''
            }`}
            style={style}
        >
            {isLoading ? (
                <ImSpinner2 className={styles['primary-button__spinner']} />
            ) : (
                label
            )}
            {counter && (
                <span className={styles['primary-button__counter']}>
                    {counter}
                </span>
            )}
        </button>
    );
};

export default PrimaryButton;
