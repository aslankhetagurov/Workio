import { Link } from 'react-router-dom';

import Menu from '../Menu/Menu';
import logo from '@/shared/assets/images/logo.webp';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import { selectUserData, toggleAuthModal } from '@/modules/Auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import UserMenu from '../UserMenu/UserMenu';
import styles from './Header.module.scss';

export const Header = () => {
    const dispatch = useAppDispatch();

    const handleModalShowToggle = () => dispatch(toggleAuthModal());
    const userData = useAppSelector(selectUserData);

    return (
        <header className={styles.header}>
            <Link
                className={styles.header__logo}
                to="/"
                aria-label="Go to homepage"
            >
                <img
                    className={styles['header__logo-img']}
                    src={logo}
                    alt="Workio logo"
                />
                <h1 className={styles.header__title}>Workio</h1>
            </Link>

            <Menu />

            {userData ? (
                <UserMenu />
            ) : (
                <div className={styles.header__auth}>
                    <PrimaryButton
                        label="Log In / Sign Up"
                        ariaLabel="Log in or sign up"
                        onClick={handleModalShowToggle}
                    />
                </div>
            )}
        </header>
    );
};
