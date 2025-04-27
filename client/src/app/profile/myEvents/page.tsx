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
console.log('my events all', myEvents);
  return (
    <ProfileLayout>
      <div className="flex">
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold">My Events</h1>
          {myEvents.length ? (
            <div className="container pb-50 pt-80">
              <div className="section-content">
                <div className="row">
                  {myEvents.map((event: Event) => (
                    <div
                      key={event.event_id}
                      className="col-sm-6 col-md-4 col-lg-4"
                    >
                      <div className="schedule-box maxwidth500 bg-light mb-30">
                        <div className="thumb">
                          <Image
                            className="w-full rounded mb-4"
                            alt={event.title}
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${event.poster}`}
                            width={400}
                            height={300}
                          />
                        </div>
                        <div className="schedule-details clearfix p-15 pt-10">
                          <h5 className="font-16 title">
                            <Link href={`/profile/myEvents/${event.event_id}?uid=${userUid}`}>
                              {event.title?.slice(0, 40)}{event.title?.length > 40 && '...'}
                            </Link>
                          </h5>
                          <ul className="list-inline font-11 mb-20">
                            <li>
                              <i className="fa fa-calendar mr-5" />
                              {moment(event?.session_end_date_time).format('MMMM Do YYYY, h:mm A')}
                            </li>
                            <li>
                              <i className="fa fa-map-marker mr-5" />
                              {event.place}
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