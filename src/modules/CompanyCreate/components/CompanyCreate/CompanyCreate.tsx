import CompanyCreateForm from '../CompanyCreateForm/CompanyCreateForm';
import styles from './CompanyCreate.module.scss';

export const CompanyCreate = () => {
    return (
        <section className={styles.company}>
            <header className={styles.company__header}>
                <h1 className={styles.company__title}>Create a company</h1>
            </header>

            <main>
                <CompanyCreateForm />
            </main>
        </section>
    );
};
