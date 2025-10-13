import type { CodegenConfig } from "@graphql-codegen/cli";


const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
  documents: "src/**/*.{ts,tsx}",
  generates: {
    "src/graphql/types/": { preset: "client", plugins: [] },
  },
};
export default config;