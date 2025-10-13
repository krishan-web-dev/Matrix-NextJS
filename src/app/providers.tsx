"use client";
import React from "react";
import { ApolloProvider } from "@apollo/client/react";
import { getApolloClient } from "@/lib/apollo";


export default function Providers({ children }: { children: React.ReactNode }) {
    return <ApolloProvider client={getApolloClient()}>{children}</ApolloProvider>;
}