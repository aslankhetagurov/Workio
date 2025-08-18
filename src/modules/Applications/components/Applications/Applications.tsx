import ApplicationsList from '../ApplicationsList/ApplicationsList';
import MainHeader from '@/shared/UI/MainHeader/MainHeader';

export const Applications = () => {
    return (
        <section>
            <MainHeader title="Applications" />

            <main>
                <ApplicationsList />
            </main>
        </section>
    );
};
