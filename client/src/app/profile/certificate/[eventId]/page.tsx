import Image from "next/image";
import ProfileLayout from "../../../../components/ProfileLayout";
import { getEventCertificate } from "../../../../api/eventCertificateApi";

// Function to format date
const formatDateTime = (isoDate: string): string => {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    return date.toLocaleString("en-GB", options);
};

interface PageProps {
    params: { eventId: string };
    searchParams: { uid?: string };
}

const MyEventCertificatePage = async ({ params, searchParams }: PageProps) => {
    const eventId = Number(params.eventId);
    const userId = searchParams?.uid ? Number(searchParams.uid) : undefined;

    if (!userId) {
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

    const myCertificate = await getEventCertificate(eventId, userId);

    return (
        <ProfileLayout>
            <div className="flex">
                <div className="flex-1 p-6 text-center">
                    <h1 className="text-3xl font-bold mb-6">My Certificate</h1>
                    {myCertificate ? (
                        <div className="space-y-4">
                            {/* <p><strong>Grade:</strong> {myCertificate.grade}</p>
                            <p><strong>Scores:</strong> {myCertificate.scores}</p>
                            <p><strong>Date:</strong> {formatDateTime(myCertificate.date)}</p> */}
                            {myCertificate.image && (
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${myCertificate.image}`}
                                    alt="Certificate"
                                    width={600}
                                    height={400}
                                    className="rounded shadow mx-auto"
                                />
                            )}
                        </div>
                    ) : (
                        <p>Certificate not available right now.</p>
                    )}
                </div>
            </div>
        </ProfileLayout>
    );
};

export default MyEventCertificatePage;
