import Image from "next/image";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";

interface InvoiceProps {
  name: string | null;
  email: string | null;
  phone: string | null;
  occupation: string | null;
  amount: string | null;
  getTodayDate: () => string;
  generateInvoiceNumber: () => string;
}

const Invoice: React.FC<InvoiceProps> = ({
  name,
  email,
  phone,
  occupation,
  amount,
  getTodayDate,
  generateInvoiceNumber,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const handleDownloadInvoice = () => {
    if (targetRef.current) {
      const scale = 3; // Increase scale for higher resolution
      html2canvas(targetRef.current, { scale }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png", 1.0); // Use highest quality
        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add the image to the PDF
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        // Check if the content exceeds the A4 height (297mm)
        if (imgHeight > 297) {
          // Add a new page for the remaining content
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, -(297 * scale), imgWidth, imgHeight);
        }

        pdf.save("invoice.pdf");
      });
    } else {
      console.error("Target element not found");
    }
  };

  return (
    <div className="mb-10">
      <div className="mx-auto max-w-[768px] min-w-[320px]">
        <div>
          <div className="text-center">
            <button
              className="bg-green-600 px-3 py-2 rounded-md text-white"
              onClick={handleDownloadInvoice}
            >
              Download Invoice
            </button>
          </div>

          {/* Attach the ref to this div */}
          <div
            ref={targetRef}
            id="content-id"
            className="p-10 mb-24 rounded-md"
            style={{ width: "210mm", margin: "0 auto" }} // Set width to A4 size
          >
            {/* Invoice Header */}
            <div className="flex items-center justify-between mb-8 px-3 pt-20">
              <div>
                <span className="text-2xl">Donation Invoice #</span>:{" "}
                {generateInvoiceNumber()}
                <br />
                <span>Date</span>: {getTodayDate()}
                <br />
              </div>
              <div className="text-right">
                <Image
                  src="/frontend/images/invoice.png"
                  alt="Logo of Invoice"
                  width={100}
                  height={100}
                />
              </div>
            </div>

            {/* Invoice Details */}
            <div className="flex justify-between mb-8 px-3">
              <div>
                <h1 className="font-bold">Donor Info</h1>
                <p>
                  <strong>Name:</strong> {name}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <p>
                  <strong>Phone:</strong> {phone}
                </p>
                <p>
                  <strong>Occupation:</strong> {occupation}
                </p>
              </div>
              <div className="text-right">
                <h1 className="font-bold">Recipient Info</h1>
                IREAD
                <br />
                Street 12
                <br />
                10000 City, USA
                <br />
                hello@iread.com
              </div>
            </div>

            {/* Invoice Items */}
            <div className="flex justify-between mb-4 bg-gray-200 px-3 py-2">
              <div>Donation</div>
              <div className="text-right font-medium">${amount}</div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-2 px-3">
              <div className="text-2xl leading-none">
                <span>Total</span>:
              </div>
              <div className="text-2xl text-right font-medium">${amount}</div>
            </div>

            {/* Additional Content: Terms and Conditions */}
            <div className="mt-8 mx-3">
              <h2 className="font-bold text-lg mb-4">Terms and Conditions</h2>
              <p className="text-sm">
                At IREAD, we are dedicated to delivering high-quality
                educational services. Please review our{" "}
                <Link
                  href="/terms"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                >
                  terms and conditions
                </Link>{" "}
                for details on course delivery, user responsibilities,
                intellectual property, and prohibited conduct.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 mx-3 text-center text-sm text-gray-600">
              <p>Thank you for your donation!</p>
              <p>Please contact us at hello@iread.com for any questions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
