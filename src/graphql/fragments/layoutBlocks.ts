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
        image {
          node {
            sourceUrl
          }
        }
        videoThumbnail {
          node {
            sourceUrl
          }
        }
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
    animatedText {
      text
    }
    description
    imagePosition
    image {
      node {
        sourceUrl
      }
    }
    link {
      title
      url
    }
    link2 {
      title
      url
    }
    disablePaddingTop
    disablePaddingBottom
    sectionClass
    sectionId
    background
    backgroundImage {
      node {
        sourceUrl
      }
    }
  }
`;

export const VIDEO_BLOCK = gql`
  fragment VideoBlock on PageLayoutsLayoutsVideoBlockSectionLayout {
    title
    videoDescription
    videoUrl
    videoThumbnail {
      node {
        sourceUrl
      }
    }
    background
    backgroundImage {
      node {
        sourceUrl
      }
    }
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
        image {
          node {
            sourceUrl
          }
        }
        link {
          title
          url
        }
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
    backgroundImage {
      node {
        sourceUrl
      }
    }
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
    backgroundImage {
      node {
        sourceUrl
      }
    }
    disablePaddingTop
    disablePaddingBottom
    sectionId
    sectionClass
  }
`;

/**
 * NEWS Carousel Block
 */
export const NEWS_CAROUSEL_BLOCK = gql`
  fragment NewsBlock on PageLayoutsLayoutsNewsSectionLayout {
    title
    titleSize
    description
    layout
    selectBy
    numberOfPosts
    newsCategory {
      nodes {
        ... on Tag {
          id
          name
        }
      }
    }
    selectTag {
      nodes {
        termTaxonomyId
        name
      }
    }
    newsItems {
      nodes {
        ... on Post {
          id
          title
          content
          featuredImage {
            node {
              title
              sourceUrl
            }
          }
        }
      }
    }
    background
    backgroundImage {
      node {
        sourceUrl
      }
    }
    disablePaddingTop
    disablePaddingBottom
    sectionId
    sectionClass
    columnCount
  }
`;

/**
 * Testimonial Block
 */
export const TESTIMONIAL_BLOCK = gql`
  fragment TestimonialBlock on PageLayoutsLayoutsTestimonialSectionLayout {
    title
    titleSize
    description
    layout
    selectBy
    numberOfPosts
    testimonialCategory {
      nodes {
        ... on Division {
          databaseId
          name
        }
      }
    }
    selectTag {
      nodes {
        databaseId
        name
      }
    }
    testimonialItems {
      nodes {
        ... on Testimonial {
          databaseId
          title
          testimonials {
            description
            designation
            image {
              node {
                title
                sourceUrl
              }
            }
          }
        }
      }
    }
    background
    backgroundImage {
      node {
        sourceUrl
      }
    }
    disablePaddingTop
    disablePaddingBottom
    sectionId
    sectionClass
    columnCount
  }
`;


/**
 * Timeline Block
 */
export const TIMELINE_BLOCK = gql`
  fragment TimelineBlock on PageLayoutsLayoutsTimelineSectionLayout {
    titleSize
    title
    description
    timelineBlocks {
      ... on PageLayoutsLayoutsTimelineBlocksTimelineItemLayout {
        title
        subTitle
        year
        image {
          node {
            databaseId
            title
            sourceUrl
          }
        }
      }
    }
    background
    backgroundImage {
      node {
        title
        sourceUrl
      }
    }
    disablePaddingTop
    disablePaddingBottom
    sectionId
    sectionClass
  }
`;


/**
 * Team Members Block
 */
export const TEAM_MEMBERS_BLOCK = gql`
  fragment TeamMembersBlock on PageLayoutsLayoutsTeamSectionLayout {
    titleSize
    title
    description
    columnCount
    members {
      nodes {
        databaseId
        ... on Team {
          teamLayout {
            name
            designation
            description
            profilePicture {
              node {
                title
                sourceUrl
              }
            }
          }
        }
      }
    }
    background
    backgroundImage {
      node {
        title
        sourceUrl
      }
    }
    disablePaddingTop
    disablePaddingBottom
    sectionId
    sectionClass
  }
`;

/**
 * FAQ Block
 */
export const FAQ_BLOCK = gql`
  fragment FAQBlock on PageLayoutsLayoutsFaqSectionLayout {
    titleSize
    title
    description
    faqitems {
      ... on PageLayoutsLayoutsFaqitemsItemLayout {
        title
        description
      }
    }
    background
    height
    disablePaddingTop
    disablePaddingBottom
    sectionId
    sectionClass
  }
`;


/**
 * MAP Block
 */
export const MAP_BLOCK = gql`
  fragment MapBlock on PageLayoutsLayoutsMapSectionLayout {
    address
    email {
      email
    }
    telephone {
      areaCode
      telephone
    }
    map {
      latitude
      longitude
      zoom
    }
    mapMarker {
      node {
        sourceUrl
        title
      }
    }
    background
    backgroundImage {
      node {
        sourceUrl
      }
    }
    sectionId
    sectionClass
  }
`;


/**
 * Contact Form Block
 */
export const CONTACT_FORM_BLOCK = gql`
  fragment ContactFormBlock on PageLayoutsLayoutsContactFormSectionLayout {
    titleSize
    title
    description
    mainFormEmail
    inquiryItem {
      ... on PageLayoutsLayoutsInquiryItemInquiryItemsLayout {
        inquiry
        email
      }
    }
    background
    backgroundImage {
      node {
        sourceUrl
      }
    }
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
  ${MASONRY_IMAGE_TEXT_BLOCK}
  ${COUNTER_BLOCK}
  ${LOGO_CAROUSEL_BLOCK}
  ${NEWS_CAROUSEL_BLOCK}
  ${TESTIMONIAL_BLOCK}
  ${TIMELINE_BLOCK}
  ${TEAM_MEMBERS_BLOCK}
  ${FAQ_BLOCK}
  ${MAP_BLOCK}
  ${CONTACT_FORM_BLOCK}
`;
