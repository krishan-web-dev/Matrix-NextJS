import { gql } from "@apollo/client";
import { POST_CARD } from "../fragments/layoutBlocks";

export const POSTS_BY_TAX = gql`
  ${POST_CARD}
  query PostsByTax($first: Int = 6, $after: String, $catIds: [Int], $tagIds: [Int]) {
    posts(
      first: $first
      after: $after
      where: {
        categoryIn: $catIds
        tagIn: $tagIds
        orderby: { field: DATE, order: DESC }
      }
    ) {
      pageInfo { hasNextPage endCursor }
      nodes { ...PostCard }
    }
  }
`;
