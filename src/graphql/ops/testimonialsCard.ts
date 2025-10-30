import { gql } from "@apollo/client";

export const TESTIMONIALS_CARD = gql`
  query TestimonialsByTaxonomies($divisionIds: [ID!]!, $first: Int!) {
    terms(where: { taxonomies: DIVISION, termTaxonomyId: $divisionIds }) {
      nodes {
        ... on Division {
          databaseId
          name
          testimonials(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
              databaseId
              title
              testimonials {
                description
                designation
                image {
                  node {
                    databaseId
                    title
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
