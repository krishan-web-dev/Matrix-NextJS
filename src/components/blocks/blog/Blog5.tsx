"use client";

import { useQuery } from "@apollo/client/react";
import dayjs from "dayjs";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Carousel from "@/components/reuseable/Carousel";
import NextLink from "@/components/reuseable/links/NextLink";
import carouselBreakpoints from "@/utils/carouselBreakpoints";
import { POSTS_CARD } from "@/graphql/ops/postsCard";
import { wpToSeoPath } from "@/lib/utils/wpToSeoPath";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ---------------- Types ----------------
type Media = { node?: { sourceUrl?: string | null; title?: string | null } | null };
type NewsPost = {
  id?: string | null;
  title?: string | null;
  content?: string | null;
  excerpt?: string | null;
  featuredImage?: Media | null;
  date?: string | null;
};

export type NewsBlockData = {
  __typename?: string | null;
  title?: string | null;
  titleSize?: string | null;
  description?: string | null;
  layout?: string | null;
  selectBy?: string | null;
  numberOfPosts?: number | null;
  selectTag?: { nodes?: { termTaxonomyId: number; name?: string | null }[] | null } | null;
  newsItems?: { nodes?: NewsPost[] | null } | null;
  background?: string | null;
  backgroundImage?: { node?: { sourceUrl?: string | null } | null } | null;
  disablePaddingTop?: boolean | null;
  disablePaddingBottom?: boolean | null;
  sectionId?: string | null;
  sectionClass?: string | null;
  columnCount?: string[] | null;
};

// ---------------- Component ----------------
export default function Blog5({ data }: { data: NewsBlockData }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Animate section
  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      x: 80,
      duration: 2,
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
  const sectionCls = `wrapper ${padTop} ${padBottom} ${data?.sectionClass ?? ""}`.trim();

  const bgColor = data?.background ?? "";
  const bgImage = wpToSeoPath(data?.backgroundImage?.node?.sourceUrl);

  // ---------------- Scenario handling ----------------
  const isLatest = data?.layout === "featured" && data?.selectBy === "latest";
  const isManual = data?.layout === "featured" && data?.selectBy === "manual";

  // ---------------- Fetch posts for "latest" ----------------
  const tagId = data?.selectTag?.nodes?.[0]?.termTaxonomyId ?? null;
  const postCount = data?.numberOfPosts ?? 6;

  const { data: postsData } = useQuery(POSTS_CARD, {
    variables: { categoryId: tagId, first: postCount },
    skip: !isLatest || !tagId,
  });

  const fetchedPosts: NewsPost[] = postsData?.posts?.nodes ?? [];
  const manualPosts: NewsPost[] = data?.newsItems?.nodes ?? [];
  const posts = isLatest ? fetchedPosts : manualPosts;

  // ---------------- Render ----------------
  return (
    <section
      ref={sectionRef}
      id={data?.sectionId ?? "NewsSection"}
      className={sectionCls}
      style={{
        backgroundColor: bgColor || undefined,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
      }}
    >
      <div className="bg-noise"></div>
      <div className="overflow-hidden">
        <div className="container py-14 py-md-16">
          {/* Header */}
          {(data?.title || data?.description) && (
            <div className="row">
              <div className="col-xl-7 col-xxl-6 mx-auto text-center">
                {data?.title && (
                  <h2
                    className="display-5 text-center mt-2 mb-6"
                    dangerouslySetInnerHTML={{ __html: data.title }}
                  />
                )}
                {data?.description && (
                  <p
                    className="lead fs-lg text-center mb-10"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  />
                )}
              </div>
            </div>
          )}

          {/* Posts carousel */}
          <div className="swiper-container nav-bottom nav-color mb-14 swiper-container-3">
            <Carousel
              grabCursor
              pagination={false}
              className="overflow-visible pb-2"
              breakpoints={carouselBreakpoints}
              autoplay={true}
            >
              {posts.map((item, index) => {
                const imgSrc = wpToSeoPath(item.featuredImage?.node?.sourceUrl);
                return (
                  <article key={index}>
                    <div className="card shadow-lg">
                      <figure className="card-img-top overlay overlay-1">
                        <Link href="#">
                          {imgSrc && (
                            <Image
                              src={imgSrc}
                              alt={item.featuredImage?.node?.title ?? item.title ?? "Post"}
                              width={600}
                              height={400}
                              className="rounded"
                            />
                          )}
                          <span className="bg" />
                        </Link>
                        <figcaption>
                          <h5 className="from-top mb-0">Read More</h5>
                        </figcaption>
                      </figure>

                      <div className="card-body p-6">
                        <div className="post-header">
                          <h2 className="post-title h4 mt-1 mb-3">
                            <NextLink title={item.title ?? ""} href="#" className="link-dark" />
                          </h2>
                        </div>

                        <div className="post-footer">
                          <ul className="post-meta d-flex mb-0">
                            {item.date && (
                              <li className="post-date">
                                <i className="uil uil-calendar-alt" />
                                <span>{dayjs(item.date).format("DD MMM YYYY")}</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
