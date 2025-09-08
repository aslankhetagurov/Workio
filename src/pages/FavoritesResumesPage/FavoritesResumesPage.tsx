import { selectUserData } from '@/modules/Auth';
import { useGetFavoriteResumesQuery } from '@/modules/Resumes';
import FavoritesList from '@/shared/components/FavoritesList/FavoritesList';
import ResumeItem from '@/shared/UI/ResumeItem/ResumeItem';
import { useAppSelector } from '@/store/hooks';

const FavoritesResumesPage = () => {
    const user = useAppSelector(selectUserData);

    const {
        data: favoritesResumes,
        error,
        isFetching,
        isSuccess,
    } = useGetFavoriteResumesQuery(user?.id ?? '', { skip: !user });

    const favoritesResumesList = favoritesResumes?.map((resume) => (
        <ResumeItem data={resume.resumes} key={resume.id} />
    ));

    return (
        <FavoritesList
            list={favoritesResumesList ?? []}
            isFetching={isFetching}
            isSuccess={isSuccess}
            error={error}
            title="Favorite Resumes"
            type="resumes"
        />
    );
};

export default FavoritesResumesPage;
