// Rating.js
import React, { useState } from 'react';

function Rating({ initialRating, onRate }) {
    const [rating, setRating] = useState(initialRating || 0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (value) => {
        setRating(value);
        onRate(value);
    };

    return (
        <div>
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;

                return (
                    <span
                        key={index}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        {starValue <= (hoverRating || rating) ? '★' : '☆'}
                    </span>
                );
            })}
        </div>
    );
}

export default Rating;
