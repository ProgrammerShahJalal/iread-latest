"use client";

import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import ModalVideo from 'react-modal-video';
import "react-modal-video/css/modal-video.css";


// Define the expected API response type
interface SiteResponse {
    data?: {
      value: string;
    };
  }

function Hero() {
    const [isOpen, setIsOpen] = useState(false);
    const [heroTitle, setHeroTitle] = useState<SiteResponse | null>(null);
    const [heroDescription, setHeroDescription] = useState<SiteResponse | null>(null);
    const [heroVideoId, setHeroVideoId] = useState<SiteResponse | null>(null);

    const openModal = () => {
        setIsOpen(true);
    };

    const ModalVideoComponent = ModalVideo as any;

    const BASE_URL = process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_LIVE_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const endpoints = [
          { key: 'title/Hero Title', setter: setHeroTitle },
          { key: 'title/Hero Description', setter: setHeroDescription },
          { key: 'title/Hero Video Id', setter: setHeroVideoId },
        ];
      
        const fetchSettings = async () => {
          try {
            const responses = await Promise.all(
              endpoints.map(({ key }) =>
                axios.get(`${BASE_URL}/api/v1/app-setting-values/${key}`)
              )
            );
            responses.forEach((response, index) => {
              endpoints[index].setter(response.data);
            });
          } catch (error) {
            console.error("Error fetching settings:", error);
          }
        };
      
        fetchSettings();
      }, [BASE_URL]);

    return (
        <>
        {/* Modal Video */}
        <ModalVideoComponent
        channel="youtube"
        isOpen={isOpen}
        videoId={heroVideoId?.data?.value || 'pW1uVUg5wXM'}
        onClose={() => setIsOpen(false)}
    />
        <div className="container my-16">
            <div className="section-content">
                <div className="row gap-10">
                    <div className="col-md-6">
                        <h2 className="text-uppercase font-weight-600 mt-0 font-28 line-bottom">
                           {heroTitle?.data?.value || 'The World’s Best Education in Our University'}
                        </h2>
                        <p className="my-5">
                      {heroDescription?.data?.value || 'Join a community of passionate learners and world-class educators. At our university, we provide an exceptional learning experience, cutting-edge research opportunities, and a supportive environment to help you thrive academically and personally.'}
                        </p>
                        <Link
                            className="btn btn-theme-colored btn-flat btn-lg mt-10 mb-sm-30"
                            href="/about"
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
