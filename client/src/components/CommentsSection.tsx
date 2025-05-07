"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

interface BlogComment {
  id: number;
  first_name: string;
  last_name: string;
  user_photo?: string;
  user?: User;
  comment: string;
  replies?: BlogComment[];
}

interface BlogView {
  id: number;
  user_id: number;
  blog_id: number;
  total_count: number;
  ip: string;
  date: string;
}

interface User {
  id?: number;
  first_name: string;
  last_name: string;
  photo: string;
  role_serial?: string;
}

interface CommentsSectionProps {
  blogs: number;
  comments: BlogComment[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const CommentsSection = ({ blogs, comments }: CommentsSectionProps) => {
  const [commentts, setCommentts] = useState<BlogComment[]>(comments || []);
  const [user, setUser] = useState<User | null>(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRolesMap, setUserRolesMap] = useState<{ [key: number]: string }>(
    {}
  );
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [blogViews, setBlogViews] = useState<BlogView[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);

  // ✅ Fetch comments when component mounts or after a new comment is submitted
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/blog-comments/comment/${blogs}`);
      setCommentts(response.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  // ✅ Fetch blog views when component mounts or after a new comment is submitted
  const fetchBlogViews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/blog-views?orderByCol=id&orderByAsc=true&show_active_data=true&paginate=10&select_fields=`);
      setBlogViews(response.data.data.data);
    } catch (error) {
      console.error("Error fetching blog views:", error);
    }
  };
  const match = blogViews?.find(
    (blogView) => Number(blogView.blog_id) === Number(blogs)
  );
  useEffect(() => {
    if (match) {
      setTotalViews(match.total_count);
    }
  }, [blogViews, blogs, match]);


  useEffect(() => {
    fetchComments();
    fetchBlogViews();

    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }

  }, [blogs]);

  useEffect(() => {
    if (user?.id && blogs) {
      // ✅ Send blog view count
      axios.post(`${BASE_URL}/api/v1/blog-views/store`, {
        user_id: user?.id,
        blog_id: blogs,
      }).catch((error) => {
        console.error("Error recording blog view:", error);
      });
    }
  }, [blogs, user?.id])



  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/blog-comments/store`, {
        blogs,
        users: user.id,
        comment: commentText,
      });

      if (response.status === 201) {
        setCommentts((prevComments) => [...prevComments, response.data.data]);
        toast.success("Comment Posted Successfully!")
        setCommentText("");
        fetchComments();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    // Fetch user roles and store them in a map
    fetch(
      `${BASE_URL}/api/v1/user-roles?orderByCol=id&orderByAsc=true&show_active_data=true&paginate=10&select_fields=`
    )
      .then((res) => res.json())
      .then((data) => {
        const roleMap: { [key: number]: string } = {};
        data?.data?.data?.forEach((role: { serial: number; title: string }) => {
          roleMap[role.serial] = role.title;
        });
        setUserRolesMap(roleMap);
      })
      .catch((err) => console.error("Error fetching user roles:", err));
  }, []);


  // Handle reply submission
  const handleReplySubmit = async (parentCommentId: number) => {
    if (!replyText[parentCommentId]?.trim() || !user) return;

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/blog-comment-replies/store`, {
        parent_comment_id: parentCommentId,
        users: user.id,
        blogs: blogs,
        comment: replyText[parentCommentId],
      });

      if (response.status === 201) {
        setReplyText((prev) => ({ ...prev, [parentCommentId]: "" })); // Clear reply input
        setReplyingTo(null); // Hide the reply input
        fetchComments();
      }
    } catch (error) {
      console.error("Error posting reply:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-12 border-t pt-8">
        <h3 className="text-xl font-semibold">Comments</h3>

        {commentts.length > 0 ? (
          <ul className="mt-4 space-y-6">
            {commentts.map((comment, index) => (
              <li key={index} className="border-b pb-4">
                <div className="flex gap-3">
                  <Image
                    src={comment.user?.photo
                      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${comment.user.photo}`
                      : '/default-avatar.png'} // Use a local default avatar
                    alt={`${comment?.user?.first_name} ${comment?.user?.last_name}`}
                    width={48}
                    height={48}
                    className="rounded-full mr-10 aspect-square object-cover"
                    style={{
                      width: '48px',
                      height: '48px',
                    }}
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-xl p-3 w-fit mb-6 max-w-full">
                      <p className="font-semibold text-sm sm:text-base">
                        {comment?.user?.first_name} {comment?.user?.last_name}
                      </p>
                      <p className="text-gray-700 text-sm sm:text-base break-words">{comment.comment}</p>
                    </div>

                    {/* Reply Button */}
                    {user?.role_serial && userRolesMap[Number(user.role_serial)] === "admin" && (
                      <button
                        className="mt-1 text-blue-500 hover:underline text-sm"
                        onClick={() => setReplyingTo(comment.id)}
                      >
                        Reply
                      </button>
                    )}

                    {/* Reply Input */}
                    {replyingTo === comment.id && (
                      <div className="mt-2 space-y-2">
                        <textarea
                          className="w-full border rounded p-2 text-sm"
                          rows={2}
                          placeholder="Write a reply..."
                          value={replyText[comment.id] || ""}
                          onChange={(e) =>
                            setReplyText((prev) => ({
                              ...prev,
                              [comment.id]: e.target.value,
                            }))
                          }
                        />
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded text-sm"
                          onClick={() => handleReplySubmit(comment.id)}
                          disabled={loading}
                        >
                          {loading ? "Replying..." : "Submit Reply"}
                        </button>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <ul className="mt-3 space-y-2 pl-4 border-l mb-6 border-gray-300">
                        {comment.replies.map((reply, index) => (
                          <li key={reply.id} className="flex gap-2">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin.png`}
                              alt="Admin"
                              width={40}
                              height={40}
                              className="rounded-full aspect-square object-cover"
                              style={{
                                width: '40px',
                                height: '40px',
                              }}
                            />
                            <div className="bg-gray-100 rounded-xl p-3 w-fit max-w-full">
                              <p className="font-semibold text-sm">Admin</p>
                              <p className="text-gray-700 text-sm break-words">{reply.comment}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No comments yet.</p>
        )}


        {
          user === null ? (
            <><>
              <textarea
                disabled
                className="w-full border rounded p-2"
                rows={3}
                placeholder="Add a comment..."
                value={commentText}
                // onChange={(e) => setCommentText(e.target.value)}
                required />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-slate-500 text-slate-700 border border-black rounded"
                disabled
              >
                Submit
              </button>
            </><p className="text-red-500 font-semibold mt-4">Please login to comment.</p></>
          ) : (
            <form className="mt-6" onSubmit={handleCommentSubmit}>
              <textarea
                className="w-full border rounded p-2"
                rows={3}
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => {
                  setCommentText(e.target.value);
                  setIsEmpty(e.target.value.trim() === '');
                }}
              />
              <button
                type="submit"
                className={`mt-2 px-4 py-2 rounded ${isEmpty ? "bg-slate-500 text-slate-700 border border-black mt-2 px-4 py-2 rounded" : "bg-blue-500 text-white"
                  }`}
                disabled={loading || isEmpty}
              >
                {loading ? "Posting..." : "Submit"}
              </button>
            </form>
          )
        }
      </div>
    </>
  );
};

export default CommentsSection;
