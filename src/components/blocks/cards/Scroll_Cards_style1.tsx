'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useEffect, useState, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link';
import Image from 'next/image'
import NextLink from "@/components/reuseable/links/NextLink";


import 'swiper/css';
//import './scroll_cards.scss';
import './scroll_style1.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Scroll_Cards1() {

    const [isCarouselEnabled, setIsCarouselEnabled] = useState(false);
    const figuresRef = useRef<(HTMLElement | null)[]>([]);

    // Dynamically check screen size
    useEffect(() => {
        const handleResize = () => {
            setIsCarouselEnabled(window.innerWidth <= 1200);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // GSAP Fade-In Animation for Figures (Excluding Carousel)
    useEffect(() => {
        gsap.fromTo(
            figuresRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.3, // Stagger animation for smoother effect
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".hm-discover",
                    start: "top 80%",
                    toggleActions: "play none none reset",
                    //once: true,
                },
            }
        );
    }, []);

    const cards = [
        {
            img: '/img/fork-lift.jpg',
            title: 'Compressed Air Solutions',
            subtitle: 'Specializing in material handling solutions with quality, safety, and value.',
            link: '#',
        },
        {
            img: '/img/car-parking.jpg',
            title: 'Material Handling Equipement',
            subtitle: 'Advanced farming solutions for a sustainable future',
            link: '#',
        },
        {
            img: '/img/auto-mobile-equipment.jpg',
            title: 'Automobile Maintenance Equipment',
            subtitle: 'Specializing in material handling solutions with quality, safety, and value.',
            link: '#',
        },
        {
            img: '/img/car-parking.jpg',
            title: 'Car Parking Solutions',
            subtitle: 'Advanced farming solutions for a sustainable future',
            link: '#',
        },
        {
            img: '/img/fork-lift.jpg',
            title: 'Elevators & Escalators',
            subtitle: 'Specializing in material handling solutions with quality, safety, and value.',
            link: '#',
        },
        {
            img: '/img/auto-mobile-equipment.jpg',
            title: 'Welding Products',
            subtitle: 'Advanced farming solutions for a sustainable future',
            link: '#',
        },
        {
            img: '/img/fork-lift.jpg',
            title: 'After Care & Rental',
            subtitle: 'Specializing in material handling solutions with quality, safety, and value.',
            link: '#',
        },
        {
            img: '/img/auto-mobile-equipment.jpg',
            title: 'Solar Systems',
            subtitle: 'Advanced farming solutions for a sustainable future',
            link: '#',
        },
        // Add more card data as needed
    ];

    return (
        <section className="wrapper bg-light hm-discover">
            <div className="container-fluid">
                <div className='row justify-content-md-center'>
                    <div className="col-md-6 mt-16 mt-md-18 mb-10 mb-md-12 text-center">
                        <h3 className="display-2 ls-xs mb-8">
                            We bring <span className="underline-def">solutions</span> to make life easier for our customers.
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mb-10 mb-md-12">
                        {/* Scroll Card */}
                        {isCarouselEnabled ? (
                            <div className="discover-list hm-discover-carousel grid style-1 cards__scroll">
                                <Swiper
                                    slidesPerView={1}
                                    modules={[Navigation]}
                                    //pagination={{ clickable: true }}
                                    spaceBetween={15}
                                    breakpoints={{
                                        768: {
                                            slidesPerView: 2,
                                            spaceBetween: 15,
                                        },
                                        992: {
                                            slidesPerView: 3,
                                            spaceBetween: 12,
                                        },
                                        1200: {
                                            slidesPerView: 4,
                                            spaceBetween: 15,
                                        },
                                    }}
                                    navigation={{
                                        nextEl: '.scroll__card_nav .swiper-nxt',
                                        prevEl: '.scroll__card_nav .swiper-prev'
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
                                    {cards.map((card, index) => (
                                        <SwiperSlide key={index}>
                                            <figure className="overlay caption caption-overlay rounded-md single__card" key={index}>
                                                <Link href="#">
                                                    <Image src={card.img} alt={card.title} width={600} height={600} />
                                                    <span className="bg" />
                                                </Link>

                                                <figcaption>
                                                    <h2 className="post-title h3 mt-1 mb-3">
                                                        <NextLink title={card.title} href="#" />
                                                    </h2>
                                                    <span className="sub-title">{card.subtitle}</span>
                                                </figcaption>
                                                <div className="card__link">
                                                    <div className="card__link_btn" title="Click here">
                                                        <span>
                                                            <div className="card__link_btn_cont">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                                                    <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill="#F9F8F6"></path></svg>
                                                                <div className="card__link_btn_arrow">
                                                                    <svg width="31" height="28" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M0.857198 13.7372L27.9141 13.7372" stroke="black" strokeWidth="3"></path>
                                                                        <path d="M15.4561 1.39417L27.9142 13.8522L15.4561 26.3104" stroke="black" strokeWidth="3"></path>
                                                                    </svg>
                                                                </div>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                                                    <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill="#F9F8F6">
                                                                    </path>
                                                                </svg>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </figure>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        ) : (
                            <div className="discover-list hm-discover-carousel grid style-1 cards__scroll">
                                {cards.map((card, index) => (
                                    <figure
                                        className="overlay caption caption-overlay rounded-md single__card desktop"
                                        key={index}
                                        ref={(el) => {
                                            figuresRef.current[index] = el;
                                        }} // Assigning ref for GSAP
                                    >
                                        <Link href="#">
                                            <Image src={card.img} alt={card.title} width={600} height={600} />
                                            <span className="bg" />
                                        </Link>

                                        <figcaption>
                                            <h2 className="post-title h3 mt-1 mb-3">
                                                <NextLink title={card.title} href="#" />
                                            </h2>
                                            <span className="sub-title">{card.subtitle}</span>
                                        </figcaption>
                                        <div className="card__link">
                                            <div className="card__link_btn" title="Click here">
                                                <span>
                                                    <div className="card__link_btn_cont">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                                            <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill="#F9F8F6"></path></svg>
                                                        <div className="card__link_btn_arrow">
                                                            <svg width="31" height="28" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0.857198 13.7372L27.9141 13.7372" stroke="black" strokeWidth="3"></path>
                                                                <path d="M15.4561 1.39417L27.9142 13.8522L15.4561 26.3104" stroke="black" strokeWidth="3"></path>
                                                            </svg>
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                                            <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill="#F9F8F6">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    </figure>
                                ))}
                            </div>
                        )}
                        {/* Scroll Card End */}
                    </div>
                </div>
            </div>
        </section>
    );
}