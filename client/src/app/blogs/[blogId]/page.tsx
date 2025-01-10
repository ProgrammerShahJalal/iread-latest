import Image from 'next/image'
import React from 'react'

const BlogDetailsPage = () => {
  return (
    <section>
        <div className="">
            <div className="row">
            <div className="row">
  <div className="col-md-8 col-md-offset-2">
    <div className="blog-posts single-post">
      <article className="post clearfix mb-0">
        <div className="entry-header">
          <div className="post-thumb thumb">
            {" "}
            <Image
              src="/frontend/images/bg/bg1.jpg"
              alt=""
              className="Image-responsive Image-fullwidth"
              width={800}
              height={600}
            />{" "}
          </div>
        </div>
        <div className="entry-title pt-10 pl-15">
          <h4>
            <a className="text-uppercase" href="#">
              The Family Handyman: Automotive{" "}
            </a>
          </h4>
        </div>
        <div className="entry-meta pl-15">
          <ul className="list-inline">
            <li>
              Posted: <span className="text-theme-color-2"> 9/9/2015</span>
            </li>
            <li>
              By: <span className="text-theme-color-2">Admin</span>
            </li>
            <li>
              <i className="fa fa-comments-o ml-5 mr-5" /> 5 comments
            </li>
          </ul>
        </div>
        <div className="entry-content mt-10">
          <p className="mb-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className="mb-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <blockquote className="theme-colored pt-20 pb-20">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </p>
            <footer>
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna et sed aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <div className="mt-30 mb-0">
            <h5 className="pull-left mt-10 mr-20 text-theme-color-2">Share:</h5>
            <ul className="styled-icons icon-circled m-0">
              <li>
                <a
                  href="#"
                  data-bg-color="#3A5795"
                  style={{ background: "rgb(58, 87, 149) !important" }}
                >
                  <i className="fa fa-facebook text-white" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  data-bg-color="#55ACEE"
                  style={{ background: "rgb(85, 172, 238) !important" }}
                >
                  <i className="fa fa-twitter text-white" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  data-bg-color="#A11312"
                  style={{ background: "rgb(161, 19, 18) !important" }}
                >
                  <i className="fa fa-google-plus text-white" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </article>
      <div className="tagline p-0 pt-20 mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="tags">
              <p className="mb-0">
                <i className="fa fa-tags text-theme-color-2" />{" "}
                <span>Tags:</span> Engine, Wheel, Oil, Brake
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="share text-right">
              <p>
                <i className="fa fa-share-alt text-theme-color-2" /> Share
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="author-details media-post">
        <a href="#" className="post-thumb mb-0 pull-left flip pr-20">
          <Image className="Image-thumbnail" alt="" src="/frontend/images/blog/author.jpg"
         width={80}
         height={80}
          />
        </a>
        <div className="post-right">
          <h5 className="post-title mt-0 mb-0">
            <a href="#" className="font-18">
              John Doe
            </a>
          </h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna et sed aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <ul className="styled-icons square-sm m-0">
            <li>
              <a href="#">
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-twitter" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-google-plus" />
              </a>
            </li>
          </ul>
        </div>
        <div className="clearfix" />
      </div>
      <div className="comments-area">
        <h5 className="comments-title">Comments</h5>
        <ul className="comment-list">
          <li>
            <div className="media comment-author">
              {" "}
              <a className="media-left pull-left flip" href="#">
                <Image
                  className="Image-thumbnail"
                  src="/frontend/images/blog/comment1.jpg"
                  alt=""
                  width={80}
                  height={80}
                />
              </a>
              <div className="media-body">
                <h5 className="media-heading comment-heading">
                  John Doe says:
                </h5>
                <div className="comment-date">23/06/2014</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna et sed
                  aliqua. Ut enim ea commodo consequat...
                </p>
                <a
                  className="replay-icon pull-right text-theme-colored"
                  href="#"
                >
                  {" "}
                  <i className="fa fa-reply text-theme-colored" /> Replay
                </a>{" "}
              </div>
            </div>
          </li>
          <li>
            <div className="media comment-author">
              {" "}
              <a className="media-left pull-left flip" href="#">
                <Image
                  className="Image-thumbnail"
                  src="/frontend/images/blog/comment2.jpg"
                  alt=""
                  width={80}
                  height={80}
                />
              </a>
              <div className="media-body">
                <h5 className="media-heading comment-heading">
                  John Doe says:
                </h5>
                <div className="comment-date">23/06/2014</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna et sed
                  aliqua. Ut enim ea commodo consequat...
                </p>
                <a
                  className="replay-icon pull-right text-theme-colored"
                  href="#"
                >
                  {" "}
                  <i className="fa fa-reply text-theme-colored" /> Replay
                </a>
                <div className="clearfix" />
                <div className="media comment-author nested-comment">
                  {" "}
                  <a href="#" className="media-left pull-left flip pt-20">
                    <Image
                      alt=""
                      src="/frontend/images/blog/comment3.jpg"
                      className="Image-thumbnail"
                      width={80}
                      height={80}
                    />
                  </a>
                  <div className="media-body p-20 bg-lighter">
                    <h5 className="media-heading comment-heading">
                      John Doe says:
                    </h5>
                    <div className="comment-date">23/06/2014</div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      et sed aliqua. Ut enim ea commodo consequat...
                    </p>
                    <a
                      className="replay-icon pull-right text-theme-colored"
                      href="#"
                    >
                      {" "}
                      <i className="fa fa-reply text-theme-colored" /> Replay
                    </a>
                  </div>
                </div>
                <div className="media comment-author nested-comment">
                  {" "}
                  <a href="#" className="media-left pull-left flip pt-20">
                    <Image
                      alt=""
                      src="/frontend/images/blog/comment1.jpg"
                      className="Image-thumbnail"
                      width={80}
                      height={80}
                    />
                  </a>
                  <div className="media-body p-20 bg-lighter">
                    <h5 className="media-heading comment-heading">
                      John Doe says:
                    </h5>
                    <div className="comment-date">23/06/2014</div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      et sed aliqua. Ut enim ea commodo consequat...
                    </p>
                    <a
                      className="replay-icon pull-right text-theme-colored"
                      href="#"
                    >
                      {" "}
                      <i className="fa fa-reply text-theme-colored" /> Replay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="media comment-author">
              {" "}
              <a className="media-left pull-left flip" href="#">
                <Image
                  className="Image-thumbnail"
                  src="/frontend/images/blog/comment2.jpg"
                  alt=""
                  width={80}
                      height={80}
                />
              </a>
              <div className="media-body">
                <h5 className="media-heading comment-heading">
                  John Doe says:
                </h5>
                <div className="comment-date">23/06/2014</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna et sed
                  aliqua. Ut enim ea commodo consequat...
                </p>
                <a
                  className="replay-icon pull-right text-theme-colored"
                  href="#"
                >
                  {" "}
                  <i className="fa fa-reply text-theme-colored" /> Replay
                </a>{" "}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="comment-box">
        <div className="row">
          <div className="col-sm-12">
            <h5>Leave a Comment</h5>
            <div className="row">
              <form role="form" id="comment-form">
                <div className="col-sm-6 pt-0 pb-0">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required={true}
                      name="contact_name"
                      id="contact_name"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      required={true}
                      className="form-control"
                      name="contact_email2"
                      id="contact_email2"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Enter Website"
                      required={true}
                      className="form-control"
                      name="subject"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  
                 
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      required={true}
                      name="contact_message2"
                      id="contact_message2"
                      placeholder="Enter Message"
                      rows={7}
                      autoComplete="off"
                      spellCheck="false"
                      defaultValue={""}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-dark btn-flat pull-right m-0"
                      data-loading-text="Please wait..."
                    >
                      Submit
                    </button>
                  </div>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

            </div>
        </div>
    </section>
  )
}

export default BlogDetailsPage