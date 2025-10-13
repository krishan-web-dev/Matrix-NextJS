// src/app/[...slug]/page.tsx
import { Fragment } from "react";
import { Footer14 } from "components/blocks/footer";
import Navbar3 from "@/components/blocks/navbar/navbar-3";
import PageByUriClient from "@/components/pages/PageByUriClient";

// In newer Next versions, params is async (a Promise).
type Props = {
    params: Promise<{ slug?: string[] }>;
};

export default async function Page({ params }: Props) {
    const { slug = [] } = await params; // 👈 await params
    const uri = slug.join("/");

    return (
        <Fragment>

            <main className="content-wrapper">
                <PageByUriClient uri={uri} />
            </main>

        </Fragment>
    );
}
