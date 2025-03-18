"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface BlogComment {
  id: number;
  first_name: string;
  last_name: string;
  user_photo?: string;
  user?: User;
  comment: string;
  replies?: BlogComment[];
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

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_LIVE_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL;


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

  // ✅ Fetch comments when component mounts or after a new comment is submitted
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/blog-comments/comment/${blogs}`);
      setCommentts(response.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [blogs]);



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

  console.log('comments', comments);

  return (
    <div className="mt-12 border-t pt-8">

      <h3 className="text-xl font-semibold">Comments</h3>

      {commentts.length > 0 ? (
        <ul className="mt-4 space-y-6">
          {commentts.map((comment, index) => (
            <li key={comment.id || index} className="border-b pb-4">
              <div key={comment.id} className="flex items-start space-x-4">
                <Image
                  src={comment.user?.photo ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${comment.user.photo}` : `${process.env.NEXT_PUBLIC_BACKEND_URL}/avatar.png`}
                  alt={`${comment?.user?.first_name} ${comment?.user?.last_name}`}
                  width={40}
                  height={40}
                  className="rounded-full object-cover w-10 h-10"
                />

                <div>
                  <p className="font-semibold">
                    {comment?.user?.first_name} {comment?.user?.last_name}
                  </p>
                  <p className="text-gray-600">{comment.comment}</p>

                  {/* Admin Reply Button */}
                  {user?.role_serial && userRolesMap[Number(user.role_serial)] === "admin" && (
                    <button
                      className="mt-2 text-blue-500 hover:underline"
                      onClick={() => setReplyingTo(comment.id)}
                    >
                      Reply
                    </button>
                  )}

                  {/* Reply Input Box */}
                  {replyingTo === comment.id && (
                    <div className="mt-2">
                      <textarea
                        className="w-full border rounded p-2"
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
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => handleReplySubmit(comment.id)}
                        disabled={loading}
                      >
                        {loading ? "Replying..." : "Submit Reply"}
                      </button>
                    </div>
                  )}

                  {/* Display Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <ul className="mt-2 ml-8 border-l pl-4">
                      {comment.replies.map((reply) => (
                        <><div>
                          <Image
                           src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin.png`}
                            alt={`${comment?.user?.first_name} ${comment?.user?.last_name}`}
                            width={40}
                            height={40}
                            className="rounded-full object-cover w-10 h-10"
                          />
                        </div><li key={reply.id} className="mt-2">
                            <p className="font-semibold">Admin</p>
                            <p className="text-gray-600">{reply.comment}</p>
                          </li></>
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
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Posting..." : "Submit"}
            </button>
          </form>
        )
      }
    </div>
  );
};

export default CommentsSection;
