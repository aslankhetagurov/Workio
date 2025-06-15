import { TbFaceIdError } from 'react-icons/tb';

import styles from './ErrorComponent.module.scss';

interface ErrorComponentProps {
    errorMessage: string;
}

const ErrorComponent = ({ errorMessage }: ErrorComponentProps) => {
    return (
        <div className={styles.error}>
            <TbFaceIdError className={styles.error__icon} />
            <h1 className={styles.error__title}>{errorMessage}</h1>
            <p className={styles.error__text}>Please try again later...</p>
        </div>
    );
};

export default ErrorComponent;
