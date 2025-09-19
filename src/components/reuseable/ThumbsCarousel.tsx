"use client";

import Image from "next/image";
import { Fragment, useState, useRef, useEffect } from "react";
import type Swiper from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperCarousel, SwiperSlide } from "swiper/react";
// GLOBAL CUSTOM COMPONENTS
import LightBox from "components/LightBox";

export default function ThumbsCarousel() {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper>();
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const zoomRefs = useRef<(HTMLDivElement | null)[]>([]);

  const slideImages = [
    { id: 1, url: "/img/products/1-1.jpg", fullImage: "/img/products/1-1.jpg" },
    { id: 2, url: "/img/products/1-1.jpg", fullImage: "/img/products/1-1.jpg" },
    { id: 3, url: "/img/products/1-1.jpg", fullImage: "/img/products/1-1.jpg" }
  ];

  const thumbImages = [
    { id: 1, url: "/img/products/1-1.jpg" },
    { id: 2, url: "/img/products/1-1.jpg" },
    { id: 3, url: "/img/products/1-1.jpg" }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (activeSlide !== index) return;

    const container = zoomRefs.current[index];
    if (!container) return;

    const img = container.querySelector('img');
    if (!img) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    img.style.transform = 'scale(2)';
  };

  const handleMouseLeave = (index: number) => {
    const img = zoomRefs.current[index]?.querySelector('img');
    if (img) {
      img.style.transform = 'scale(1)';
    }
  };

  return (
    <Fragment>
      <LightBox />

      <div className="swiper-container swiper-thumbs-container">
        <SwiperCarousel
          spaceBetween={10}
          pagination={false}
          navigation={{ prevEl, nextEl }}
          modules={[FreeMode, Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}>
          {slideImages.map(({ url, id, fullImage }, index) => (
            <SwiperSlide key={id}>
              <div
                ref={(el) => {
                  zoomRefs.current[index] = el;
                }}
                className="zoom-container rounded overflow-hidden relative"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <Image
                  width={610}
                  height={655}
                  src={url}
                  alt="product"
                  className="w-100 h-auto zoom-image transition-transform duration-300 ease-in-out"
                />
                <a className="item-link" href={fullImage} data-glightbox data-gallery="product-group">
                  <i className="uil uil-focus-add" />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </SwiperCarousel>

        {/* Rest of your component remains the same */}
        <div className="swiper-controls">
          <div className="swiper-navigation">
            <div
              role="button"
              aria-label="Previous Slide"
              ref={(node) => setPrevEl(node)}
              className="swiper-button swiper-button-prev"
            />
            <div
              role="button"
              aria-label="Previous Slide"
              ref={(node) => setNextEl(node)}
              className="swiper-button swiper-button-next"
            />
          </div>
        </div>

        <SwiperCarousel
          freeMode
          threshold={2}
          spaceBetween={10}
          slidesPerView={5}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Navigation, Thumbs]}>
          {thumbImages.map(({ url, id }) => (
            <SwiperSlide key={id}>
              <Image width={114} height={120} src={url} alt="product" className="w-100 h-auto" />
            </SwiperSlide>
          ))}
        </SwiperCarousel>
      </div>

      <style jsx>{`
        .zoom-container {
          width: 100%;
          overflow: hidden;
          cursor: zoom-in;
        }
        
        .zoom-image {
          transform-origin: center center;
          object-fit: cover;
          width: 100%;
          height: 100%;
          transition: transform 0.3s ease;
        }
      `}</style>
    </Fragment>
  );
}