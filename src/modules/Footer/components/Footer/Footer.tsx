import { Socials } from '@/shared/UI/Socials/Socials';
import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.footer__copyright}>
                © 2025 Workio. All rights reserved.
            </p>

            <Socials />
        </footer>
    );
};
