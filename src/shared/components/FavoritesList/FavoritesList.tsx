import MainHeader from '@/shared/UI/MainHeader/MainHeader';
import Spinner from '@/shared/UI/Spinner/Spinner';
import ErrorComponent from '@/shared/UI/ErrorComponent/ErrorComponent';
import styles from './FavoritesList.module.scss';
import { JSX } from 'react';

interface IFavoritesListProps {
    error: unknown;
    list: JSX.Element[];
    isFetching: boolean;
    isSuccess: boolean;
    title: string;
    type: 'resumes' | 'vacancies' | 'companies';
}

const FavoritesList = ({
    error,
    list,
    isFetching,
    isSuccess,
    title,
    type,
}: IFavoritesListProps) => {
    if (error)
        return (
            <ErrorComponent
                errorMessage={`Faild to fetch favorites ${type}!`}
            />
        );

    return (
        <section>
            <MainHeader title={title} />

            <main className={styles.favorites}>
                {isFetching ? (
                    <div role="status" aria-busy="true" aria-live="polite">
                        <Spinner />
                    </div>
                ) : !list?.length && isSuccess ? (
                    <p>{`No selected ${type} yet...`}</p>
                ) : (
                    <ul className={styles.favorites__list}>{list}</ul>
                )}
            </main>
        </section>
    );
};

export default FavoritesList;
