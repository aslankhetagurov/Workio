import { CSSProperties, FC, JSX } from 'react';
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
    icon?: JSX.Element;
    isShowIcon?: boolean;
    redStyle?: boolean;
    greenStyle?: boolean;
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
    icon,
    isShowIcon,
    redStyle,
    greenStyle,
}) => {
    return (
        <button
            type={type}
            aria-label={ariaLabel}
            onClick={onClick}
            disabled={disabled}
            className={`${styles['primary-button']}  ${
                label === 'Reset' || label === 'Delete' || redStyle
                    ? styles['primary-button-reset']
                    : ''
            } ${active ? styles['primary-button-active'] : ''} ${
                className ?? ''
            } ${disabled ? styles['primary-button__disabled'] : ''} ${
                greenStyle ? styles['primary-button__green-style'] : ''
            }`}
            style={style}
        >
            {isLoading ? (
                <ImSpinner2 className={styles['primary-button__spinner']} />
            ) : (
                label
            )}

            {(counter || counter === 0) && (
                <span className={styles['primary-button__counter']}>
                    {counter}
                </span>
            )}

            {isShowIcon && (
                <span className={styles['primary-button__icon']}>{icon}</span>
            )}
        </button>
    );
};

export default PrimaryButton;
