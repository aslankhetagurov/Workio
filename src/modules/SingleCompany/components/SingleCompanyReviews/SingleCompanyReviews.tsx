import { Tables } from '@/shared/types/database.types';
import styles from './SingleCompanyReviews.module.scss';
import SingleReview from '../SingleReview/SingleReview';

interface SingleCompanyReviewsProps {
    reviews: Tables<'company_reviews'>[];
}

const SingleCompanyReviews = ({ reviews }: SingleCompanyReviewsProps) => {
    if (!reviews.length) return <p>No reviews yet...</p>;

    return (
        <section className={styles.reviews}>
            <h2 className={styles.reviews__title}>Company Reviews</h2>

            <ul className={styles.reviews__list}>
                {reviews.map((item) => (
                    <SingleReview review={item} key={item.id} />
                ))}
            </ul>
        </section>
    );
};

export default SingleCompanyReviews;
