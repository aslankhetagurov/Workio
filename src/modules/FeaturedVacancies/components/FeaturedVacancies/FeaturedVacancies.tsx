import { ChangeEvent, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { jobCategories, TJobCategories } from '@/consts/jobCategories';
import { useGetFeaturedVacanciesQuery } from '../../api/featuredVacanciesApi';
import VacancyItem from '@/UI/VacancyItem/VacancyItem';
import styles from './FeaturedVacancies.module.scss';
import Spinner from '@/UI/Spinner/Spinner';

export const FeaturedVacancies = () => {
    const [category, setCategory] = useState<TJobCategories>('All categories');

    const {
        data: vacancies,
        isLoading,
        error,
        isError,
    } = useGetFeaturedVacanciesQuery(category);

    if (isError) {
        console.error('Error loading featured vacancies:', error);
        return null;
    }

    if (!vacancies) return null;

    const handleSetCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as TJobCategories;
        setCategory(value);
    };

    return (
        <section className={styles['featured-vacancies']}>
            <div className={styles['featured-vacancies__top']}>
                <div className={styles['featured-vacancies__titles']}>
                    <h3 className={styles['featured-vacancies__title']}>
                        Featured Vacancies
                    </h3>
                    <span className={styles['featured-vacancies__subtitle']}>
                        Explore top recent vacancies
                    </span>
                </div>

                <div
                    className={styles['featured-vacancies__categories-wrapper']}
                >
                    <span id="category-label" className="sr-only">
                        Select a job category
                    </span>

                    <select
                        aria-labelledby="category-label"
                        className={styles['featured-vacancies__categories']}
                        value={category}
                        onChange={handleSetCategory}
                    >
                        {jobCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <IoIosArrowDown
                        className={
                            styles['featured-vacancies__categories-icon']
                        }
                        aria-hidden="true"
                        focusable="false"
                    />
                </div>
            </div>

            <ul className={styles['featured-vacancies__list']}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    vacancies.map((data) => (
                        <VacancyItem key={data.id} data={data} />
                    ))
                )}
            </ul>
        </section>
    );
};
