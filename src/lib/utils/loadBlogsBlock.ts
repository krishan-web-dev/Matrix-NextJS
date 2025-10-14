import { ApolloClient } from "@apollo/client";
import { PAGE_BY_URI } from "@/graphql/ops/pageByUri";
import { POSTS_BY_TAX } from "@/graphql/ops/postsByTax";
import { POSTS_BY_IDS } from "@/graphql/ops/postsByIds";

export async function loadBlogsBlock(client: ApolloClient<any>, slug = "home") {
    const { data } = await client.query({
        query: PAGE_BY_URI,
        variables: { uri: slug },
        fetchPolicy: "no-cache",
    });

    const rows: any[] = data?.pageBy?.pageLayouts?.layouts ?? [];
    const row = rows.find(
        (r: any) => r?.__typename === "PageLayoutsLayoutsNewsSectionLayout"
    );
    if (!row) return { posts: [], title: null, pageInfo: null };

    const first = row.numberOfPosts ?? 6;

    // Manual mode
    if (row.selectBy === "manual" && row.newsItems?.nodes?.length) {
        const ids = row.newsItems.nodes.map((n: any) => n.id).filter(Boolean);
        const { data: manualData } = await client.query({
            query: POSTS_BY_IDS,
            variables: { ids },
        });
        return {
            posts: manualData?.contentNodes?.nodes ?? [],
            title: row.title ?? null,
            pageInfo: null,
        };
    }

    // Taxonomy mode
    const catIds = row.newsCategory?.nodes?.map((n: any) => n.databaseId).filter(Boolean);
    const tagIds = row.selectTag?.nodes?.map((n: any) => n.databaseId).filter(Boolean);

    const { data: postsData } = await client.query({
        query: POSTS_BY_TAX,
        variables: {
            first,
            catIds: row.selectBy === "category" ? catIds : undefined,
            tagIds: row.selectBy === "tag" || row.selectBy === "latest" ? tagIds : undefined,
        },
    });

    return {
        posts: postsData?.posts?.nodes ?? [],
        pageInfo: postsData?.posts?.pageInfo ?? null,
        title: row.title ?? null,
    };
}
