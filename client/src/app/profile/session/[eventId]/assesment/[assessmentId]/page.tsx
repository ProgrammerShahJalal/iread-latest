"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProfileLayout from "../../../../../../components/ProfileLayout";
import { Editor } from "@tinymce/tinymce-react";


const AssessmentPage = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const assessmentId = searchParams.get("assessmentId");
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const [editorContent, setEditorContent] = useState("");

  const safeDescription = typeof description === "string" ? description : "";


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted Data:", editorContent);
  };

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
        >
          Submit
        </button>
      </form>
    </div>
  </ProfileLayout>
  );
};

export default AssessmentPage;