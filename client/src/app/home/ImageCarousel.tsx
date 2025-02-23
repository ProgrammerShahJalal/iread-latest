"use client";

import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center relative">
      <Carousel showThumbs={false} autoPlay infiniteLoop className="w-full">
        {[
          {
            src: "https://cdn.pixabay.com/photo/2019/12/29/13/14/college-4727066_1280.jpg",
            alt: "Slide 1",
            title: "EDUCATION FOR EVERYONE",
            caption: "WE PROVIDE ALWAYS BEST SERVICE.",
          },
          {
            src: "https://cdn.pixabay.com/photo/2023/01/30/15/36/school-7755985_1280.jpg",
            alt: "Slide 2",
            title: "BEST EDUCATION",
            caption: "FOR YOUR BETTER FUTURE.",
          },
          {
            src: "https://cdn.pixabay.com/photo/2024/02/25/16/57/coffee-8596194_1280.png",
            alt: "Slide 3",
            title: "FEED YOUR KNOWLEDGE",
            caption: "BETTER EDUCATION, BETTER FUTURE.",
          },
        ].map((slide, index) => (
          <div key={index} className="relative w-full h-[300px] md:h-[600px] flex justify-center items-center">
            {/* Image */}
            <Image
              src={slide.src}
              alt={slide.alt}
              layout="fill"
              objectFit="cover"
              className="absolute"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#1C2336] bg-opacity-50"></div>

            {/* Text Content */}
            <div className="relative z-10 text-center px-4">
              <h2 className="text-4xl md:text-7xl font-bold text-white">{slide.title}</h2>
              <p className="text-xl md:text-3xl font-semibold text-white">{slide.caption}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
