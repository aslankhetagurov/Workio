import VacancyForm from '@/shared/components/VacancyForm/VacancyForm';
import styles from './VacancyEditing.module.scss';

export const VacancyEditing = () => {
    return (
        <section className={styles.vacancy}>
            <header className={styles.vacancy__header}>
                <h1 className={styles.vacancy__title}>Edit the Vacancy</h1>
            </header>

            <main className={styles.vacancy__main}>
                <VacancyForm type="edit" />
            </main>
        </section>
    );
};
