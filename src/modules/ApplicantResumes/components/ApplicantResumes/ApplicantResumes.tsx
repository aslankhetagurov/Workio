import ApplicantResumesList from '../ApplicantResumesList/ApplicantResumesList';
import styles from './ApplicantResumes.module.scss';

export const ApplicantResumes = () => {
    return (
        <section className={styles.resumes}>
            <header className={styles.resumes__header}>
                <h1 className={styles.resumes__title}>My Resumes</h1>
            </header>

            <main>
                <ApplicantResumesList />
            </main>
        </section>
    );
};
