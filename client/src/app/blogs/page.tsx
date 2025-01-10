import Image from 'next/image'
import React from 'react'

const BlogsPage = () => {
    return (
        <section>
            <div className="">
                <div className="row">
                    <div className="main-content">
                        {/* Section: inner-header */}
                        <section
                            className="inner-header divider parallax layer-overlay overlay-dark-5"
                            data-bg-img="/frontend/images/bg/bg3.jpg"
                            style={{
                                backgroundImage: 'url("/frontend/images/bg/bg3.jpg")',
                                backgroundPosition: "50% -113px"
                            }}
                        >
                            <div className="container pt-70 pb-20">
                                {/* Section Content */}
                                <div className="section-content">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h2 className="title text-white">Blogs</h2>
                                            <ol className="breadcrumb text-left text-black mt-10">

                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Section: News & Blog */}
                        <section id="news">
                            <div className="container">
                                <div className="section-content">
                                    <div className="row">
                                        <div className="col-sm-6 col-md-4">
                                            <article className="post clearfix mb-30 mb-sm-30">
                                                <div className="entry-header">
                                                    <div className="post-thumb thumb">
                                                        <Image
                                                            src="/frontend/images/blog/1.jpg"
                                                            alt=""
                                                            className="img-responsive img-fullwidth"
                                                            width={300}
                                                            height={200}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="entry-content p-20 pr-10 bg-lighter">
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
                                                                    <a href="#">Post title here</a>
                                                                </h4>
                                                                <span className="mb-10 text-gray-darkgray mr-10 font-13">
                                                                    <i className="fa fa-commenting-o mr-5 text-theme-colored" />{" "}
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
                                                        Molestias eius illum libero dolor nobis deleniti, sint
                                                        assumenda Pariatur iste.
                                                    </p>
                                                    <a href="/blogs/1" className="btn-read-more">
                                                        Read more
                                                    </a>
                                                    <div className="clearfix" />
                                                </div>
                                            </article>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <article className="post clearfix mb-30 mb-sm-30">
                                                <div className="entry-header">
                                                    <div className="post-thumb thumb">
                                                        <Image
                                                            src="/frontend/images/blog/2.jpg"
                                                            alt=""
                                                            className="img-responsive img-fullwidth"
                                                            width={300}
                                                            height={200}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="entry-content p-20 pr-10 bg-lighter">
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
                                                                    <a href="#">Post title here</a>
                                                                </h4>
                                                                <span className="mb-10 text-gray-darkgray mr-10 font-13">
                                                                    <i className="fa fa-commenting-o mr-5 text-theme-colored" />{" "}
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
                                                        Molestias eius illum libero dolor nobis deleniti, sint
                                                        assumenda Pariatur iste.
                                                    </p>
                                                    <a href="/blogs/2" className="btn-read-more">
                                                        Read more
                                                    </a>
                                                    <div className="clearfix" />
                                                </div>
                                            </article>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <article className="post clearfix mb-30 mb-sm-30">
                                                <div className="entry-header">
                                                    <div className="post-thumb thumb">
                                                        <Image
                                                            src="/frontend/images/blog/8.jpg"
                                                            alt=""
                                                            className="img-responsive img-fullwidth"
                                                            width={300}
                                                            height={200}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="entry-content p-20 pr-10 bg-lighter">
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
                                                                    <a href="#">Post title here</a>
                                                                </h4>
                                                                <span className="mb-10 text-gray-darkgray mr-10 font-13">
                                                                    <i className="fa fa-commenting-o mr-5 text-theme-colored" />{" "}
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
                                                        Molestias eius illum libero dolor nobis deleniti, sint
                                                        assumenda Pariatur iste.
                                                    </p>
                                                    <a href="/blogs/3" className="btn-read-more">
                                                        Read more
                                                    </a>
                                                    <div className="clearfix" />
                                                </div>
                                            </article>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <article className="post clearfix mb-sm-30">
                                                <div className="entry-header">
                                                    <div className="post-thumb thumb">
                                                        <Image
                                                            src="/frontend/images/blog/8.jpg"
                                                            alt=""
                                                            className="img-responsive img-fullwidth"
                                                            width={300}
                                                            height={200}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="entry-content p-20 pr-10 bg-lighter">
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
                                                                    <a href="#">Post title here</a>
                                                                </h4>
                                                                <span className="mb-10 text-gray-darkgray mr-10 font-13">
                                                                    <i className="fa fa-commenting-o mr-5 text-theme-colored" />{" "}
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
                                                        Molestias eius illum libero dolor nobis deleniti, sint
                                                        assumenda Pariatur iste.
                                                    </p>
                                                    <a href="/blogs/4" className="btn-read-more">
                                                        Read more
                                                    </a>
                                                    <div className="clearfix" />
                                                </div>
                                            </article>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <article className="post clearfix mb-sm-30">
                                                <div className="entry-header">
                                                    <div className="post-thumb thumb">
                                                        <Image
                                                            src="/frontend/images/blog/2.jpg"
                                                            alt=""
                                                            className="img-responsive img-fullwidth"
                                                            width={300}
                                                            height={200}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="entry-content p-20 pr-10 bg-lighter">
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
                                                                    <a href="#">Post title here</a>
                                                                </h4>
                                                                <span className="mb-10 text-gray-darkgray mr-10 font-13">
                                                                    <i className="fa fa-commenting-o mr-5 text-theme-colored" />{" "}
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
                                                        Molestias eius illum libero dolor nobis deleniti, sint
                                                        assumenda Pariatur iste.
                                                    </p>
                                                    <a href="/blogs/5" className="btn-read-more">
                                                        Read more
                                                    </a>
                                                    <div className="clearfix" />
                                                </div>
                                            </article>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <article className="post clearfix mb-sm-30">
                                                <div className="entry-header">
                                                    <div className="post-thumb thumb">
                                                        <Image
                                                            src="/frontend/images/blog/1.jpg"
                                                            alt=""
                                                            className="img-responsive img-fullwidth"
                                                            width={300}
                                                            height={200}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="entry-content p-20 pr-10 bg-lighter">
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
                                                                    <a href="#">Post title here</a>
                                                                </h4>
                                                                <span className="mb-10 text-gray-darkgray mr-10 font-13">
                                                                    <i className="fa fa-commenting-o mr-5 text-theme-colored" />{" "}
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
                                                        Molestias eius illum libero dolor nobis deleniti, sint
                                                        assumenda Pariatur iste.
                                                    </p>
                                                    <a href="/blogs/6" className="btn-read-more">
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
                    </div>

                </div>
            </div>
        </section>
    )
}

export default BlogsPage