"use client"
import React from "react";
import HappyStudentAtAGlance from "@/home/HappyStudentAtAGlance";
import FaqPage from "@/faq/page";
import Hero from "@/home/Hero";

type Props = {};

function AboutPage({ }: Props) {

    return (
        <>
            <Hero />
            <HappyStudentAtAGlance />
            <FaqPage />
        </>
    );
}

export default AboutPage;
