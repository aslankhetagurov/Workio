import { ChangeEvent, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';

import {
    jobCategories,
    TJobCategoriesWithAll,
} from '@/shared/consts/jobCategories';
import { useGetFeaturedVacanciesQuery } from '../../api/featuredVacanciesApi';
import VacancyItem from '@/shared/UI/VacancyItem/VacancyItem';
import Spinner from '@/shared/UI/Spinner/Spinner';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import styles from './FeaturedVacancies.module.scss';

export const FeaturedVacancies = () => {
    const [category, setCategory] =
        useState<TJobCategoriesWithAll>('All categories');

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
        const value = e.target.value as TJobCategoriesWithAll;
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
                        <option key="All categories" value="All categories">
                            All categories
                        </option>
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

            <Link
                className={styles['featured-vacancies__link-all']}
                to="/vacancies"
            >
                <PrimaryButton label="Show All" />
            </Link>
        </section>
    );
};
