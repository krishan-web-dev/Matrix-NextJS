"use client";

import { Fragment, PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import NextLink from "components/reuseable/links/NextLink";
// GLOBAL CUSTOM COMPONENTS
import { Footer14 } from "components/blocks/footer";
import Navbar from "components/blocks/navbar/navbar-1";

export default function AboutLayout({ children }: PropsWithChildren) {
    const pathname = usePathname();

    return (
        <Fragment>
            {/* ========== header section ========== */}
            {/* ========== header section ========== */}
            <header className="wrapper bg-soft-primary my-1">
                <Navbar
                    button={<NextLink title="Contact Me" href="#" className="btn btn-sm btn-primary" />}
                    navClassName="navbar navbar-expand-lg center-nav navbar-light navbar-bg-light"
                />
            </header>

            <main className="content-wrapper">{children}</main>

            {/* ========== footer section ========== */}
            <Footer14 />
        </Fragment>
    );
}
