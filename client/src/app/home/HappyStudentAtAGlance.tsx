'use client';

import React, { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup';

type Props = {}

function HappyStudentAtAGlance({ }: Props) {

    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <section
                ref={sectionRef}
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
                                {isVisible && (
                                    <h2 className="text-center text-xl font-bold my-2">
                                        <CountUp
                                            end={5248}
                                            duration={2.5}
                                            separator=","
                                            prefix="+"
                                        />
                                    </h2>
                                )}
                                <h5 className="text-white text-uppercase mb-0">Happy Students</h5>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3 mb-md-50">
                            <div className="funfact text-center">
                                <i className="pe-7s-note2 mt-5 text-theme-color-2" />
                                {isVisible && (
                                     <h2 className="text-center text-xl font-bold my-2">
                                        <CountUp
                                            end={675}
                                            duration={2.5}
                                            separator=","
                                            prefix="+"
                                        />
                                    </h2>
                                )}
                                <h5 className="text-white text-uppercase mb-0">Our Courses</h5>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3 mb-md-50">
                            <div className="funfact text-center">
                                <i className="pe-7s-users mt-5 text-theme-color-2" />
                                {isVisible && (
                                     <h2 className="text-center text-xl font-bold my-2">
                                        <CountUp
                                            end={248}
                                            duration={2.5}
                                            separator=","
                                            prefix="+"
                                        />
                                    </h2>
                                )}
                                <h5 className="text-white text-uppercase mb-0">Our Teachers</h5>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3 mb-md-0">
                            <div className="funfact text-center">
                                <i className="pe-7s-cup mt-5 text-theme-color-2" />
                                {isVisible && (
                                     <h2 className="text-center text-xl font-bold my-2">
                                        <CountUp
                                            end={24}
                                            duration={2.5}
                                            separator=","
                                            prefix="+"
                                        />
                                    </h2>
                                )}
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