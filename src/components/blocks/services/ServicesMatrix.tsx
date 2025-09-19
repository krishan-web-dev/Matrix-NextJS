"use client";

import NextLink from "components/reuseable/links/NextLink";
import Image from "next/image";

export default function ServicesMatrix() {
    return (
        <section className="wrapper bg-light wrapper-border">
            <div className="container py-14 pt-md-18 pb-md-16">
                <div className="row align-items-center mb-10">
                    <div className="col-md-8 col-lg-9 col-xl-8 col-xxl-7 pe-xl-20">
                        <h2 className="display-4 mb-3">Matrix Products & Services</h2>
                    </div>
                </div>

                <div className="card bg-soft-violet mb-10">
                    <div className="card-body p-12 pb-0">
                        <div className="row">
                            <div className="col-lg-4 pb-12 align-self-center">
                                <h3 className="h1 post-title mb-3">Compressed Air Solution</h3>
                                <p>
                                    Matrix delivers reliable compressed air solutions for industries such as apparel, food, plastics, and pharmaceuticals. Partnering with top brands, Matrix ensures expert consulting and uninterrupted performance.
                                </p>

                                <NextLink title="See Our Products" href="#" className="more hover link-violet" />
                            </div>

                            <div className="col-lg-7 offset-lg-1 align-self-end">
                                <figure>
                                    <img className="img-fluid" src="/img/comressed-air.png" srcSet="/img/photos/f1@2x.png 2x" alt="" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-soft-blue mb-10">
                    <div className="card-body p-12">
                        <div className="row gy-10 align-items-center">
                            <div className="col-lg-4 order-lg-2 offset-lg-1">
                                <h3 className="h1 post-title mb-3">Material Handling Equipment</h3>
                                <p>
                                    Matrix specializes in comprehensive material handling solutions, including movement, protection, storage, and control across manufacturing, warehousing, and distribution. Partnering with global brands, Matrix ensures quality, safety, and value-driven, customer-specific solutions.
                                </p>
                                <NextLink title="See Our Products" href="#" className="more hover link-blue" />
                            </div>

                            <div className="col-lg-7">
                                <figure>
                                    <img className="img-fluid" src="/img/fork-lift.jpg" srcSet="/img/photos/f2@2x.png 2x" alt="" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row gx-md-8 gx-xl-10">
                    <div className="col-lg-6">
                        <div className="card bg-soft-leaf mb-10">
                            <div className="card-body p-12 pb-0">
                                <h3 className="h1 post-title mb-3">Automobile Maintenance Equipment</h3>
                                <p>
                                    Matrix enhances service levels for top car dealers by providing premium automobile maintenance equipment, including lifts, washing systems, tire-care tools, versatile service-care equipment, and installation services.
                                </p>
                                <NextLink title="See Our Products" href="#" className="more hover link-leaf mb-8" />
                            </div>

                            <img className="card-img-bottom" src="/img/auto-mobile-equipment.jpg" srcSet="/img/photos/f3@2x.png 2x" alt="" />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card bg-soft-pink">
                            <div className="card-body p-12 pb-0">
                                <h3 className="h1 post-title mb-3">Car Parking Solutions</h3>
                                <p>
                                    Matrix addresses conventional car parking challenges by offering advanced solutions for optimal space utilization. With state-of-the-art designs and safety-compliant installations, Matrix ensures functionality and customer satisfaction.
                                </p>
                                <NextLink title="See Our Products" href="#" className="more hover link-pink mb-8" />
                            </div>

                            <img className="card-img-bottom" src="/img/car-parking.jpg" srcSet="/img/photos/f4@2x.png 2x" alt="" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
