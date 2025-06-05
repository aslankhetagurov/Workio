import VacanciesList from '../VacanciesList/VacanciesList';
import VacanciesSearchForm from '../VacanciesSearchForm/VacanciesSearchForm';
import styles from './Vacancies.module.scss';

export const Vacancies = () => {
    return (
        <section className={styles.vacancies}>
            <div className={styles.vacancies__header}>
                <h1 className={styles.vacancies__title}>Vacancies</h1>
            </div>
            <main className={styles.vacancies__main}>
                <aside className={styles.vacancies__form} role="search">
                    <VacanciesSearchForm />
                </aside>

                <div className={styles.vacancies__results}>
                    <VacanciesList />
                </div>
            </main>
        </section>
    );
};
