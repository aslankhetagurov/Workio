import { ImSpinner2 } from 'react-icons/im';

import styles from './Spinner.module.scss';

const Spinner = () => {
    return (
        <div className={styles.spinner}>
            <ImSpinner2 className={styles.spinner__icon} />
        </div>
    );
};

export default Spinner;
