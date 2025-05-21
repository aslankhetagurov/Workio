import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { TbFaceIdError } from 'react-icons/tb';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';

const NotFoundPage = () => {
    return (
        <div className={styles['not-found-page']}>
            <TbFaceIdError className={styles['not-found-page__icon']} />
            <h1 className={styles['not-found-page__title']}>
                404 — Page Not Found
            </h1>
            <p className={styles['not-found-page__text']}>
                Unfortunately, this page does not exist.
            </p>

            <Link to="/" className={styles['not-found-page__link']}>
                <PrimaryButton label=" Go back to the homepage" />
            </Link>
        </div>
    );
};

export default NotFoundPage;
