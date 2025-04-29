import Image from "next/image";
import { getMyEvents } from "../../../api/eventApi";
import ProfileLayout from "../../../components/ProfileLayout";
import Link from "next/link";
import { getUserByUid } from "../../../api/userApi";
import { Event } from "@/types/event";
import moment from "moment/moment";



interface PageProps {
  searchParams: Promise<{ uid: string; eventId: string }>;
}

// ✅ Server Component: Fetch data before rendering
const MyEventsPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const userUid = params?.uid ? parseInt(params.uid, 10) : null;

  if (!userUid) {
    return (
      <ProfileLayout>
        <p className="text-red-500">Invalid User ID.</p>
      </ProfileLayout>
    );
  }


  const me = await getUserByUid(userUid);
  const myEvents: Event[] = await getMyEvents(me?.id);

  return (
    <ProfileLayout>
      <div className="flex">
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold">My Events</h1>
          {myEvents.length ? (
            <div className="container pb-50 pt-80">
              <div className="section-content">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myEvents.map((event: Event) => (
                    <div
                      key={event.event_id}
                      className="flex flex-col h-full"
                    >
                      <div className="bg-light rounded-lg overflow-hidden shadow-md flex flex-col h-full">
                        <div className="relative h-48 w-full">
                          <Image
                            className="object-cover"
                            alt={event.title}
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${event.poster}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

                          />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h5 className="md:text-lg font-semibold mb-2 line-clamp-2">
                            <Link href={`/profile/myEvents/${event.event_id}?uid=${userUid}`}>
                              {event.title?.slice(0, 40)}{event.title?.length > 40 && '...'}
                            </Link>
                          </h5>
                          <ul className="md:text-xs text-gray-600 mb-3 space-y-1">
                            <li className="flex items-center">
                              <i className="fa fa-calendar mr-2" />
                              {moment(event?.session_end_date_time).format('MMMM Do YYYY, h:mm A')}
                            </li>
                            <li className="flex items-center">
                              <i className="fa fa-map-marker mr-2" />
                              {event?.place}
                            </li>
                          </ul>
                          <p>{event.short_description?.slice(0, 150)}{event.short_description?.length > 150 && '...'}</p>
                          <div className="flex justify-between items-center">
                            <div className="mt-10">
                              <Link
                                href={`/profile/myEvents/${event.event_id}?uid=${userUid}`}
                                className="btn btn-dark btn-sm mt-10"
                              >
                                Details
                              </Link>
                            </div>
                            <div className="mt-10">
                              <Link
                                href={`/profile/myEvents/reports?uid=${userUid}&eventId=${event.event_id}`}
                                className="btn bg-[#F2184F] text-white btn-sm mt-10"
                              >
                                Reports
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default MyEventsPage;