"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface BlogComment {
  comment_id: number;
  first_name: string;
  last_name: string;
  user_photo?: string;
  comment: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

interface CommentsSectionProps {
  blogs: number;
}

const CommentsSection = ({ blogs }: CommentsSectionProps) => {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

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
        setComments((prevComments) => [...prevComments, response.data.data]);
        setCommentText("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="mt-12 border-t pt-8">

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
    </div>
  );
};

export default CommentsSection;
