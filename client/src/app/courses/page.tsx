import Image from 'next/image';
import React from 'react'

const CoursePage = () => {
  return (
    <section>
        <div className="">
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
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Pages</a>
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
                  <a
                    className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                    href="page-courses-accounting-technologies.html"
                  >
                    view details
                  </a>
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
                  <a
                    className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                    href="page-courses-accounting-technologies.html"
                  >
                    view details
                  </a>
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
                  <a
                    className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                    href="page-courses-accounting-technologies.html"
                  >
                    view details
                  </a>
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
                  <a
                    className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                    href="page-courses-accounting-technologies.html"
                  >
                    view details
                  </a>
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
                  <a
                    className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                    href="page-courses-accounting-technologies.html"
                  >
                    view details
                  </a>
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
                    <a href="#">
                      Creative<span>(19)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Portfolio<span>(21)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Fitness<span>(15)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Gym<span>(35)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Personal<span>(16)</span>
                    </a>
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
                  <a className="post-thumb" href="#">
                    <Image src="/frontend/images/services/s1.jpg" alt=""  width={100}
                    height={100}/>
                  </a>
                  <div className="post-right">
                    <h5 className="post-title mt-0">
                      <a href="#">Sustainable Construction</a>
                    </h5>
                    <p>Lorem ipsum dolor sit amet adipisicing elit...</p>
                  </div>
                </article>
                <article className="post media-post clearfix pb-0 mb-10">
                  <a className="post-thumb" href="#">
                    <Image src="/frontend/images/services/s3.jpg" alt="" width={100}
                    height={100}/>
                  </a>
                  <div className="post-right">
                    <h5 className="post-title mt-0">
                      <a href="#">Industrial Coatings</a>
                    </h5>
                    <p>Lorem ipsum dolor sit amet adipisicing elit...</p>
                  </div>
                </article>
                <article className="post media-post clearfix pb-0 mb-10">
                  <a className="post-thumb" href="#">
                    <Image src="/frontend/images/services/s2.jpg" alt=""  width={100}
                    height={100}/>
                  </a>
                  <div className="post-right">
                    <h5 className="post-title mt-0">
                      <a href="#">Storefront Installations</a>
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
                <a href="#" aria-label="Previous">
                  {" "}
                  <span aria-hidden="true">«</span>{" "}
                </a>{" "}
              </li>
              <li className="active">
                <a href="#">1</a>
              </li>
              <li>
                <a href="#">2</a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li>
                <a href="#">4</a>
              </li>
              <li>
                <a href="#">5</a>
              </li>
              <li>
                <a href="#">...</a>
              </li>
              <li>
                {" "}
                <a href="#" aria-label="Next">
                  {" "}
                  <span aria-hidden="true">»</span>{" "}
                </a>{" "}
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