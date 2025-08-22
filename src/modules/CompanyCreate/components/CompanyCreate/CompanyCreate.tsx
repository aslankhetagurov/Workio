import CompanyForm from '@/shared/components/CompanyForm/CompanyForm';
import styles from './CompanyCreate.module.scss';
import MainHeader from '@/shared/UI/MainHeader/MainHeader';

export const CompanyCreate = () => {
    return (
        <section className={styles.company}>
            <MainHeader title="Create a Company" />

            <main>
                <CompanyForm type="create" />
            </main>
        </section>
    );
};
