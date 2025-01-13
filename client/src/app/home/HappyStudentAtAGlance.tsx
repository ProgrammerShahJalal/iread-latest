import React from 'react'

type Props = {}

function HappyStudentAtAGlance({ }: Props) {
    return (
        <>
            <section
                className="divider parallax layer-overlay overlay-theme-colored-9"
                data-bg-img="/frontend/images/bg/bg.png"
                data-parallax-ratio="0.7"
                style={{
                    backgroundImage: 'url("/frontend/images/bg/bg.png")',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-3 mb-md-50">
                            <div className="funfact text-center">
                                <i className="pe-7s-smile mt-5 text-theme-color-2" />
                                <h2
                                    data-animation-duration={2000}
                                    data-value={5248}
                                    className="animate-number text-white mt-0 font-38 font-weight-500 appeared"
                                >
                                    5,248
                                </h2>
                                <h5 className="text-white text-uppercase mb-0">Happy Students</h5>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3 mb-md-50">
                            <div className="funfact text-center">
                                <i className="pe-7s-note2 mt-5 text-theme-color-2" />
                                <h2
                                    data-animation-duration={2000}
                                    data-value={675}
                                    className="animate-number text-white mt-0 font-38 font-weight-500 appeared"
                                >
                                    675
                                </h2>
                                <h5 className="text-white text-uppercase mb-0">Our Courses</h5>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3 mb-md-50">
                            <div className="funfact text-center">
                                <i className="pe-7s-users mt-5 text-theme-color-2" />
                                <h2
                                    data-animation-duration={2000}
                                    data-value={248}
                                    className="animate-number text-white mt-0 font-38 font-weight-500 appeared"
                                >
                                    248
                                </h2>
                                <h5 className="text-white text-uppercase mb-0">Our Teachers</h5>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3 mb-md-0">
                            <div className="funfact text-center">
                                <i className="pe-7s-cup mt-5 text-theme-color-2" />
                                <h2
                                    data-animation-duration={2000}
                                    data-value={24}
                                    className="animate-number text-white mt-0 font-38 font-weight-500 appeared"
                                >
                                    24
                                </h2>
                                <h5 className="text-white text-uppercase mb-0">Awards Won</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default HappyStudentAtAGlance