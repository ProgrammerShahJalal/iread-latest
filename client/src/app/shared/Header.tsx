import React from 'react'
import Image from 'next/image'

function Header() {
    return (
        <header id="header" className="header">
            <div className="header-top bg-theme-color-2 sm-text-center p-0">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="widget no-border m-0">
                                <ul className="list-inline font-13 sm-text-center mt-5">
                                    <li>
                                        <a className="text-white" href="#">
                                            FAQ
                                        </a>
                                    </li>
                                    <li className="text-white">|</li>
                                    <li>
                                        <a className="text-white" href="#">
                                            Help Desk
                                        </a>
                                    </li>
                                    <li className="text-white">|</li>
                                    <li>
                                        <a className="text-white" href="#">
                                            Login
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-8">

                            <div className="widget no-border m-0 mr-15 pull-right flip sm-pull-none sm-text-center">
                                <ul className="styled-icons icon-circled icon-sm pull-right flip sm-pull-none sm-text-center mt-sm-15">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-facebook text-white" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-twitter text-white" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-google-plus text-white" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-instagram text-white" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-linkedin text-white" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-middle p-0 bg-lightest xs-text-center">
                <div className="container pt-0 pb-0">
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 col-md-5">
                            <div className="widget no-border m-0">
                                <a
                                    className="menuzord-brand pull-left flip xs-pull-center mb-15"
                                    href="#/"
                                >
                                    IREAD
                                </a>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4">
                            <div className="widget no-border pull-right sm-pull-none sm-text-center mt-10 mb-10 m-0">
                                <ul className="list-inline">
                                    <li>
                                        <i className="fa fa-phone-square text-theme-colored font-36 mt-5 sm-display-block" />
                                    </li>
                                    <li>
                                        <a href="#" className="font-12 text-gray text-uppercase">
                                            Call us today!
                                        </a>
                                        <h5 className="font-14 m-0"> +(012) 345 6789</h5>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-3">
                            <div className="widget no-border pull-right sm-pull-none sm-text-center mt-10 mb-10 m-0">
                                <ul className="list-inline">
                                    <li>
                                        <i className="fa fa-clock-o text-theme-colored font-36 mt-5 sm-display-block" />
                                    </li>
                                    <li>
                                        <a href="#" className="font-12 text-gray text-uppercase">
                                            We are open!
                                        </a>
                                        <h5 className="font-13 text-black m-0"> Mon-Fri 8:00-16:00</h5>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-nav">
                <div className="header-nav-wrapper navbar-scrolltofixed bg-theme-colored border-bottom-theme-color-2-1px">
                    <div className="container">
                        <nav
                            id="menuzord"
                            className="menuzord bg-theme-colored pull-left flip menuzord-responsive"
                        >
                            <ul className="menuzord-menu">
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#">About Us</a>
                                </li>
                                <li>
                                    <a href="#">Events</a>
                                </li>
                                <li>
                                    <a href="#">Courses</a>
                                </li>
                                <li>
                                    <a href="#">Forum</a>
                                </li>
                                <li>
                                    <a href="#">Blog</a>
                                </li>
                                <li>
                                    <a href="#">Trainers</a>
                                </li>
                                <li>
                                    <a href="#">AI Models</a>
                                </li>
                                <li>
                                    <a href="/profile">Profile</a>
                                </li>
                                <li>
                                    <a href="/contact">Contact</a>
                                </li>
                            </ul>
                            <ul className="pull-right flip hidden-sm hidden-xs d-flex">
                                <li>
                                    <a
                                        className="btn btn-colored btn-flat bg-theme-color-2 text-white font-14 bs-modal-ajax-load mt-0 p-25 pr-15 pl-15"
                                        data-toggle="modal"
                                        data-target="#BSParentModal"
                                        href="/donate"
                                    >
                                        Donate Us
                                    </a>
                                </li>
                            </ul>
                            <div id="top-search-bar" className="collapse">
                                <div className="container">
                                    <form
                                        role="search"
                                        action="#"
                                        className="search_form_top"
                                        method="get"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Type text and press Enter..."
                                            name="s"
                                            className="form-control"
                                            autoComplete="off"
                                        />
                                        <span className="search-close">
                                            <i className="fa fa-search" />
                                        </span>
                                    </form>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header