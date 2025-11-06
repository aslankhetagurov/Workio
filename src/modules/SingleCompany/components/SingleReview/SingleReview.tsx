import { Tables } from '@/shared/types/database.types';
import RatingDisplay from '@/shared/components/RatingDisplay/RatingDisplay';
import { formatDateToMonthAndYear } from '@/shared/lib/formatDateToMonthAndYear';
import styles from './SingleReview.module.scss';

interface SingleReviewProps {
    review: Tables<'company_reviews'>;
}

const SingleReview = ({ review }: SingleReviewProps) => {
    const {
        position,
        rating_overall,
        experience_duration,
        is_current_employee,
        region,
        pros,
        cons,
        rating_growth_opportunities,
        rating_management,
        rating_relax_conditions,
        rating_salary_level,
        rating_team,
        rating_work_conditions,
        benefits,
        created_at,
    } = review;

    const ratingItems = [
        { label: 'Growth Opportunities', value: rating_growth_opportunities },
        { label: 'Management', value: rating_management },
        { label: 'Work-Life Balance', value: rating_relax_conditions },
        { label: 'Salary Level', value: rating_salary_level },
        { label: 'Team', value: rating_team },
        { label: 'Working Conditions', value: rating_work_conditions },
    ];

    return (
        <li className={styles.review}>
            <h3 className={styles.review__position}>{position}</h3>

            <div className={styles['review__rating-and-date']}>
                <RatingDisplay rating={rating_overall} />
                {formatDateToMonthAndYear(created_at)}
            </div>

            <div className={styles['review__other-info']}>
                <span className={styles['review__other-info-item']}>
                    {`I ${
                        is_current_employee ? 'work' : 'worked'
                    } in a company`}
                </span>
                <span className={styles['review__other-info-item']}>
                    {region}
                </span>
                <span className={styles['review__other-info-item']}>
                    {experience_duration}
                </span>
            </div>

            <div className={styles.review__pros}>
                <span className={styles.review__title}>What you like</span>
                <p className={styles['review__pros-text']}>{pros}</p>
            </div>

            <div className={styles.review__cons}>
                <span className={styles.review__title}>
                    What can be improved
                </span>
                <p className={styles['review__cons-text']}>{cons}</p>
            </div>

            <div className={styles.review__ratings}>
                <span className={styles.review__title}>Ratings</span>

                <ul className={styles['review__ratings-list']} role="list">
                    {ratingItems.map(({ label, value }) => (
                        <li
                            className={styles['review__ratings-item']}
                            key={label}
                        >
                            <span className={styles['review__ratings-label']}>
                                {label}
                            </span>
                            <RatingDisplay rating={value} grade={false} />
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.rating__benefits}>
                <span className={styles.review__title}>
                    Benefits and advantages
                </span>

                <ul className={styles['review__benefits-list']}>
                    {benefits?.map((item, i) => (
                        <li
                            className={styles['review__benefits-item']}
                            key={item + i}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
};

export default SingleReview;
