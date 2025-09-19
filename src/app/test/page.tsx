import { Fragment } from "react";
// -------- custom component -------- //
import { Footer8 } from "components/blocks/footer";
import Navbar3 from "@/components/blocks/navbar/navbar-3";
import ShaderSlider from "@/components/blocks/slider/Shader-Slider";


export default function LandingPage1() {
    return (
        <Fragment>
            {/* ========== header ========== */}
            <header className="wrapper bg-soft-primary">
                <Navbar3 logoAlt="logo-light" stickyBox={false} />
            </header>

            {/* ========== main content ========== */}
            <main className="content-wrapper">

                <ShaderSlider />

            </main>

            {/* ========== footer section ========== */}
            <Footer8 />
        </Fragment>
    );
}
