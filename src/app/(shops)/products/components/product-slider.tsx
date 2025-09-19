'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import type { NavigationOptions } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';

import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import './product-slider.scss';

type Slide = {
  src: string;
  alt: string;
};

export default function ProductSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const slides: Slide[] = [
    { src: '/img/products/1-1.jpg', alt: 'Photo 1' },
    { src: '/img/test.jpg', alt: 'Photo 2' },
  ];

  return (
    <>

      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Thumbs, Navigation, Autoplay]}
        autoplay={{ delay: 3000 }}
        speed={1000}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        } as NavigationOptions}
        className="product-slider-main"
      >
        <div
          ref={prevRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            zIndex: 10,
            cursor: 'pointer',
            transform: 'translateY(-50%)',
            padding: '8px',
          }}
          className='cs-nav'
        >
          <GoArrowLeft size={40} />
        </div>

        <div
          ref={nextRef}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            zIndex: 10,
            cursor: 'pointer',
            transform: 'translateY(-50%)',
            padding: '8px',
          }}
          className='cs-nav'
        >
          <GoArrowRight size={40} />
        </div>

        {slides.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img.src}
              alt={img.alt}
              onClick={() => setLightboxIndex(i)}
              className='swiper-gl-image'
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="thumbnail-slider-container">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress
          modules={[Thumbs]}
          className="product-slider-thumbs"
        >
          {slides.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img.src}
                alt={img.alt}
                style={{ width: '100%', height: '80px', objectFit: 'cover' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,        // allows zooming in 3x beyond original size
          zoomInMultiplier: 2,         // Optional: how much each zoom step increases
          doubleClickMaxStops: 3,      // Allow more zoom stops
          keyboardMoveDistance: 50,    // How far arrow keys pan when zoomed
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100
        }}
      />

    </>
  );
}
