import { selectUserData } from '@/modules/Auth';
import { useGetFavoriteVacanciesQuery } from '@/modules/Vacancies';
import FavoritesList from '@/shared/components/FavoritesList/FavoritesList';
import VacancyItem from '@/shared/UI/VacancyItem/VacancyItem';
import { useAppSelector } from '@/store/hooks';

const FavoriteVacanciesPage = () => {
    const user = useAppSelector(selectUserData);

    const {
        data: favoriteVacancies,
        error,
        isFetching,
        isSuccess,
    } = useGetFavoriteVacanciesQuery(user?.id ?? '', { skip: !user });

    const favoritesVacanciesList = favoriteVacancies?.map((vacancy) => (
        <VacancyItem data={vacancy.vacancies} key={vacancy.id} />
    ));

    return (
        <FavoritesList
            list={favoritesVacanciesList ?? []}
            isFetching={isFetching}
            isSuccess={isSuccess}
            error={error}
            title="Favorite Vacancies"
            type="vacancies"
        />
    );
};

export default FavoriteVacanciesPage;
