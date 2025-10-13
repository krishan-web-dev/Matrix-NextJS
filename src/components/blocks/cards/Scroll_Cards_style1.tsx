"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import NextLink from "@/components/reuseable/links/NextLink";
import { wpToSeoPath } from "@/lib/utils/wpToSeoPath";

import "swiper/css";
import "./scroll_style1.scss";

gsap.registerPlugin(ScrollTrigger);

// GraphQL data shape
type Media = { node?: { sourceUrl?: string | null } | null };
type Item = {
    title?: string | null;
    description?: string | null;
    image?: Media | null;
    link?: { title?: string | null; url?: string | null } | null;
};

export type ServicesListBlockData = {
    __typename?: string | null;
    title?: string | null;
    description?: string | null;
    items?: Item[] | null;
    background?: string | null;
    columnCount?: number | null;
    disablePaddingTop?: boolean | null;
    disablePaddingBottom?: boolean | null;
    sectionId?: string | null;
    sectionClass?: string | null;
};

export default function Scroll_Cards1({ data }: { data: ServicesListBlockData }) {
    const [isCarouselEnabled, setIsCarouselEnabled] = useState(false);
    const figuresRef = useRef<(HTMLElement | null)[]>([]);

    // Responsive check
    useEffect(() => {
        const handleResize = () => setIsCarouselEnabled(window.innerWidth <= 1200);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // GSAP animation (desktop only)
    useEffect(() => {
        gsap.fromTo(
            figuresRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".hm-discover",
                    start: "top 80%",
                    toggleActions: "play none none reset",
                },
            }
        );
    }, []);

    const cards = data?.items ?? [];
    const padTop = data?.disablePaddingTop ? "pt-0" : "pt-12";
    const padBottom = data?.disablePaddingBottom ? "pb-0" : "pb-12";
    const sectionCls = `wrapper bg-light hm-discover ${padTop} ${padBottom} ${data?.sectionClass ?? ""
        }`.trim();

    return (
        <section id={data?.sectionId ?? "ServicesList"} className={sectionCls && "hm-discover"}>
            <div className="container-fluid">
                {/* Header */}
                {(data?.title || data?.description) && (
                    <div className="row justify-content-md-center">
                        <div className="col-md-6 mt-16 mt-md-18 mb-10 mb-md-12 text-center">
                            {data?.title && (
                                <h3
                                    className="display-2 ls-xs mb-6"
                                    dangerouslySetInnerHTML={{ __html: data.title }}
                                />
                            )}
                            {data?.description && (
                                <div
                                    className="lead fs-lg"
                                    dangerouslySetInnerHTML={{ __html: data.description }}
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* Cards */}
                <div className="row">
                    <div className="col-md-12 mb-10 mb-md-12">
                        {isCarouselEnabled ? (
                            <div className="discover-list hm-discover-carousel grid style-1 cards__scroll">
                                <Swiper
                                    slidesPerView={1}
                                    modules={[Navigation]}
                                    spaceBetween={15}
                                    breakpoints={{
                                        768: { slidesPerView: 2, spaceBetween: 15 },
                                        992: { slidesPerView: 3, spaceBetween: 12 },
                                        1200: { slidesPerView: 4, spaceBetween: 15 },
                                    }}
                                    navigation={{
                                        nextEl: ".scroll__card_nav .swiper-nxt",
                                        prevEl: ".scroll__card_nav .swiper-prev",
                                    }}
                                >
                                    <div className="scroll__card_nav">
                                        <div className="swiper-nav swiper-prev">
                                            <i className="uil uil-angle-left-b"></i>
                                        </div>
                                        <div className="swiper-nav swiper-nxt">
                                            <i className="uil uil-angle-right-b"></i>
                                        </div>
                                    </div>

                                    {cards.map((item, index) => {
                                        const imgSrc = wpToSeoPath(item.image?.node?.sourceUrl);
                                        return (
                                            <SwiperSlide key={index}>
                                                <figure className="overlay caption caption-overlay rounded-md single__card">
                                                    {imgSrc && (
                                                        <>
                                                            <Image
                                                                src={imgSrc}
                                                                alt={item.title ?? "Service"}
                                                                width={600}
                                                                height={600}
                                                            />
                                                            <span className="bg" />
                                                        </>
                                                    )}

                                                    <figcaption>
                                                        {item.title && (
                                                            <h2 className="post-title h3 mt-1 mb-3">
                                                                {item.link?.url ? (
                                                                    <NextLink
                                                                        key={index}
                                                                        title={item.title}
                                                                        href={item.link.url}
                                                                    />
                                                                ) : (
                                                                    item.title
                                                                )}
                                                            </h2>
                                                        )}
                                                        {item.description && (
                                                            <span className="sub-title">
                                                                {item.description}
                                                            </span>
                                                        )}
                                                    </figcaption>

                                                    {/* KEEPING your SVG and layout intact */}
                                                    <div className="card__link">
                                                        <div className="card__link_btn">
                                                            <Link key={index} href={item.link?.url ?? "#"} title={item.link?.title ?? "Click here"}>
                                                                <span>
                                                                    <div className="card__link_btn_cont">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                                                            <path
                                                                                d="m100,0H0v100C0,44.77,44.77,0,100,0Z"
                                                                                fill="#F9F8F6"
                                                                            ></path>
                                                                        </svg>
                                                                        <div className="card__link_btn_arrow">
                                                                            <svg
                                                                                width="31"
                                                                                height="28"
                                                                                viewBox="0 0 31 28"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                    d="M0.857198 13.7372L27.9141 13.7372"
                                                                                    stroke="black"
                                                                                    strokeWidth="3"
                                                                                ></path>
                                                                                <path
                                                                                    d="M15.4561 1.39417L27.9142 13.8522L15.4561 26.3104"
                                                                                    stroke="black"
                                                                                    strokeWidth="3"
                                                                                ></path>
                                                                            </svg>
                                                                        </div>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                                                            <path
                                                                                d="m100,0H0v100C0,44.77,44.77,0,100,0Z"
                                                                                fill="#F9F8F6"
                                                                            ></path>
                                                                        </svg>

                                                                    </div>
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </figure>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </div>
                        ) : (
                            <div className="discover-list hm-discover-carousel grid style-1 cards__scroll">
                                {cards.map((item, index) => {
                                    const imgSrc = wpToSeoPath(item.image?.node?.sourceUrl);
                                    return (
                                        <figure
                                            className="overlay caption caption-overlay rounded-md single__card desktop"
                                            key={index}
                                            ref={(el) => {
                                                figuresRef.current[index] = el;
                                            }}
                                        >
                                            {imgSrc && (
                                                <>
                                                    <Image
                                                        src={imgSrc}
                                                        alt={item.title ?? "Service"}
                                                        width={600}
                                                        height={600}
                                                    />
                                                    <span className="bg" />
                                                </>
                                            )}

                                            <figcaption>
                                                {item.title && (
                                                    <h2 className="post-title h3 mt-1 mb-3">
                                                        {item.link?.url ? (
                                                            <NextLink
                                                                key={index}
                                                                title={item.title}
                                                                href={item.link.url}
                                                            />
                                                        ) : (
                                                            item.title
                                                        )}
                                                    </h2>
                                                )}
                                                {item.description && (
                                                    <span className="sub-title">{item.description}</span>
                                                )}
                                            </figcaption>

                                            {/* KEEPING your SVG and layout intact */}
                                            <div className="card__link">
                                                <div className="card__link_btn">
                                                    <Link key={index} href={item.link?.url ?? "#"} title={item.link?.title ?? "Click here"}>
                                                        <span>
                                                            <div className="card__link_btn_cont">

                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                                                    <path
                                                                        d="m100,0H0v100C0,44.77,44.77,0,100,0Z"
                                                                        fill="#F9F8F6"
                                                                    ></path>
                                                                </svg>
                                                                <div className="card__link_btn_arrow">
                                                                    <svg
                                                                        width="31"
                                                                        height="28"
                                                                        viewBox="0 0 31 28"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M0.857198 13.7372L27.9141 13.7372"
                                                                            stroke="black"
                                                                            strokeWidth="3"
                                                                        ></path>
                                                                        <path
                                                                            d="M15.4561 1.39417L27.9142 13.8522L15.4561 26.3104"
                                                                            stroke="black"
                                                                            strokeWidth="3"
                                                                        ></path>
                                                                    </svg>
                                                                </div>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                                                    <path
                                                                        d="m100,0H0v100C0,44.77,44.77,0,100,0Z"
                                                                        fill="#F9F8F6"
                                                                    ></path>
                                                                </svg>

                                                            </div>
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </figure>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
