"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About36() {

  const sectionRef = useRef(null);

  // GSAP Animation Hook
  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      x: -100,
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
    <section ref={sectionRef} className="wrapper bg-gray">
      <div className="container py-15 py-md-17">
        <div className="row gy-10 gy-sm-13 gx-md-8 gx-xl-12 align-items-center mb-5">
          <div className="col-lg-6">
            <div className="row gx-md-5 gy-5">
              <div className="col-12">
                <figure className="rounded mx-md-5">
                  <img src="/img/photos/g8.jpg" srcSet="/img/photos/g8@2x.jpg 2x" alt="" />
                </figure>
              </div>

              <div className="col-md-6">
                <figure className="rounded">
                  <img src="/img/photos/g9.jpg" srcSet="/img/photos/g9@2x.jpg 2x" alt="" />
                </figure>
              </div>

              <div className="col-md-6">
                <figure className="rounded">
                  <img src="/img/photos/g10.jpg" srcSet="/img/photos/g10@2x.jpg 2x" alt="" />
                </figure>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <h3 className="display-2 ls-xs mb-8">
              We bring <span className="underline-def">solutions</span> to make life easier for our customers.
            </h3>

            <div className="row gy-6">
              <div className="col-md-6">
                <h3 className="fs-21 ls-xs mb-1">Title 1</h3>
                <p className="mb-0">Curabitur blandit lacus magna ridiculus mus duis mollis.</p>
              </div>

              <div className="col-md-6">
                <h3 className="fs-21 ls-xs mb-1">Title 2</h3>
                <p className="mb-0">Curabitur blandit lacus magna ridiculus mus duis mollis.</p>
              </div>

              <div className="col-md-6">
                <h3 className="fs-21 ls-xs mb-1">Title 3</h3>
                <p className="mb-0">Curabitur blandit lacus magna ridiculus mus duis mollis.</p>
              </div>

              <div className="col-md-6">
                <h3 className="fs-21 ls-xs mb-1">Title 4</h3>
                <p className="mb-0">Curabitur blandit lacus magna ridiculus mus duis mollis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
