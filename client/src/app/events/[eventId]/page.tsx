import CountdownTimer from '@/CoundownTimer/CoundownTimer'
import React from 'react'

const EventDetailsPage = () => {
  return (
    <section>
        <div className="">
            <div className="section-content">
                <div className="row">
                <div className="main-content">
  {/* Section: inner-header */}
  <section
    className="inner-header divider parallax layer-overlay overlay-dark-5"
    data-bg-img="/frontend/images/bg/bg3.jpg"
    style={{
      backgroundImage: 'url("/frontend/images/bg/bg3.jpg")',
      backgroundPosition: "50% -103px"
    }}
  >
    <div className="container pt-60 pb-60">
      {/* Section Content */}
      <div className="section-content">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="font-28 text-white">Event Details</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="bg-theme-colored">
    <div className="container pt-40 pb-40">
      <div className="row text-center">
        <div className="col-md-12">
          <h2 id="basic-coupon-clock" className="text-white font-28">

          {/* date and time in ISO 8601 format (e.g., "YYYY-MM-DDTHH:mm:ss"). This allows the component to calculate the time remaining until the specified date. */}
          <CountdownTimer offerTill="2025-02-15T23:59:59"/>
          </h2>
          {/* Final Countdown Timer Script */}
        </div>
      </div>
    </div>
  </section>
  <section>
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <ul>
            <li>
              <h5>Topics:</h5>
              <p>Web design &amp; development, Graphics design</p>
            </li>
            <li>
              <h5>Host:</h5>
              <p>Kodesolution Lmd.</p>
            </li>
            <li>
              <h5>Location:</h5>
              <p>#405, Lan Streen, Los Vegas, USA</p>
            </li>
            <li>
              <h5>Start Date:</h5>
              <p>January 26, 2016</p>
            </li>
            <li>
              <h5>End Date:</h5>
              <p>February 10, 2016</p>
            </li>
            <li>
              <h5>Website:</h5>
              <p>kodesolution.com</p>
            </li>
            <li>
              <h5>Share:</h5>
              <div className="styled-icons icon-sm icon-gray icon-circled">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#">
                  <i className="fa fa-google-plus" />
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-md-8">
          <div
            className="owl-carousel-1col owl-carousel owl-theme owl-loaded"
            data-nav="true"
          >
            <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style={{
                  transform: "translate3d(-1440px, 0px, 0px)",
                  transition: "0.25s",
                  width: 5040
                }}
              >
                <div
                  className="owl-item cloned"
                  style={{ width: 720, marginRight: 0 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: 720, marginRight: 0 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: 720, marginRight: 0 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: 720, marginRight: 0 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: 720, marginRight: 0 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: 720, marginRight: 0 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: 720, marginRight: 0 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="owl-controls">
              <div className="owl-nav">
                <div className="owl-prev" style={{}}>
                  <i className="pe-7s-angle-left" />
                </div>
                <div className="owl-next" style={{}}>
                  <i className="pe-7s-angle-right" />
                </div>
              </div>
              <div className="owl-dots" style={{ display: "none" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-60">
        <div className="col-md-6">
          <h4 className="mt-0">Event Description</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
            id perspiciatis facilis nulla possimus quasi, amet qui. Ea rerum
            officia, aspernatur nulla neque nesciunt alias repudiandae
            doloremque, dolor, quam nostrum laudantium earum illum odio quasi
            excepturi mollitia corporis quas ipsa modi nihil, ad ex tempore.
          </p>
        </div>
        <div className="col-md-6">
          <blockquote>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </p>
            <footer>
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="row mt-40">
        <div className="col-md-12">
          <h4 className="mb-20">Keynote Speakers</h4>
          <div
            className="owl-carousel-6col owl-carousel owl-theme owl-loaded"
            data-nav="true"
          >
            <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style={{
                  transform: "translate3d(-1225px, 0px, 0px)",
                  transition: "0.25s",
                  width: 3430
                }}
              >
                <div
                  className="owl-item cloned"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <div className="attorney">
                      <div className="thumb">
                        <img src="images/team/6.jpg" alt="" />
                      </div>
                      <div className="content text-center">
                        <h5 className="author mb-0">
                          <a className="text-theme-colored" href="#">
                            Alex Jacobson
                          </a>
                        </h5>
                        <h6 className="title text-gray font-12 mt-0 mb-0">
                          Student
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <div className="attorney">
                      <div className="thumb">
                        <img src="images/team/3.jpg" alt="" />
                      </div>
                      <div className="content text-center">
                        <h5 className="author mb-0">
                          <a className="text-theme-colored" href="#">
                            Alex Jacobson
                          </a>
                        </h5>
                        <h6 className="title text-gray font-12 mt-0 mb-0">
                          Student
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <div className="attorney">
                      <div className="thumb">
                        <img src="images/team/4.jpg" alt="" />
                      </div>
                      <div className="content text-center">
                        <h5 className="author mb-0">
                          <a className="text-theme-colored" href="#">
                            Alex Jacobson
                          </a>
                        </h5>
                        <h6 className="title text-gray font-12 mt-0 mb-0">
                          Lawyer
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <div className="attorney">
                      <div className="thumb">
                        <img src="images/team/1.jpg" alt="" />
                      </div>
                      <div className="content text-center">
                        <h5 className="author mb-0">
                          <a className="text-theme-colored" href="#">
                            Alex Jacobson
                          </a>
                        </h5>
                        <h6 className="title text-gray font-12 mt-0 mb-0">
                          Lawyer
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <div className="attorney">
                      <div className="thumb">
                        <img src="images/team/2.jpg" alt="" />
                      </div>
                      <div className="content text-center">
                        <h5 className="author mb-0">
                          <a className="text-theme-colored" href="#">
                            Alex Jacobson
                          </a>
                        </h5>
                        <h6 className="title text-gray font-12 mt-0 mb-0">
                          Businessman
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <div className="attorney">
                      <div className="thumb">
                        <img src="images/team/3.jpg" alt="" />
                      </div>
                      <div className="content text-center">
                        <h5 className="author mb-0">
                          <a className="text-theme-colored" href="#">
                            Alex Jacobson
                          </a>
                        </h5>
                        <h6 className="title text-gray font-12 mt-0 mb-0">
                          Student
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <div className="attorney">
                      <div className="thumb">
                        <img src="images/team/4.jpg" alt="" />
                      </div>
                      <div className="content text-center">
                        <h5 className="author mb-0">
                          <a className="text-theme-colored" href="#">
                            Alex Jacobson
                          </a>
                        </h5>
                        <h6 className="title text-gray font-12 mt-0 mb-0">
                          Lawyer
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <div className="attorney">
                      <div className="thumb">
                        <img src="images/team/5.jpg" alt="" />
                      </div>
                      <div className="content text-center">
                        <h5 className="author mb-0">
                          <a className="text-theme-colored" href="#">
                            Alex Jacobson
                          </a>
                        </h5>
                        <h6 className="title text-gray font-12 mt-0 mb-0">
                          Businessman
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <div className="attorney">
                      <div className="thumb">
                        <img src="images/team/6.jpg" alt="" />
                      </div>
                      <div className="content text-center">
                        <h5 className="author mb-0">
                          <a className="text-theme-colored" href="#">
                            Alex Jacobson
                          </a>
                        </h5>
                        <h6 className="title text-gray font-12 mt-0 mb-0">
                          Student
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <div className="attorney">
                      <div className="thumb">
                        <img src="images/team/3.jpg" alt="" />
                      </div>
                      <div className="content text-center">
                        <h5 className="author mb-0">
                          <a className="text-theme-colored" href="#">
                            Alex Jacobson
                          </a>
                        </h5>
                        <h6 className="title text-gray font-12 mt-0 mb-0">
                          Student
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <div className="attorney">
                      <div className="thumb">
                        <img src="images/team/4.jpg" alt="" />
                      </div>
                      <div className="content text-center">
                        <h5 className="author mb-0">
                          <a className="text-theme-colored" href="#">
                            Alex Jacobson
                          </a>
                        </h5>
                        <h6 className="title text-gray font-12 mt-0 mb-0">
                          Lawyer
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <div className="attorney">
                      <div className="thumb">
                        <img src="images/team/1.jpg" alt="" />
                      </div>
                      <div className="content text-center">
                        <h5 className="author mb-0">
                          <a className="text-theme-colored" href="#">
                            Alex Jacobson
                          </a>
                        </h5>
                        <h6 className="title text-gray font-12 mt-0 mb-0">
                          Lawyer
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <div className="attorney">
                      <div className="thumb">
                        <img src="images/team/2.jpg" alt="" />
                      </div>
                      <div className="content text-center">
                        <h5 className="author mb-0">
                          <a className="text-theme-colored" href="#">
                            Alex Jacobson
                          </a>
                        </h5>
                        <h6 className="title text-gray font-12 mt-0 mb-0">
                          Businessman
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <div className="attorney">
                      <div className="thumb">
                        <img src="images/team/3.jpg" alt="" />
                      </div>
                      <div className="content text-center">
                        <h5 className="author mb-0">
                          <a className="text-theme-colored" href="#">
                            Alex Jacobson
                          </a>
                        </h5>
                        <h6 className="title text-gray font-12 mt-0 mb-0">
                          Student
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="owl-controls">
              <div className="owl-nav">
                <div className="owl-prev" style={{}}>
                  <i className="fa fa-angle-left" />
                </div>
                <div className="owl-next" style={{}}>
                  <i className="fa fa-angle-right" />
                </div>
              </div>
              <div className="owl-dots" style={{ display: "none" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Section: Registration Form */}
  <section
    className="divider parallax layer-overlay overlay-white-8"
    data-bg-img="images/bg/bg1.jpg"
    style={{
      backgroundImage: 'url("images/bg/bg1.jpg")',
      backgroundPosition: "50% 283px"
    }}
  >
    <div className="container-fluid">
      <div className="section-title">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 text-center">
            <h3 className="title text-theme-colored">Registration Form</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form
            id="booking-form"
            name="booking-form"
            action="includes/event-register.php"
            method="post"
            encType="multipart/form-data"
          >
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="register_name"
                    required={true}
                    className="form-control"
                    aria-required="true"
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="register_email"
                    className="form-control"
                    required={true}
                    aria-required="true"
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter Phone"
                    name="register_phone"
                    className="form-control"
                    required={true}
                    aria-required="true"
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Ticket types</label>
                  <select name="ticket_type" className="form-control">
                    <option>One Person</option>
                    <option>Two Person</option>
                    <option>Family Pack</option>
                    <option>Premium</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Event types</label>
                  <select name="event_type" className="form-control">
                    <option>Event 1</option>
                    <option>Event 2</option>
                    <option>Event 3</option>
                    <option>All package</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group text-center">
                  <input
                    name="form_botcheck"
                    className="form-control"
                    type="hidden"
                    defaultValue=""
                  />
                  <button
                    data-loading-text="Please wait..."
                    className="btn btn-dark btn-theme-colored btn-sm btn-block mt-20 pt-10 pb-10"
                    type="submit"
                  >
                    Register now
                  </button>
                </div>
              </div>
            </div>
          </form>
          {/* Job Form Validation*/}
        </div>
      </div>
    </div>
  </section>
  <section>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h4 className="mb-20">Photo Gallery</h4>
          <div
            className="owl-carousel-5col owl-carousel owl-theme owl-loaded"
            data-nav="true"
          >
            <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style={{
                  transform: "translate3d(-1225px, 0px, 0px)",
                  transition: "0.25s",
                  width: 2940
                }}
              >
                <div
                  className="owl-item cloned"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: 230, marginRight: 15 }}
                >
                  <div className="item">
                    <img src="https://img.freepik.com/free-photo/high-angle-students-learning-library_23-2149647043.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="owl-controls">
              <div className="owl-nav">
                <div className="owl-prev" style={{}}>
                  <i className="fa fa-angle-left" />
                </div>
                <div className="owl-next" style={{}}>
                  <i className="fa fa-angle-right" />
                </div>
              </div>
              <div className="owl-dots" style={{ display: "none" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

                </div>
            </div>
        </div>
    </section>
  )
}

export default EventDetailsPage