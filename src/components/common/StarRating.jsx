import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating = 5, reviewsCount = null, size = 15 }) => {
  return (
    <div className="star-rating-wrapper" aria-label={`Rating: ${rating} out of 5 stars`}>
      <div className="star-icons">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.floor(rating);
          const isHalf = !isFilled && star === Math.ceil(rating) && rating % 1 >= 0.4;
          return (
            <Star
              key={star}
              size={size}
              className={`star-icon ${isFilled || isHalf ? 'filled' : 'empty'}`}
              fill={isFilled || isHalf ? 'currentColor' : 'none'}
            />
          );
        })}
      </div>
      <span className="rating-score">{rating.toFixed(1)}</span>
      {reviewsCount !== null && (
        <span className="rating-reviews-count">({reviewsCount})</span>
      )}
    </div>
  );
};

export default StarRating;
