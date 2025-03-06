"use client"
import React from "react";
import HappyStudentAtAGlance from "@/home/HappyStudentAtAGlance";
import FaqPage from "@/faq/page";
import Hero from "@/home/Hero";

type Props = {};

function AboutPage({ }: Props) {

    return (
        <div className="min-h-[100vh]">
            <Hero />
            <HappyStudentAtAGlance />
            <FaqPage />
        </div>
    );
}

export default AboutPage;
