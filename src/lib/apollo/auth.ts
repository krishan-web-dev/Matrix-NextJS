import { ApolloLink } from "@apollo/client";


/**
* Optional auth link (JWT, WP nonce, etc.).
* Compose with makeLink(): authLink.concat(makeLink())
*/
export const authLink = new ApolloLink((operation, forward) => {
    const headers = new Headers(operation.getContext().headers ?? {});
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    operation.setContext({ headers });
    return forward(operation);
});