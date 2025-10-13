import { gql } from "@apollo/client";

/**
 * One file, all fragments.
 * Export both individual fragments and a combined bundle for convenience.
 */

export const HERO_SLIDER_BLOCK = gql`
  fragment HeroSliderBlock on PageLayoutsLayoutsHeroSliderSectionLayout {
    slide {
      ... on PageLayoutsLayoutsSlideBlockLayout {
        title
        titleSize
        description
        mediaType
        image { node { sourceUrl } }
        videoThumbnail { node { sourceUrl } }
        videoUrl
      }
    }
    disablePaddingBottom
    disablePaddingTop
    sectionClass
    sectionId
  }
`;

export const IMAGE_ANIMATED_TEXT_BLOCK = gql`
  fragment ImageAnimatedTextBlock on PageLayoutsLayoutsImageAnimeTextBlockSectionLayout {
    title
    titleSize
    animatedText { text }
    description
    imagePosition
    image { node { sourceUrl } }
    link { title url }
    link2 { title url }
    disablePaddingTop
    disablePaddingBottom
    sectionClass
    sectionId
    background
    backgroundImage { node { sourceUrl } }
  }
`;

export const VIDEO_BLOCK = gql`
  fragment VideoBlock on PageLayoutsLayoutsVideoBlockSectionLayout {
    title
    videoDescription
    videoUrl
    videoThumbnail { node { sourceUrl } }
    background
    backgroundImage { node { sourceUrl } }
    disablePaddingTop
    disablePaddingBottom
    sectionId
    sectionClass
  }
`;

export const SERVICES_LIST_BLOCK = gql`
  fragment ServicesListBlock on PageLayoutsLayoutsServicesListSectionLayout {
    title
    description
    items {
      ... on PageLayoutsLayoutsItemsItemLayout {
        title
        description
        image { node { sourceUrl } }
        link { title url }
      }
    }
    background
    columnCount
    disablePaddingTop
    disablePaddingBottom
    sectionId
    sectionClass
  }
`;

/** Handy bundle if you want to inject all fragments at once */
export const ALL_LAYOUT_FRAGMENTS = gql`
  ${HERO_SLIDER_BLOCK}
  ${IMAGE_ANIMATED_TEXT_BLOCK}
  ${VIDEO_BLOCK}
  ${SERVICES_LIST_BLOCK}
`;
