'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import FaqCard from "./FaqCard";
import apiClient from "../../lib/apiClient";

// Define FAQ type for type safety
interface Faq {
  question: string;
  answer: string;
  url: string;
}

// Static FAQs as fallback
const staticFaqs: Faq[] = [
  {
    question: "How do I contact support?",
    answer: "You can contact our support team through the Contact Us page for any assistance or queries.",
    url: "",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We currently accept mobile banking payments through Stripe. You can select your preferred method during the checkout process.",
    url: "",
  },
  {
    question: "What is the purpose of this website?",
    answer: "This platform is dedicated to providing enthusiasts and professionals with reliable tips and advice about gardening.",
    url: "",
  },
  {
    question: "How can I access premium content?",
    answer: "You can access premium content by subscribing through our payment options, which include Aamarpay or Stripe.",
    url: "",
  },
];

// Define the expected API response type
interface SiteResponse {
  status: number;
  message: string;
  data?: {
    id: number;
    app_setting_key_id: number;
    title: string;
    value: string; // JSON string containing FAQ array
    is_default: boolean;
    type: string;
    status: string;
    created_at: string;
    updated_at: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>(staticFaqs);

  const BASE_URL = apiClient.defaults.baseURL;

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get<SiteResponse>(
          `${BASE_URL}/api/v1/app-setting-values/title/FAQ`
        );
        if (response.data?.data?.value) {
          // Sanitize the JSON string: remove extra newlines, fix trailing commas, and normalize quotes
          let jsonString = response.data.data.value
            .replace(/\r\n/g, '') // Remove Windows-style line breaks
            .replace(/\n/g, '') // Remove Unix-style line breaks
            .replace(/,\s*]/g, ']') // Remove trailing commas before closing brackets
            .replace(/,\s*}/g, '}') // Remove trailing commas before closing braces
            .replace(/([{,]\s*)(\w+):/g, '$1"$2":') // Ensure property names are quoted
            .replace(/'([^']*)'/g, '"$1"'); // Replace single quotes with double quotes

          // Parse the sanitized JSON string into an array of Faq objects
          const parsedFaqs: Faq[] = JSON.parse(jsonString);
          setFaqs(parsedFaqs);
        }
      } catch (error) {
        console.error("Error fetching or parsing FAQs:", error);
        // Fallback to static FAQs in case of error
        setFaqs(staticFaqs);
      }
    };

    fetchFaqs();
  }, [BASE_URL]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 my-10">
      <h1 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h1>
      <div className="grid grid-cols-1 gap-y-5">
        {faqs.map((faq, index) => (
          <FaqCard key={faq.question + index} faq={faq} />
        ))}
      </div>
    </div>
  );
}
