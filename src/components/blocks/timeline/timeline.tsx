'use client';

import { useEffect, useState } from "react";
import "./timeline.scss";

// Timeline Data Array
const timelineData = [
    {
        date: "1995",
        text: "Matrix (Pvt) Ltd. founded as a Compressed Air Solutions Provider.",
        imgSrc: "./img/01.jpg", // Replace with relevant image URL
        imgAlt: "Compressed Air Solutions",
    },
    {
        date: "1999",
        text: "Expanded to Material Handling Solutions.",
        imgSrc: "./img/02.jpg", // Replace with relevant image URL
        imgAlt: "Material Handling Solutions",
    },
    {
        date: "2001",
        text: "Added Automobile Maintenance Solutions.",
        imgSrc: "./img/03.jpg", // Replace with relevant image URL
        imgAlt: "Automobile Maintenance",
    },
    {
        date: "2013",
        text: "Entered Welding Products Solutions.",
        imgSrc: "./img/01.jpg", // Replace with relevant image URL
        imgAlt: "Welding Products",
    },
    {
        date: "2016",
        text: "Awarded Bronze Status for sales and aftermarket performance.",
        imgSrc: "./img/02.jpg", // Replace with relevant image URL
        imgAlt: "Award Recognition",
    },
    {
        date: "2017",
        text: "Introduced Car Parking Solutions.",
        imgSrc: "./img/03.jpg",// Replace with relevant image URL
        imgAlt: "Car Parking Solutions",
    },
    {
        date: "2018",
        text: "Continued growth, earning multiple awards.",
        imgSrc: "./img/01.jpg",// Replace with relevant image URL
        imgAlt: "Company Growth",
    },
    {
        date: "2019",
        text: "Added Elevators & Escalators Division.",
        imgSrc: "./img/02.jpg", // Replace with relevant image URL
        imgAlt: "Elevators & Escalators",
    }
];


export default function Timeline() {
    const [progressHeight, setProgressHeight] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const timeline = document.querySelector(".section-timeline");
            if (!timeline) return;

            const rect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalHeight = timeline.scrollHeight - windowHeight;
            const scrolled = Math.min(Math.max(-rect.top, 0), totalHeight);

            // Convert scroll position to percentage
            const progress = (scrolled / totalHeight) * 100;
            setProgressHeight(progress);
        };

        window.addEventListener("scroll", updateProgress);
        return () => window.removeEventListener("scroll", updateProgress);
    }, []);

    return (
        <section className="section-timeline">
            {/* Timeline Heading */}
            <div className="section-timeline-heading">
                <div className="container">
                    <div className="padding-vertical-xlarge">
                        <div className="timeline-main_heading-wrapper">

                            <h2>The Journey of Growth and Innovation</h2>

                            <p className="paragraph-large">
                                Matrix (Pvt) Ltd. has evolved from a small compressed air solutions provider to a leading player in diverse sectors. Over the years, the company has expanded its services to include material handling, automobile maintenance, welding products, car parking solutions, and more. This timeline reflects key milestones in the company's growth, showcasing its commitment to excellence and its ability to adapt to new opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="timeline_component">
                    {/* Fixed Progress Bar */}
                    <div className="timeline_progress">
                        <div
                            className="timeline_progress-bar"
                            style={{ height: `${progressHeight}%` }}
                        ></div>
                    </div>

                    {/* Mapping Timeline Items */}
                    {timelineData.map((event, index) => (
                        <div className="timeline_item" key={index}>
                            <div className="timeline_left">
                                <div className="timeline_date-text">{event.date}</div>
                            </div>
                            <div className="timeline_centre">
                                <div className="timeline_circle"></div>
                            </div>
                            <div className="timeline_right">
                                <div className="timeline_text">{event.text}</div>
                                <div className="timeline_image-wrapper">
                                    <img
                                        src={event.imgSrc}
                                        loading="lazy"
                                        width="480"
                                        alt={event.imgAlt}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
