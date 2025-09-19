// components/BrandTicker.tsx
"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import "./BrandTicker.scss"; // Import your CSS styles

type Brand = {
  src: string;
  title: string;
};

const brands: Brand[] = [
  { src: "/img/brands/kgcrane.jpg", title: "Compressed Air Solutions" },
  { src: "/img/brands/mutrade.png", title: "Compressed Air Solutions" },
  { src: "/img/brands/Endo-Kogyo.png", title: "Compressed Air Solutions" },
  { src: "/img/brands/wernerfinley.png", title: "Compressed Air Solutions" },
  { src: "/img/brands/logo-rotary.png", title: "Compressed Air Solutions" },
  // Add more brands here...
];

// ✅ Duplicate the array so Swiper has enough slides for loop mode
const repeatedBrands = [...brands, ...brands, ...brands];

export default function BrandTicker() {
  const rtlRef = useRef<HTMLDivElement>(null);
  const ltrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Swiper.use([Autoplay]);

    const isDesktop = () => window.innerWidth > 767.9;
    let gap = isDesktop() ? 0.0285 * window.innerWidth : 15;

    const initSwiper = (el: HTMLDivElement | null, reverse: boolean) => {
      if (!el) return null;
      return new Swiper(el, {
        loop: true,
        slidesPerView: "auto",
        spaceBetween: gap,
        speed: 8000,
        allowTouchMove: false,
        autoplay: {
          delay: 0,
          reverseDirection: reverse,
          disableOnInteraction: false,
        },
      });
    };

    const rtlSwiper = initSwiper(rtlRef.current, false); // right-to-left
    const ltrSwiper = initSwiper(ltrRef.current, true);  // left-to-right

    const handleResize = () => {
      gap = isDesktop() ? 0.0285 * window.innerWidth : 15;
      [rtlSwiper, ltrSwiper].forEach((sw) => {
        if (sw) {
          sw.params.spaceBetween = gap;
          sw.update();
        }
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="wrapper" style={{ position: "relative", backgroundColor: "#222", zIndex: 1 }}>
      <div className="bg-noise"></div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2>Our Trusted by Brands</h2>
            <p>
              We <span className="underline">bring solutions</span> to make life
              easier for our customers.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="brand-ticker__row">
            {/* Right-to-left ticker */}
            <div ref={rtlRef} className="swiper brand-ticker__slider">
              <div className="swiper-wrapper">
                {repeatedBrands.map((brand, idx) => (
                  <div key={`rtl-${idx}`} className="swiper-slide brand-ticker__slide">
                    <img src={brand.src} alt={brand.title} />
                  </div>
                ))}
              </div>
            </div>

            {/* Left-to-right ticker */}
            <div ref={ltrRef} className="swiper brand-ticker__slider">
              <div className="swiper-wrapper">
                {repeatedBrands.map((brand, idx) => (
                  <div key={`ltr-${idx}`} className="swiper-slide brand-ticker__slide">
                    <img src={brand.src} alt={brand.title} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
