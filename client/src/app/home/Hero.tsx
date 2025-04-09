"use client";

import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import ModalVideo from 'react-modal-video';
import "react-modal-video/css/modal-video.css";

function Hero() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const ModalVideoComponent = ModalVideo as any;

    return (
        <>
        {/* Modal Video */}
        <ModalVideoComponent
        channel="youtube"
        isOpen={isOpen}
        videoId="pW1uVUg5wXM"
        onClose={() => setIsOpen(false)}
    />
        <div className="container my-16">
            <div className="section-content">
                <div className="row gap-10">
                    <div className="col-md-6">
                        <h6 className="letter-space-4 text-gray-darkgray text-uppercase mt-0 mb-0">
                            All About
                        </h6>
                        <h2 className="text-uppercase font-weight-600 mt-0 font-28 line-bottom">
                            The World’s Best Education in Our University
                        </h2>
                        <h4 className="text-theme-colored text-3xl md:text-lg">
                        Empowering Minds, Shaping Futures!
                        </h4>
                        <p className="my-5">
                        Join a community of passionate learners and world-class educators. At our university, we provide an exceptional learning experience, cutting-edge research opportunities, and a supportive environment to help you thrive academically and personally.
                        </p>
                        <Link
                            className="btn btn-theme-colored btn-flat btn-lg mt-10 mb-sm-30"
                            href="#"
                        >
                            Know More →
                        </Link>
                    </div>

                    <div className="col-md-6">
                        <div className="video-container">
                            <Image
                                src="/frontend/images/about/5.jpg"
                                width={400}
                                height={300}
                                alt="About us"
                                className="w-full rounded-md cursor-pointer"
                                onClick={openModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Hero;
