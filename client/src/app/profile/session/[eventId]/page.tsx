"use client";

import React, { useEffect, useState, use } from 'react';
import axios from 'axios';
import ProfileLayout from '../../../../components/ProfileLayout';
import { useParams } from 'next/navigation';


// Define the type for a form field
interface Session {
    id: number;
    event_id: number;
    title: string;
    topics: string;
    start: string;
    end: string;
    total_time: string;
}

function EventSessionPage() {
      const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
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

    const BASE_URL =
        process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_BACKEND_LIVE_URL
            : process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/event-sessions/event/${eventId}`);
                console.log('res', response.data.data);
                if (response.data.status === 200) {
                    setSession(response.data.data);
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

        fetchSession();
    }, [BASE_URL, eventId]);


    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // Prepare the payload
    //     const payload = {
    //         event_id: eventId,
    //         event_form_field_id: eventFormFieldId,
    //         user_id: user?.id,
    //     };

    //     try {
    //         const response = await axios.post(
    //             `${BASE_URL}/api/v1/event-feedback-form-field-values/store`,
    //             payload
    //         );
    //         if (response.data.status === 201) {
    //             alert("Feedback submitted successfully!");
    //         } else {
    //             alert("Failed to submit feedback.");
    //         }
    //     } catch (err: any) {
    //         console.error("Error submitting feedback:", err);
    //         alert("An error occurred while submitting feedback.");
    //     }
    // };

    if (loading) {
        return <div className='text-center mt-24 min-h-[100vh]'>Loading...</div>;
    }

    if (error) {
        return <div className='min-h-[100vh] py-10 text-center'>Error: {error}</div>;
    }

    return (
        <ProfileLayout>
            <div className="p-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Event Session</h2>
                    <p className="my-1 text-gray-600">Explore the session regarding to the event</p>
                </div>
                {session && session.title}
            </div>
        </ProfileLayout>
    );
}

export default EventSessionPage;