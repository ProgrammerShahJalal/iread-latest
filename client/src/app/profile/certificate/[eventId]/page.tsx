import Image from "next/image";
import ProfileLayout from "../../../../components/ProfileLayout";
import { getEventCertificate } from "../../../../api/eventCertificateApi";

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
type Params = Promise<{ eventId: string }>
type SearchParams = Promise<{ [uid: string]: string | string[] | undefined }>
 
export async function generateMetadata(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const eventId = params.eventId
  const userId = searchParams.uid
}

const MyEventCertificatePage = async (props: {
    params: Params
    searchParams: SearchParams
}) => {
    const params = await props.params
    const searchParams = await props.searchParams
    const eventId = params.eventId
    const userId = searchParams.uid


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
