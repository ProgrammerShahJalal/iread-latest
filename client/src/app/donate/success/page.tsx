"use client";
import Invoice from "@/Invoice/Invoice";
import React, { useState, useEffect, Suspense } from "react";
import emailjs from "@emailjs/browser";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const DonationSuccessContent = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const occupation = searchParams.get("occupation");
  const amount = searchParams.get("amount");

  const [isEmailSent, setIsEmailSent] = useState(false);

  const getTodayDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return today.toLocaleDateString("en-US", options);
  };

  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${randomNum}-${year}`;
  };

  const sendInvoiceEmail = () => {
    if (!email || isEmailSent) {
      return;
    }

    const templateParams = {
      from_name: "IREAD",
      from_email: "iread.hello@gmail.com",
      to_name: name,
      to_email: email,
      to_phone: phone,
      to_occupation: occupation,
      donationAmount: amount,
      invoiceNumber: generateInvoiceNumber(),
      date: getTodayDate(),
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_INVOICE_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_INVOICE_TEMPLATE_ID as string,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_INVOICE_PUBLIC_KEY as string
      )
      .then(
        (response) => {
          console.log("Invoice email sent successfully:", response);
          toast.success("Invoice has been emailed to the donor!");
          setIsEmailSent(true);
        },
        (error) => {
          console.error("Failed to send the invoice email:", error);
          toast.error("You can download your invoice.");
        }
      );
  };

  useEffect(() => {
    if (email && !isEmailSent) {
      sendInvoiceEmail();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, isEmailSent]);

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4 mt-16">
          Thank You for Your Donation!
        </h1>
        <p className="text-gray-700 mb-6">
          Your donation was successful. Your support helps us make a difference.
        </p>
      </div>
      {isEmailSent && (
        <Invoice
          name={name}
          email={email}
          phone={phone}
          occupation={occupation}
          amount={amount}
          getTodayDate={getTodayDate}
          generateInvoiceNumber={generateInvoiceNumber}
        />
      )}
    </>
  );
};

const DonationSuccessPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DonationSuccessContent />
    </Suspense>
  );
};

export default DonationSuccessPage;
