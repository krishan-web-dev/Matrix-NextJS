// src/app/page.tsx
import { Fragment } from "react";
import { Footer14 } from "components/blocks/footer";
import Navbar3 from "@/components/blocks/navbar/navbar-3";
import PageByUriClient from "@/components/pages/PageByUriClient";

export default function Home() {
  return (
    <Fragment>


      <main className="content-wrapper">
        <PageByUriClient uri="home" />
      </main>

      <Footer14 />
    </Fragment>
  );
}
