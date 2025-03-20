"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileLayout from '../../../../components/ProfileLayout';

// Define the type for the params object
interface EventFeedbackPageProps {
    params: {
        eventId: string;
    };
}

// Define the type for a form field
interface FormField {
    type: string;
    required: boolean;
    label: string;
    name: string;
    values?: { label: string; value: string; selected: boolean }[];
    subtype?: string;
    className?: string;
}

function EventFeedbackPage({ params }: EventFeedbackPageProps) {
    const [feedbackFields, setFeedbackFields] = useState<FormField[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const eventId = params.eventId; // Access eventId from params

    useEffect(() => {
        const fetchFeedbackFields = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5011/api/v1/event-feedback-form-fields/event/${eventId}`);
                if (response.data.status === 200) {
                    // Parse the fields JSON string into an array of FormField objects
                    const fields = JSON.parse(response.data.data.fields);
                    setFeedbackFields(fields);
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
    }, [eventId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <ProfileLayout>
            <div>
                <div className="mb-12">
                    <h2 className='text-3xl font-bold'>Event Feedback</h2>
                    <p className='text-base my-1 text-black'>Please share your feedback regarding the event</p>
                </div>
                {feedbackFields && (
                    <form>
                        {feedbackFields.map((field, index) => (
                            <div key={index} style={{ marginBottom: '20px' }}>
                                <div dangerouslySetInnerHTML={{ __html: field.label }} />
                                {field.type === 'radio-group' && (
                                    <div>
                                        {field.values?.map((value, idx) => (
                                            <label key={idx} style={{ display: 'inline', margin: '5px 10px' }}>
                                                <input
                                                    className={field.className}
                                                    type="radio"
                                                    name={field.name}
                                                    value={value.value}
                                                    required={field.required}
                                                />
                                                {value.label}
                                            </label>
                                        ))}
                                    </div>
                                )}
                                {field.type === 'text' && (
                                    <input
                                        type={field.subtype || 'text'}
                                        name={field.name}
                                        className={field.className}
                                        required={field.required}
                                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                    />
                                )}
                            </div>
                        ))}
                        <button className='bg-green-500 mt-10 px-3 py-2 rounded-md text-white' type="submit">
                            Submit Feedback
                        </button>
                    </form>
                )}
            </div>
        </ProfileLayout>
    );
}

export default EventFeedbackPage;    