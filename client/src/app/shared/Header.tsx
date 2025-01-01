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
                            <div className="widget m-0 pull-right sm-pull-none sm-text-center">
                                <ul className="list-inline pull-right">
                                    <li className="mb-0 pb-0">
                                        <div className="top-dropdown-outer pt-5 pb-10">
                                            <a className="top-cart-link has-dropdown text-white text-hover-theme-colored">
                                                <i className="fa fa-shopping-cart font-13" /> (12)
                                            </a>
                                            <ul className="dropdown">
                                                <li>
                                                    <div className="dropdown-cart">
                                                        <table className="table cart-table-list table-responsive">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <a href="#">
                                                                            <Image
                                                                                src="/frontend/images/products/sm1.jpg"
                                                                                width={100}
                                                                                height={100}
                                                                                alt="product"
                                                                            />
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        <a href="#"> Product Title</a>
                                                                    </td>
                                                                    <td>X3</td>
                                                                    <td>$ 100.00</td>
                                                                    <td>
                                                                        <a className="close" href="#">
                                                                            <i className="fa fa-close font-13" />
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <a href="#">
                                                                            <Image
                                                                                src="/frontend/images/products/sm2.jpg"
                                                                                width={100}
                                                                                height={100}
                                                                                alt="product"
                                                                            />
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        <a href="#"> Product Title</a>
                                                                    </td>
                                                                    <td>X2</td>
                                                                    <td>$ 70.00</td>
                                                                    <td>
                                                                        <a className="close" href="#">
                                                                            <i className="fa fa-close font-13" />
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <div className="total-cart text-right">
                                                            <table className="table table-responsive">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Cart Subtotal</td>
                                                                        <td>$170.00</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Shipping and Handling</td>
                                                                        <td>$20.00</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Order Total</td>
                                                                        <td>$190.00</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="cart-btn text-right">
                                                            <a
                                                                className="btn btn-theme-colored btn-xs"
                                                                href="shop-cart.html"
                                                            >
                                                                {" "}
                                                                View cart
                                                            </a>
                                                            <a
                                                                className="btn btn-dark btn-xs"
                                                                href="shop-checkout.html"
                                                            >
                                                                Checkout
                                                            </a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="mb-0 pb-0">
                                        <div className="top-dropdown-outer pt-5 pb-10">
                                            <a className="top-search-box has-dropdown text-white text-hover-theme-colored">
                                                <i className="fa fa-search font-13" /> &nbsp;
                                            </a>
                                            <ul className="dropdown">
                                                <li>
                                                    <div className="search-form-wrapper">
                                                        <form method="get" className="mt-10">
                                                            <input
                                                                type="text"
                                                                defaultValue="Enter your search"
                                                                id="searchinput"
                                                                name="s"
                                                                className=""
                                                            />
                                                            <label>
                                                                <input
                                                                    type="submit"
                                                                    name="submit"
                                                                    defaultValue=""
                                                                />
                                                            </label>
                                                        </form>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
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
                                    <a href="#">Profile</a>
                                </li>
                            </ul>
                            <ul className="pull-right flip hidden-sm hidden-xs d-flex">
                                <li>
                                    <a
                                        className="btn btn-colored btn-flat bg-theme-color-2 text-white font-14 bs-modal-ajax-load mt-0 p-25 pr-15 pl-15"
                                        data-toggle="modal"
                                        data-target="#BSParentModal"
                                        href="#"
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