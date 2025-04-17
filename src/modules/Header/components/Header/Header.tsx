import { Link } from 'react-router-dom';

import Menu from '../Menu/Menu';
import logo from '../../../../assets/logo.webp';
import styles from './Header.module.scss';

export const Header = () => {
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
            <div className={styles.header__auth}>
                <button
                    className={styles['header__auth-btn']}
                    aria-label="Log in or sign up"
                >
                    Log In / Sign Up
                </button>
            </div>
        </header>
    );
};
