"use client";

import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import clsx from "clsx";

import Carousel from "@/components/reuseable/Carousel";
import { TESTIMONIALS_CARD } from "@/graphql/ops/testimonialsCard";
import { wpToSeoPath } from "@/lib/utils/wpToSeoPath";
import carouselBreakpoints from "@/utils/carouselBreakpoints";

// ---------------- Types ----------------
type Media = { node?: { title?: string | null; sourceUrl?: string | null } | null };
type Testimonial = {
  databaseId?: number | null;
  title?: string | null;
  testimonials?: {
    description?: string | null;
    designation?: string | null;
    image?: Media | null;
  } | null;
};
type Division = {
  databaseId?: number;
  name?: string;
  testimonials?: { nodes?: Testimonial[] | null } | null;
};

export type TestimonialBlockData = {
  __typename?: string | null;
  title?: string | null;
  titleSize?: string | null;
  description?: string | null;
  layout?: string | null;
  selectBy?: string | null;
  numberOfPosts?: number | null;
  selectTag?: { nodes?: { databaseId: number; name?: string | null }[] | null } | null;
  testimonialItems?: { nodes?: Testimonial[] | null } | null;
  background?: string | null;
  backgroundImage?: { node?: { sourceUrl?: string | null } | null } | null;
  disablePaddingTop?: boolean | null;
  disablePaddingBottom?: boolean | null;
  sectionId?: string | null;
  sectionClass?: string | null;
};

// ---------------- Component ----------------
export default function Testimonial4({ data }: { data: TestimonialBlockData }) {
  const padTop = data?.disablePaddingTop ? "pt-0" : "pt-12";
  const padBottom = data?.disablePaddingBottom ? "pb-0" : "pb-12";
  const sectionCls = `wrapper ${padTop} ${padBottom} ${data?.sectionClass ?? ""}`.trim();

  const isLatest = data?.layout === "featured" && data?.selectBy === "latest";
  const isManual = data?.layout === "featured" && data?.selectBy === "manual";

  // ---------------- Fetch testimonials dynamically ----------------
  const divisionIds =
    data?.selectTag?.nodes?.map((tag) => tag.databaseId.toString());
  const postCount = data?.numberOfPosts ?? 3;

  const { data: testimonialsData, loading, error } = useQuery(TESTIMONIALS_CARD, {
    variables: { divisionIds, first: postCount },
    skip: !isLatest,
  });


  // Flatten testimonials from all divisions
  const fetchedTestimonials: Testimonial[] =
    testimonialsData?.terms?.nodes
      ?.flatMap((div: Division) => div.testimonials?.nodes || [])
      ?.filter(Boolean) ?? [];

  const manualTestimonials: Testimonial[] = data?.testimonialItems?.nodes ?? [];
  const testimonials = isLatest ? fetchedTestimonials : manualTestimonials;

  return (
    <section id={data?.sectionId ?? "Testimonials"} className={sectionCls}>
      <div className="container py-14 py-md-16">
        {(data?.title || data?.description) && (
          <div className="row mb-10 text-center">
            <div className="col-lg-8 mx-auto">
              {data?.title && (
                <h2
                  className={`display-4 ${data?.titleSize ?? "h2"}`}
                  dangerouslySetInnerHTML={{ __html: data.title }}
                />
              )}
              {data?.description && (
                <p
                  className="lead fs-lg"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              )}
            </div>
          </div>
        )}

        {/* Testimonials Carousel */}
        <div className="swiper-container dots-closer mb-6">
          <Carousel
            spaceBetween={0}
            autoplay
            grabCursor
            navigation={false}
            breakpoints={carouselBreakpoints}
          >
            {testimonials.map((item, index) => {
              const t = item.testimonials ?? {};
              const imgSrc = wpToSeoPath(t.image?.node?.sourceUrl);

              return (
                <div className="item-inner" key={item.databaseId ?? index}>
                  <div className={clsx("card", "shadow-lg")}>
                    <div className="card-body">
                      <span className="ratings five mb-3" />
                      <blockquote className="icon mb-0">
                        <p>“{t.description ?? ""}”</p>
                        <div className="blockquote-details">
                          {imgSrc && (
                            <figure className="rounded-circle w-12 overflow-hidden">
                              <Image
                                alt={t.image?.node?.title ?? item.title ?? "Client"}
                                width={100}
                                height={100}
                                src={imgSrc}
                                className="w-100 h-auto"
                              />
                            </figure>
                          )}
                          <div className="info">
                            <h5 className="mb-0">{item.title}</h5>
                            {t.designation && <p className="mb-0">{t.designation}</p>}
                          </div>
                        </div>
                      </blockquote>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
