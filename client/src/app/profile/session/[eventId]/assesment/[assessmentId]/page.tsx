"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProfileLayout from "../../../../../../components/ProfileLayout";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import toast from "react-hot-toast";
import { User } from "@/types/user";

const AssessmentPage = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const sessionId = searchParams.get("sessionId");
  const assessmentId = searchParams.get("assessmentId");
  const userId = searchParams.get("uid");
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [checkingSubmission, setCheckingSubmission] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const safeDescription = typeof description === "string" ? description : "";

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


      useEffect(() => {
              const storedUser = localStorage.getItem("user");
              if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
              }
            }, []);

  useEffect(() => {
    const checkExistingSubmission = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/event-session-assesment-submissions/event/${eventId}/session/${sessionId}/assessment/${assessmentId}/user/${user?.id}`
        );
        
        if (response.data.data) {
          setSubmitted(true);
          setEditorContent(response.data.data.submitted_content || "");
        }
      } catch (error) {
        console.error("Error checking submission:", error);
      } finally {
        setCheckingSubmission(false);
      }
    };

    if (eventId && sessionId && assessmentId && user?.id) {
      checkExistingSubmission();
    }
  }, [eventId, sessionId, assessmentId, user?.id, BASE_URL]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!editorContent.trim()) {
      toast.error("Please write your assessment answer before submitting.");
      return;
    }

    setLoading(true);

    const payload = {
      event_id: eventId,
      event_session_id: sessionId,
      event_session_assesment_id: assessmentId,
      user_id: user?.id,
      submitted_content: editorContent,
    };
    
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/event-session-assesment-submissions/store`,
        payload
      );
      toast.success("Your assessment has been submitted successfully!");
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to submit assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSubmission) {
    return (
      <ProfileLayout>
        <div className="p-8 flex justify-center items-center h-64">
          <p>Checking for existing submissions...</p>
        </div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
        <div
          className="post-content mb-6"
          dangerouslySetInnerHTML={{ __html: safeDescription }}
        />

        <form onSubmit={handleSubmit}>
          <label className="mb-4 block text-lg font-medium text-gray-700">
            Write your assessment answer
          </label>
          <Editor
            apiKey="jgaptq3d84s765dy0w6lqaw7umdnes2xs653pobops4ybrt4"
            value={editorContent}
            onEditorChange={(content: string) => setEditorContent(content)}
            init={{
              height: 300,
              menubar: false,
              plugins: "link image code",
              toolbar:
                "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code",
            }}
            disabled={submitted}
          />

          {submitted ? (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
              <p className="font-medium">Submission successful!</p>
              <p className="text-sm mt-1">Your assessment has been submitted.</p>
            </div>
          ) : (
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-200"
              disabled={loading || submitted || !editorContent.trim()}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}
        </form>
      </div>
    </ProfileLayout>
  );
};

export default AssessmentPage;
