import { FaStar, FaRegStarHalfStroke, FaRegStar } from 'react-icons/fa6';

import styles from './RatingDisplay.module.scss';

interface RatingDisplayProps {
    rating: number | null;
    size?: number;
    grade?: boolean;
}

const RatingDisplay = ({
    rating,
    size = 20,
    grade = true,
}: RatingDisplayProps) => {
    if (!rating)
        return (
            <div className={styles.rating} style={{ fontSize: `${size}px` }}>
                <span className={styles.rating__grade}>0.0</span>
                {[...Array(5)].map((_, i) => (
                    <FaRegStar
                        className={styles.rating__icon}
                        aria-hidden="true"
                        key={i}
                    />
                ))}
            </div>
        );

    const fullStars = Math.floor(rating);
    const isHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (isHalfStar ? 1 : 0);

    return (
        <div
            className={styles.rating}
            style={{ fontSize: `${size}px` }}
            aria-label={`Rating: ${rating ?? 0} out of 5`}
        >
            {grade && <span className={styles.rating__grade}>{rating}</span>}

            {fullStars &&
                [...Array(fullStars)].map((_, i) => (
                    <FaStar
                        className={styles.rating__icon}
                        key={i}
                        aria-hidden="true"
                    />
                ))}
            {isHalfStar && (
                <FaRegStarHalfStroke
                    className={styles.rating__icon}
                    aria-hidden="true"
                />
            )}
            {!!emptyStars &&
                [...Array(emptyStars)].map((_, i) => (
                    <FaRegStar
                        className={styles.rating__icon}
                        key={i}
                        aria-hidden="true"
                    />
                ))}
        </div>
    );
};

export default RatingDisplay;
