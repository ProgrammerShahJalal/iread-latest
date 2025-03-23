"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProfileLayout from "../../../../../../components/ProfileLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "summernote/dist/summernote-bs4.css";

declare global {
  interface Window {
    $: any;
  }
}


const AssessmentPage = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const assessmentId = searchParams.get("assessmentId");
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const [editorContent, setEditorContent] = useState("");

  const safeDescription = typeof description === "string" ? description : "";

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize Bootstrap and jQuery
    window.$ = require("jquery");
    require("bootstrap");
    require("summernote/dist/summernote-bs4");

    // Initialize Summernote after dependencies are loaded
    window.$("#summernote").summernote({
      placeholder: "Write your assessment answer here...",
      tabsize: 2,
      height: 300,
      toolbar: [
        ["style", ["style"]],
        ["font", ["bold", "underline", "clear"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["table", ["table"]],
        ["insert", ["link", "picture", "video"]],
        ["view", ["fullscreen", "codeview", "help"]],
      ],
      callbacks: {
        onChange: (content: string) => {
          setEditorContent(content);
        },
      },
    });

    return () => {
      window.$("#summernote").summernote("destroy");
    };
  }, []);

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
          <div id="summernote"></div>
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