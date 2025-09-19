import { Fragment } from "react";
// GLOBAL CUSTOM COMPONENTS
import Breadcrumb from "components/reuseable/Breadcrumb";
// LOCAL CUSTOM COMPONENTS
import ProductActions from "../components/product-actions";
// CUSTOM DATA
import products from "data/product-list";
import data from "data/product-details-page";
import ProductMetas from "../components/product-metas";
import ProductFactSheet from "../components/product-factsheet";
import Link from "next/link";
import ProductSlider from "../components/product-slider";
import ProductEnquiryModal from "../components/ProductEnquiryModal";
import SocialShare from "@/components/reuseable/social-share/SocialShare";

export async function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6].map((item) => ({ id: item.toString() }));
}

export default function ProductDetails() {
  const productName = 'Compact series screw'; // Replace with actual product name if available
  const carouselBreakpoints = {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  return (
    <Fragment>
      {/* ========== product info section ========== */}
      <section className="wrapper bg-light">
        <div className="container py-3 py-md-5">
          <Breadcrumb data={data.breadcrumb} className="mb-0" />
        </div>
        <div className="container">
          <div className="row d-flex align-items-start gx-md-8 gx-xl-12 gy-8">
            <div className="col-lg-6 position-lg-sticky" style={{ top: "6rem" }}>
              <ProductSlider />
            </div>
            <div className="col-lg-6 product-info">
              <ProductActions />


              <div className="product__links">
                <div className="product-factsheet">
                  <Link href="#" className="btn btn-lg btn-primary btn-icon btn-icon-end mb-5">
                    Factsheet <i className="uil uil-arrow-up-right" />
                  </Link>
                </div>
              </div>

              <ProductMetas />

              <div className="product__sales">
                <div className="prooduct-enquiry">
                  <button
                    className="enuire-now"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-prd-enquire">
                    <i className="uil uil-envelope"></i>Enquire Now
                  </button>
                  <ProductEnquiryModal />
                </div>
                <SocialShare />
              </div>

            </div>
          </div>

        </div>
      </section>
    </Fragment>
  );
}
