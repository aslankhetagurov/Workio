import EmployerVacanciesList from '../EmployerVacanciesList/EmployerVacanciesList';
import styles from './EmployerVacancies.module.scss';

export const EmployerVacancies = () => {
    return (
        <section className={styles.vacancies}>
            <header className={styles.vacancies__header}>
                <h1 className={styles.vacancies__title}>My Vacancies</h1>
            </header>

            <main>
                <EmployerVacanciesList />
            </main>
        </section>
    );
};
