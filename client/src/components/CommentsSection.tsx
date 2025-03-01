"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface BlogComment {
  comment_id: number;
  id?: number;
  first_name: string;
  last_name: string;
  user_photo?: string;
  user?: User;
  comment: string;
}

interface User {
  id?: number;
  first_name: string;
  last_name: string;
  photo: string;
}

interface CommentsSectionProps {
  blogs: number;
  comments: BlogComment[];
}

const CommentsSection = ({ blogs, comments }: CommentsSectionProps) => {
  const [commentts, setCommentts] = useState<BlogComment[]>(comments || []);
  const [user, setUser] = useState<User | null>(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch comments when component mounts or after a new comment is submitted
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5011/api/v1/blog-comments/comment/${blogs}`);
      console.log('api response', response.data.data);
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
      const response = await axios.post("http://localhost:5011/api/v1/blog-comments/store", {
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

  return (
    <div className="mt-12 border-t pt-8">

      <h3 className="text-xl font-semibold">Comments</h3>

      {comments.length > 0 ? (
        <ul className="mt-4 space-y-6">
          {commentts.map((comment, index) => (
            <li key={comment.comment_id || comment.id || index} className="border-b pb-4">
              <div className="flex items-start space-x-4">
                <Image
                  src={comment.user?.photo ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${comment.user.photo}` : `${process.env.NEXT_PUBLIC_BACKEND_URL}/avatar.png`}
                  alt={`${comment?.user?.first_name} ${comment?.user?.last_name}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">
                    {comment?.user?.first_name} {comment?.user?.last_name}
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
