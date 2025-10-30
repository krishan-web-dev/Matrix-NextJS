"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { wpToSeoPath } from "@/lib/utils/wpToSeoPath";
import "./timeline.scss";

type TimelineItem = {
    title?: string | null;
    subTitle?: string | null;
    year?: string | null;
    image?: {
        node?: {
            databaseId?: number;
            title?: string | null;
            sourceUrl?: string | null;
        } | null;
    } | null;
};

type TimelineBlockProps = {
    titleSize?: string | null;
    title?: string | null;
    description?: string | null;
    timelineBlocks?: TimelineItem[] | null;
    background?: string | null;
    backgroundImage?: { node?: { title?: string | null; sourceUrl?: string | null } | null } | null;
    disablePaddingTop?: boolean | null;
    disablePaddingBottom?: boolean | null;
    sectionId?: string | null;
    sectionClass?: string | null;
};

export default function TimelineBlock({
    titleSize,
    title,
    description,
    timelineBlocks,
    background,
    backgroundImage,
    disablePaddingTop,
    disablePaddingBottom,
    sectionId,
    sectionClass,
}: TimelineBlockProps) {
    const [progressHeight, setProgressHeight] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const timeline = document.querySelector(".section-timeline");
            if (!timeline) return;

            const rect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalHeight = timeline.scrollHeight - windowHeight;
            const scrolled = Math.min(Math.max(-rect.top, 0), totalHeight);
            const progress = (scrolled / totalHeight) * 100;
            setProgressHeight(progress);
        };

        window.addEventListener("scroll", updateProgress);
        return () => window.removeEventListener("scroll", updateProgress);
    }, []);

    // Padding and background
    const ptClass = disablePaddingTop ? "pt-0" : "pt-16";
    const pbClass = disablePaddingBottom ? "pb-0" : "pb-16";
    const bgStyle =
        backgroundImage?.node?.sourceUrl
            ? { backgroundImage: `url(${wpToSeoPath(backgroundImage.node.sourceUrl)})` }
            : background
                ? { backgroundColor: background }
                : {};

    return (
        <section
            id={sectionId ?? undefined}
            className={`section-timeline relative ${ptClass} ${pbClass} ${sectionClass ?? ""}`}
            style={bgStyle}
        >
            <div className="section-timeline-heading">
                <div className="container">
                    <div className="padding-vertical-xlarge">
                        <div className="timeline-main_heading-wrapper">
                            {title && (
                                <h2
                                    className={
                                        titleSize === "large"
                                            ? "text-4xl md:text-5xl font-bold"
                                            : titleSize === "medium"
                                                ? "text-3xl font-semibold"
                                                : "text-2xl font-medium"
                                    }
                                >
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p
                                    className="paragraph-large mt-4 text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="timeline_component">
                    {/* Scroll Progress Bar */}
                    <div className="timeline_progress">
                        <div className="timeline_progress-bar" style={{ height: `${progressHeight}%` }} />
                    </div>

                    {(timelineBlocks ?? []).map((block, i) => {
                        const imgSrc = block.image?.node?.sourceUrl
                            ? wpToSeoPath(block.image.node.sourceUrl)
                            : undefined;
                        return (
                            <div className="timeline_item" key={i}>
                                <div className="timeline_left">
                                    <div className="timeline_date-text">{block.year}</div>
                                </div>
                                <div className="timeline_centre">
                                    <div className="timeline_circle"></div>
                                </div>
                                <div className="timeline_right">
                                    <div className="timeline_text">
                                        {block.title && <h3 className="font-semibold">{block.title}</h3>}
                                        {block.subTitle && (
                                            <p className="text-sm text-muted-foreground">{block.subTitle}</p>
                                        )}
                                    </div>
                                    {imgSrc && (
                                        <div className="timeline_image-wrapper mt-3">
                                            <Image
                                                src={imgSrc}
                                                alt={block.image?.node?.title || ""}
                                                width={480}
                                                height={320}
                                                loading="lazy"
                                                className="rounded-lg object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
