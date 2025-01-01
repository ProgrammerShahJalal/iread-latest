import React from 'react'
import Image from "next/image"

type Props = {}

function Courses({ }: Props) {
    return (
        <>
            <section className="bg-lighter">
                <div className="container pb-60">
                    <div className="section-title mb-10">
                        <div className="row">
                            <div className="col-md-8">
                                <h2 className="mt-0 text-uppercase font-28 line-bottom line-height-1">
                                    Our{" "}
                                    <span className="text-theme-color-2 font-weight-400">COURSES</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="section-content">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="item ">
                                    <div className="service-block bg-white">
                                        <div className="thumb">
                                            <Image
                                                src="/frontend/images/project/4.jpg"
                                                width={300}
                                                height={200}
                                                alt="product"
                                                className="img-fullwidth"
                                            />
                                            <h4 className="text-white mt-0 mb-0">
                                                <span className="price">$125</span>
                                            </h4>
                                        </div>
                                        <div className="content text-left flip p-25 pt-0">
                                            <h4 className="line-bottom mb-10">Accounting Technologies</h4>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Aliquam aliquam ipsum quis ipsum facilisis sit amet.
                                            </p>
                                            <a
                                                className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                                                href="page-courses-accounting-technologies.html"
                                            >
                                                view details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="item">
                                    <div className="service-block mb-md-30 bg-white">
                                        <div className="thumb">
                                            <Image
                                                src="/frontend/images/project/5.jpg"
                                                width={300}
                                                height={200}
                                                alt="product"
                                                className="img-fullwidth"
                                            />
                                            <h4 className="text-white mt-0 mb-0">
                                                <span className="price">$125</span>
                                            </h4>
                                        </div>
                                        <div className="content text-left flip p-25 pt-0">
                                            <h4 className="line-bottom mb-10">Computer Technologies</h4>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Aliquam aliquam ipsum quis ipsum facilisis sit amet.
                                            </p>
                                            <a
                                                className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                                                href="page-courses-accounting-technologies.html"
                                            >
                                                view details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="item">
                                    <div className="service-block mb-md-30 bg-white">
                                        <div className="thumb">
                                            <Image
                                                src="/frontend/images/project/6.jpg"
                                                width={300}
                                                height={200}
                                                alt="product"
                                                className="img-fullwidth"
                                            />
                                            <h4 className="text-white mt-0 mb-0">
                                                <span className="price">$125</span>
                                            </h4>
                                        </div>
                                        <div className="content text-left flip p-25 pt-0">
                                            <h4 className="line-bottom mb-10">Development Studies</h4>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Aliquam aliquam ipsum quis ipsum facilisis sit amet.
                                            </p>
                                            <a
                                                className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                                                href="page-courses-accounting-technologies.html"
                                            >
                                                view details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Courses