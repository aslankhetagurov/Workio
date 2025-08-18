import { toast } from 'sonner';
import { GoHeartFill } from 'react-icons/go';
import { VacancyWithCompany } from '@/shared/types/database.types';
import logo from '@/shared/assets/images/company-logo.webp';
import { useAppSelector } from '@/store/hooks';
import { selectUserData } from '@/modules/Auth';
import {
    useGetFavoriteVacanciesQuery,
    useToggleFavoriteVacancyMutation,
} from '@/modules/Vacancies';
import styles from './SingleVacancyHeader.module.scss';

interface SingleVacancyHeaderProps {
    data: VacancyWithCompany;
}

const SingleVacancyHeader = ({ data }: SingleVacancyHeaderProps) => {
    const user = useAppSelector(selectUserData);
    const [toggleFavoriteVacancy] = useToggleFavoriteVacancyMutation();
    const { data: favoriteVacancies } = useGetFavoriteVacanciesQuery(
        user?.id ?? '',
        { skip: !user }
    );

    if (!data || !user) return null;

    const isFavorite = favoriteVacancies?.some(
        (vacancy) => vacancy.vacancy_id === data.id
    );

    const handleToggleFavoriteVacancy = async () => {
        try {
            const { status } = await toggleFavoriteVacancy({
                vacancy_id: data.id,
                user_id: user.id,
            }).unwrap();

            toast.success(
                status === 'added'
                    ? 'Vacancy added to favorites'
                    : 'Vacancy removed from favorites'
            );
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to toggle favorite status'
            );
        }
    };

    return (
        <header className={styles.header}>
            <img
                className={styles.header__logo}
                src={data.companies?.logo_url || logo}
                alt={
                    data.companies?.name
                        ? `${data.companies.name} logo`
                        : 'Company logo'
                }
            />

            <h3
                className={styles.header__title}
                aria-label="Vacancy title"
                id="vacancy-heading"
            >
                {data.title}
            </h3>

            {user?.role === 'applicant' && (
                <div className={styles.header__buttons}>
                    <button
                        className={
                            isFavorite
                                ? styles['header__favorite-active']
                                : styles.header__favorite
                        }
                        aria-label="Save vacancy to bookmarks"
                        type="button"
                        onClick={handleToggleFavoriteVacancy}
                    >
                        <GoHeartFill />
                    </button>
                </div>
            )}
        </header>
    );
};

export default SingleVacancyHeader;
