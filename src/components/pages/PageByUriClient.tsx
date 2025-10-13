// e.g., src/components/pages/PageByUriClient.tsx (or wherever you render blocks)
"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@apollo/client/react";
import { PAGE_BY_URI } from "@/graphql/ops/pageByUri";

// 👇 dynamic, client-only versions of your interactive blocks
const ShaderSlider = dynamic(() => import("@/components/blocks/slider/Shader-Slider"), { ssr: false });
const Hero35 = dynamic(() => import("@/components/blocks/hero/Hero35"), { ssr: false });
const YouTubePlayer = dynamic(() => import("@/components/blocks/video/Video"), { ssr: false });
const ServicesList = dynamic(() => import("@/components/blocks/cards/Scroll_Cards_style1"), { ssr: false });

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
                        return <ServicesList data={block} />;
                    default:
                        return null;
                }
            })}
        </>
    );
}
