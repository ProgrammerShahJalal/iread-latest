import Image from "next/image";
import React from "react";
import { getBlogs } from "../../api/blogApi";
import Link from "next/link";
import { Blog } from "@/types/blog";

const BlogsPage: React.FC = async () => {
    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate);
        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };
        return date.toLocaleDateString("en-GB", options);
    };

    const blogsData = (await getBlogs()) as Blog[];
    if(blogsData?.length === 0) {
    return (
      <><section
                className="inner-header"
                style={{
                    backgroundImage: 'url("/frontend/images/bg/bg.png")',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
        <div className="container pt-70 pb-20">
          {/* Section Content */}
          <div className="section-content">
            <div className="row pt-14">
              <div className="col-md-12">
                <h2 className="title text-white">Blogs</h2>
                <div className="mt-16 mb-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section><div className="w-96 h-[50vh] mx-auto">
          <h3 className="text-center font-semibold text-lg mt-20">No Blogs Found!</h3>
        </div></>
    )
  }

    return (
        <section>
            <section
                className="inner-header"
                style={{
                    backgroundImage: 'url("/frontend/images/bg/bg.png")',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="container">
                    <h2 className="title text-white">Blogs</h2>
                </div>
            </section>

            {/* Blogs List */}
            <section id="news" className="py-12 bg-[#E2E8F0]">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogsData.map((blog) => (
                            <div key={blog.blog_id} className="group">
                                <article className="h-full flex flex-col overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    {blog.cover_image && (
                                        <Link href={`/blogs/${blog.slug}`} className="block overflow-hidden">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${blog.cover_image}`}
                                                alt={blog.title}
                                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                                width={400}
                                                height={250}
                                            />
                                        </Link>
                                    )}
                                    <div className="p-6 flex-grow">
                                        <div className="flex items-start gap-4 mb-3">
                                            <div className="bg-[#202C45] text-white text-center px-3 py-2 rounded-md min-w-[80px]">
                                                <span className="font-medium">
                                                    {formatDate(blog.publish_date).split(' ')[0]}
                                                </span>
                                                <span className="block">
                                                    {formatDate(blog.publish_date).split(' ').slice(1).join(' ')}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="md:text-lg text-3xl font-bold text-gray-800 line-clamp-2">
                                                    <Link href={`/blogs/${blog.slug}`} className="hover:text-gray-600">
                                                        {blog.title}
                                                    </Link>
                                                </h3>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-4">
                                            {blog.short_description?.slice(0, 150)}
                                            {blog.short_description?.length > 150 && '...'}
                                        </p>
                                        <Link 
                                            href={`/blogs/${blog.slug}`} 
                                            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                                        >
                                            Read more
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                            </svg>
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

export default BlogsPage;
