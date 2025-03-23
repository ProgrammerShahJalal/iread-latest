"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileLayout from '../../../../components/ProfileLayout';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter
import { FaCalendarAlt, FaClock, FaListAlt, FaCheckCircle, FaBook } from 'react-icons/fa';
import moment from 'moment/moment';

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

// Define the type for a form field
interface SessionAssesment {
    id: number;
    event_id: number;
    event_session_id: number;
    title: string;
    description: string;
    mark: number;
    pass_mark: number;
    start: string;
    end: string;
}

function EventSessionPage() {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [sessionAssesment, setSessionAssesment] = useState<SessionAssesment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter(); // Initialize useRouter

    const params = useParams<{ eventId: string; }>()
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
                if (response.data.status === 200) {
                    setSession(response.data.data);
                } else {
                    setError('No session data found');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
        const fetchSessionAssesment = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/event-session-assesments/event/${eventId}`);
                if (response.data.status === 200) {
                    setSessionAssesment(response.data.data);
                } else {
                    setError('No session assesment data found');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSessionAssesment();
    }, [BASE_URL, eventId]);

    if (loading) {
        return (
            <ProfileLayout>
                <div className="flex justify-center items-center min-h-[100vh]">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            </ProfileLayout>
        );
    }

    if (error) {
        return (
            <ProfileLayout>
                <div className="flex justify-center items-center min-h-[100vh]">
                    <div className="text-red-500 text-2xl">Error: {error}</div>
                </div>
            </ProfileLayout>
        );
    }

    let formatTime = (time: string) => {
        return moment(time, 'HH:mm').format('h:mmA');
    };

    const handleStartAssessment = () => {
        if (sessionAssesment) {
            const queryString = new URLSearchParams({
                title: sessionAssesment.title,
                description: sessionAssesment.description,
            }).toString();
    
            router.push(`/profile/session/${eventId}/assesment/${sessionAssesment.id}?uid=${user?.id}&${queryString}`);
        }
    };
    return (
        <ProfileLayout>
            <div className="p-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Event Session</h2>
                    <p className="my-1 text-gray-600">Explore the session regarding to the event</p>
                </div>
                {session ? (
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{session.title}</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <FaListAlt className="text-gray-600" />
                                <span className="text-gray-700">Topics: {session.topics}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCalendarAlt className="text-gray-600" />
                                <span className="text-gray-700">Start: {formatTime(session.start)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCalendarAlt className="text-gray-600" />
                                <span className="text-gray-700">End: {formatTime(session.end)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaClock className="text-gray-600" />
                                <span className="text-gray-700">Total Time: {session.total_time} Minutes</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-lg my-10">No Session Found</p>
                )}

                {sessionAssesment ? (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Session Assessment</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <FaBook className="text-gray-600" />
                                <span className="text-gray-700">Title: {sessionAssesment.title}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCheckCircle className="text-gray-600" />
                                <span className="text-gray-700">Marks: {sessionAssesment.mark}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCheckCircle className="text-gray-600" />
                                <span className="text-gray-700">Pass Marks: {sessionAssesment.pass_mark}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCalendarAlt className="text-gray-600" />
                                <span className="text-gray-700">Start: {formatTime(sessionAssesment.start)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCalendarAlt className="text-gray-600" />
                                <span className="text-gray-700">End: {formatTime(sessionAssesment.end)}</span>
                            </div>

                            {/* Start Button */}
                            <button
                                onClick={handleStartAssessment}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Start Assessment
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-lg my-10">No Assessment Found</p>
                )}
            </div>
        </ProfileLayout>
    );
}

export default EventSessionPage;