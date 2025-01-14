import Image from "next/image";
import React from "react";
import ImageGallery from "./ImageGallary";

type Props = {};

const images = [
  {
    id: 1,
    src: "https://cdn.pixabay.com/photo/2024/04/04/12/26/ai-generated-8675021_1280.png",
  },
  {
    id: 2,
    src: "https://cdn.pixabay.com/photo/2024/01/24/15/10/ai-generated-8529788_1280.jpg",
  },
  {
    id: 3,
    src: "https://cdn.pixabay.com/photo/2022/09/29/17/15/halloween-7487706_960_720.jpg",
  },
  {
    id: 4,
    src: "https://cdn.pixabay.com/photo/2022/12/30/10/52/mountain-7686642_1280.jpg",
  },
  {
    id: 5,
    src: "https://cdn.pixabay.com/photo/2024/01/19/19/20/ai-generated-8519656_960_720.jpg",
  },
  {
    id: 6,
    src: "https://cdn.pixabay.com/photo/2024/03/05/03/53/ai-generated-8613606_960_720.png",
  },
  {
    id: "gallery7",
    src: "https://cdn.pixabay.com/photo/2024/02/20/09/56/network-connections-8585083_1280.jpg",
  },
  {
    id: "gallery8",
    src: "https://cdn.pixabay.com/photo/2021/03/29/12/16/stairs-6133971_960_720.jpg",
  },
];

function Gallery({}: Props) {
  const imageUrls = images.map((image) => image.src);

  return (
    <>
      <section id="gallery" className="bg-lighter">
        <div className="container">
          <div className="section-title mb-10">
            <div className="row">
              <div className="col-md-12 text-3xl">
                <h2 className="mt-0 text-uppercase text-theme-colored title line-bottom line-height-1">
                  Our
                  <span className="text-theme-color-2 font-weight-400">
                    {" "}
                    Gllery
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="container section-content">
            <div>
              <ImageGallery images={imageUrls} />
            </div>
          </div>
        </div>
        <div className="gallery-isotope">
          <div className="row">
            {[5, 6, 7, 8].map((i) => (
              <div
                className="col-md-3"
                key={i}
                style={{ paddingBottom: "30px" }}
              >
                <div className="gallery-item select1" style={{ width: "100%" }}>
                  <div className="thumb">
                    <Image
                      src={`/frontend/images/project/${i}.jpg`}
                      width={300}
                      height={300}
                      alt="product"
                      className="img-fullwidth"
                    />
                    <div className="overlay-shade" />
                    <div className="icons-holder">
                      <div className="icons-holder-inner">
                        <div className="styled-icons icon-sm icon-dark icon-circled icon-theme-colored">
                          <a
                            data-lightbox="image"
                            href="/frontend/images/project/2.jpg"
                          >
                            <i className="fa fa-plus" />
                          </a>
                          <a href="#">
                            <i className="fa fa-link" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <a
                      className="hover-link"
                      data-lightbox="image"
                      href="https://cs.utdallas.edu/files/2023/05/HS-programming-contest.webp"
                    >
                      View more
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Gallery;
