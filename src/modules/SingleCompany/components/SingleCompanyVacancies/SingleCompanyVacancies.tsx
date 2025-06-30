import { VacancyWithCompany } from '@/shared/types/database.types';
import styles from './SingleCompanyVacancies.module.scss';
import VacancyItem from '@/shared/UI/VacancyItem/VacancyItem';

interface SingleCompanyVacanciesProps {
    vacancies: VacancyWithCompany[];
}

const SingleCompanyVacancies = ({ vacancies }: SingleCompanyVacanciesProps) => {
    if (!vacancies.length)
        return (
            <section>
                <h2 className={styles.vacancies__title}>Company Vacancies</h2>
                <p role="status">No vacancies yet...</p>;
            </section>
        );

    return (
        <section className={styles.vacancies}>
            <h2 className={styles.vacancies__title}>Company Vacancies</h2>

            <ul className={styles.vacancies__list}>
                {vacancies.map((vacancy) => (
                    <VacancyItem data={vacancy} key={vacancy.id} />
                ))}
            </ul>
        </section>
    );
};

export default SingleCompanyVacancies;
