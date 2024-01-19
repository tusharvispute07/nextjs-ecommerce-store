import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/IndexPageCarousel.module.css';
import debounce from 'lodash/debounce';
import Link from 'next/link';

const SimpleSlider = ({ images, ids }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  
  const [isMounted, setIsMounted] = useState(false)

  const [imagesArray, setImagesArray] = useState(images);
  const [idsArray, setIdsArray] = useState(ids)

  useEffect(()=>{
    setIsMounted(true)
  },[])
  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 300);

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getSlidesToShow = () => {
    if (isMounted){
      return windowWidth <= 425 ? 2 : 5;
    }
    
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <h2 className={styles.title}>New Arrivals</h2>
      <div className={styles.wrapper}>
        <Slider {...settings}>
          {imagesArray.map((image, index) => (
            <Link href={`/product/${idsArray[index]}`}>
            <div key={index} className={styles.card}>
              <img className={styles.image} src={image} alt="" />
            </div>
            </Link>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default SimpleSlider;
