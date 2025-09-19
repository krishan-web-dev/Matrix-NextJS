"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./FeaturedProducts.scss";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

type Product = {
    id: number;
    title: string;
    image: string;
    slug: string;
};

const products: Product[] = [
    { id: 1, title: "Product One", image: "/img/products/1-1.jpg", slug: "product-one" },
    { id: 2, title: "Product Two", image: "/img/products/1-1.jpg", slug: "product-two" },
    { id: 3, title: "Product Three", image: "/img/products/1-1.jpg", slug: "product-three" },
    { id: 4, title: "Product Four", image: "/img/products/1-1.jpg", slug: "product-four" },
    { id: 5, title: "Product Four", image: "/img/products/1-1.jpg", slug: "product-four" },
];

export default function FeaturedProducts() {
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    return (
        <section className="wrapper py-12">
            <div className="container">
                {/* Title + Navigation Row */}
                <div className="row">
                    <div className="col-8">
                        <h2 className="text-2xl font-bold">Featured Products</h2>
                    </div>
                    <div className="col-4"
                        style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                    >
                        <div className="swiper-nav"
                            style={{ display: "flex", gap: "10px" }}>
                            <div
                                ref={prevRef}
                            >
                                <GoChevronLeft size={40} />
                            </div>
                            <div
                                ref={nextRef}
                            >
                                <GoChevronRight size={40} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carousel Row */}
                <Swiper
                    className="featured-products-swiper"
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={4}
                    loop={true}
                    //autoplay={{ delay: 3000 }}
                    pagination={false}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current;
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <Link
                                href={`/products/${product.slug}`}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full"
                                />
                                <h3>{product.title}</h3>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
