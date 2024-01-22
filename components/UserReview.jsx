import { useEffect, useState } from "react";
import styles from "@/styles/UserReview.module.css";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function UserReview({ productId, userId, setComment }) {

  const {data: session} = useSession()
  

  const [ratings, setRatings] = useState(0);
  const [starsState, setStarsState] = useState({
    star1: false,
    star2: false,
    star3: false,
    star4: false,
    star5: false,
  });

  useEffect(() => {
    async function fetchRatings() {
      try {
        const response = await axios.get(`/api/review?productId=${productId}&userId=${userId}`);
        const review = response.data;
        
        if (review) {
          setRatings(review.rating);
          setComment && setComment(review.comment)
          
          setStarsState({
            star1: review.rating >= 1,
            star2: review.rating >= 2,
            star3: review.rating >= 3,
            star4: review.rating >= 4,
            star5: review.rating >= 5,
          });
        }
      } catch (error) {
        console.log("Error fetching ratings", error);
      }
    }

    fetchRatings();
  }, []);

  async function updateProductRating(productId, userId, star) {
    const username = session.user.name
    const data = {
      productId: productId,
      userId: userId,
      rating: star,
      username:username
    };
    try {
      await axios.post("/api/review", data);
    } catch (error) {
      console.log("Error updating ratings", error);
    }
  }

  function handleStarsState(star, productId) {
    setStarsState({
      star1: star >= 1,
      star2: star >= 2,
      star3: star >= 3,
      star4: star >= 4,
      star5: star >= 5,
    });
    updateProductRating(productId, userId, star);
  }

  return (
    <div className={styles.container}>
      <div className={styles.stars_rating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star} htmlFor={`star${star}-${productId}`}>
            <input
              id={`star${star}-${productId}`}
              type="radio"
              value={star}
              name={`star-${productId}`}
              checked={starsState[`star${star}`]}
              onClick={() => handleStarsState(star, productId)}
            />
            <i id="star_icon" className={starsState[`star${star}`] ? "bi bi-star-fill" : "bi bi-star"}></i>
          </label>
        ))}
      </div>
    </div>
  );
}
