import styles from '@/styles/SingleProductReviews.module.css'
import { useState, useEffect } from 'react';

export default function SingleProductReviews({productReview}){

    const [ratings, setRatings] = useState(productReview.rating);
    const [starsState, setStarsState] = useState({
        star1: false,
        star2: false,
        star3: false,
        star4: false,
        star5: false,
    });

    useEffect(() => {
        function handleStarsState(star) {
            setStarsState({
              star1: star >= 1,
              star2: star >= 2,
              star3: star >= 3,
              star4: star >= 4,
              star5: star >= 5,
            });
        }
        handleStarsState(ratings)

    }, []);

    return(
        <div className={styles.container}>
            <p className={styles.user}><i class="bi bi-person-fill"></i> {productReview.username}</p>
            <div className={styles.stars_rating}>
                {[1, 2, 3, 4, 5].map((star) => (
                <label key={star} htmlFor={`star${star}-${productReview.user}`}>
                    <input
                    id={`star${star}-${productReview.user}`}
                    type="radio"
                    value={star}
                    name={`star-${productReview.user}`}
                    checked={starsState[`star${star}`]}
                    />
                    <i id="star_icon" className={starsState[`star${star}`] ? "bi bi-star-fill" : "bi bi-star"}></i>
                </label>
                ))}
                <p className={styles.comment}>{productReview.comment}</p>
                
            </div>
        </div>
    )
}