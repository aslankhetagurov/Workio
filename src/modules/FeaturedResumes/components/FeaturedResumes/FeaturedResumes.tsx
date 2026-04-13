import { ChangeEvent, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';

import {
    jobCategories,
    TJobCategoriesWithAll,
} from '@/shared/consts/jobCategories';
import Spinner from '@/shared/UI/Spinner/Spinner';
import { useGetFeaturedResumesQuery } from '../../api/featuredResumesApi';
import ResumeItem from '@/shared/UI/ResumeItem/ResumeItem';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import styles from './FeaturedResumes.module.scss';

export const FeaturedResumes = () => {
    const [category, setCategory] =
        useState<TJobCategoriesWithAll>('All categories');

    const {
        data: resumes,
        isLoading,
        error,
        isError,
    } = useGetFeaturedResumesQuery(category);

    if (isError) {
        console.error('Error loading featured resumes:', error);
        return null;
    }

    if (!resumes) return null;

    const handleSetCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as TJobCategoriesWithAll;
        setCategory(value);
    };

    return (
        <section
            className={styles['featured-resumes']}
            aria-labelledby="featured-resumes-title"
        >
            <div className={styles['featured-resumes__top']}>
                <div className={styles['featured-resumes__titles']}>
                    <h3
                        className={styles['featured-resumes__title']}
                        id="featured-resumes-title"
                    >
                        Featured Resumes
                    </h3>
                    <span className={styles['featured-resumes__subtitle']}>
                        Explore top recent resumes
                    </span>
                </div>

                <div className={styles['featured-resumes__categories-wrapper']}>
                    <span id="category-label" className="sr-only">
                        Select a resumes category
                    </span>

                    <select
                        aria-labelledby="category-label"
                        className={styles['featured-resumes__categories']}
                        value={category}
                        onChange={handleSetCategory}
                        name="resumes categories"
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
                        className={styles['featured-resumes__categories-icon']}
                        aria-hidden="true"
                        focusable="false"
                    />
                </div>
            </div>

            {isLoading ? (
                <Spinner />
            ) : (
                <ul className={styles['featured-resumes__list']}>
                    {resumes.map((data) => (
                        <ResumeItem key={data.id} data={data} />
                    ))}
                </ul>
            )}

            <Link
                className={styles['featured-resumes__link-all']}
                to="/resumes"
            >
                <PrimaryButton label="Show All" />
            </Link>
        </section>
    );
};
