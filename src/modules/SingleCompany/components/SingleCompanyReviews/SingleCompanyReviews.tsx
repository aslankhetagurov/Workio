import { useState } from 'react';

import { Tables } from '@/shared/types/database.types';
import SingleReview from '../SingleReview/SingleReview';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import Modal from '@/shared/components/Modal/Modal';
import ReviewForm from '../ReviewForm/ReviewForm';
import styles from './SingleCompanyReviews.module.scss';

interface SingleCompanyReviewsProps {
    reviews: Tables<'company_reviews'>[];
}

const SingleCompanyReviews = ({ reviews }: SingleCompanyReviewsProps) => {
    const [showModal, setShowModal] = useState(false);

    const handleToggleModal = () => setShowModal((prev) => !prev);

    return (
        <section className={styles.reviews}>
            <header className={styles.reviews__header}>
                <h2 className={styles.reviews__title}>Company Reviews</h2>
                <PrimaryButton
                    label="Leave a review"
                    onClick={handleToggleModal}
                    style={{ width: '130px' }}
                />
            </header>

            {!reviews.length ? (
                <p role="status">No reviews yet...</p>
            ) : (
                <ul className={styles.reviews__list}>
                    {reviews.map((item) => (
                        <SingleReview review={item} key={item.id} />
                    ))}
                </ul>
            )}
            <Modal
                isOpen={showModal}
                onClose={handleToggleModal}
                customModalStyles={{ maxWidth: '800px' }}
            >
                <ReviewForm onClose={handleToggleModal} />
            </Modal>
        </section>
    );
};

export default SingleCompanyReviews;
