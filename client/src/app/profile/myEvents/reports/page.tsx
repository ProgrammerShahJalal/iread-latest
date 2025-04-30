import React from "react";
import { getEventPayments } from "../../../../api/eventPaymentsApi";
import ProfileLayout from "../../../../components/ProfileLayout";
import RefundButton from "../../../../components/RefundButton";
import { getEventById } from "../../../../api/eventApi";
import { getUserByUid } from "../../../../api/userApi";
import { getEventPaymentRefunds } from "../../../../api/eventPaymentRefundsApi";
import { Event } from "@/types/event";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PageProps {
  searchParams: Promise<{ uid: string; eventId: string }>;
}

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};

const isRefundAllowed = (sessionStartDateTime: string): boolean => {
  if (!sessionStartDateTime) return true;

  const sessionDate = new Date(sessionStartDateTime);
  const today = new Date();

  // Compare only the date parts (ignore time)
  sessionDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return today <= sessionDate;
};

const ReportsPage = async ({ searchParams }: PageProps) => {
  // Extract uid and eventId from searchParams
  const params = await searchParams;
  const uid = params?.uid ? Number(params?.uid) : undefined;
  const eventId = params?.eventId ? Number(params?.eventId) : undefined;

  const me = await getUserByUid(Number(uid));
  if (!uid) {
    return (
      <ProfileLayout>
        <div className="py-24 text-center">Invalid user request.</div>
      </ProfileLayout>
    );
  }
  if (!eventId) {
    return (
      <ProfileLayout>
        <div className="py-24 text-center">Invalid event request.</div>
      </ProfileLayout>
    );
  }

  try {
    const eventPaymentRefunds = await getEventPaymentRefunds(Number(eventId), Number(me?.id));
    const paymentReports = await getEventPayments(Number(eventId), Number(me?.id));
    const event = await getEventById(eventId) as Event;
    const refundAllowed = isRefundAllowed(event?.session_start_date_time);

    return (
      <ProfileLayout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Payment Reports</h1>
            <Link
              href={`/profile/myEvents?uid=${uid}`}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeftIcon className="h-5 w-5"/>
              Back
            </Link>
          </div>

          {/* Responsive Table Wrapper */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Event ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    User ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Status
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Amount
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Transaction ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Payment Method
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Refunded
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentReports.length > 0 ? (
                  paymentReports.map((payment: any) => {
                    const hasRefundRequest = eventPaymentRefunds.length > 0;
                    const canShowRefundButton = !payment.is_refunded && refundAllowed && !hasRefundRequest;

                    return (
                      <tr key={payment.trx_id} className="text-center">
                        <td className="border border-gray-300 px-4 py-2">
                          {payment.event_id}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {payment.user_id}
                        </td>
                        <td
                          className={`border border-gray-300 px-4 py-2 ${
                            payment.status === "success"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {payment.status}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          ${payment.amount}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {formatDate(payment.date)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {payment.trx_id}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {payment.media}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {payment.is_refunded ? "Yes" : "No"}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {payment.is_refunded ? (
                            <span className="text-gray-400">Already Refunded</span>
                          ) : hasRefundRequest ? (
                            <span className="text-gray-400">Refund Requested</span>
                          ) : !refundAllowed ? (
                            <span className="text-gray-400">
                              Refund not allowed after event date
                            </span>
                          ) : (
                            <RefundButton
                              paymentId={payment.payment_id}
                              userId={payment.user_id}
                              eventId={payment.event_id}
                              eventEnrollmentId={payment.event_enrollment_id}
                              trxId={payment.trx_id}
                              amount={payment.amount}
                              media={payment.media}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={9}
                      className="text-center border border-gray-300 py-4"
                    >
                      No payment records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </ProfileLayout>
    );
  } catch (error) {
    console.error("Error fetching event payment reports:", error);
    return (
      <ProfileLayout>
        <div className="py-24 text-center">
          <h2 className="font-semibold my-12">
            Failed to load event payment data
          </h2>
        </div>
      </ProfileLayout>
    );
  }
};

export default ReportsPage;
