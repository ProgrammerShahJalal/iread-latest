import Image from "next/image";
import { getBlogs } from "../../../api/blogApi";
import { getBlogComments } from "../../../api/blogCommentApi";
import CommentsSection from "../../../components/CommentsSection";

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
    

    // ✅ Fetch blog comments
    const comments = await getBlogComments(blog.blog_id);


    return (
      <section>
        <div className="container my-10 min-h-[100vh]">
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
                      By: <span className="text-theme-color-2">{blog.author ? blog.author.name : 'Admin'}</span>
                    </li>
                    <li>
                      Categories: <span className="text-theme-color-2">{blog.categories?.map((category: any) => category.title).join(', ')}</span>
                    </li>
                    <li>
                      Tags: <span className="text-theme-color-2">{blog.tags?.map((tag: any) => tag.title).join(', ')}</span>
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

              {/* Blog Comments Form */}
              <CommentsSection blogs={blog.blog_id}/>


              {/* ✅ Blog Comments Section */}
              <div className="mt-12 border-t pt-8">
                <h3 className="text-xl font-semibold">Comments</h3>
                {comments.length > 0 ? (
                  <ul className="mt-4 space-y-6">
                    {comments.map((comment) => (
                      <li key={comment.comment_id} className="border-b pb-4">
                        <div className="flex items-start space-x-4">
                          <Image
                            src={comment.user_photo ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${comment.user_photo}` : "/avatar.png"}
                            alt={`${comment.first_name} ${comment.last_name}`}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-semibold">
                              {comment.first_name} {comment.last_name}
                            </p>
                            <p className="text-gray-600">{comment.comment}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 mt-4">No comments yet.</p>
                )}
              </div>
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
