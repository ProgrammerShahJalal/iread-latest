import Image from "next/image";
import { getEvents } from "../../../../api/eventApi";
import { getFaqs } from "../../../../api/faqApi";
import EventFaqCard from "./EventFaqCard";
import ProfileLayout from "../../../../components/ProfileLayout";
import { getEventResources } from "../../../../api/eventResourcesApi";
import Link from "next/link";

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatDateTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
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

const EventDetailsPage = async (props: {
  params: Params
  searchParams: SearchParams
}) => {
  const params = await props.params
  const searchParams = await props.searchParams
  const eventId = params.eventId
  const userId = searchParams.uid

  if (!eventId) {
    return <div className="py-24 text-center">Invalid event request.</div>;
  }

  try {
    const events = await getEvents();
    const faqs = await getFaqs();
    const eventResources = await getEventResources(Number(eventId));

    const event = events.find(
      (event: any) => event.event_id === Number(eventId)
    );
    const eventFaqs = faqs.filter(
      (faq: any) => faq.event_id === Number(eventId)
    );

    if (!event) {
      return (
        <ProfileLayout>
          <div className="py-24 text-center">
            <h2 className="font-semibold my-12">No Event Found</h2>
          </div>
        </ProfileLayout>
      );
    }
    

    return (
      <ProfileLayout>
        <div className="container my-10">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 mb-12 bg-white rounded-md p-4">
      <Link href={`/profile/feedback/${eventId}?uid=${userId}`} className="bg-green-500 rounded-md px-4 py-2 text-white w-full md:w-auto">
        Give Feedback
      </Link>
      <Link href={`/profile/session/${eventId}?uid=${userId}`} className="bg-orange-500 rounded-md px-4 py-2 text-white w-full md:w-auto">
        Take Session
      </Link>
      <Link href={`/profile/certificate/${eventId}?uid=${userId}`} className="bg-purple-500 rounded-md px-4 py-2 text-white w-full md:w-auto">
        Certificate
      </Link>
    </div>

          <div className="text-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${event.poster}`}
              alt={event.title}
              width={800}
              height={400}
              className="w-full max-h-[400px] object-cover rounded-lg shadow-md"
            />
          </div>

          <h2 className="text-3xl font-bold text-center my-6">{event.title}</h2>

          <div className="flex justify-center">
            <table className="w-full md:w-3/4 lg:w-1/2 border border-gray-300 shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <th className="p-4 text-left">Event Details</th>
                  <th className="p-4 text-left">Information</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100">
                  <td className="p-4 font-semibold">Registration Start</td>
                  <td className="p-4">{formatDate(event.reg_start_date)}</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4 font-semibold">Registration End</td>
                  <td className="p-4">{formatDate(event.reg_end_date)}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-4 font-semibold">Event Start</td>
                  <td className="p-4">
                    {formatDateTime(event.session_start_date_time)}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4 font-semibold">Event End</td>
                  <td className="p-4">
                    {formatDateTime(event.session_end_date_time)}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-4 font-semibold">Location</td>
                  <td className="p-4">{event.place}</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4 font-semibold">Event Type</td>
                  <td className="p-4">{event.event_type}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="post-content mt-6">
            <h4 className="text-lg font-bold">Event Description</h4>
            <div dangerouslySetInnerHTML={{ __html: event.full_description }} />
          </div>

          <div className="my-6">
            <h4 className="text-lg font-bold">Prerequisites</h4>
            <p>{event.pre_requisities}</p>
          </div>

          <div className="my-6">
            <h4 className="text-lg font-bold">Terms & Conditions</h4>
            <p>{event.terms_and_conditions}</p>
          </div>

          {eventResources?.length > 0 && (
            <div className="my-10">
              <h3 className="text-2xl font-bold">Event Resources</h3>
              <ul className="list-disc list-inside mt-4">
                {eventResources.map((resource: any) => (
                  <li key={resource.resource_id}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {eventFaqs?.length > 0 && (
            <div className="max-w-4xl mx-auto py-8 px-4 my-10">
              <h1 className="text-3xl font-bold text-center mb-6">
                Frequently Asked Questions
              </h1>
              <div className="grid grid-cols-1 gap-y-5">
                {eventFaqs.map((faq: any) => (
                  <EventFaqCard key={faq.faq_id} faq={faq} />
                ))}
              </div>
            </div>
          )}
        </div>
      </ProfileLayout>
    );
  } catch (error) {
    console.error("Error fetching event details:", error);
    return (
      <div className="py-24 text-center">
        <h2 className="font-semibold my-12">Failed to load event data</h2>
      </div>
    );
  }
};

export default EventDetailsPage;
