"use client";

import { useState } from "react";
import clsx from "clsx";

type FAQItem = {
  title?: string | null;
  description?: string | null;
};

type FAQBlockProps = {
  titleSize?: string | null;
  title?: string | null;
  description?: string | null;
  faqitems?: FAQItem[] | null;
  background?: string[] | null;
  height?: string | null;
  disablePaddingTop?: boolean | null;
  disablePaddingBottom?: boolean | null;
  sectionId?: string | null;
  sectionClass?: string | null;
};

export default function FAQ2({
  titleSize,
  title,
  description,
  faqitems,
  background,
  height,
  disablePaddingTop,
  disablePaddingBottom,
  sectionId,
  sectionClass,
}: FAQBlockProps) {
  console.log("🟢 Apollo data:", {
    titleSize,
    title,
    description,
    faqitems,
  });

  const ptClass = disablePaddingTop ? "pt-0" : "pt-16";
  const pbClass = disablePaddingBottom ? "pb-0" : "pb-16";

  const bgClass = background?.includes("bg_soft_primary")
    ? "bg-soft-primary"
    : background?.includes("bg_white")
      ? "bg-white"
      : "";

  const sectionHeight = height ? `min-h-[${height}]` : "";

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id={sectionId ?? undefined}
      className={clsx(
        "wrapper",
        bgClass,
        sectionHeight,
        ptClass,
        pbClass,
        sectionClass
      )}
    >
      <div className="container py-14 py-md-16">
        <div className="row">
          <div className="col-lg-11 col-xxl-10 mx-auto text-center">
            {title && (
              <h2
                className={clsx(
                  "text-uppercase mb-3",
                  titleSize === "h2"
                    ? "fs-15"
                    : titleSize === "h3"
                      ? "fs-14"
                      : "fs-13"
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <h3
                className="display-5 mb-10 px-lg-12 px-xl-10 px-xxl-15"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-7 mx-auto">
            <div className="accordion-wrapper" id="accordion">
              {(faqitems ?? []).map((item, i) => (
                <div
                  key={i}
                  className={clsx("card accordion-item", {
                    active: openIndex === i,
                  })}
                >
                  <div className="card-header">
                    <button
                      className={clsx("accordion-button", {
                        collapsed: openIndex !== i,
                      })}
                      onClick={() => toggleAccordion(i)}
                      aria-expanded={openIndex === i ? "true" : "false"}
                    >
                      {item.title}
                    </button>
                  </div>

                  <div
                    className={clsx("accordion-collapse collapse", {
                      show: openIndex === i,
                    })}
                  >
                    <div
                      className="card-body"
                      dangerouslySetInnerHTML={{
                        __html: item.description || "",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
