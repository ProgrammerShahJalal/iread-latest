"use client";

import Link from "next/link";
import { useState, useRef } from "react";


const FaqCard = ({ faq }: { faq: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div
            onClick={() => setIsOpen((prv) => !prv)}
            className={`border duration-300 ${isOpen ? "shadow-medium" : "border-[#e8e8e8]"
                } p-3 md:p-4  rounded-lg cursor-pointer`}
        >
            <div className="flex items-center gap-2 justify-between">
                {faq?.url ? (
                    <>
                        <p className="text-black font-semibold text-xl">
                            {faq?.question}
                        </p>
                        <Link href={faq?.url}>
                            <small className="text-primary text-sm">Info</small>
                        </Link>
                    </>
                ) : (
                    <p className="text-black font-semibold text-xl">
                        {faq?.question}
                    </p>
                )}

                <div>
                    <button
                        type="button"
                        className="bg-secondary rounded-lg p-1"
                    >
                        {isOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        }
                    </button>
                </div>
            </div>
            <div
                ref={contentRef}
                style={{
                    maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: "max-height 0.3s ease, opacity 0.3s ease",
                    overflow: "hidden",
                }}
                className="rolesItemBefore"
            >
                <span className="text-[#001439] pb-2 text-lg md:text-base">{faq?.answer}</span>
            </div>
        </div>
    );
};

export default FaqCard;