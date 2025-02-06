import Image from "next/image";
import React from "react";
import { getBlogs } from "../../api/api";



const BlogsPage: React.FC = async() => {
    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate);
        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };
        return date.toLocaleDateString("en-GB", options);
    };

  let blogsData: Blog[] = await getBlogs();

//   console.log('blogs', blogsData);

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
            <section id="news">
                <div className="container">
                    <div className="row">

                        {blogsData.map((blog) => (
                            <div key={blog.blog_id} className="col-sm-6 col-md-4">
                                <article className="post mb-30">
                                    <div className="entry-header">
                                        {blog.cover_image && (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${blog.cover_image}`}
                                                alt={blog.title}
                                                className="w-full h-64 object-cover rounded-md"
                                                width={400}
                                                height={250}
                                            />
                                        )}
                                    </div>
                                    <div className="entry-content p-20 bg-lighter">
                                        <div className="entry-meta">
                                            <div className="flex justify-between items-center text-center">
                                                <ul className="bg-theme-colored px-4 py-2 rounded-md w-24 h-16 flex items-center justify-center">
                                                    <li className="text-white text-sm">
                                                        {formatDate(blog.publish_date)}
                                                    </li>
                                                </ul>

                                                <div className="text-right">
                                                    <h4 className="text-2xl md:text-xl font-semibold">
                                                        <a href={`/blogs/${blog.slug}`}>{blog.title}</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-justify mt-3">
                                            {blog.short_description}
                                        </p>
                                        <a href={`/blogs/${blog.slug}`} className="btn-read-more">
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

export default BlogsPage;
function query(arg0: string): any {
    throw new Error("Function not implemented.");
}

