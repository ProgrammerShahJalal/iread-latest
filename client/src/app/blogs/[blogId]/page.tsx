"use client";

import { blogs } from '@/data/blogs';
import Image from 'next/image'
import { useParams } from 'next/navigation';
import React from 'react'



const BlogDetailsPage = () => {

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
};

  const { blogId } = useParams<{ blogId: string }>();


  const blog = blogs?.find((blog) => blog.id === blogId);

  if (!blog) {
    return <div>No Blog Info Right Now</div>
  }
  return (
    <section>
      <div className="container my-10">
        <div className="row">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="blog-posts single-post">
                <article className="post clearfix mb-0">
                  <div className="entry-header">
                    <div className="container post-thumb thumb">
                      {" "}
                      <Image
                        src={blog?.cover_image}
                        alt=""
                        className="Image-responsive rounded-md Image-fullwidth"
                        width={800}
                        height={600}
                      />{" "}
                    </div>
                  </div>
                  <div className="text-center text-uppercase text-2xl pt-10 pl-15">
                    <h4>
                        {blog?.title}
                    </h4>
                  </div>
                  <div className="entry-meta pl-15">
                    <ul className="list-inline">
                      <li>
                        Posted: <span className="text-theme-color-2">{formatDate(blog.publish_date)}</span>
                      </li>
                      <li>
                        By: <span className="text-theme-color-2">{blog?.author}</span>
                      </li>
                     
                    </ul>
                  </div>
                  <div className="entry-content mt-10">
                    <p className="mb-15 text-justify">
                      {blog?.short_description}
                    </p>
                    <p className="mb-15 text-justify">
                      {blog?.full_description}
                    </p>
                    
                   
                  </div>
                </article>
               
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default BlogDetailsPage