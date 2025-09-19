"use client";

import React, { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import gsap from "gsap";
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function Hero35() {
  const revealRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const typewriterRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".matrix",
        start: "top 80%",
        toggleActions: "restart none none reset",
      },
    });

    // Image Reveal Effect
    tl.set(revealRef.current, { autoAlpha: 1 }) // Make visible
      .from(revealRef.current, {
        xPercent: -100,
        duration: 1.5,
        ease: "power2.out",
      })
      .from(
        imageRef.current,
        {
          xPercent: 100,
          scale: 1.3,
          duration: 1.5,
          ease: "power2.out",
        },
        "-=1.5" // Overlap animation
      )

      // Heading Animation
      .from(
        headingRef.current,
        {
          opacity: 0,
          y: 80,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.6" // Small delay after image reveal
      )

      // Typewriter Animation
      .from(
        typewriterRef.current,
        {
          opacity: 0,
          y: 80,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.6" // Overlap with heading animation
      )

      // Paragraph Animation

      .from(
        paragraphRef.current,
        {
          opacity: 0,
          y: 80,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      );

  }, []);

  return (
    <div className="row align-items-center matrix">
      <div className="col-lg-6 ms-auto position-relative order-lg-2">
        <div ref={revealRef} className="reveal">
          <figure className="position-relative">
            <img ref={imageRef} src="/img/photos/about34.jpg" srcSet="/img/photos/about34@2x.jpg 2x" alt="" />
          </figure>
        </div>
      </div>

      <div className="col-lg-5">
        <h1 ref={headingRef} className="display-1 fs-80 text-uppercase">
          Matrix
        </h1>
        <h2 ref={typewriterRef} className="mb-5 fs-40">
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: ["global excellence", "trusted partner", "innovative solutions"],
            }}
          />
        </h2>
        <p ref={paragraphRef} className="lead fs-25 lh-sm mb-6 pe-md-10">
          As a multifaceted organization, we deliver exceptional solutions tailored to our stakeholders.
          Backed by international accreditations and aligned with global benchmarks, we are a trusted partner to industry leaders worldwide,
          driving innovation and elevating the standards of excellence in every aspect of life we touch.
        </p>
      </div>
    </div>
  );
}
