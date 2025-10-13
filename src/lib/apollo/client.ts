"use client";


import { ApolloClient, InMemoryCache } from "@apollo/client";
import { makeLink } from "./links";
import { authLink } from "./auth";


let _client: ApolloClient | null = null; // ApolloClient is non-generic in your version


export function getApolloClient(): ApolloClient {
    if (_client) return _client;
    _client = new ApolloClient({
        link: authLink.concat(makeLink()),
        cache: new InMemoryCache({
            typePolicies: {
                // add merge policies if needed
            },
        }),
    });
    return _client;
}