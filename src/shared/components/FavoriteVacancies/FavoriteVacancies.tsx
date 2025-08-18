import { useGetFavoriteVacanciesQuery } from '@/modules/Vacancies';
import { useAppSelector } from '@/store/hooks';
import { selectUserData } from '@/modules/Auth';
import VacancyItem from '@/shared/UI/VacancyItem/VacancyItem';
import MainHeader from '@/shared/UI/MainHeader/MainHeader';
import Spinner from '@/shared/UI/Spinner/Spinner';
import ErrorComponent from '@/shared/UI/ErrorComponent/ErrorComponent';
import styles from './FavoriteVacancies.module.scss';

const FavoriteVacancies = () => {
    const user = useAppSelector(selectUserData);

    const {
        data: favoriteVacancies,
        error,
        isFetching,
        isSuccess,
    } = useGetFavoriteVacanciesQuery(user?.id ?? '', { skip: !user });

    if (error)
        return (
            <ErrorComponent errorMessage="Faild to fetch favorite vacancies!" />
        );

    const renderContent = () =>
        favoriteVacancies?.map((vacancy) => (
            <VacancyItem data={vacancy.vacancies} key={vacancy.id} />
        ));

    return (
        <section>
            <MainHeader title="Favorite Vacancies" />

            <main className={styles.vacancies__main}>
                {isFetching ? (
                    <div role="status" aria-busy="true" aria-live="polite">
                        <Spinner />
                    </div>
                ) : !favoriteVacancies?.length && isSuccess ? (
                    <p>No selected vacancies yet...</p>
                ) : (
                    <ul className={styles.vacancies__list}>
                        {renderContent()}
                    </ul>
                )}
            </main>
        </section>
    );
};

export default FavoriteVacancies;
