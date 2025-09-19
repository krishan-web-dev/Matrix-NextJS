"use client";

import dayjs from "dayjs";
import Link from "next/link";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GLOBAL CUSTOM COMPONENTS
import Carousel from "components/reuseable/Carousel";
import NextLink from "components/reuseable/links/NextLink";
// CUSTOM UTILS
import carouselBreakpoints from "utils/carouselBreakpoints";
// CUSTOM DATA
import { blogList3 } from "data/blog";

gsap.registerPlugin(ScrollTrigger);

export default function Blog5() {

  const sectionRef = useRef(null);

  // GSAP Animation Hook
  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      x: 80,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%", // Triggers when 85% of the section is visible
        toggleActions: "play none none reset",
        //once: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="wrapper bg-grd-right">
      <div className="bg-noise"></div>
      <div className="overflow-hidden">
        <div className="container py-14 py-md-16">
          <div className="row">
            <div className="col-xl-7 col-xxl-6 mx-auto text-center">
              <h2 className="display-5 text-center mt-2 mb-10">
                Insights & Updates:<br /> Explore Our Latest Blog Posts
              </h2>
            </div>
          </div>

          <div className="swiper-container nav-bottom nav-color mb-14 swiper-container-3">
            <Carousel grabCursor pagination={false} className="overflow-visible pb-2" breakpoints={carouselBreakpoints} autoplay={true}>
              {blogList3.map((item) => (
                <article key={item.id}>
                  <div className="card shadow-lg">
                    <figure className="card-img-top overlay overlay-1">
                      <Link href="#">
                        <img src={item.image["1x"]} srcSet={item.image["2x"]} alt="" />
                        <span className="bg" />
                      </Link>

                      <figcaption>
                        <h5 className="from-top mb-0">Read More</h5>
                      </figcaption>
                    </figure>

                    <div className="card-body p-6">
                      <div className="post-header">
                        <div className="post-category">
                          <NextLink title={item.category} href="#" className="hover" />
                        </div>

                        <h2 className="post-title h3 mt-1 mb-3">
                          <NextLink title={item.title} href={item.link} className="link-dark" />
                        </h2>
                      </div>

                      <div className="post-footer">
                        <ul className="post-meta d-flex mb-0">
                          <li className="post-date">
                            <i className="uil uil-calendar-alt" />
                            <span>{dayjs(item.createdAt).format("DD MMM YYYY")}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
