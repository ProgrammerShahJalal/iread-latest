"use client";

import Image from "next/image";
import { saveAs } from "file-saver";

interface CertificateViewerProps {
  imageUrl: string;
  userName: string;
  eventTitle: string;
}

export const CertificateViewer = ({ imageUrl, userName, eventTitle }: CertificateViewerProps) => {
  const handleDownload = () => {
    const fileName = `Certificate_${userName}_${eventTitle.replace(/\s+/g, '_')}.jpg`;
    saveAs(imageUrl, fileName);
  };

  return (
    <div className="space-y-4">
      <Image
        src={imageUrl}
        alt="Certificate"
        width={600}
        height={400}
        className="rounded shadow mx-auto"
      />
      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-[#202C45] text-white rounded hover:bg-black transition-colors"
      >
        Download Certificate
      </button>
    </div>
  );
};