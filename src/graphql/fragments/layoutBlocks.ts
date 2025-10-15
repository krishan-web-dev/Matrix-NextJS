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

/**
 * Reusable card for post listings
 * (kept minimal — expand if you need more fields)
 */
export const POST_CARD = gql`
  fragment PostCard on Post {
    id
    databaseId
    title
    slug
    uri
    excerpt
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    categories { nodes { databaseId name slug } }
    tags { nodes { databaseId name slug } }
  }
`;

/**
 * Masonry Image + Text Block
 * (removed the duplicate fragment section you had)
 */
export const MASONRY_IMAGE_TEXT_BLOCK = gql`
  fragment MasonryImageTextBlock on PageLayoutsLayoutsMasonryImageListSectionLayout {
    title
    description
    masonaryBlocks {
      ... on PageLayoutsLayoutsMasonaryBlocksListBlockLayout {
        title
        titleSize2
        description
      }
      ... on PageLayoutsLayoutsMasonaryBlocksImageBlockLayout {
        image {
          node {
            title
            sourceUrl
          }
        }
      }
    }
    disablePaddingTop
    disablePaddingBottom
    style
    verticalAlign
    sectionId
    sectionClass
  }
`;

/**
 * Counter Block
 */
export const COUNTER_BLOCK = gql`
  fragment CounterBlock on PageLayoutsLayoutsCounterBlockSectionLayout {
    title
    description
    counterblocks {
      ... on PageLayoutsLayoutsCounterblocksListLayout {
        title
        values
      }
    }
    background
    backgroundImage { node { sourceUrl } }
    verticalAlign
    style
    disablePaddingTop
    disablePaddingBottom
    sectionId
    sectionClass
  }
`;

/**
 * Logo Carousel Block
 */
export const LOGO_CAROUSEL_BLOCK = gql`
  fragment LogoCarouselBlock on PageLayoutsLayoutsLogoCarouselSectionLayout {
    title
    description
    logo {
      nodes {
        title
        sourceUrl
      }
    }
    style
    verticalAlign
    background
    backgroundImage { node { sourceUrl } }
    disablePaddingTop
    disablePaddingBottom
    sectionId
    sectionClass
  }
`;

/**
 * News Block
 * - newsCategory: Category (not Tag)
 * - selectTag: use databaseId (works with WPGraphQL filters)
 * - newsItems: polymorphic (add __typename + fragments)
 */
export const NEWS_BLOCK = gql`
  ${POST_CARD}
  fragment NewsBlock on PageLayoutsLayoutsNewsSectionLayout {
    title
    titleSize
    description
    selectBy
    layout
    numberOfPosts

    newsCategory {
      nodes {
        ... on Category {
          databaseId
          name
          slug
        }
      }
    }

    selectTag {
      nodes {
        databaseId
        name
        slug
      }
    }

    newsItems {
      nodes {
        __typename
        ... on Post { ...PostCard }
        ... on Page {
          id
          databaseId
          title
          slug
          uri
        }
        ... on MediaItem {
          id
          mediaItemUrl
          altText
        }
      }
    }

    background
    backgroundImage { node { sourceUrl } }
    disablePaddingTop
    disablePaddingBottom
    sectionId
    sectionClass
    columnCount
  }
`;


/** Handy bundle if you want to inject all fragments at once */
export const ALL_LAYOUT_FRAGMENTS = gql`
  ${HERO_SLIDER_BLOCK}
  ${IMAGE_ANIMATED_TEXT_BLOCK}
  ${VIDEO_BLOCK}
  ${SERVICES_LIST_BLOCK}
  ${POST_CARD}
  ${NEWS_BLOCK}
`;
