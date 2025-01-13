"use client";

import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  images: string[];
}

export default function ImageGallery({ images }: IProps) {
  return (
    <LightGallery
      elementClassNames={`mt-2 gap-2 grid place-items-center 
        ${
          images.length === 1
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        } 
      `}
      plugins={[lgThumbnail, lgZoom]}
      speed={500}
    >
      {images?.map((image, index) => (
        <Link
          key={index}
          className={`w-full ${
            images.length === 3 && index === 0
              ? "col-span-1 sm:col-span-2"
              : "col-span-1"
          }`}
          href={image}
        >
          <Image
            alt={`image-${index}`}
            className="h-[200px] sm:h-[300px] lg:h-[400px] w-full object-cover rounded-md"
            height={500}
            src={image}
            width={500}
          />
        </Link>
      ))}
    </LightGallery>
  );
}