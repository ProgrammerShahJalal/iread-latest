"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import apiClient from "../../lib/apiClient";


const BASE_URL = apiClient.defaults.baseURL;

interface SiteResponse {
  data?: {
    value: string;
  };
}

const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const getValidImageSrc = (apiValue: string | undefined, fallback: string): string => {
  if (!apiValue) {
    // console.log("No API value, using fallback:", fallback);
    return fallback;
  }

  if (isValidUrl(apiValue)) {
    // console.log("Valid full URL from API:", apiValue);
    return apiValue;
  }

  const fullUrl = `${BASE_URL}/${apiValue.replace(/^\/+/, '')}`;
  // console.log("Constructed URL:", fullUrl);

  return isValidUrl(fullUrl) ? fullUrl : fallback;
};

const ImageCarousel: React.FC = () => {
  const [slideImage1, setSliderImage1] = useState<SiteResponse | null>(null);
  const [slideImage2, setSliderImage2] = useState<SiteResponse | null>(null);
  const [slideImage3, setSliderImage3] = useState<SiteResponse | null>(null);
  const [slideTitle1, setSliderTitle1] = useState<SiteResponse | null>(null);
  const [slideTitle2, setSliderTitle2] = useState<SiteResponse | null>(null);
  const [slideTitle3, setSliderTitle3] = useState<SiteResponse | null>(null);
  const [slideSubheading1, setSliderSubheading1] = useState<SiteResponse | null>(null);
  const [slideSubheading2, setSliderSubheading2] = useState<SiteResponse | null>(null);
  const [slideSubheading3, setSliderSubheading3] = useState<SiteResponse | null>(null);

  useEffect(() => {
    const endpoints = [
      { key: "title/Slider Image1", setter: setSliderImage1 },
      { key: "title/Slider Image2", setter: setSliderImage2 },
      { key: "title/Slider Image3", setter: setSliderImage3 },
      { key: "title/Slider Title1", setter: setSliderTitle1 },
      { key: "title/Slider Title2", setter: setSliderTitle2 },
      { key: "title/Slider Title3", setter: setSliderTitle3 },
      { key: "title/Slider Subheading1", setter: setSliderSubheading1 },
      { key: "title/Slider Subheading2", setter: setSliderSubheading2 },
      { key: "title/Slider Subheading3", setter: setSliderSubheading3 },
    ];

    const fetchSettings = async () => {
      try {
        const responses = await Promise.all(
          endpoints.map(({ key }) =>
            axios.get(`${BASE_URL}/api/v1/app-setting-values/${key}`)
          )
        );
        responses.forEach((response, index) => {
          // console.log(`API Response for ${endpoints[index].key}:`, response.data);
          endpoints[index].setter(response.data);
        });
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="w-full flex justify-center items-center relative">
      <Carousel showThumbs={false} autoPlay infiniteLoop className="w-full">
        {[
          {
            src: getValidImageSrc(
              slideImage1?.data?.value,
              "https://cdn.pixabay.com/photo/2019/12/29/13/14/college-4727066_1280.jpg",
            ),
            alt: "Slide 1",
            title: `${slideTitle1?.data?.value || 'EDUCATION FOR EVERYONE'}`,
            caption: `${slideSubheading1?.data?.value || 'WE PROVIDE ALWAYS BEST SERVICE.'}`,
          },
          {
            src: getValidImageSrc(
              slideImage2?.data?.value,
              "https://cdn.pixabay.com/photo/2023/01/30/15/36/school-7755985_1280.jpg",
            ),
            alt: "Slide 2",
            title: `${slideTitle2?.data?.value || 'BEST EDUCATION'}`,
            caption: `${slideSubheading2?.data?.value || 'FOR YOUR BETTER FUTURE.'}`,
          },
          {
            src: getValidImageSrc(
              slideImage3?.data?.value,
              "https://cdn.pixabay.com/photo/2024/02/25/16/57/coffee-8596194_1280.png",
            ),
            alt: "Slide 3",
            title: `${slideTitle3?.data?.value || 'FEED YOUR KNOWLEDGE'}`,
            caption: `${slideSubheading3?.data?.value || 'BETTER EDUCATION, BETTER FUTURE.'}`,
          },
        ].map((slide, index) => (
          <div
            key={index}
            className="relative w-full h-[300px] md:h-[600px] flex justify-center items-center"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              layout="fill"
              objectFit="cover"
              className="absolute"
            />
            <div className="absolute inset-0 bg-[#1C2336] bg-opacity-50"></div>
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

