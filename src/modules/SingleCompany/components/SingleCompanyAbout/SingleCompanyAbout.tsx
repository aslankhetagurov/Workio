import styles from './SingleCompanyAbout.module.scss';

interface SingleCompanyAboutProps {
    companyAbout: string | null;
}

const SingleCompanyAbout = ({ companyAbout }: SingleCompanyAboutProps) => {
    if (!companyAbout) return null;

    return (
        <section className={styles.about}>
            <h2 className={styles.about__title}>About the Company</h2>
            <p className={styles.about__text}>{companyAbout}</p>
        </section>
    );
};

export default SingleCompanyAbout;
