import Image from 'next/image'
import React from 'react'

type Props = {}

function Blog({ }: Props) {
    return (
        <>
            <section id="blog" className="bg-lighter">
                <div className="container">
                    <div className="section-title mb-10">
                        <div className="row">
                            <div className="col-md-8">
                                <h2 className="mt-0 text-uppercase font-28 line-bottom line-height-1">
                                    Latest{" "}
                                    <span className="text-theme-color-2 font-weight-400">News</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="section-content">
                        <div className="row">
                            <div
                                className="col-xs-12 col-sm-6 col-md-4 wow fadeInLeft"
                                data-wow-duration="1s"
                                data-wow-delay="0.3s"
                                style={{
                                    visibility: "visible",
                                    animationDuration: "1s",
                                    animationDelay: "0.3s"
                                }}
                            >
                                <article className="post clearfix mb-sm-30">
                                    <div className="entry-header">
                                        <div className="post-thumb thumb">
                                            <Image
                                                src="https://www.aalto.fi/sites/g/files/flghsv161/files/styles/1_91_1200w_630h_n/public/midgard/images/1e7a99ada0f73b6a99a11e7b8a07996928a6a4f6a4f-programming_hiit2016_en_en.jpg"
                                                width={360}
                                                height={190}
                                                alt="product"
                                                className="img-fullwidth"
                                            />
                                        </div>
                                    </div>
                                    <div className="entry-content p-20 pr-10 bg-white">
                                        <div className="entry-meta media mt-0 no-bg no-border">
                                            <div className="entry-date media-left text-center flip bg-theme-colored pt-5 pr-15 pb-5 pl-15">
                                                <ul>
                                                    <li className="font-16 text-white font-weight-600 border-bottom">
                                                        28
                                                    </li>
                                                    <li className="font-12 text-white text-uppercase">Feb</li>
                                                </ul>
                                            </div>
                                            <div className="media-body pl-15">
                                                <div className="event-content pull-left flip">
                                                    <h4 className="entry-title text-white text-uppercase m-0 mt-5">
                                                        <a href="#">
                                                            Data Star (Datatähti) programming competition for
                                                            comprehensive school{" "}
                                                        </a>
                                                    </h4>
                                                    <span className="mb-10 text-gray-darkgray mr-10 font-13">
                                                        <i className="fa fa-commenting-o mr-5 text-theme-colored" />
                                                        214 Comments
                                                    </span>
                                                    <span className="mb-10 text-gray-darkgray mr-10 font-13">
                                                        <i className="fa fa-heart-o mr-5 text-theme-colored" />{" "}
                                                        895 Likes
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-10">
                                            Lorem ipsum dolor sit amet, consectetur adipisi cing elit.
                                            Molestias eius illum libero dolor nobis deleniti, sint assumenda
                                            Pariatur iste.
                                        </p>
                                        <a href="#" className="btn-read-more">
                                            Read more
                                        </a>
                                        <div className="clearfix" />
                                    </div>
                                </article>
                            </div>
                            <div
                                className="col-xs-12 col-sm-6 col-md-4 wow fadeInLeft"
                                data-wow-duration="1s"
                                data-wow-delay="0.3s"
                                style={{
                                    visibility: "visible",
                                    animationDuration: "1s",
                                    animationDelay: "0.3s"
                                }}
                            >
                                <article className="post clearfix mb-sm-30">
                                    <div className="entry-header">
                                        <div className="post-thumb thumb">
                                            <Image
                                                src="https://www.aalto.fi/sites/g/files/flghsv161/files/styles/1_91_1200w_630h_n/public/midgard/images/1e7a99ada0f73b6a99a11e7b8a07996928a6a4f6a4f-programming_hiit2016_en_en.jpg"
                                                width={360}
                                                height={190}
                                                alt="product"
                                                className="img-fullwidth"
                                            />
                                        </div>
                                    </div>
                                    <div className="entry-content p-20 pr-10 bg-white">
                                        <div className="entry-meta media mt-0 no-bg no-border">
                                            <div className="entry-date media-left text-center flip bg-theme-colored pt-5 pr-15 pb-5 pl-15">
                                                <ul>
                                                    <li className="font-16 text-white font-weight-600 border-bottom">
                                                        28
                                                    </li>
                                                    <li className="font-12 text-white text-uppercase">Feb</li>
                                                </ul>
                                            </div>
                                            <div className="media-body pl-15">
                                                <div className="event-content pull-left flip">
                                                    <h4 className="entry-title text-white text-uppercase m-0 mt-5">
                                                        <a href="#">
                                                            Data Star (Datatähti) programming competition for
                                                            comprehensive school{" "}
                                                        </a>
                                                    </h4>
                                                    <span className="mb-10 text-gray-darkgray mr-10 font-13">
                                                        <i className="fa fa-commenting-o mr-5 text-theme-colored" />
                                                        214 Comments
                                                    </span>
                                                    <span className="mb-10 text-gray-darkgray mr-10 font-13">
                                                        <i className="fa fa-heart-o mr-5 text-theme-colored" />{" "}
                                                        895 Likes
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-10">
                                            Lorem ipsum dolor sit amet, consectetur adipisi cing elit.
                                            Molestias eius illum libero dolor nobis deleniti, sint assumenda
                                            Pariatur iste.
                                        </p>
                                        <a href="#" className="btn-read-more">
                                            Read more
                                        </a>
                                        <div className="clearfix" />
                                    </div>
                                </article>
                            </div>
                            <div
                                className="col-xs-12 col-sm-6 col-md-4 wow fadeInLeft"
                                data-wow-duration="1s"
                                data-wow-delay="0.3s"
                                style={{
                                    visibility: "visible",
                                    animationDuration: "1s",
                                    animationDelay: "0.3s"
                                }}
                            >
                                <article className="post clearfix mb-sm-30">
                                    <div className="entry-header">
                                        <div className="post-thumb thumb">
                                            <Image
                                                src="https://www.aalto.fi/sites/g/files/flghsv161/files/styles/1_91_1200w_630h_n/public/midgard/images/1e7a99ada0f73b6a99a11e7b8a07996928a6a4f6a4f-programming_hiit2016_en_en.jpg"
                                                width={360}
                                                height={190}
                                                alt="product"
                                                className="img-fullwidth"
                                            />
                                        </div>
                                    </div>
                                    <div className="entry-content p-20 pr-10 bg-white">
                                        <div className="entry-meta media mt-0 no-bg no-border">
                                            <div className="entry-date media-left text-center flip bg-theme-colored pt-5 pr-15 pb-5 pl-15">
                                                <ul>
                                                    <li className="font-16 text-white font-weight-600 border-bottom">
                                                        28
                                                    </li>
                                                    <li className="font-12 text-white text-uppercase">Feb</li>
                                                </ul>
                                            </div>
                                            <div className="media-body pl-15">
                                                <div className="event-content pull-left flip">
                                                    <h4 className="entry-title text-white text-uppercase m-0 mt-5">
                                                        <a href="#">
                                                            Data Star (Datatähti) programming competition for
                                                            comprehensive school{" "}
                                                        </a>
                                                    </h4>
                                                    <span className="mb-10 text-gray-darkgray mr-10 font-13">
                                                        <i className="fa fa-commenting-o mr-5 text-theme-colored" />
                                                        214 Comments
                                                    </span>
                                                    <span className="mb-10 text-gray-darkgray mr-10 font-13">
                                                        <i className="fa fa-heart-o mr-5 text-theme-colored" />{" "}
                                                        895 Likes
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-10">
                                            Lorem ipsum dolor sit amet, consectetur adipisi cing elit.
                                            Molestias eius illum libero dolor nobis deleniti, sint assumenda
                                            Pariatur iste.
                                        </p>
                                        <a href="#" className="btn-read-more">
                                            Read more
                                        </a>
                                        <div className="clearfix" />
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Blog