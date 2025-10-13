"use client";

import React from "react";
// 👇 import ApolloClient & InMemoryCache from the integration package (not @apollo/client)
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client-integration-nextjs";

import { makeLink } from "./links";
import { authLink } from "./auth";

export const makeApolloClient = () =>
    new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(makeLink()),
    });

export function ApolloProviderSSR({ children }: { children: React.ReactNode }) {
    return (
        <ApolloNextAppProvider makeClient={makeApolloClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
