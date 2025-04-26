import ProfileLayout from "../../../../components/ProfileLayout";
import { getEventCertificate } from "../../../../api/eventCertificateApi";
import { getEventById } from "../../../../api/eventApi";
import { getUserById, getUserByUid } from "../../../../api/userApi";
import { CertificateViewer } from "../components/CertificateViewer";


type Params = Promise<{ eventId: string }>;
type SearchParams = Promise<{ uid: string | string[] | undefined }>;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { eventId } = await params;
  const { uid: userUid } = await searchParams;

  if (!userUid || typeof userUid !== "string") {
    return {
      title: "Invalid certificate request",
      description: "Invalid user ID provided",
    };
  }

  const event = await getEventById(Number(eventId));
  const user = await getUserByUid(Number(userUid));

  return {
    title: `Certificate of ${user.first_name} ${user.last_name} for ${event.title}`,
    description: `View certificate for user ${user.first_name} ${user.last_name} and event ${event.title}`,
  };
}

const MyEventCertificatePage = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const [{ eventId }, { uid: userUid }] = await Promise.all([params, searchParams]);

  if (!userUid || !eventId || Array.isArray(userUid)) {
    return (
      <ProfileLayout>
        <div className="py-24 text-center">Invalid user or event request.</div>
      </ProfileLayout>
    );
  }

  const me = await getUserByUid(Number(userUid));
  const [eventData, myCertificate] = await Promise.all([
    getEventById(Number(eventId)),
    getEventCertificate(Number(eventId), Number(me?.id)),
  ]);

  const certificateImageUrl = myCertificate?.image
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${myCertificate.image}`
    : null;

  return (
    <ProfileLayout>
      <div className="flex">
        <div className="flex-1 p-6 text-center">
          <h1 className="text-3xl font-bold mb-6">
            Certificate of {me?.first_name} {me?.last_name} for {eventData?.title}
          </h1>

          {certificateImageUrl ? (
            <CertificateViewer
              imageUrl={certificateImageUrl}
              userName={`${me?.first_name}_${me?.last_name}`}
              eventTitle={eventData?.title || ""}
            />
          ) : (
            <p>Certificate not available right now.</p>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default MyEventCertificatePage;
