"use client";

import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import { TESTIMONIALS_CARD } from "@/graphql/ops/testimonialsCard";
import { wpToSeoPath } from "@/lib/utils/wpToSeoPath";

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
  columnCount?: string[] | null;
};

// ---------------- Component ----------------
export default function Testimonial14({ data }: { data: TestimonialBlockData }) {
  const padTop = data?.disablePaddingTop ? "pt-0" : "pt-12";
  const padBottom = data?.disablePaddingBottom ? "pb-0" : "pb-12";
  const sectionCls = `wrapper ${padTop} ${padBottom} ${data?.sectionClass ?? ""}`.trim();

  // Determine mode
  const isLatest = data?.layout === "featured" && data?.selectBy === "latest";
  const isManual = data?.layout === "featured" && data?.selectBy === "manual";

  // Variables for dynamic fetch
  const divisionId = data?.selectTag?.nodes?.[0]?.databaseId?.toString() ?? "";
  const postCount = data?.numberOfPosts ?? 3;

  // Apollo Query — fetch testimonials dynamically if latest
  const { data: testimonialsData } = useQuery(TESTIMONIALS_CARD, {
    variables: { divisionId, first: postCount },
    skip: !isLatest || !divisionId,
  });

  const fetchedTestimonials: Testimonial[] = testimonialsData?.testimonials?.nodes ?? [];
  const manualTestimonials: Testimonial[] = data?.testimonialItems?.nodes ?? [];
  const testimonials = isLatest ? fetchedTestimonials : manualTestimonials;

  return (
    <section id={data?.sectionId ?? "Testimonials"} className={sectionCls}>
      <div className="container py-14 py-md-17">
        {/* Header */}
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

        {/* Testimonials Grid */}
        <div className="row isotope gy-6 mt-n19 mt-md-n22">
          {testimonials.map((item, index) => {
            const t = item.testimonials ?? {};
            const imgSrc = wpToSeoPath(t.image?.node?.sourceUrl);

            return (
              <div className="col-md-6 col-xl-3" key={item.databaseId ?? index}>
                <div className="card shadow-lg">
                  <div className="card-body">
                    <span className="ratings five mb-3" />
                    <blockquote className="icon mb-0">
                      <p>“{t.description ?? ""}”</p>
                      <div className="blockquote-details d-flex flex-column align-items-center mt-4">
                        {imgSrc && (
                          <Image
                            src={imgSrc}
                            alt={t.image?.node?.title ?? item.title ?? "Client"}
                            width={80}
                            height={80}
                            className="rounded-circle mb-3"
                          />
                        )}
                        <h5 className="mb-0">{item.title}</h5>
                        {t.designation && <p className="mb-0">{t.designation}</p>}
                      </div>
                    </blockquote>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
