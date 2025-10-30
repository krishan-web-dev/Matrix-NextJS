"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wpToSeoPath } from "@/lib/utils/wpToSeoPath";

import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

// ---------------- Types from GraphQL ----------------
type MediaNode = { title?: string | null; sourceUrl?: string | null };
type LogoNode = { nodes?: MediaNode[] | null };

export type LogoCarouselBlockData = {
  __typename?: string | null;
  title?: string | null;
  description?: string | null;
  logo?: LogoNode | null;
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
export default function Brands({ data }: { data: LogoCarouselBlockData }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // GSAP Animation
  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current, {
      opacity: 0,
      x: 100,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none reset",
      },
    });
  }, []);

  const logos = data?.logo?.nodes ?? [];

  const padTop = data?.disablePaddingTop ? "pt-0" : "pt-12";
  const padBottom = data?.disablePaddingBottom ? "pb-0" : "pb-12";
  const sectionCls = `wrapper ${padTop} ${padBottom} ${data?.sectionClass ?? ""}`.trim();

  // Background settings
  const bgColor = data?.background ?? "";
  const bgImage = wpToSeoPath(data?.backgroundImage?.node?.sourceUrl);
  const hasOverlay = data?.style?.includes("overlay");

  return (
    <section
      ref={sectionRef}
      id={data?.sectionId ?? "LogoCarousel"}
      className={`${sectionCls} ${hasOverlay ? "bg-overlay bg-overlay-800 text-white" : ""}`}
      style={{
        backgroundColor: bgColor || undefined,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
      }}
    >
      <div className="bg-noise"></div>
      <div className="container-fluid py-14 py-md-16 brands">
        {/* ---------------- Header ---------------- */}
        {(data?.title || data?.description) && (
          <div className="row justify-content-md-center mb-12">
            <div className="col-md-8 text-center">
              {data?.title && (
                <h3
                  className="display-2 ls-xs mb-2"
                  dangerouslySetInnerHTML={{ __html: data.title }}
                />
              )}
              {data?.description && (
                <p
                  className="lead fs-lg pe-xxl-5"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              )}
            </div>
          </div>
        )}

        {/* ---------------- Logo Loop Animation ---------------- */}
        <div className="logo-loop_line">
          <div className="logo-loop_list">
            {logos.map((item, index) => {
              const imgSrc = wpToSeoPath(item.sourceUrl);
              return (
                <div className="logo-loop_wrapper" key={`loop1-${index}`}>
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={item.title ?? "Brand Logo"}
                      width={450}
                      height={301}
                      className="brand__logo"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* second loop for continuous animation */}
          <div className="logo-loop_list">
            {logos.map((item, index) => {
              const imgSrc = wpToSeoPath(item.sourceUrl);
              return (
                <div className="logo-loop_wrapper" key={`loop2-${index}`}>
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={item.title ?? "Brand Logo"}
                      width={450}
                      height={301}
                      className="brand__logo"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reverse scrolling line */}
        <div className="logo-loop_line reverse">
          <div className="logo-loop_list">
            {logos.map((item, index) => {
              const imgSrc = wpToSeoPath(item.sourceUrl);
              return (
                <div className="logo-loop_wrapper" key={`rev1-${index}`}>
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={item.title ?? "Brand Logo"}
                      width={450}
                      height={301}
                      className="brand__logo"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="logo-loop_list">
            {logos.map((item, index) => {
              const imgSrc = wpToSeoPath(item.sourceUrl);
              return (
                <div className="logo-loop_wrapper" key={`rev2-${index}`}>
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={item.title ?? "Brand Logo"}
                      width={450}
                      height={301}
                      className="brand__logo"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
