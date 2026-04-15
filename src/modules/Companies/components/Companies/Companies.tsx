import CompaniesSearchForm from '@/modules/Companies/components/CompaniesSearchForm/CompaniesSearchForm';
import CompaniesList from '../CompaniesList/CompaniesList';
import MainHeader from '@/shared/UI/MainHeader/MainHeader';
import styles from './Companies.module.scss';

export const Companies = () => {
    return (
        <section className={styles.companies}>
            <MainHeader title="Companies" />

            <div className={styles.companies__main}>
                <CompaniesSearchForm />

                <div className={styles.companies__results}>
                    <CompaniesList />
                </div>
            </div>
        </section>
    );
};
