import Image from "next/image";
import { getBlogs } from "../../../api/blogApi";
import { getBlogComments } from "../../../api/blogCommentApi";
import CommentsSection from "../../../components/CommentsSection";
import { getLatestBlogViewById } from "../../../api/blogViewApi";
import moment from "moment/moment";

const BlogDetailsPage = async ({ params }: { params: Promise<{ blogSlug: string }> }) => {
  const { blogSlug } = await params;

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

    const comments = await getBlogComments(blog.blog_id);
    const blogView = await getLatestBlogViewById(blog.blog_id);

    return (
      <section>
        <div className="container my-10 min-h-[100vh]">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <article className="post clearfix mb-0">
                <div className="entry-header">
                  <div className="container post-thumb thumb">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/${blog.cover_image}`}
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
                      Posted: <span className="text-theme-color-2">{moment(blog.publish_date).format("LL")}</span>
                    </li>
                    <li>
                      By: <span className="text-theme-color-2">Admin</span>
                    </li>
                    <li>
                      Categories:{" "}
                      <span className="text-theme-color-2">
                        {blog.categories.length > 0
                          ? blog.categories.map((category: { id: number; title: string }) => category.title).join(", ")
                          : "N/A"}
                      </span>
                    </li>
                    <li>
                      Tags:{" "}
                      <span className="text-theme-color-2">
                        {blog.tags.length > 0
                          ? blog.tags.map((tag: { id: number; title: string }) => tag.title).join(", ")
                          : "N/A"}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="post-content mt-10">
                  <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: blog.full_description }}
                  />
                </div>
              </article>
              <div className="flex justify-end">
                <h4 className="text-base font-semibold">Total Views: {blogView?.total_count || 0}</h4>
              </div>
              <CommentsSection blogs={blog.blog_id} comments={comments} />
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