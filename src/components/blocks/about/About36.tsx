"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { wpToSeoPath } from "@/lib/utils/wpToSeoPath";

gsap.registerPlugin(ScrollTrigger);

// ------------------- Types (based on your GraphQL fragment) -------------------
type Media = { node?: { sourceUrl?: string | null; title?: string | null } | null };
type MasonaryBlock =
  | {
    __typename?: "PageLayoutsLayoutsMasonaryBlocksListBlockLayout";
    title?: string | null;
    titleSize2?: string | null;
    description?: string | null;
  }
  | {
    __typename?: "PageLayoutsLayoutsMasonaryBlocksImageBlockLayout";
    image?: Media | null;
  };

export type MasonryImageTextBlockData = {
  __typename?: string | null;
  title?: string | null;
  description?: string | null;
  masonaryBlocks?: MasonaryBlock[] | null;
  disablePaddingTop?: boolean | null;
  disablePaddingBottom?: boolean | null;
  style?: string | null;
  verticalAlign?: string | null;
  sectionId?: string | null;
  sectionClass?: string | null;
};

// ------------------------------- Component -----------------------------------
export default function About36({ data }: { data: MasonryImageTextBlockData }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // GSAP animation
  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current, {
      opacity: 0,
      x: -100,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none reset",
      },
    });
  }, []);

  const padTop = data?.disablePaddingTop ? "pt-0" : "pt-12";
  const padBottom = data?.disablePaddingBottom ? "pb-0" : "pb-12";
  const sectionCls = `wrapper bg-gray ${padTop} ${padBottom} ${data?.sectionClass ?? ""}`.trim();

  // Split blocks into image and text groups for layout
  const imageBlocks =
    data?.masonaryBlocks?.filter(
      (b) => b.__typename === "PageLayoutsLayoutsMasonaryBlocksImageBlockLayout"
    ) ?? [];
  const textBlocks =
    data?.masonaryBlocks?.filter(
      (b) => b.__typename === "PageLayoutsLayoutsMasonaryBlocksListBlockLayout"
    ) ?? [];

  return (
    <section ref={sectionRef} id={data?.sectionId ?? "MasonryImageText"} className={sectionCls}>
      <div className="container py-15 py-md-17">
        {/* Header Section */}
        {(data?.title || data?.description) && (
          <div className="row justify-content-center mb-10">
            <div className="col-lg-8 text-center">
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

        <div className="row gy-10 gy-sm-13 gx-md-8 gx-xl-12 align-items-center mb-5">
          {/* Left Column: Images */}
          <div className="col-lg-6">
            <div className="row gx-md-5 gy-5">
              {imageBlocks.map((block, index) => {
                const imgUrl = wpToSeoPath(block.image?.node?.sourceUrl);
                if (!imgUrl) return null;
                return (
                  <div
                    key={index}
                    className={`col-12 ${index > 0 ? "col-md-6" : ""}`}
                  >
                    <figure className="rounded mx-md-3">
                      <Image
                        src={imgUrl}
                        alt={block.image?.node?.title ?? "Masonry image"}
                        width={700}
                        height={700}
                        className="rounded"
                      />
                    </figure>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Text blocks */}
          <div className="col-lg-6">
            {textBlocks.length > 0 && (
              <div className="row gy-6">
                {textBlocks.map((block, index) => {
                  const HeadingTag =
                    (block.titleSize2 as keyof JSX.IntrinsicElements) || "h3";
                  return (
                    <div className="col-md-6" key={index}>
                      {block.title && (
                        <HeadingTag className="fs-21 ls-xs mb-1">
                          {block.title}
                        </HeadingTag>
                      )}
                      {block.description && (
                        <p className="mb-0">{block.description}</p>
                      )}
                    </div>
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
