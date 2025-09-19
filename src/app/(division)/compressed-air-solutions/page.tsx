import { About36 } from "@/components/blocks/about";
import BrandTicker from "@/components/blocks/brands/BrandTicker";
import Scroll_Cards1 from "@/components/blocks/cards/Scroll_Cards_style1";
import { Footer14 } from "@/components/blocks/footer";
import { Hero35 } from "@/components/blocks/hero";
import Navbar3 from "@/components/blocks/navbar/navbar-3";
import { Testimonial21 } from "@/components/blocks/testimonial";
import FeaturedProducts from "@/components/reuseable/product-cards/FeaturedProducts";
import { Fragment } from "react";

export default function CompressedAirSolutionsPage() {
    return (
        <Fragment>
            {/* ========== header ========== */}
            <header className="wrapper bg-soft-primary glass__navbar">
                <Navbar3 logoAlt="logo-light" stickyBox={false} />
            </header>

            {/* ========== main content ========== */}
            <main className="content-wrapper">
                <section className="full__screen" style={{ height: "100vh", display: "flex", alignItems: "center", backgroundColor: "#427a3347" }}>
                    <div className="container">
                        <Hero35 />
                    </div>
                </section>

                <Scroll_Cards1 />
                <section>
                    <div className="container">
                        <Testimonial21 />
                    </div>
                </section>                
                <BrandTicker />
                <FeaturedProducts />
                <About36 />                
            </main>

            {/* ========== footer section ========== */}
            <Footer14 />
        </Fragment>
    );
}
