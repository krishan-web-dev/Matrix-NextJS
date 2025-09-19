"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GLOBAL CUSTOM COMPONENTS
import Carousel from "components/reuseable/Carousel";
import { TestimonialCard3 } from "components/reuseable/testimonial-cards";
// CUSTOM UTILS LIBRARY FUNCTIONS
import carouselBreakpoints from "utils/carouselBreakpoints";
// CUSTOM DATA
import { testimonialList2 } from "data/testimonial-list";

export default function Testimonial4() {
  const sectionRef = useRef(null);

  // GSAP Animation Hook
  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 100,
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
    <section ref={sectionRef} className="wrapper">
      <div className="container">
        <div className="wrapper bg-light">
          <div className="container py-14 py-md-16">
            <div className="row">
              <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mx-auto text-center">
                <h3 className="display-4 mb-6 px-xl-10 px-xxl-15">
                  Don't take our word for it. See what customers are saying about us.
                </h3>
              </div>
            </div>

            <div className="swiper-container dots-closer mb-6">
              <Carousel
                spaceBetween={0}
                autoplay={true}
                grabCursor
                navigation={false}
                breakpoints={carouselBreakpoints}>
                {testimonialList2.map((item, i) => (
                  <div className="item-inner" key={i}>
                    <TestimonialCard3 {...item} />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
