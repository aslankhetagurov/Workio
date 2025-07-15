import ResumeCreationForm from '../ResumeCreationForm/ResumeCreationForm';
import styles from './ResumeCreation.module.scss';

export const ResumeCreation = () => {
    return (
        <section className={styles.resume}>
            <header className={styles.resume__header}>
                <h1 className={styles.resume__title}>Create a New Resume</h1>
            </header>

            <main className={styles.resume__main}>
                <ResumeCreationForm />
            </main>
        </section>
    );
};
