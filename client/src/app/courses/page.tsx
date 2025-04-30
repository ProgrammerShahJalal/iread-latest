export const dynamic = "force-dynamic";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const CoursePage = () => {
  return (
    <section>
        <div className="min-h-[100vh]">
            <div className="row">
            <div className="main-content bg-lighter">
  {/* Section: inner-header */}
  <section
    className="inner-header divider parallax layer-overlay overlay-dark-5"
    data-bg-Image="/frontend/images/bg/bg3.jpg"
    style={{
      backgroundImage: 'url("/frontend/images/bg/bg3.jpg")',
      backgroundPosition: "50% 97px"
    }}
  >
    <div className="container pt-70 pb-20">
      {/* Section Content */}
      <div className="section-content">
        <div className="row">
          <div className="col-md-12"> 
            <h2 className="title text-white">Courses</h2>
            <ol className="breadcrumb text-left text-black mt-10">
              {/* <li>
                <Link href="#">Home</Link>
              </li>
              <li>
                <Link href="#">Pages</Link>
              </li>
              <li className="active text-gray-silver">Page Title</li> */}
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Section: Course gird */}
  <section>
    <div className="container">
      <div className="row">
        <div className="col-md-9 blog-pull-right">
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="service-block bg-white">
                <div className="thumb">
                  {" "}
                  <Image
                    alt="featured project"
                    src="/frontend/images/project/4.jpg"
                    className="Image-fullwidth"
                    width={300}
                    height={300}
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
                  <Link
                    className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                    href="/courses/1"
                  >
                    view details
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="service-block bg-white">
                <div className="thumb">
                  {" "}
                  <Image
                    alt="featured project"
                    src="/frontend/images/project/5.jpg"
                    className="Image-fullwidth"
                    width={300}
                    height={300}
                  />
                  <h4 className="text-white mt-0 mb-0">
                    <span className="price">$125</span>
                  </h4>
                </div>
                <div className="content text-left flip p-25 pt-0">
                  <h4 className="line-bottom mb-10">Modern Technologies</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam aliquam ipsum quis ipsum facilisis sit amet.
                  </p>
                  <Link
                    className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                    href="/courses/2"
                  >
                    view details
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="service-block bg-white">
                <div className="thumb">
                  {" "}
                  <Image
                    alt="featured project"
                    src="/frontend/images/project/6.jpg"
                    className="Image-fullwidth"
                    width={300}
                    height={300}
                  />
                  <h4 className="text-white mt-0 mb-0">
                    <span className="price">$125</span>
                  </h4>
                </div>
                <div className="content text-left flip p-25 pt-0">
                  <h4 className="line-bottom mb-10">Modern Languages</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam aliquam ipsum quis ipsum facilisis sit amet.
                  </p>
                  <Link
                    className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                    href="/courses/3"
                  >
                    view details
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="service-block bg-white">
                <div className="thumb">
                  {" "}
                  <Image
                    alt="featured project"
                    src="/frontend/images/project/8.jpg"
                    className="Image-fullwidth"
                    width={300}
                    height={300}
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
                  <Link
                    className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                    href="/courses/4"
                  >
                    view details
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="service-block bg-white">
                <div className="thumb">
                  {" "}
                  <Image
                    alt="featured project"
                    src="/frontend/images/project/7.jpg"
                    className="Image-fullwidth"
                    width={300}
                    height={300}
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
                  <Link
                    className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                    href="/courses/5"
                  >
                    view details
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="service-block bg-white">
                <div className="thumb">
                  {" "}
                  <Image
                    alt="featured project"
                   src="/frontend/images/project/4.jpg"
                    className="Image-fullwidth"
                    width={300}
                    height={300}
                  />
                  <h4 className="text-white mt-0 mb-0">
                    <span className="price">$125</span>
                  </h4>
                </div>
                <div className="content text-left flip p-25 pt-0">
                  <h4 className="line-bottom mb-10">
                    Electrical &amp; Electronic{" "}
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam aliquam ipsum quis ipsum facilisis sit amet.
                  </p>
                  <Link
                    className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                    href="/courses/6"
                  >
                    view details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-3">
          <div className="sidebar sidebar-left mt-sm-30">
            <div className="widget">
              <h5 className="widget-title line-bottom">
                Search <span className="text-theme-color-2">Courses</span>
              </h5>
              <div className="search-form">
                <form>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Click to Search"
                      className="form-control search-input"
                      autoComplete="off"
                    />
                    <span className="input-group-btn">
                      <button type="submit" className="btn search-button">
                        <i className="fa fa-search" />
                      </button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
            <div className="widget">
              <h5 className="widget-title line-bottom">
                Course <span className="text-theme-color-2">Categories</span>
              </h5>
              <div className="categories">
                <ul className="list list-border angle-double-right">
                  <li>
                    <Link href="#">
                      Creative<span>(19)</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      Portfolio<span>(21)</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      Fitness<span>(15)</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      Gym<span>(35)</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      Personal<span>(16)</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="widget">
              <h5 className="widget-title line-bottom">
                Latest <span className="text-theme-color-2">Course</span>
              </h5>
              <div className="latest-posts">
                <article className="post media-post clearfix pb-0 mb-10">
                  <Link className="post-thumb" href="#">
                    <Image src="/frontend/images/services/s1.jpg" alt=""  width={100}
                    height={100}/>
                  </Link>
                  <div className="post-right">
                    <h5 className="post-title mt-0">
                      <Link href="#">Sustainable Construction</Link>
                    </h5>
                    <p>Lorem ipsum dolor sit amet adipisicing elit...</p>
                  </div>
                </article>
                <article className="post media-post clearfix pb-0 mb-10">
                  <Link className="post-thumb" href="#">
                    <Image src="/frontend/images/services/s3.jpg" alt="" width={100}
                    height={100}/>
                  </Link>
                  <div className="post-right">
                    <h5 className="post-title mt-0">
                      <Link href="#">Industrial Coatings</Link>
                    </h5>
                    <p>Lorem ipsum dolor sit amet adipisicing elit...</p>
                  </div>
                </article>
                <article className="post media-post clearfix pb-0 mb-10">
                  <Link className="post-thumb" href="#">
                    <Image src="/frontend/images/services/s2.jpg" alt=""  width={100}
                    height={100}/>
                  </Link>
                  <div className="post-right">
                    <h5 className="post-title mt-0">
                      <Link href="#">Storefront Installations</Link>
                    </h5>
                    <p>Lorem ipsum dolor sit amet adipisicing elit...</p>
                  </div>
                </article>
              </div>
            </div>
            <div className="widget">
              <h5 className="widget-title line-bottom">
                Photos <span className="text-theme-color-2">from Flickr</span>
              </h5>
              <div id="flickr-feed" className="clearfix">
                {/* Flickr Link */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <nav>
            <ul className="pagination theme-colored xs-pull-center m-0">
              <li>
                {" "}
                <Link href="#" aria-label="Previous">
                  {" "}
                  <span aria-hidden="true">«</span>{" "}
                </Link>{" "}
              </li>
              <li className="active">
                <Link href="#">1</Link>
              </li>
              <li>
                <Link href="#">2</Link>
              </li>
              <li>
                <Link href="#">3</Link>
              </li>
              <li>
                <Link href="#">4</Link>
              </li>
              <li>
                <Link href="#">5</Link>
              </li>
              <li>
                <Link href="#">...</Link>
              </li>
              <li>
                {" "}
                <Link href="#" aria-label="Next">
                  {" "}
                  <span aria-hidden="true">»</span>{" "}
                </Link>{" "}
              </li>
            </ul>
          </nav>
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

export default CoursePage;