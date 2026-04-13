import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Menu.module.scss';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? `${styles.menu__link} ${styles.menu__link_active}`
            : styles.menu__link;

    return (
        <nav className={styles.menu} aria-label="Main navigation">
            <button
                className={`${styles['menu__burger']} ${isOpen ? styles['menu__burger_close'] : ''}`}
                onClick={toggleMenu}
            >
                <span
                    className={`${styles['menu__burger-line']} ${isOpen ? styles['menu__burger-line_close-one'] : ''}`}
                ></span>
                <span
                    className={`${styles['menu__burger-line']} ${isOpen ? styles['menu__burger-line_close-two'] : ''}`}
                ></span>
                <span
                    className={`${styles['menu__burger-line']} ${isOpen ? styles['menu__burger-line_close-three'] : ''}`}
                ></span>
            </button>

            <ul
                className={`${styles.menu__list} ${isOpen ? styles.menu__list_open : ''}`}
                onClick={toggleMenu}
            >
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
