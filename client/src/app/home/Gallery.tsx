import Image from 'next/image'
import React from 'react'

type Props = {}

function Gallery({ }: Props) {
    return (
        <>
            <section id="gallery" className="bg-lighter">
                <div className="container">
                    <div className="section-title mb-10">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="mt-0 text-uppercase text-theme-colored title line-bottom line-height-1">
                                    Our
                                    <span className="text-theme-color-2 font-weight-400"> Gllery</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="section-content">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portfolio-filter font-alt align-center">
                                    <a href="#" className="active" data-filter="*">
                                        All
                                    </a>
                                    <a href="#select1" className="" data-filter=".select1">
                                        Photos
                                    </a>
                                    <a href="#select2" className="" data-filter=".select2">
                                        Campus
                                    </a>
                                    <a href="#select3" className="" data-filter=".select3">
                                        Students
                                    </a>
                                </div>
                                <div className="gallery-isotope">
                                    <div className="row">
                                        {
                                            [4, 5, 6, 7, 8, 4, 5, 6].map(i => (
                                                <div className="col-md-3" key={i} style={{paddingBottom: "30px"}}>
                                                    <div className="gallery-item select1" style={{ width: '100%' }}>
                                                        <div className="thumb">
                                                            <Image
                                                                src={`/frontend/images/project/${i}.jpg`}
                                                                width={300}
                                                                height={300}
                                                                alt="product"
                                                                className="img-fullwidth"
                                                            />
                                                            <div className="overlay-shade" />
                                                            <div className="icons-holder">
                                                                <div className="icons-holder-inner">
                                                                    <div className="styled-icons icon-sm icon-dark icon-circled icon-theme-colored">
                                                                        <a
                                                                            data-lightbox="image"
                                                                            href="/frontend/images/project/2.jpg"
                                                                        >
                                                                            <i className="fa fa-plus" />
                                                                        </a>
                                                                        <a href="#">
                                                                            <i className="fa fa-link" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <a
                                                                className="hover-link"
                                                                data-lightbox="image"
                                                                href="https://cs.utdallas.edu/files/2023/05/HS-programming-contest.webp"
                                                            >
                                                                View more
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Gallery