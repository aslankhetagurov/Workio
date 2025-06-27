import CompaniesSearchForm from '@/modules/Companies/components/CompaniesSearchForm/CompaniesSearchForm';
import styles from './Companies.module.scss';
import CompaniesList from '../CompaniesList/CompaniesList';

export const Companies = () => {
    return (
        <section className={styles.companies}>
            <div className={styles.companies__header}>
                <h1 className={styles.companies__title}>Companies</h1>
            </div>
            <main className={styles.companies__main}>
                <aside className={styles.companies__form} role="search">
                    <CompaniesSearchForm />
                </aside>

                <div className={styles.companies__results}>
                    <CompaniesList />
                </div>
            </main>
        </section>
    );
};
