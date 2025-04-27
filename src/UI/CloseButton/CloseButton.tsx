import { FaWindowClose } from 'react-icons/fa';

import styles from './CloseButton.module.scss';

interface ICloseButtonProps {
    onClick: () => void;
}

const CloseButton = ({ onClick }: ICloseButtonProps) => {
    return (
        <div className={styles['close-button__wrapper']}>
            <button
                className={styles['close-button']}
                onClick={onClick}
                type="button"
                aria-label="Close button"
            >
                <FaWindowClose className={styles['close-button__icon']} />
            </button>
        </div>
    );
};

export default CloseButton;
