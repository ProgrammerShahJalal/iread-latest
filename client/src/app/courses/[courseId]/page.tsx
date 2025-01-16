import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CourseDetailsPage = () => {
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
                                backgroundPosition: "50% 97px"
                            }}
                        >
                            <div className="container pt-70 pb-20">
                                {/* Section Content */}
                                <div className="section-content">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h2 className="title text-white">Course Details</h2>
                                            <ol className="breadcrumb text-left text-black mt-10">
                                                
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Section: Blog */}
                        <section>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 blog-pull-right">
                                        <div className="single-service">
                                            <Image src="/frontend/images/services/lg6.jpg" alt="" width={700} height={700} />
                                            <h3 className="text-theme-colored line-bottom text-theme-colored">
                                                Accounting Technologies
                                            </h3>
                                            <h4 className="mt-0">
                                                <span className="text-theme-color-2">Price :</span> $420
                                            </h4>
                                            <ul className="review_text list-inline">
                                                <li>
                                                    <div className="star-rating" title="Rated 4.50 out of 5">
                                                        <span style={{ width: "90%" }}>4.50</span>
                                                    </div>
                                                </li>
                                            </ul>
                                            <h5>
                                                <em>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo
                                                    unde,{" "}
                                                    <span className="text-theme-color-2">
                                                        accounting technologies
                                                    </span>{" "}
                                                    corporis dolorum blanditiis ullam officia{" "}
                                                    <span className="text-theme-color-2">our university </span>natus
                                                    minima fugiat repellat! Corrupti voluptatibus aperiam
                                                    voluptatem. Exercitationem, placeat, cupiditate.
                                                </em>
                                            </h5>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                                                suscipit, inventore aliquid incidunt, quasi error! Natus esse rem
                                                eaque asperiores eligendi dicta quidem iure, excepturi doloremque
                                                eius neque autem sint error qui tenetur, modi provident aut,
                                                maiores laudantium reiciendis expedita. Eligendi
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
                                                voluptatem officiis quod animi possimus Link, iure nam sunt quas
                                                aperiam non recusandae reprehenderit, nesciunt cumque pariatur
                                                totam repellendus delectus? Maxime quasi earum nobis, dicta,
                                                aliquam facere reiciendis, delectus voluptas, ea assumenda
                                                blanditiis placeat dignissimos quas iusto repellat cumque.
                                            </p>
                                            <h4 className="line-bottom mt-20 mb-20 text-theme-colored">
                                                All Courses Idea
                                            </h4>
                                            <ul id="myTab" className="nav nav-tabs boot-tabs">
                                                <li className="active">
                                                    <Link href="#small" data-toggle="tab">
                                                        Categories
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="#medium" data-toggle="tab">
                                                        Categories
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="#large" data-toggle="tab">
                                                        Categories
                                                    </Link>
                                                </li>
                                            </ul>
                                            <div id="myTabContent" className="tab-content">
                                                <div className="tab-pane fade in active" id="small">
                                                    <table className="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    className="text-center font-16 font-weight-600 bg-theme-color-2 text-white"
                                                                    colSpan={4}
                                                                >
                                                                    Prices For All Lesson Type
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th>Coures Type</th> <th>Class time</th>{" "}
                                                                <th>Course Duration</th> <th>Price</th>{" "}
                                                            </tr>
                                                        </tbody>
                                                        <tbody>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Applied Psychology</th>{" "}
                                                                <td>45 minutes</td> <td>3 years</td> <td>$810</td>{" "}
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Business Administration (MBA)</th>{" "}
                                                                <td>45 minutes</td> <td>2 years</td> <td>$940</td>{" "}
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Computer Science (BSc)</th>{" "}
                                                                <td>1 Hours</td> <td>4 years</td> <td>$1180</td>{" "}
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Development Studies (MDS)</th>{" "}
                                                                <td>1 Hours</td> <td>5 years</td> <td>$1400</td>{" "}
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Engineering Technology (BSc)</th>{" "}
                                                                <td>30 minutes</td> <td>3 years</td> <td>$600</td>{" "}
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="tab-pane fade" id="medium">
                                                    <table className="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    className="text-center font-16 font-weight-600 bg-theme-color-2 text-white"
                                                                    colSpan={4}
                                                                >
                                                                    Prices For All Lesson Type
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th>Coures Type</th> <th>Class time</th>{" "}
                                                                <th>Course Duration</th> <th>Price</th>{" "}
                                                            </tr>
                                                        </tbody>
                                                        <tbody>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Applied Psychology</th>{" "}
                                                                <td>45 minutes</td> <td>3 years</td> <td>$810</td>{" "}
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Business Administration (MBA)</th>{" "}
                                                                <td>45 minutes</td> <td>2 years</td> <td>$940</td>{" "}
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Computer Science (BSc)</th>{" "}
                                                                <td>1 Hours</td> <td>4 years</td> <td>$1180</td>{" "}
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Development Studies (MDS)</th>{" "}
                                                                <td>1 Hours</td> <td>5 years</td> <td>$1400</td>{" "}
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Engineering Technology (BSc)</th>{" "}
                                                                <td>30 minutes</td> <td>3 years</td> <td>$600</td>{" "}
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="tab-pane fade" id="large">
                                                    <table className="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    className="text-center font-16 font-weight-600 bg-theme-color-2 text-white"
                                                                    colSpan={4}
                                                                >
                                                                    Prices For All Lesson Type
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th>Coures Type</th> <th>Class time</th>{" "}
                                                                <th>Course Duration</th> <th>Price</th>{" "}
                                                            </tr>
                                                        </tbody>
                                                        <tbody>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Applied Psychology</th>{" "}
                                                                <td>45 minutes</td> <td>3 years</td> <td>$810</td>{" "}
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Business Administration (MBA)</th>{" "}
                                                                <td>45 minutes</td> <td>2 years</td> <td>$940</td>{" "}
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Computer Science (BSc)</th>{" "}
                                                                <td>1 Hours</td> <td>4 years</td> <td>$1180</td>{" "}
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Development Studies (MDS)</th>{" "}
                                                                <td>1 Hours</td> <td>5 years</td> <td>$1400</td>{" "}
                                                            </tr>
                                                            <tr>
                                                                {" "}
                                                                <th scope="row">Engineering Technology (BSc)</th>{" "}
                                                                <td>30 minutes</td> <td>3 years</td> <td>$600</td>{" "}
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <div className="sidebar sidebar-left mt-sm-30 ml-40">
                                            <div className="widget">
                                                <h4 className="widget-title line-bottom">
                                                    Courses <span className="text-theme-color-2">List</span>
                                                </h4>
                                                <div className="services-list">
                                                    <ul className="list list-border angle-double-right">
                                                        <li className="active">
                                                            <Link href="page-courses-accounting-technologies.html">
                                                                Accounting Technologies
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="page-courses-chemical-engineering.html">
                                                                Chemical Engineering
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="page-courses-computer-technologies.html">
                                                                Computer Technologies
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="page-courses-development-studies.html">
                                                                Development Studies
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="page-courses-electrical-electronic.html">
                                                                Electrical &amp; Electronic
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="page-courses-modern-languages.html">
                                                                Modern Languages
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="page-courses-modern-technologies.html">
                                                                Modern Technologies
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="page-courses-software-engineering.html">
                                                                Software Engineering
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="widget">
                                                <h4 className="widget-title line-bottom">
                                                    Opening <span className="text-theme-color-2">Hours</span>
                                                </h4>
                                                <div className="opening-hours">
                                                    <ul className="list-border">
                                                        <li className="clearfix">
                                                            {" "}
                                                            <span> Mon - Tues :</span>
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
                                                            <div className="value pull-right"> Colosed </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="widget">
                                                <h4 className="widget-title line-bottom">
                                                    Quick <span className="text-theme-color-2">Contact</span>
                                                </h4>
                                                <form
                                                    id="quick_contact_form_sidebar"
                                                    name="footer_quick_contact_form"
                                                    className="quick-contact-form"
                                                    action="includes/quickcontact.php"
                                                    method="post"
                                                >
                                                    <div className="form-group">
                                                        <input
                                                            name="form_email"
                                                            className="form-control"
                                                            type="text"
                                                            required={true}
                                                            placeholder="Enter Email"
                                                            aria-required="true"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <textarea
                                                            name="form_message"
                                                            className="form-control"
                                                            required={true}
                                                            placeholder="Enter Message"
                                                            rows={3}
                                                            aria-required="true"
                                                            defaultValue={""}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            name="form_botcheck"
                                                            className="form-control"
                                                            type="hidden"
                                                            defaultValue=""
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="btn btn-theme-colored btn-flat btn-xs btn-quick-contact text-white pt-5 pb-5"
                                                            data-loading-text="Please wait..."
                                                        >
                                                            Send Message
                                                        </button>
                                                    </div>
                                                </form>
                                                {/* Quick Contact Form Validation*/}
                                            </div>
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

export default CourseDetailsPage