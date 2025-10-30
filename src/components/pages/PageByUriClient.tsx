"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@apollo/client/react";
import { PAGE_BY_URI } from "@/graphql/ops/pageByUri";

// 👇 dynamic, client-only versions of your interactive blocks
const ShaderSlider = dynamic(() => import("@/components/blocks/slider/Shader-Slider"), { ssr: false });
const Hero35 = dynamic(() => import("@/components/blocks/hero/Hero35"), { ssr: true });
const YouTubePlayer = dynamic(() => import("@/components/blocks/video/Video"), { ssr: false });
const ServicesList = dynamic(() => import("@/components/blocks/cards/Scroll_Cards_style1"), { ssr: false });
const MasonryImageText = dynamic(() => import("@/components/blocks/about/About36"), { ssr: false });
const CounterBlock = dynamic(() => import("@/components/blocks/facts/Facts7"), { ssr: true });
const LogoCarousel = dynamic(() => import("@/components/blocks/brands/BrandTicker"), { ssr: true });
const NewsBlock = dynamic(() => import("@/components/blocks/blog/Blog5"), { ssr: false });
const TestimonialBlock = dynamic(() => import("@/components/blocks/testimonial/Testimonial4"), { ssr: false });
const TimelineBlock = dynamic(() => import("@/components/blocks/timeline/timeline"), { ssr: false });
const TeamBlock = dynamic(() => import("@/components/blocks/team/Team"), { ssr: true });
const FAQBlock = dynamic(() => import("@/components/blocks/faq/FAQ2"), { ssr: true });
const MapBlock = dynamic(() => import("@/components/blocks/map/map"), { ssr: false });
const ContactForm = dynamic(() => import("@/components/blocks/form/ContactForm"), { ssr: false });

export default function PageByUriClient({ uri }: { uri: string }) {
    const { data, loading, error } = useQuery(PAGE_BY_URI, { variables: { uri } });
    if (loading) return null;
    if (error) return <p className="p-6 text-danger">{error.message}</p>;

    const layouts = data?.pageBy?.pageLayouts?.layouts ?? [];
    return (
        <>
            {layouts.map((block: any, i: number) => {
                switch (block.__typename) {
                    case "PageLayoutsLayoutsHeroSliderSectionLayout":
                        return <ShaderSlider key={i} data={block} />;
                    case "PageLayoutsLayoutsImageAnimeTextBlockSectionLayout":
                        return <Hero35 key={i} data={block} />;
                    case "PageLayoutsLayoutsVideoBlockSectionLayout":
                        return <YouTubePlayer key={i} data={block} />;
                    case "PageLayoutsLayoutsServicesListSectionLayout":
                        return <ServicesList key={i} data={block} />;
                    case "PageLayoutsLayoutsMasonryImageListSectionLayout":
                        return <MasonryImageText key={i} data={block} />;
                    case "PageLayoutsLayoutsCounterBlockSectionLayout":
                        return <CounterBlock key={i} data={block} />;
                    case "PageLayoutsLayoutsLogoCarouselSectionLayout":
                        return <LogoCarousel key={i} data={block} />;
                    case "PageLayoutsLayoutsNewsSectionLayout":
                        return <NewsBlock key={i} data={block} />;
                    case "PageLayoutsLayoutsTestimonialSectionLayout":
                        return <TestimonialBlock key={i} data={block} />;
                    case "PageLayoutsLayoutsTimelineSectionLayout":
                        return <TimelineBlock key={i} {...block} />;
                    case "PageLayoutsLayoutsTeamSectionLayout":
                        return <TeamBlock key={i} {...block} />;
                    case "PageLayoutsLayoutsFaqSectionLayout":
                        return <FAQBlock key={i} {...block} />;
                    case "PageLayoutsLayoutsMapSectionLayout":
                        return <MapBlock key={i} {...block} />;
                    case "PageLayoutsLayoutsContactFormSectionLayout":
                        return <ContactForm key={i} />;

                    default:
                        console.warn(`⚠️ Unhandled block type: ${block.__typename}`);
                        return null;
                }
            })}
        </>
    );
}
