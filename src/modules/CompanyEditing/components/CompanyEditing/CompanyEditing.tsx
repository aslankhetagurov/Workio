import CompanyForm from '@/shared/components/CompanyForm/CompanyForm';
import MainHeader from '@/shared/UI/MainHeader/MainHeader';

export const CompanyEditing = () => {
    return (
        <section>
            <MainHeader title="Edit a Company" />

            <main>
                <CompanyForm type="edit" />
            </main>
        </section>
    );
};
