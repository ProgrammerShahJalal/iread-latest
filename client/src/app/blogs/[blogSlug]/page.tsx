import Image from "next/image";
import { getBlogs } from "../../../api/blogApi";


const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};

const BlogDetailsPage = async ({ params }: { params: Promise<{ blogSlug: string }> }) => {
  const { blogSlug } = await params; // ✅ Await params before using

  if (!blogSlug) {
    return <div className="py-24 text-center">Invalid blog request.</div>;
  }

  try {
    const blogs = await getBlogs();
    const blog = blogs.find((blog: any) => blog.slug === blogSlug);

    if (!blog) {
      return (
        <div className="py-24 text-center">
          <h2 className="font-semibold my-12">No Blog Found</h2>
        </div>
      );
    }

    return (
      <section>
        <div className="container my-10">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <article className="post clearfix mb-0">
                <div className="entry-header">
                  <div className="container post-thumb thumb">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${blog.cover_image}`}
                      alt={blog.title}
                      priority={true}
                      className="Image-responsive rounded-md Image-fullwidth"
                      width={800}
                      height={600}
                    />
                  </div>
                </div>
                <div className="text-center pt-10 pl-15">
                  <h4 className="text-2xl font-bold text-[#555555]">{blog.title}</h4>
                </div>
                <div className="entry-meta pl-15">
                  <ul className="list-inline my-6">
                    <li>
                      Posted: <span className="text-theme-color-2">{formatDate(blog.publish_date)}</span>
                    </li>
                    <li>
                      By: <span className="text-theme-color-2">{blog.author? blog.author.name : 'Admin'}</span>
                    </li>
                    <li>
                      Categories: <span className="text-theme-color-2">{blog.categories?.map((category: BlogCategory)=> category.title).join(', ')}</span>
                    </li>
                    <li>
                      Tags: <span className="text-theme-color-2">{blog.tags?.map((tag: BlogTag)=> tag.title).join(', ')}</span>
                    </li>
                  </ul>
                </div>
                <div className="post-content mt-10">
                  <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: blog.full_description }}
                  />
                </div>
                <div className="container mt-5">
                  <h3 className="font-semibold text-2xl md:text-lg text-[#555555]">About the Author</h3>
                  <p className="text-theme-color-2">{blog.author? blog.author.name : 'Admin'}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return (
      <div className="py-24 text-center">
        <h2 className="font-semibold my-12">Failed to load blog data</h2>
      </div>
    );
  }
};

export default BlogDetailsPage;
