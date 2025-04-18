import {
    FaSquareFacebook,
    FaXTwitter,
    FaSquareInstagram,
    FaYoutube,
} from 'react-icons/fa6';

import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.footer__copyright}>
                © 2025 Workio. All rights reserved.
            </p>

            <ul className={styles.footer__socials} aria-label="Social list">
                <li className={styles['footer__social-item']}>
                    <a
                        className={styles['footer__social-link']}
                        href="#"
                        aria-label="Twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaXTwitter />
                    </a>
                </li>
                <li className={styles['footer__social-item']}>
                    <a
                        className={styles['footer__social-link']}
                        href="#"
                        aria-label="Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaSquareInstagram />
                    </a>
                </li>
                <li className={styles['footer__social-item']}>
                    <a
                        className={styles['footer__social-link']}
                        href="#"
                        aria-label="Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaSquareFacebook />
                    </a>
                </li>
                <li className={styles['footer__social-item']}>
                    <a
                        className={styles['footer__social-link']}
                        href="#"
                        aria-label="Youtube"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaYoutube />
                    </a>
                </li>
            </ul>
        </footer>
    );
};
