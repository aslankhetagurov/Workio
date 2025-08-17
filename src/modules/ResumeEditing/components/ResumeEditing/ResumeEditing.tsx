import ResumeForm from '@/shared/components/ResumeForm/ResumeForm';
import MainHeader from '@/shared/UI/MainHeader/MainHeader';

export const ResumeEditing = () => {
    return (
        <section>
            <MainHeader title="Edit the Resume" />

            <main>
                <ResumeForm type="edit" />
            </main>
        </section>
    );
};
