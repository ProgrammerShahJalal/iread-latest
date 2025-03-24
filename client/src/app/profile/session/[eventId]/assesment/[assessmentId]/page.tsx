"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import ProfileLayout from "../../../../../../components/ProfileLayout";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import toast from "react-hot-toast";

const AssessmentPage = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const sessionId = searchParams.get("sessionId");
  const assessmentId = searchParams.get("assessmentId");
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);

  const safeDescription = typeof description === "string" ? description : "";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      event_id: eventId,
      event_session_id: sessionId,
      event_session_assesment_id: assessmentId,
      submitted_content: editorContent,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5011/api/v1/event-session-assesment-submissions/store",
        payload
      );
      console.log("Submission successful:", response.data);
      toast.success("Your assessment has been submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to submit assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };
console.log('eventId, sessionId, assessmentId', eventId, sessionId, assessmentId);
  return (
    <ProfileLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: safeDescription }}
        />

        <form onSubmit={handleSubmit}>
          <label className="mb-4 block">Write your assessment answer</label>
          <Editor
            apiKey="jgaptq3d84s765dy0w6lqaw7umdnes2xs653pobops4ybrt4" // Get a free API key from TinyMCE
            value={editorContent}
            onEditorChange={(content: React.SetStateAction<string>) => setEditorContent(content)}
            init={{
              height: 300,
              menubar: false,
              plugins: "link image code",
              toolbar:
                "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code",
            }}
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </ProfileLayout>
  );
};

export default AssessmentPage;
