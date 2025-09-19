"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./video.scss";

// Dynamically import ReactPlayer (client-side only)
const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function YouTubePlayer({ videoUrl }: { videoUrl: string }) {
    const [playing, setPlaying] = useState(false);
    const sectionRef = useRef(null);

    // GSAP Animation Hook
    useGSAP(() => {
        gsap.from(sectionRef.current, {
            opacity: 0,
            y: 100,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%", // Triggers when 85% of the section is visible
                toggleActions: "play none none reset",
                //once: true,
            },
        });
    }, []);

    return (
        <section ref={sectionRef} className="full__screen" style={{ backgroundColor: "#f8f8f8" }}>
            <div className="bg-noise"></div>
            <div className="container">
                <div className="row text-center">
                    <div className="col-lg-12 mx-auto">
                        <div className="position-relative">
                            <div className="position-relative ratio ratio-16x9 video-wrapper rounded-md">
                                {!playing && (
                                    <div style={{ zIndex: 2 }}>
                                        <div className="video-intro position-absolute">
                                            <h3 className="display-2 ls-xs mb-8">
                                                Discover Matrix
                                            </h3>
                                            <p>
                                                Discover how Matrix Pvt Ltd is shaping the future with innovation and excellence. Watch our story unfold and see how we bring ideas to life through cutting-edge solutions and a commitment to quality.
                                            </p>
                                            <a
                                                onClick={() => setPlaying(true)}
                                                className="btn btn-circle btn-def btn-play ripple mx-auto mb-6"
                                            >
                                                <i className="icn-caret-right" />
                                            </a>
                                        </div>
                                        <img
                                            src={`/img/photos/automation-technology-use-cases.jpg`}
                                            alt="Video Thumbnail"
                                            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded cursor-pointer"
                                            onClick={() => setPlaying(true)}
                                        />
                                    </div>
                                )}
                                <ReactPlayer url={videoUrl} playing={playing} controls width="100%" height="100%" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Helper function to extract the YouTube Video ID from a URL
function getYouTubeID(url: string) {
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
}
