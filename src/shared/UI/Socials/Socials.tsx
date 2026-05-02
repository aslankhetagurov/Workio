import {
    FaSquareFacebook,
    FaXTwitter,
    FaSquareInstagram,
    FaYoutube,
} from 'react-icons/fa6';

import styles from './Socials.module.scss';

export const Socials = () => {
    return (
        <ul className={styles.socials} aria-label="Social list">
            <li className={styles.socials__item}>
                <a
                    className={styles.socials__link}
                    href="#"
                    aria-label="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaXTwitter />
                </a>
            </li>
            <li className={styles.socials__item}>
                <a
                    className={styles.socials__link}
                    href="#"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaSquareInstagram />
                </a>
            </li>
            <li className={styles.socials__item}>
                <a
                    className={styles.socials__link}
                    href="#"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaSquareFacebook />
                </a>
            </li>
            <li className={styles.socials__item}>
                <a
                    className={styles.socials__link}
                    href="#"
                    aria-label="Youtube"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaYoutube />
                </a>
            </li>
        </ul>
    );
};
