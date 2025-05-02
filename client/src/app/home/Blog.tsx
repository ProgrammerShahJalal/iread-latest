import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getBlogs } from "../../api/blogApi";
import { Blog as Bl } from "@/types/blog";




const Blog = async() => {
    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

     let blogsData: Bl[] = await getBlogs();

    return (
        <section className="container my-12">
            <div className="section-title mb-10">
                <div className="row">
                    <div className="col-md-12 text-3xl">
                        <h2 className="mt-0 text-uppercase text-theme-colored title line-bottom line-height-1">
                            Latest
                            <span className="text-theme-color-2 font-weight-400"> Blogs</span>
                        </h2>
                    </div>
                </div>
            </div>
            <section id="news">
                <div>
                    <div className="row">
                        {blogsData?.slice(0, 3)?.map((blog) => (
                            <div key={blog.blog_id} className="col-sm-6 col-md-4">
                                <article className="post mb-30">
                                    <div className="entry-header">
                                        {
                                            blog?.cover_image && (
                                                <Image
                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${blog.cover_image}`}
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
                                                    <Link href={`/blogs/${blog.slug}`}>{blog.title?.slice(0, 50)}{blog.title?.length > 50 && '...'}</Link>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-justify mt-3">{blog.short_description?.slice(0, 150)}{blog.short_description?.length > 150 && '...'}</p>
                                        <Link href={`/blogs/${blog.slug}`} className="btn-read-more text-blue-700 hover:text-red-500">
                                            Read more
                                        </Link>
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
