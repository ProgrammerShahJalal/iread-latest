'use client';

import { happyStudentsGlance } from '@/data/happyStudentsGlance';
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
                        {
                            happyStudentsGlance?.map((item) => {
                                return (
                                    <div className="col-xs-12 col-sm-6 col-md-3 mb-md-50" key={item?.title}>
                                        <div className="text-center">
                                            <i className={`text-5xl ${item?.icon} mt-5 text-theme-color-2 `}/>
                                            {isVisible && (
                                                <h2 className="text-center text-white text-5xl font-bold my-2">
                                                    <CountUp
                                                        end={item?.count}
                                                        duration={2.5}
                                                        separator=","
                                                        suffix='+'
                                                    />
                                                </h2>
                                            )}
                                            <h5 className="text-white text-uppercase mb-0">{item?.title}</h5>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default HappyStudentAtAGlance;
