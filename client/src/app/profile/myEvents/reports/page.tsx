import React from "react";
import { getEventPayments } from "../../../../api/eventPaymentsApi";
import ProfileLayout from "../../../../components/ProfileLayout";

const ReportsPage = async ({
  searchParams,
}: {
  searchParams: { uid?: string; eventId?: string };
}) => {
  // Extract uid and eventId from searchParams
  const uid = searchParams?.uid ? Number(searchParams.uid) : undefined;
  const eventId = searchParams?.eventId
    ? Number(searchParams.eventId)
    : undefined;

  console.log("uid, eventId:", uid, eventId);

  if (!uid) {
    return (
      <ProfileLayout>
        <div className="py-24 text-center">Invalid user request.</div>;
      </ProfileLayout>
    );
  }
  if (!eventId) {
    return (
      <ProfileLayout>
        <div className="py-24 text-center">Invalid event request.</div>;
      </ProfileLayout>
    );
  }

  try {
    const paymentReports = await getEventPayments(Number(eventId), Number(uid));
    return (
      <ProfileLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Payment Reports
          </h1>

          {/* Responsive Table Wrapper */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Event ID</th>
                  <th className="border border-gray-300 px-4 py-2">User ID</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">Amount</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Transaction ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Payment Method
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Refunded</th>
                </tr>
              </thead>
              <tbody>
                {paymentReports.length > 0 ? (
                  paymentReports.map((payment: any) => (
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
                        {payment.trx_id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {payment.media}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {payment.is_refunded ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
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
      <div className="py-24 text-center">
        <h2 className="font-semibold my-12">
          Failed to load event payment data
        </h2>
      </div>
    );
  }
};

export default ReportsPage;
