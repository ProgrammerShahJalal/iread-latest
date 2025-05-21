"use client";

import React, { useEffect, useState, use } from 'react';
import axios from 'axios';
import ProfileLayout from '../../../../components/ProfileLayout';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { User } from '@/types/user';
import apiClient from '../../../../lib/apiClient';


// Define the type for a form field
interface FormField {
    type: string;
    required: boolean;
    label: string;
    name: string;
    values?: { label: string; value: string; selected: boolean }[];
    subtype?: string;
    className?: string;
    rows?: number;
}

function EventFeedbackPage() {
    const [user, setUser] = useState<User | null>(null);
    const [feedbackFields, setFeedbackFields] = useState<FormField[] | null>(null);
    const [eventFormFieldId, setEventFormFieldId] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    const params = useParams<{ eventId: string;}>()
    const eventId = Number(params?.eventId);


    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      }, []);

      const BASE_URL = apiClient.defaults.baseURL;

    useEffect(() => {
        const fetchFeedbackFields = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/event-feedback-form-fields/event/${eventId}`);
                if (response.data.status === 200) {
                    // Parse the fields JSON string into an array of FormField objects
                    const fields = JSON.parse(response.data.data.fields);
                    setFeedbackFields(fields);
                    setEventFormFieldId(response.data.data.id);
                } else {
                    setError('No data found');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbackFields();
    }, [BASE_URL, eventId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRadioChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare the payload
        const payload = {
            event_id: eventId,
            event_form_field_id: eventFormFieldId,
            user_id: user?.id,
            fields: feedbackFields?.map((field) => ({
                type: field.type,
                required: field.required,
                label: field.label,
                name: field.name,
                value: formData[field.name] || "", // Get the value from formData
                values: field.values?.map((val) => ({
                    label: val.label,
                    value: val.value,
                    selected: val.value === formData[field.name], // Mark selected value
                })),
            })),
        };

        try {
            const response = await axios.post(
                `${BASE_URL}/api/v1/event-feedback-form-field-values/store`,
                payload
            );
            if (response.data.status === 201) {
                toast.success("Feedback submitted successfully!");
            } else {
                toast.error("Failed to submit feedback.");
            }
        } catch (err: any) {
            console.error("Error submitting feedback:", err);
            toast.error("An error occurred while submitting feedback.");
        }
    };

    if (loading) {
        return <div className='text-center mt-24 min-h-[100vh]'>Loading...</div>;
    }

    if (error) {
        return <div className='min-h-[100vh] py-10 text-center'>Error: {error}</div>;
    }

    return (
        <ProfileLayout>
            <div className="flex justify-end items-center mb-4">
        <Link
          href={`/profile/myEvents/${eventId}?uid=${user?.uid}`}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back
        </Link>
      </div>
            <div className="p-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Event Feedback</h2>
                    <p className="my-1 text-gray-600">Please share your feedback regarding the event</p>
                </div>
                {feedbackFields && (
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {feedbackFields.map((field, index) => (
                            <div key={index} className="space-y-4">
                                <div
                                    className="text-lg font-medium text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: field.label }}
                                />
                                {field.type === 'radio-group' && (
                                    <div className="flex flex-wrap gap-4">
                                        {field.values?.map((value, idx) => (
                                            <label key={idx} className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name={field.name}
                                                    value={value.value}
                                                    required={field.required}
                                                    className="form-radio h-5 w-5 text-green-500"
                                                    onChange={() => handleRadioChange(field.name, value.value)}
                                                    checked={formData[field.name] === value.value}
                                                />
                                                <span className="text-gray-700">{value.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                                {field.type === 'text' && (
                                    <input
                                        type={field.subtype || 'text'}
                                        name={field.name}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required={field.required}
                                        onChange={handleInputChange}
                                        value={formData[field.name] || ""}
                                    />
                                )}
                                {field.type === 'textarea' && (
                                    <textarea
                                        name={field.name}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required={field.required}
                                        rows={field.rows}
                                        onChange={handleInputChange}
                                        value={formData[field.name] || ""}
                                    />
                                )}
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Submit Feedback
                        </button>
                    </form>
                )}
            </div>
        </ProfileLayout>
    );
}

export default EventFeedbackPage;