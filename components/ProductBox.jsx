import styles from "@/styles/ProductBox.module.css";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { WishlistContext } from "./WishlistContext";

export default function ProductBox({ _id, title, images, description, price, ratings }) {
  const { wishlistedProducts, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [starRating, setStarRating] = useState('0.0')

  useEffect(() => {
    setIsWishlisted(wishlistedProducts.includes(_id));
  }, [wishlistedProducts, _id]);

  useEffect(()=>{
    calculateStarRating()
  },[])
  function wishlistButtonClickHandler() {
    if (isWishlisted) {
      removeFromWishlist(_id);
    } else {
      addToWishlist(_id);
    }
  }

  function calculateStarRating(){
    if (ratings){
      let totalRating = 0
      for (const rating of ratings){
        totalRating+=rating.rating
      }
      const ratingAverage = (totalRating/ratings.length).toString()
      setStarRating(parseFloat(ratingAverage).toFixed(1))
      return
      }
    setStarRating("0.0")
  }
  

  return (
    <div key={_id.toString()} className={styles.product_container}>
      <div className={styles.image_container}>
        <Link href={`/product/${_id}`}>
          <img className={styles.image} src={images[0]} />
        </Link>
        {isWishlisted ? (
          <svg
            id={styles.svg}
            onClick={wishlistButtonClickHandler}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
          </svg>
        ) : (
          <svg
            id={styles.svg}
            onClick={wishlistButtonClickHandler}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-heart"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
          </svg>
        )}
      </div>
      <div className={styles.product_details}>
        <div className={styles.title}>
          <Link href={`/product/${_id}`}>
            <p>{title}</p>
          </Link>
            <div className={styles.star_rating}>
              {starRating==="0.0"? (
              <i class="bi bi-star"></i>
              ):( 
                starRating.toString().split('.')[1]!=="0"?(
                <i class="bi bi-star-half"></i>
                ) : (
                <i class="bi bi-star-fill"></i>)
              )}
              <span> {starRating}</span>
            </div>
        </div>
        <div className={styles.price}>
          <p>Rs. {price}</p>
        </div>
      </div>
    </div>
  );
}
