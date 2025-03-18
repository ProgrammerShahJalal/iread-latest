import React, { Suspense } from "react";
import ProfileLayout from "../../../components/ProfileLayout";
import Image from "next/image";
import Link from "next/link";

function InProfileNotFoundPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileLayout>
        <h1 className="font-extrabold text-center text-5xl text-red-500">404</h1>
        <h2 className="font-semibold text-center text-xl mt-2 text-gray-700">
          Oops! Looks like this page took a vacation! 🌴
        </h2>
        <div className="w-96 flex flex-col items-center justify-center text-center mx-auto">
          <Image
            className="w-60 h-auto mx-auto mt-4"
            width={240}
            height={240}
            src="/no-data.svg"
            alt="Page not found"
          />
        </div>
      </ProfileLayout>
    </Suspense>
  );
}

export default InProfileNotFoundPage;