import { gql } from "@apollo/client";

export const POSTS_CARD = gql`
  query PostsCard($categoryId: Int!, $first: Int!) {
    posts(
      where: { categoryId: $categoryId, orderby: { field: DATE, order: DESC }, status: PUBLISH }
      first: $first
    ) {
      nodes {
        id
        databaseId
        title
        content
        excerpt
        date
        featuredImage {
          node {
            title
            sourceUrl
          }
        }
        tags {
          nodes {
            databaseId
            name
          }
        }
        categories {
          nodes {
            databaseId
            name
          }
        }
      }
    }
  }
`;
