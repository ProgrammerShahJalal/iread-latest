import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import apiClient from "../../lib/apiClient";

export const dynamic = 'force-dynamic';

interface InvoiceProps {
  event_id: string | null;
  event_enrollment_id: string | null;
  user_id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  occupation: string | null;
  amount: string | null;
  trx_id?: string | null;
  getTodayDate: () => string;
  generateInvoiceNumber: () => string;
}

// Define the expected API response type
interface SiteResponse {
  data?: {
    value: string;
  };
}

const PaymentInvoice: React.FC<InvoiceProps> = ({
  event_id,
  event_enrollment_id,
  user_id,
  name,
  email,
  phone,
  occupation,
  amount,
  trx_id,
  getTodayDate,
  generateInvoiceNumber,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [siteName, setSiteName] = useState<SiteResponse | null>(null);
  const [siteEmail, setSiteEmail] = useState<SiteResponse | null>(null);
  const [sitePhone, setSitePhone] = useState<SiteResponse | null>(null);
  const [siteAddress, setSiteAddress] = useState<SiteResponse | null>(null);
  const [invoiceFooter, setInvoiceFooter] = useState<SiteResponse | null>(null);

  const BASE_URL = apiClient.defaults.baseURL;

  useEffect(() => {
    const endpoints = [
      { key: 'title/Site name on invoice', setter: setSiteName },
      { key: 'title/Email on invoice', setter: setSiteEmail },
      { key: 'title/Phone on invoice', setter: setSitePhone },
      { key: 'title/Address on invoice', setter: setSiteAddress },
      { key: 'title/Invoice Footer', setter: setInvoiceFooter },
    ];

    const fetchSettings = async () => {
      try {
        const responses = await Promise.all(
          endpoints.map(({ key }) =>
            axios.get(`${BASE_URL}/api/v1/app-setting-values/${key}`)
          )
        );
        responses.forEach((response, index) => {
          endpoints[index].setter(response.data);
        });
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, [BASE_URL]);

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
            id="payment-content-id"
            className="p-10 mb-24 rounded-md"
            style={{ width: "210mm", margin: "0 auto" }} // Set width to A4 size
          >
            {/* Invoice Header */}
            <div className="flex items-center justify-between mb-8 px-3 pt-20">
              <div>
                <span className="text-2xl">Payment Invoice #</span>:{" "}
                {generateInvoiceNumber()}
                <br />
                <span>Date</span>: {getTodayDate()}
                <br />
              </div>
              <div className="text-right">
                <Image
                  src="/frontend/images/ireadblacklogo.png"
                  alt="Logo of Invoice"
                  width={100}
                  height={100}
                />
              </div>
            </div>

            {/* Invoice Details */}
            <div className="flex justify-between mb-8 px-3">
              <div>
                <h1 className="font-bold">Details</h1>
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
                <p>
                  <strong>Trx ID:</strong> {trx_id}
                </p>
                {/* <p>
                  <strong>User ID:</strong> {user_id}
                </p>
                <p>
                  <strong>Event ID:</strong> {event_id}
                </p>
                <p>
                  <strong>Event Enrollment ID:</strong> {event_enrollment_id}
                </p> */}
              </div>
              <div className="text-right">
                <h1 className="font-bold">Recipient Info</h1>
                {siteName?.data?.value}
                <br />
                {siteAddress?.data?.value}
                <br />
                {siteEmail?.data?.value}
                <br />
                {sitePhone?.data?.value}
              </div>
            </div>

            {/* Invoice Items */}
            <div className="flex justify-between mb-4 bg-gray-200 px-3 py-2">
              <div>Payment</div>
              <div className="text-right font-medium">${amount}</div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-2 px-3">
              <div className="text-2xl leading-none font-bold text-black">
                <span>Total</span>:
              </div>
              <div className="text-2xl text-black text-right font-bold">${amount}</div>
            </div>

            {/* Terms and Conditions */}
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
              <p>{invoiceFooter?.data?.value}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInvoice;
