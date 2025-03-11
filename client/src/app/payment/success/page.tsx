"use client";
import PaymentInvoice from "@/Invoice/PaymentInvoice";
import React, { useState, useEffect, Suspense } from "react";
import emailjs from "@emailjs/browser";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const PaymentSuccessContent = () => {
  const searchParams = useSearchParams();

  const user_id = searchParams.get("user_id");
  const event_id = searchParams.get("event_id");
  const event_enrollment_id = searchParams.get("event_enrollment_id");
  const trx_id = searchParams.get("trx_id");
  const amount = searchParams.get("amount");

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.token && user?.id) {
        setUserEmail(user.email);
        setUserPhone(user.phone_number);
        setFirstName(user.first_name);
        setLastName(user.last_name);
      }
    }
  }, []);

  let userName = `${firstName} ${lastName}`;

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
    if (!userEmail || isEmailSent) {
      return;
    }

    const templateParams = {
      from_name: "IREAD",
      from_email: "iread.hello@gmail.com",
      to_name: userName,
      to_email: userEmail,
      to_phone: userPhone,
      paymentAmount: amount,
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
          toast.success("Invoice has been emailed to your email!");
          setIsEmailSent(true);
        },
        (error) => {
          console.error("Failed to send the invoice email:", error);
          toast.error("You can download your invoice.");
        }
      );
  };

  useEffect(() => {
    if (userEmail && !isEmailSent) {
      sendInvoiceEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail, isEmailSent]);

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4 mt-16">
          Thank You for Your payment!
        </h1>
        <p className="text-gray-700 mb-6">Your payment was successful.</p>
      </div>
      {isEmailSent && (
        <PaymentInvoice
          event_id={event_id}
          event_enrollment_id={event_enrollment_id}
          user_id={user_id}
          name={userName}
          email={userEmail}
          phone={userPhone}
          trx_id={trx_id}
          amount={amount}
          getTodayDate={getTodayDate}
          generateInvoiceNumber={generateInvoiceNumber}
          occupation={"Student"}
        />
      )}
    </>
  );
};

const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;
