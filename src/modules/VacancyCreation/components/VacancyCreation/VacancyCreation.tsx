import VacancyForm from '@/shared/components/VacancyForm/VacancyForm';
import styles from './VacancyCreation.module.scss';

export const VacancyCreation = () => {
    return (
        <section className={styles.vacancy}>
            <header className={styles.vacancy__header}>
                <h1 className={styles.vacancy__title}>Create a New Vacancy</h1>
            </header>

            <main className={styles.vacancy__main}>
                <VacancyForm type="create" />
            </main>
        </section>
    );
};
