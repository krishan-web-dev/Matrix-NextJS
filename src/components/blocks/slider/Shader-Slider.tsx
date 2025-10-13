"use client";

import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "@/plugins/shaders-slider/navigation.scss";

import SwiperGL from "@/plugins/shaders-slider/dist/swiper-gl.esm.js";
import "@/plugins/shaders-slider/dist/swiper-gl.scss";
import Image from "next/image";

import { wpToSeoPath } from "@/lib/utils/wpToSeoPath";
import { DynamicHeading } from "@/lib/utils/DynamicHeading";

/* ---------------------------------- Types ---------------------------------- */

interface ExtendedSwiperOptions {
    gl?: { shader: string };
}

type Media = { node?: { sourceUrl?: string | null } | null };

type Slide = {
    title?: string | null;
    titleSize?: string | null;
    description?: string | null;
    mediaType?: "image" | "video" | (string & {});
    image?: Media | null;
    videoThumbnail?: Media | null;
    videoUrl?: string | null;
};


export type HeroSliderBlockData = {
    __typename?: string | null;
    slide?: Slide[] | null;
    sectionId?: string | null;
    sectionClass?: string | null;
    disablePaddingTop?: boolean | null;
    disablePaddingBottom?: boolean | null;
};

/* --------------------------------- Helpers --------------------------------- */

/** Resolve background image using SEO proxy path */
function getBackgroundFromSlide(slide: Slide): string | undefined {
    const raw =
        slide.image?.node?.sourceUrl ??
        slide.videoThumbnail?.node?.sourceUrl ??
        undefined;
    return wpToSeoPath(raw);
}

/* -------------------------------- Component -------------------------------- */

export default function ShaderSlider({ data }: { data: HeroSliderBlockData }) {
    const slides = data?.slide ?? [];
    if (!slides.length) return null;

    const padTop = data?.disablePaddingTop ? "pt-0" : "pt-12";
    const padBottom = data?.disablePaddingBottom ? "pb-0" : "pb-12";
    const sectionClass = `wrapper ${padTop} ${padBottom} ${data?.sectionClass ?? ""}`.trim();

    return (
        <section id={data?.sectionId ?? "HeroSlider"} className={sectionClass}>
            <Swiper
                modules={[Navigation, Autoplay, SwiperGL]}
                autoplay={{ delay: 5000 }}
                speed={1000}
                loop
                effect="gl"
                onBeforeInit={(swiper: any) => {
                    (swiper.params as ExtendedSwiperOptions).gl = { shader: "wind" };
                }}
                navigation={{
                    nextEl: ".swiper-nxt",
                    prevEl: ".swiper-prev",
                }}
            >
                {slides.map((slide, index) => {
                    const bg = getBackgroundFromSlide(slide);

                    const allowedTags = ["h2", "h3", "h4", "h5", "h6"] as const;
                    const tag = allowedTags.includes(slide.titleSize as any)
                        ? (slide.titleSize as (typeof allowedTags)[number])
                        : "h2";

                    return (
                        <SwiperSlide key={index}>
                            {bg && (
                                <Image
                                    src={bg}
                                    alt={slide.title ?? "slide"}
                                    className="swiper-gl-image w-100"
                                    width={1920}
                                    height={1080}
                                    priority={index === 0}
                                    crossOrigin="anonymous"
                                />
                            )}

                            <div className="swiper-slide-content">
                                <div className="container">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6 order-lg-2"></div>
                                        <div className="col-lg-6 content__block">

                                            {slide.title && (
                                                <DynamicHeading tag={tag}>
                                                    {slide.title}
                                                </DynamicHeading>
                                            )}

                                            {slide.description && (
                                                <div
                                                    className="lead fs-lg"
                                                    dangerouslySetInnerHTML={{ __html: slide.description }}
                                                />
                                            )}

                                            {slide.mediaType === "video" && slide.videoUrl && (
                                                <div className="mt-4">
                                                    <a
                                                        href={slide.videoUrl}
                                                        className="btn btn-primary"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        Watch video
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}

                <div className="swiper-navigation">
                    <div className="swiper-nav swiper-nxt"></div>
                    <div className="swiper-nav swiper-prev"></div>
                </div>
            </Swiper>
        </section>
    );
}
