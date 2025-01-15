import { blogs } from "@/data/blogs";
import Image from "next/image";
import React from "react";




const Blog = () => {
    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    return (
        <section className="container">
            <div className="section-title mb-10">
                <div className="row">
                    <div className="col-md-12 text-3xl">
                        <h2 className="mt-0 text-uppercase text-theme-colored title line-bottom line-height-1">
                            Latest
                            <span className="text-theme-color-2 font-weight-400"> News</span>
                        </h2>
                    </div>
                </div>
            </div>
            <section id="news">
                <div>
                    <div className="row">
                        {blogs?.slice(0, 3)?.map((blog) => (
                            <div key={blog.id} className="col-sm-6 col-md-4">
                                <article className="post mb-30">
                                    <div className="entry-header">
                                        {
                                            blog?.cover_image && (
                                                <Image
                                                    src={blog.cover_image}
                                                    alt={blog.title}
                                                    className="w-full h-64 object-cover rounded-md"
                                                    width={400}
                                                    height={250}
                                                />
                                            )
                                        }
                                    </div>
                                    <div className="entry-content p-20 bg-lighter">
                                        <div className="entry-meta">
                                            <div className="flex justify-between items-center text-center">
                                                <ul className="bg-theme-colored px-4 py-2 rounded-md w-24 h-16 flex items-center justify-center">
                                                    {blog?.publish_date && (
                                                        <li className="text-white text-sm">
                                                            {formatDate(blog.publish_date)}
                                                        </li>
                                                    )}
                                                </ul>

                                                <div className="text-right">
                                                    <h4 className="text-2xl md:text-xl font-semibold">
                                                        <a href={`/blogs/${blog.id}`}>{blog.title}</a>
                                                    </h4>
                                                </div>
                                            </div>


                                        </div>
                                        <p className="text-justify mt-3">{blog.short_description}</p>
                                        <a href={`/blogs/${blog.id}`} className="btn-read-more">
                                            Read more
                                        </a>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Blog;
