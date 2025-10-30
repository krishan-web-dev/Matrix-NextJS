"use client";

import { Counter1 } from "@/components/reuseable/counter";
import { wpToSeoPath } from "@/lib/utils/wpToSeoPath";
import Image from "next/image";

// GraphQL Data Types
type Media = { node?: { sourceUrl?: string | null } | null };
type CounterItem = {
  __typename?: "PageLayoutsLayoutsCounterblocksListLayout";
  title?: string | null;
  values?: string | null;
};

export type CounterBlockData = {
  __typename?: string | null;
  title?: string | null;
  description?: string | null;
  counterblocks?: CounterItem[] | null;
  background?: string | null;
  backgroundImage?: Media | null;
  verticalAlign?: string | null;
  style?: string | null;
  disablePaddingTop?: boolean | null;
  disablePaddingBottom?: boolean | null;
  sectionId?: string | null;
  sectionClass?: string | null;
};

// ----------------------------- Component -----------------------------

export default function Facts7({ data }: { data: CounterBlockData }) {
  const padTop = data?.disablePaddingTop ? "pt-0" : "pt-12";
  const padBottom = data?.disablePaddingBottom ? "pb-0" : "pb-12";
  const sectionCls = `wrapper ${padTop} ${padBottom} ${data?.sectionClass ?? ""
    }`.trim();

  // Background image and style handling
  const bgImage = wpToSeoPath(data?.backgroundImage?.node?.sourceUrl);
  const bgColor = data?.background ?? "";
  const hasOverlay = data?.style?.includes("overlay");

  const counters = data?.counterblocks ?? [];

  return (
    <section
      id={data?.sectionId ?? "CounterBlock"}
      className={`${sectionCls} ${hasOverlay ? "bg-overlay bg-overlay-800 text-white" : ""
        }`}
      style={{
        backgroundColor: bgColor || undefined,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
      }}
    >
      <div className="container py-14 pt-md-17 pb-md-17">
        <div
          className={`row gx-lg-8 gx-xl-12 gy-10 gy-lg-0 mb-2 align-items-center ${hasOverlay ? "text-white" : ""
            }`}
        >
          {/* Left Column: Title + Description */}
          <div
            className={`col-lg-4 ${data?.verticalAlign === "center" ? "align-self-center" : ""
              }`}
          >
            {data?.title && (
              <h3
                className={`display-4 mb-3 pe-xxl-15 ${hasOverlay ? "text-white" : ""
                  }`}
                dangerouslySetInnerHTML={{ __html: data.title }}
              />
            )}
            {data?.description && (
              <p
                className={`lead fs-lg mb-0 pe-xxl-10 ${hasOverlay ? "text-white" : ""
                  }`}
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            )}
          </div>

          {/* Right Column: Counters */}
          <div className="col-lg-8 mt-lg-2">
            <div
              className={`row align-items-center counter-wrapper gy-6 text-center ${hasOverlay ? "text-white" : ""
                }`}
            >
              {counters.map((item, index) => {
                const rawValue = item.values ?? "0";
                const value = String(rawValue).replace(/[^0-9]/g, "");
                return (
                  <Counter1
                    key={index}
                    title={item.title ?? ""}
                    number={parseInt(value, 10)}
                    titleColor={hasOverlay ? "text-white" : "text-dark"}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
