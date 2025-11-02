import { CiLocationOn, CiMobile3, CiMail } from 'react-icons/ci';

import styles from './ContactInfo.module.scss';

const ContactInfo = () => {
    return (
        <address className={styles.info}>
            <div className={styles.info__item}>
                <CiLocationOn
                    className={styles.info__icon}
                    aria-hidden="true"
                    focusable="false"
                />
                <p className={styles.info__title}>Address</p>
                <p>9500 Pines Blvd, Pembroke Pines, FL 33025, USA</p>
            </div>

            <div className={styles.info__item}>
                <CiMobile3
                    className={styles.info__icon}
                    aria-hidden="true"
                    focusable="false"
                />
                <p className={styles.info__title}>Phone</p>
                <a className={styles.info__text} href="tel:12234546575">
                    12234546575
                </a>
            </div>

            <div className={styles.info__item}>
                <CiMail
                    className={styles.info__icon}
                    aria-hidden="true"
                    focusable="false"
                />
                <p className={styles.info__title}>Email</p>
                <a
                    className={styles.info__text}
                    href="mailto:workio@workio.com"
                >
                    workio@workio.com
                </a>
            </div>
        </address>
    );
};

export default ContactInfo;
