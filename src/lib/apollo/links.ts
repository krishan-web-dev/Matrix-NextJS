import { ApolloLink, HttpLink } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";

export const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    // If you don't need cookies, comment the next line to avoid strict CORS
    // credentials: "include",
    fetch: typeof fetch !== "undefined" ? fetch : undefined, // explicit in case of polyfills
});

export const errorLink = new ErrorLink(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors?.length) {
        for (const { message, path, extensions } of graphQLErrors) {
            console.warn(`[GraphQL error] op=${operation.operationName} path=${path} code=${extensions?.code} msg=${message}`);
        }
    }
    if (networkError) {
        // This is the important one for "Failed to fetch"
        console.error(`[Network error]`, networkError);
    }
});

export const makeLink = () => ApolloLink.from([errorLink, httpLink]);
