import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/SingleProductSlider.module.css'
import { useContext, useEffect } from 'react';
import { WishlistContext } from './WishlistContext';

export default function SingleProductSlider({images , id}){
    const [imagesArray, setImagesArray] = useState(images)

    const { wishlistedProducts, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
    const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(wishlistedProducts.includes(id));
  }, [wishlistedProducts, id]);

  function wishlistButtonClickHandler() {
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  }

    const slider = useRef(null);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      
      };
    return(
        <div className={styles.wrapper}>
            <Slider ref={slider} {...settings}>
            {imagesArray.map((image, index) =>(
          <div key={index} className={styles.card}>

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

            <img className={styles.image} src={image} alt="" />
          </div>
        )
        )}
      </Slider>
        <button id={styles.prev} onClick={() => slider?.current?.slickPrev()}><i class="bi bi-caret-left-fill"></i></button>
        <button id={styles.next} onClick={() => slider?.current?.slickNext()}><i class="bi bi-caret-right-fill"></i></button>
      </div>
    )
}