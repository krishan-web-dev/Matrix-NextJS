"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import Link from "next/link";
import "./cards.scss";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Cards() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!wrapperRef.current) return;
        initializeGSAP(wrapperRef);
    }, []);

    return (
        <section ref={sectionRef} className="panel spacer-y">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {/* Tab Navigation (Dynamically Generated) */}
                        <div className="panel__options mb-2">
                            {data.map((item, index) => (
                                <span key={index} data-target={`tab-${index}`} className={index === 0 ? "active" : ""}>
                                    {item.title}
                                </span>
                            ))}
                        </div>

                        {/* Card Stack Display */}
                        <div className="panel__stack" ref={wrapperRef}>
                            {data.map((item, index) => (
                                <Card key={index} index={index} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * GSAP Initialization for ScrollTrigger Animations
 */
function initializeGSAP(wrapperRef: React.RefObject<HTMLDivElement>) {
    const cards = gsap.utils.toArray<HTMLDivElement>(".panel__card");
    const listItems = gsap.utils.toArray<HTMLSpanElement>(".panel__options span");

    // Calculate the total height for the stack
    const cardHeight = (cards[0] as HTMLElement).offsetHeight;
    const stickDistance = cardHeight * 0.5; // Adjust this value for the desired gap

    // Create ScrollTriggers for the first and last cards
    const firstCardST = ScrollTrigger.create({
        trigger: cards[0],
        start: "center center",
    });

    const lastCardST = ScrollTrigger.create({
        trigger: cards[cards.length - 1],
        start: "center center",
    });

    // Apply scaling and pinning to each card
    cards.forEach((card, index) => {
        const scale = 1 - (cards.length - index) * 0.025; // Scale down each card slightly

        // Create a GSAP animation for scaling
        const scaleDown = gsap.to(card, {
            scale: scale,
            transformOrigin: "50% 50%", // Scale from the center
        });

        // Create a ScrollTrigger for each card
        ScrollTrigger.create({
            trigger: card,
            start: "center center",
            end: () => lastCardST.start + stickDistance,
            pin: true,
            pinSpacing: false,
            animation: scaleDown,
            scrub: 0.5, // Smoothly tie the animation to the scroll position
            markers: true, // For debugging, remove in production
            toggleActions: "restart none none reverse", // Control animation behavior
        });
    });

    // Handle tab clicks to scroll to specific cards
    function handleTabClick(id: string) {
        const cardIndex = parseInt(id.replace("tab-", ""), 10);
        const card = cards[cardIndex];
        if (card) {
            gsap.to(window, {
                duration: 0.5,
                scrollTo: card,
                ease: "power2.out",
            });
        }
    }

    // Add click event listeners to tab navigation
    listItems.forEach((link) => {
        link.addEventListener("click", () => handleTabClick(link.getAttribute("data-target") || ""));
    });

    // Cleanup event listeners and ScrollTrigger instances
    return () => {
        listItems.forEach((link) => link.removeEventListener("click", () => handleTabClick(link.getAttribute("data-target") || "")));
        ScrollTrigger.getAll().forEach((st) => st.kill());
    };
}
/**
 * Reusable Card Component
 */
const Card = ({ index, item }: { index: number; item: any }) => {
    return (
        <div key={index} className={`panel__card panel__card--${index + 1} ${item.bgColor}`}>
            <div className="row">
                <div className="col-md-6 panel__content">
                    <h3 className="section__heading">{item.title}</h3>
                    <p>{item.description}</p>
                    <ul className="list-unstyled">
                        {item.features.map((feature: string, i: number) => (
                            <li key={i}>{feature}</li>
                        ))}
                    </ul>
                    <Link href="#" className="btn btn-secondary btn-black-shadow mt-4">
                        {item.buttonText}
                    </Link>
                </div>
                <div className="col-md-6 panel__image text-end">
                    <Image src={item.image} width={500} height={300} alt="panel" priority />
                </div>
            </div>
        </div>
    );
};

/**
 * Updated Data Structure
 */
const data = [
    {
        title: "Compressed Air Solutions",
        description: "Specializing in material handling solutions with quality, safety, and value.",
        features: ["Energy-efficient systems", "Industrial-grade compressors", "Reliable performance"],
        buttonText: "Explore Solutions",
        bgColor: "bg-purple",
        image: "/img/fork-lift.jpg",
    },
    {
        title: "Material Handling Equipment",
        description: "Advanced farming solutions for a sustainable future.",
        features: ["Forklifts", "Pallet Trucks", "Warehouse Automation"],
        buttonText: "Discover More",
        bgColor: "bg-skyblue-light",
        image: "/img/car-parking.jpg",
    },
    {
        title: "Automobile Maintenance Equipment",
        description: "High-quality tools for vehicle maintenance and repair.",
        features: ["Hydraulic lifts", "Tire changers", "Alignment tools"],
        buttonText: "Browse Products",
        bgColor: "bg-orange-light",
        image: "/img/auto-mobile-equipment.jpg",
    },
    {
        title: "Car Parking Solutions",
        description: "Innovative parking systems for urban spaces.",
        features: ["Smart parking sensors", "Automated parking structures", "Space optimization"],
        buttonText: "See Innovations",
        bgColor: "bg-green-light",
        image: "/img/car-parking.jpg",
    },
];
