import Image from "next/image";
import ProfileLayout from "../../../../components/ProfileLayout";
import { getEventCertificate } from "../../../../api/eventCertificateApi";
import { getEventById } from "../../../../api/eventApi";
import { getUserById } from "../../../../api/userApi";

const formatDateTime = (isoDate: string): string => {
  return new Date(isoDate).toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

type Params = Promise<{ eventId: string }>;
type SearchParams = Promise<{ [uid: string]: string | string[] | undefined }>;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { eventId } = await params;
  const { uid: userId } = await searchParams;

  let event = await getEventById(Number(eventId));
  let user = await getUserById(Number(userId));

  return {
    title: `Certificate of ${user.first_name} ${user.last_name} for ${event.title}`,
    description: userId
      ? `View certificate for user ${user.first_name} ${user.last_name} and event ${event.title}`
      : "Invalid certificate request",
  };
}

const MyEventCertificatePage = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const [{ eventId }, { uid: userId }] = await Promise.all([params, searchParams]);

  if (!userId || !eventId) {
    return (
      <ProfileLayout>
        <div className="py-24 text-center">Invalid user or event request.</div>
      </ProfileLayout>
    );
  }

  const myCertificate = await getEventCertificate(Number(eventId), Number(userId));

  return (
    <ProfileLayout>
      <div className="flex">
        <div className="flex-1 p-6 text-center">
          <h1 className="text-3xl font-bold mb-6">My Certificate</h1>
          {myCertificate ? (
            <div className="space-y-4">
              {myCertificate.image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${myCertificate.image}`}
                  alt="Certificate"
                  width={600}
                  height={400}
                  className="rounded shadow mx-auto"
                />
              ) : (
                <p>Certificate image not available.</p>
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
