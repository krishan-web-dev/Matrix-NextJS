"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./video.scss";

import { wpToSeoPath } from "@/lib/utils/wpToSeoPath";

// Dynamically import ReactPlayer (client-side only)
const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

/** ====== GraphQL-driven shape for VideoBlock ====== */
type Media = { node?: { sourceUrl?: string | null } | null };

export type VideoBlockData = {
    __typename?: string | null;
    title?: string | null;
    videoDescription?: string | null;
    videoUrl?: string | null;
    videoThumbnail?: Media | null;
    background?: string | null;       // e.g., hex or token
    backgroundImage?: Media | null;   // optional bg image
    disablePaddingTop?: boolean | null;
    disablePaddingBottom?: boolean | null;
    sectionId?: string | null;
    sectionClass?: string | null;
};

function getSectionStyle(data: VideoBlockData): React.CSSProperties | undefined {
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

export default function YouTubePlayer({ data }: { data: VideoBlockData }) {
    const [playing, setPlaying] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    // GSAP Animation Hook
    useGSAP(() => {
        if (!sectionRef.current) return;
        gsap.from(sectionRef.current, {
            opacity: 0,
            y: 100,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none reset",
            },
        });
    }, []);

    // Derive layout classes from ACF flags
    const padTop = data?.disablePaddingTop ? "pt-0" : "pt-12";
    const padBottom = data?.disablePaddingBottom ? "pb-0" : "pb-12";
    const sectionCls = `full__screen ${padTop} ${padBottom} ${data?.sectionClass ?? ""}`.trim();
    const sectionStyle = getSectionStyle(data);

    // Content bindings + fallbacks
    const title = data?.title ?? "Discover Matrix";
    const description =
        data?.videoDescription ??
        "Discover how Matrix Pvt Ltd is shaping the future with innovation and excellence. Watch our story unfold and see how we bring ideas to life through cutting-edge solutions and a commitment to quality.";

    const url = data?.videoUrl ?? ""; // ReactPlayer handles empty as no-op
    const thumb = wpToSeoPath(data?.videoThumbnail?.node?.sourceUrl);

    return (
        <section
            ref={sectionRef as any}
            className={sectionCls}
            id={data?.sectionId ?? "VideoBlock"}
            style={{ backgroundColor: "#f8f8f8", ...sectionStyle }}
        >
            <div className="bg-noise"></div>
            <div className="container">
                <div className="row text-center">
                    <div className="col-lg-12 mx-auto">
                        <div className="position-relative">
                            <div className="position-relative ratio ratio-16x9 video-wrapper rounded-md">
                                {!playing && (
                                    <div style={{ zIndex: 2 }}>
                                        <div className="video-intro position-absolute">
                                            <h3 className="display-2 ls-xs mb-8">{title}</h3>
                                            {description && (
                                                <div dangerouslySetInnerHTML={{ __html: description }} />
                                            )}
                                            <a
                                                onClick={() => setPlaying(true)}
                                                className="btn btn-circle btn-def btn-play ripple mx-auto mb-6"
                                            >
                                                <i className="icn-caret-right" />
                                            </a>
                                        </div>

                                        {/* Poster thumbnail */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={thumb}
                                            alt="Video Thumbnail"
                                            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded cursor-pointer"
                                            onClick={() => setPlaying(true)}
                                        />
                                    </div>
                                )}

                                <ReactPlayer
                                    url={url}
                                    playing={playing}
                                    controls
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/** Optional helper if you need to extract video ID elsewhere (unused here) */
function getYouTubeID(url: string) {
    const regExp =
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
}
