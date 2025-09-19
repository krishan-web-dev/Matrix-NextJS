'use client';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import '@/plugins/shaders-slider/navigation.scss';

import SwiperGL from '@/plugins/shaders-slider/dist/swiper-gl.esm.js';
import '@/plugins/shaders-slider/dist/swiper-gl.scss';

// Extend SwiperOptions to include the 'gl' property
interface ExtendedSwiperOptions {
    gl?: {
        shader: string;
    };
}

// Slide data array
const slides = [
    {
        imgSrc: "/img/slider/banner/warehouse-management.jpg",
        title: "Who Are We?",
        paragraphs: [
            "We are a digital and branding company that believes in the power of creative strategy and along with great design.",
            "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
        ]
    },
    {
        imgSrc: "/img/slider/banner/car-oark-solutions.jpg",
        title: "Who Are We?",
        paragraphs: [
            "We are a digital and branding company that believes in the power of creative strategy and along with great design.",
            "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
        ]
    },
    {
        imgSrc: "/img/slider/banner/industrial-workshop.jpg",
        title: "Who Are We?",
        paragraphs: [
            "We are a digital and branding company that believes in the power of creative strategy and along with great design.",
            "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
        ]
    },
    {
        imgSrc: "/img/slider/banner/escalator-handling.jpg",
        title: "Who Are We?",
        paragraphs: [
            "We are a digital and branding company that believes in the power of creative strategy and along with great design.",
            "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
        ]
    }
];

export default function ShaderSlider() {
    return (
        <section className="wrapper" id="ShaderSlider">
            <Swiper
                modules={[Navigation, Autoplay, SwiperGL]}
                autoplay={{ delay: 5000 }}
                speed={1000}
                loop={true}
                effect="gl"
                onBeforeInit={(swiper) => {
                    // @ts-ignore
                    swiper.params.gl = { shader: 'wind' };
                }}
                navigation={{
                    nextEl: '.swiper-nxt',
                    prevEl: '.swiper-prev',
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <img src={slide.imgSrc} alt="slider" className="swiper-gl-image w-100" />
                        <div className="swiper-slide-content">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-lg-6 order-lg-2"></div>
                                    <div className="col-lg-6 content__block">
                                        <h2 className="display-4 mb-3">
                                            <span className='underline-3 style-3 br-green'>{slide.title}</span>
                                        </h2>
                                        {slide.paragraphs.map((paragraph, pIndex) => (
                                            <p key={pIndex} className="lead fs-lg">{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="swiper-navigation">
                    <div className="swiper-nav swiper-nxt"></div>
                    <div className="swiper-nav swiper-prev"></div>
                </div>
            </Swiper>
        </section>
    );
}
