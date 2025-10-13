import { z } from "zod";

const Env = z.object({
    NEXT_PUBLIC_GRAPHQL_URL: z.string().url(),
});

export const env = Env.parse({
    NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});
