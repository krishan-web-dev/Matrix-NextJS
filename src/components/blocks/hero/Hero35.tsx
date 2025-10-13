"use client";

import React, { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DynamicHeading } from "@/lib/utils/DynamicHeading";
import { wpToSeoPath } from "@/lib/utils/wpToSeoPath";

gsap.registerPlugin(ScrollTrigger);

/** GraphQL-driven shape for ImageAnimatedTextBlock (no titleSize use) */
type Media = { node?: { sourceUrl?: string | null } | null };
export type ImageAnimatedTextBlockData = {
  __typename?: string | null;
  title?: string | null;
  titleSize?: string | null;
  animatedText?: Array<{ text?: string | null } | null> | null;
  description?: string | null;
  imagePosition?: string | null; // "left" | "right"
  image?: Media | null;
  link?: { title?: string | null; url?: string | null } | null;
  link2?: { title?: string | null; url?: string | null } | null;
  disablePaddingTop?: boolean | null;
  disablePaddingBottom?: boolean | null;
  sectionClass?: string | null;
  sectionId?: string | null;
  background?: string | null;      // optional solid color / token
  backgroundImage?: Media | null;  // optional bg image
};

function getSectionStyle(data: ImageAnimatedTextBlockData): React.CSSProperties | undefined {
  const bgUrl = data.backgroundImage?.node?.sourceUrl ?? undefined;
  const bg = data.background ?? undefined;
  if (!bgUrl && !bg) return undefined;
  return {
    backgroundColor: bg ?? undefined,
    backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
}

export default function Hero35({ data }: { data: ImageAnimatedTextBlockData }) {
  const revealRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const typewriterRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  const allowedTags = ["h2", "h3", "h4", "h5", "h6"] as const;
  const tag = allowedTags.includes(data.titleSize as any)
    ? (data.titleSize as (typeof allowedTags)[number])
    : "h2";

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".matrix",
        start: "top 80%",
        toggleActions: "restart none none reset",
      },
    });

    tl.set(revealRef.current, { autoAlpha: 1 })
      .from(revealRef.current, { xPercent: -100, duration: 1.5, ease: "power2.out" })
      .from(imageRef.current, { xPercent: 100, scale: 1.3, duration: 1.5, ease: "power2.out" }, "-=1.5")
      .from(headingRef.current, { opacity: 0, y: 80, duration: 0.6, ease: "power3.out" }, "-=0.6")
      .from(typewriterRef.current, { opacity: 0, y: 80, duration: 0.6, ease: "power3.out" }, "-=0.6")
      .from(paragraphRef.current, { opacity: 0, y: 80, duration: 1, ease: "power3.out" }, "-=0.5");
  }, []);

  // derive layout classes from ACF flags
  const padTop = data?.disablePaddingTop ? "pt-0" : "pt-12";
  const padBottom = data?.disablePaddingBottom ? "pb-0" : "pb-12";
  const sectionCls = `full__screen ${padTop} ${padBottom} ${data?.sectionClass ?? ""}`.trim();
  const sectionStyle = getSectionStyle(data);

  // image on right by default, swap if imagePosition === "left"
  const imgRight = (data?.imagePosition ?? "right").toLowerCase() !== "left";
  const imageColOrder = imgRight ? "order-lg-2" : "order-lg-1";
  const textColOrder = imgRight ? "" : "order-lg-2";

  // content bindings + fallbacks
  const title = data?.title ?? "Matrix";
  const strings =
    (data?.animatedText ?? [])
      .map(t => (t?.text ?? "").trim())
      .filter(Boolean);

  /*    const heroImage =
    data?.image?.node?.sourceUrl ??
    "/img/photos/about34.jpg"; // original fallback

    */
  const heroImage = wpToSeoPath(data?.image?.node?.sourceUrl);
  console.log("Hero image URL:", data?.image?.node?.sourceUrl, "→", heroImage);

  return (
    <section
      className={sectionCls}
      id={data?.sectionId ?? "ImageAnimatedText"}
      style={sectionStyle}
    >
      <div className="container">
        <div className="row align-items-center matrix">
          {/* Image column */}
          <div className={`col-lg-6 ms-auto position-relative ${imageColOrder}`}>
            <div ref={revealRef} className="reveal">
              <figure className="position-relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img ref={imageRef} src={heroImage} alt={title || "image"} />
              </figure>
            </div>
          </div>

          {/* Text column */}
          <div className={`col-lg-5 ${textColOrder}`}>
            {/* keep original H1 + classes (no titleSize) */}
            <DynamicHeading tag={tag} className="display-1 fs-80 text-uppercase">
              {title}
            </DynamicHeading>

            <h2 ref={typewriterRef} className="mb-5 fs-40">
              <Typewriter
                options={{
                  loop: true,
                  autoStart: true,
                  strings: strings.length
                    ? strings
                    : ["global excellence", "trusted partner", "innovative solutions"],
                }}
              />
            </h2>

            {data?.description ? (
              <div
                ref={paragraphRef}
                className="lead fs-lg"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
              /*<p ref={paragraphRef} className="lead fs-25 lh-sm mb-6 pe-md-10">
                {data.description}
              </p>*/

            ) : null}

            {/* Optional links if provided */}
            <div className="d-flex gap-3">
              {data?.link?.url && (
                <a className="btn btn-primary" href={data.link.url} target="_blank" rel="noreferrer">
                  {data.link.title ?? "Learn more"}
                </a>
              )}
              {data?.link2?.url && (
                <a className="btn btn-soft-primary" href={data.link2.url} target="_blank" rel="noreferrer">
                  {data.link2.title ?? "Explore"}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
