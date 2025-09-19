import { Fragment } from "react";
// -------- custom component -------- //
import Navbar from "components/blocks/navbar/navbar-1";
import { Footer14 } from "components/blocks/footer";
import { Hero27 } from "@/components/blocks/hero";
import NextLink from "components/reuseable/links/NextLink";
import Stack_Cards from "@/components/blocks/cards/Stack_Cards";
import ServiceCards from "@/components/blocks/cards/Service_Cards";

const heroContent = [
    {
        title: "We bring solutions to make life",
        highlight: "easier",
        description:
            "Explore our innovative solutions tailored to meet your business needs. At Matrix Pvt Ltd, we provide cutting-edge technologies and expert services to help you achieve operational excellence and drive success.",
        backgroundImage: "/img/photos/bg37.jpg",
    },
];


export default function Solutions() {
    return (
        <Fragment>
            {/* ========== header section ========== */}
            <header className="wrapper bg-soft-primary my-1">
                <Navbar
                    button={<NextLink title="Contact Me" href="#" className="btn btn-sm btn-primary" />}
                    navClassName="navbar navbar-expand-lg center-nav navbar-light navbar-bg-light"
                />
            </header>

            {/* ========== main content ========== */}
            <main className="content-wrapper">

                <Hero27 heroData={heroContent} />

                <ServiceCards />


                <Hero27 heroData={heroContent} />
            </main>

            {/* ========== footer section ========== */}
            <Footer14 />
        </Fragment>
    );
}