import { gql } from "@apollo/client";
import { ALL_LAYOUT_FRAGMENTS } from "@/graphql/fragments/layoutBlocks";

export const PAGE_BY_URI = gql`
  ${ALL_LAYOUT_FRAGMENTS}
  query PageByURI($uri: String!) {
    pageBy(uri: $uri) {
      id
      title
      pageLayouts {
        layouts {
          __typename
          ...HeroSliderBlock
          ...ImageAnimatedTextBlock
          ...VideoBlock
          ...ServicesListBlock
          ...MasonryImageTextBlock
          ...CounterBlock
          ...LogoCarouselBlock
          ...NewsBlock
          ...TestimonialBlock
          ...TimelineBlock
          ...TeamMembersBlock
          ...FAQBlock
          ...MapBlock
          ...ContactFormBlock
          ...TeamMembersBlock
          ...FAQBlock
          ...MapBlock
          ...ContactFormBlock
        }
      }
    }
  }
`;
