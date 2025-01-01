import React from 'react'

type Props = {}

function Footer({ }: Props) {
    return (
        <>
            <>
                <footer
                    id="footer"
                    className="footer divider layer-overlay overlay-dark-9"
                    data-bg-img="/frontend/images/bg/bg2.jpg"
                >
                    <div className="container">
                        <div className="row border-bottom">
                            <div className="col-sm-6 col-md-3">
                                <div className="widget dark">
                                    <h2 style={{ color: "chocolate" }}>IREAD</h2>
                                    <p>USA.</p>
                                    <ul className="list-inline mt-5">
                                        <li className="m-0 pl-10 pr-10">
                                            {" "}
                                            <i className="fa fa-phone text-theme-color-2 mr-5" />{" "}
                                            <a className="text-gray" href="#">
                                                123-456-789
                                            </a>{" "}
                                        </li>
                                        <li className="m-0 pl-10 pr-10">
                                            {" "}
                                            <i className="fa fa-envelope-o text-theme-color-2 mr-5" />
                                            <a className="text-gray" href="#">
                                                <span
                                                    className="__cf_email__"
                                                    data-cfemail="d4b7bbbaa0b5b7a094adbba1a6b0bbb9b5bdbafab7bbb9"
                                                >
                                                    support@iread.com
                                                </span>
                                            </a>
                                        </li>
                                        <li className="m-0 pl-10 pr-10">
                                            {" "}
                                            <i className="fa fa-globe text-theme-color-2 mr-5" />{" "}
                                            <a className="text-gray" href="#">
                                                www.iread.com
                                            </a>{" "}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3">
                                <div className="widget dark">
                                    <h4 className="widget-title">Useful Links</h4>
                                    <ul className="list angle-double-right list-border">
                                        <li>
                                            <a href="page-about-style1.html">About Us</a>
                                        </li>
                                        <li>
                                            <a href="page-course-list.html">Our Courses</a>
                                        </li>
                                        <li>
                                            <a href="page-pricing-style1.html">Pricing Table</a>
                                        </li>
                                        <li>
                                            <a href="page-gallery-3col.html">Gallery</a>
                                        </li>
                                        <li>
                                            <a href="shop-category.html">Shop</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3">
                                <div className="widget dark">
                                    <h4 className="widget-title">Twitter Feed</h4>
                                    <div
                                        className="twitter-feed list-border clearfix"
                                        data-username="Envato"
                                        data-count={2}
                                    ></div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3">
                                <div className="widget dark">
                                    <h4 className="widget-title line-bottom-theme-colored-2">
                                        Opening Hours
                                    </h4>
                                    <div className="opening-hours">
                                        <ul className="list-border">
                                            <li className="clearfix">
                                                {" "}
                                                <span> Mon - Tues : </span>
                                                <div className="value pull-right"> 6.00 am - 10.00 pm </div>
                                            </li>
                                            <li className="clearfix">
                                                {" "}
                                                <span> Wednes - Thurs :</span>
                                                <div className="value pull-right"> 8.00 am - 6.00 pm </div>
                                            </li>
                                            <li className="clearfix">
                                                {" "}
                                                <span> Fri : </span>
                                                <div className="value pull-right"> 3.00 pm - 8.00 pm </div>
                                            </li>
                                            <li className="clearfix">
                                                {" "}
                                                <span> Sun : </span>
                                                <div className="value pull-right"> Closed </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-30">
                            <div className="col-md-2">
                                <div className="widget dark">
                                    <h5 className="widget-title mb-10">Call Us Now</h5>
                                    <div className="text-gray">
                                        +34332323323223232 <br />
                                        +34332346534763232
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="widget dark">
                                    <h5 className="widget-title mb-10">Connect With Us</h5>
                                    <ul className="styled-icons icon-bordered icon-sm">
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
                                                <i className="fa fa-skype" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-youtube" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-instagram" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-pinterest" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-5 col-md-offset-2">
                                <div className="widget dark">
                                    <h5 className="widget-title mb-10">Subscribe Us</h5>
                                    <form
                                        id="mailchimp-subscription-form-footer"
                                        className="newsletter-form"
                                    >
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                defaultValue=""
                                                name="EMAIL"
                                                placeholder="Your Email"
                                                className="form-control input-lg font-16"
                                                data-height="45px"
                                                id="mce-EMAIL-footer"
                                            />
                                            <span className="input-group-btn">
                                                <button
                                                    data-height="45px"
                                                    className="btn bg-theme-color-2 text-white btn-xs m-0 font-14"
                                                    type="submit"
                                                >
                                                    Subscribe
                                                </button>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom bg-black-333">
                        <div className="container pt-20 pb-20">
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="font-11 text-black-777 m-0">
                                        Copyright ©2024 IREAD. All Rights Reserved
                                    </p>
                                </div>
                                <div className="col-md-6 text-right">
                                    <div className="widget no-border m-0">
                                        <ul className="list-inline sm-text-center mt-5 font-12">
                                            <li>
                                                <a href="#">FAQ</a>
                                            </li>
                                            <li>|</li>
                                            <li>
                                                <a href="#">Help Desk</a>
                                            </li>
                                            <li>|</li>
                                            <li>
                                                <a href="#">Support</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                <a className="scrollToTop" href="#">
                    <i className="fa fa-angle-up" />
                </a>
            </>

        </>
    )
}

export default Footer