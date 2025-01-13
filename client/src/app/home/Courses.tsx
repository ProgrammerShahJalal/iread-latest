import React from "react";
import Image from "next/image";

type Course = {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  detailsPage: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Accounting Technologies",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam ipsum quis ipsum facilisis sit amet.",
    price: "$125",
    imageUrl: "/frontend/images/project/4.jpg",
    detailsPage: "page-courses-accounting-technologies.html",
  },
  {
    id: 2,
    title: "Computer Technologies",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam ipsum quis ipsum facilisis sit amet.",
    price: "$125",
    imageUrl: "/frontend/images/project/5.jpg",
    detailsPage: "page-courses-computer-technologies.html",
  },
  {
    id: 3,
    title: "Development Studies",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam ipsum quis ipsum facilisis sit amet.",
    price: "$125",
    imageUrl: "/frontend/images/project/6.jpg",
    detailsPage: "page-courses-development-studies.html",
  },
  {
    id: 4,
    title: "Data Science",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam ipsum quis ipsum facilisis sit amet.",
    price: "$150",
    imageUrl: "/frontend/images/project/7.jpg",
    detailsPage: "page-courses-data-science.html",
  },
];

type Props = {};

function Courses({}: Props) {
  return (
    <section className="bg-lighter">
      <div className="container pb-60">
        <div className="section-title mb-10">
          <div className="row">
            <div className="col-md-8">
              <h2 className="mt-0 text-uppercase font-28 line-bottom line-height-1">
                Our{" "}
                <span className="text-theme-color-2 font-weight-400">COURSES</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="section-content">
          <div className="row">
            {courses.map((course) => (
              <div key={course.id} className="col-sm-6 col-md-3">
                <div className="item">
                  <div className="service-block bg-white">
                    <div className="thumb">
                      <Image
                        src={course.imageUrl}
                        width={300}
                        height={200}
                        alt={course.title}
                        className="w-full"
                      />
                      <h4 className="text-white mt-0 mb-0">
                        <span className="price">{course.price}</span>
                      </h4>
                    </div>
                    <div className="content text-left flip p-25 pt-0">
                      <h4 className="line-bottom mb-10 text-3xl md:text-lg mt-2">{course.title}</h4>
                      <p>{course.description}</p>
                      <a
                        className="btn btn-dark btn-theme-colored btn-sm text-uppercase mt-10"
                        href={course.detailsPage}
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Courses;
