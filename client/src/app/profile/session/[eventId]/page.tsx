"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileLayout from '../../../../components/ProfileLayout';
import { useParams, useRouter } from 'next/navigation';
import { FaCalendarAlt, FaClock, FaListAlt, FaCheckCircle, FaBook, FaAward } from 'react-icons/fa';
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

interface AssessmentResult {
    obtained_mark: number;
    grade: string;
}

function EventSessionPage() {
    const [user, setUser] = useState<User | null>(null);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [sessionAssesment, setSessionAssesment] = useState<SessionAssesment | null>(null);
    const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

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
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");

                // Fetch sessions
                const sessionResponse = await axios.get(`${BASE_URL}/api/v1/event-sessions/event/${eventId}`);
                if (sessionResponse.data.status === 200) {
                    setSessions(sessionResponse.data.data);
                } else {
                    setError('No session data found');
                }

                // Fetch assessments
                const assessmentResponse = await axios.get(`${BASE_URL}/api/v1/event-session-assesments/event/${eventId}`);
                if (assessmentResponse?.data?.status === 200) {
                    setSessionAssesment(assessmentResponse?.data?.data);
                    
                    // Fetch assessment result if assessment exists
                    if (user?.id && assessmentResponse?.data?.data) {
                        const assessment = assessmentResponse.data.data;
                        try {
                            const resultResponse = await axios.get(
                                `${BASE_URL}/api/v1/event-session-assesment-submissions/event/${eventId}/session/${assessment.event_session_id}/assessment/${assessment.id}/user/${user.id}`
                            );
                            if (resultResponse.data.status === 200 && resultResponse.data.data) {
                                setAssessmentResult(resultResponse.data.data);
                            }
                        } catch (err) {
                            console.log("No assessment result found yet");
                        }
                    }
                } else {
                    setError('No session assessment data found');
                }
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [BASE_URL, eventId, user?.id]);

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

    const formatTime = (time: string) => {
        return moment(time, 'HH:mm').format('h:mmA');
    };

    const handleStartAssessment = (assessment: SessionAssesment) => {
        const queryString = new URLSearchParams({
            title: assessment.title,
            description: assessment.description,
        }).toString();

        router.push(`/profile/session/${eventId}/assesment/${assessment.id}?uid=${user?.id}&eventId=${eventId}&sessionId=${assessment.event_session_id}&assessmentId=${assessment.id}&${queryString}`);
    };

    const getGradeColor = (grade: string) => {
        switch (grade?.toUpperCase()) {
            case 'A':
                return 'bg-green-100 text-green-800';
            case 'B':
                return 'bg-blue-100 text-blue-800';
            case 'C':
                return 'bg-yellow-100 text-yellow-800';
            case 'D':
                return 'bg-orange-100 text-orange-800';
            case 'F':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <ProfileLayout>
            <div className="p-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Event Session</h2>
                    <p className="my-1 text-gray-600">Explore the session regarding to the event</p>
                </div>

                {sessions.length > 0 ? (
                    sessions.map(session => (
                        <div key={session.id} className="bg-white shadow-lg rounded-lg p-6 mb-8">
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
                    ))
                ) : (
                    <p className="text-center text-lg my-10">No Sessions Found</p>
                )}

                {sessionAssesment ? (
                    <div key={sessionAssesment.id} className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Session Assessment</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <FaBook className="text-gray-600" />
                                <span className="text-gray-700">Title: {sessionAssesment.title}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCheckCircle className="text-gray-600" />
                                <span className="text-gray-700">Total Marks: {sessionAssesment.mark}</span>
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

                            {assessmentResult ? (
                                <div className="mt-6 border-t pt-6">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Your Results</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <FaAward className="text-blue-600" />
                                                <span className="text-gray-700 font-medium">Obtained Marks:</span>
                                            </div>
                                            <div className="text-2xl font-bold mt-2">
                                                {assessmentResult.obtained_mark}/{sessionAssesment.mark}
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <FaAward className="text-blue-600" />
                                                <span className="text-gray-700 font-medium">Grade:</span>
                                            </div>
                                            <div className={`text-2xl font-bold mt-2 px-3 py-1 rounded-full inline-block ${getGradeColor(assessmentResult.grade)}`}>
                                                {assessmentResult.grade}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleStartAssessment(sessionAssesment)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 mt-4"
                                >
                                    Start Assessment
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-lg my-10">No Assessments Found</p>
                )}
            </div>
        </ProfileLayout>
    );
}

export default EventSessionPage;
