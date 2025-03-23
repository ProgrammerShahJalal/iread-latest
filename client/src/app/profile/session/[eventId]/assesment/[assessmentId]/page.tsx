"use client";

import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import React from 'react';
import ProfileLayout from '../../../../../../components/ProfileLayout';

const AssessmentPage = () => {
    const searchParams = useSearchParams();
    const eventId = searchParams.get('eventId');
    const assessmentId = searchParams.get('assessmentId');
    const title = searchParams.get('title');
    const description = searchParams.get('description');

    // Ensure description is a string or provide a default value
    const safeDescription = typeof description === "string" ? description : "";
    

    return (
        <ProfileLayout>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
                <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: safeDescription }}
                />
            </div>
        </ProfileLayout>
    );
};

export default AssessmentPage;