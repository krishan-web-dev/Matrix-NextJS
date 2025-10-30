"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { wpToSeoPath } from "@/lib/utils/wpToSeoPath";
import "./BrandTicker.scss";

// ---------------- Types from GraphQL ----------------
type LogoNode = {
  title?: string | null;
  sourceUrl?: string | null;
};

export type LogoCarouselBlockData = {
  __typename?: string | null;
  title?: string | null;
  description?: string | null;
  logo?: { nodes?: LogoNode[] | null } | null;
  style?: string | null;
  verticalAlign?: string | null;
  background?: string | null;
  backgroundImage?: { node?: { sourceUrl?: string | null } | null } | null;
  disablePaddingTop?: boolean | null;
  disablePaddingBottom?: boolean | null;
  sectionId?: string | null;
  sectionClass?: string | null;
};

// ---------------- Component ----------------
export default function BrandTicker({ data }: { data: LogoCarouselBlockData }) {
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

    const rtlSwiper = initSwiper(rtlRef.current, false);
    const ltrSwiper = initSwiper(ltrRef.current, true);

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

  // ---------------- Data & Styles ----------------
  const padTop = data?.disablePaddingTop ? "pt-0" : "pt-12";
  const padBottom = data?.disablePaddingBottom ? "pb-0" : "pb-12";
  const sectionCls = `wrapper brand-ticker ${padTop} ${padBottom} ${data?.sectionClass ?? ""}`.trim();

  const bgColor = data?.background ?? "";
  const bgImage = wpToSeoPath(data?.backgroundImage?.node?.sourceUrl);
  const hasOverlay = data?.style?.includes("overlay");

  const logos = data?.logo?.nodes ?? [];
  const repeatedLogos = [...logos, ...logos, ...logos]; // ensures continuous loop

  return (
    <section
      id={data?.sectionId ?? "LogoTicker"}
      className={`${sectionCls} ${hasOverlay ? "bg-overlay bg-overlay-800 text-white" : ""}`}
      style={{
        backgroundColor: bgColor || undefined,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
      }}
    >
      <div className="bg-noise"></div>
      <div className="container py-14 py-md-16">
        {/* Section Title */}
        {(data?.title || data?.description) && (
          <div className="row justify-content-center mb-8">
            <div className="col-md-8 text-center">
              {data?.title && (
                <h3
                  className="display-2 ls-xs mb-2"
                  dangerouslySetInnerHTML={{ __html: data.title }}
                />
              )}
              {data?.description && (
                <p
                  className="lead fs-lg"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              )}
            </div>
          </div>
        )}

        {/* Logo Ticker */}
        <div className="brand-ticker__row">
          {/* Right-to-left ticker */}
          <div ref={rtlRef} className="swiper brand-ticker__slider">
            <div className="swiper-wrapper">
              {repeatedLogos.map((brand, idx) => {
                const imgSrc = wpToSeoPath(brand.sourceUrl);
                return (
                  <div key={`rtl-${idx}`} className="swiper-slide brand-ticker__slide">
                    {imgSrc && (
                      <Image
                        src={imgSrc}
                        alt={brand.title ?? "Brand Logo"}
                        width={300}
                        height={180}
                        className="brand__logo"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Left-to-right ticker */}
          <div ref={ltrRef} className="swiper brand-ticker__slider">
            <div className="swiper-wrapper">
              {repeatedLogos.map((brand, idx) => {
                const imgSrc = wpToSeoPath(brand.sourceUrl);
                return (
                  <div key={`ltr-${idx}`} className="swiper-slide brand-ticker__slide">
                    {imgSrc && (
                      <Image
                        src={imgSrc}
                        alt={brand.title ?? "Brand Logo"}
                        width={300}
                        height={180}
                        className="brand__logo"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
