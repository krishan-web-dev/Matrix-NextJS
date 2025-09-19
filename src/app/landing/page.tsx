import { Fragment } from "react";
// -------- custom component -------- //

import { Footer17 } from "components/blocks/footer";
import { Testimonial4 } from "components/blocks/testimonial";
import Navbar3 from "@/components/blocks/navbar/navbar-3";
import { About36, About9 } from "@/components/blocks/about";
import ShaderSlider from "@/components/blocks/slider/Shader-Slider";
import { Facts7 } from "@/components/blocks/facts";
import { Clients4 } from "@/components/blocks/clients";
import { Blog5 } from "@/components/blocks/blog";
import Scroll_Cards from "@/components/blocks/cards/Scroll_Cards";
import { Hero35 } from "@/components/blocks/hero";

export default function LandingPage1() {
    return (
        <Fragment>
            {/* ========== header ========== */}
            <header className="wrapper bg-soft-primary glass__navbar">
                <Navbar3 logoAlt="logo-light" stickyBox={false} />
            </header>

            {/* ========== main content ========== */}
            <main className="content-wrapper">
                <ShaderSlider />
                <section className="full__screen bg-color-1">
                    <div className="container">
                        <Hero35 />
                    </div>
                </section>

                <Scroll_Cards />

                <section className="wrapper bg-color-2">
                    <div className="container py-15 py-md-17">
                        <About36 />
                    </div>
                </section>

                <Facts7 />
                <Clients4 />

                <section className="wrapper bg-light">
                    <div className="container">
                        <Testimonial4 />
                    </div>
                </section>

                <Blog5 />

            </main>

            {/* ========== footer section ========== */}
            <Footer17 />
        </Fragment>
    );
}
