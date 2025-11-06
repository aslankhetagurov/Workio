import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
    value: number;
    onChange: (value: number) => void;
}

const StarRating = ({ value, onChange }: StarRatingProps) => {
    const [hover, setHover] = useState<number | null>(null);

    return (
        <div style={{ display: 'flex', gap: '6px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                    key={star}
                    size={28}
                    color={star <= (hover ?? value) ? 'gold' : '#ddd'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                />
            ))}
        </div>
    );
};

export default StarRating;
