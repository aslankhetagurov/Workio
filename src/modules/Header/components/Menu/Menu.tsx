import { NavLink } from 'react-router-dom';

import styles from './Menu.module.scss';

const Menu = () => {
    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? `${styles.menu__link} ${styles.menu__link_active}`
            : styles.menu__link;

    return (
        <nav className={styles.menu} aria-label="Main navigation">
            <ul className={styles.menu__list}>
                <li className={styles.menu__item}>
                    <NavLink to="/" className={getLinkClass}>
                        Home
                    </NavLink>
                </li>
                <li className={styles.menu__item}>
                    <NavLink to="/about" className={getLinkClass}>
                        About
                    </NavLink>
                </li>
                <li className={styles.menu__item}>
                    <NavLink to="/vacancies" className={getLinkClass}>
                        Vacancies
                    </NavLink>
                </li>
                <li className={styles.menu__item}>
                    <NavLink to="/companies" className={getLinkClass}>
                        Companies
                    </NavLink>
                </li>
                <li className={styles.menu__item}>
                    <NavLink to="/resumes" className={getLinkClass}>
                        Resumes
                    </NavLink>
                </li>
                <li className={styles.menu__item}>
                    <NavLink to="/contact" className={getLinkClass}>
                        Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
