import { gql } from "@apollo/client";
import { POST_CARD } from "../fragments/layoutBlocks";

export const POSTS_BY_IDS = gql`
  ${POST_CARD}
  query PostsByIds($ids: [ID!]!) {
    contentNodes(where: { in: $ids }) {
      nodes {
        __typename
        ... on Post {
          ...PostCard
        }
      }
    }
  }
`;
