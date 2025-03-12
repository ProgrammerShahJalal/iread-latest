import Image from "next/image";
import { getMyEvents } from "../../../api/eventApi";
import ProfileLayout from "../../../components/ProfileLayout";
import Link from "next/link";

// Format the date to a readable format
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

// Define the interface for `MyEventsPage` props
interface MyEventsPageProps {
  user?: User | null;  // User can be null as well
}

const MyEventsPage: React.FC<MyEventsPageProps> = async ({ user }) => {
  console.log('user', user);
  
  // Handle if user is not found
  if (!user) {
    return <p>User not found</p>;
  }

  // Fetch events based on user ID
  const myEvents = await getMyEvents(user.id);

  console.log('myEvents', myEvents);

  return (
    <ProfileLayout>
      <div className="flex">
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold">My Events</h1>
          {myEvents.length ? (
            <div className="container pb-50 pt-80">
              <div className="section-content">
                <div className="row">
                  {myEvents?.map((event: Event) => (
                    <div key={event.event_id}>
                      <div className="col-sm-6 col-md-4 col-lg-4">
                        <div className="schedule-box maxwidth500 bg-light mb-30">
                          <div className="thumb">
                            <Image
                              className="w-full rounded mb-4"
                              alt=""
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${event.poster}`}
                              width={400}
                              height={300}
                            />
                          </div>
                          <div className="schedule-details clearfix p-15 pt-10">
                            <h5 className="font-16 title">
                              <Link href={`/events/${event?.event_id}`}>
                                {event?.title}
                              </Link>
                            </h5>
                            <ul className="list-inline font-11 mb-20">
                              <li>
                                <i className="fa fa-calendar mr-5" />
                                {formatDateTime(event?.session_start_date_time)}
                              </li>

                              <li>
                                <i className="fa fa-map-marker mr-5" /> {event?.place}
                              </li>
                            </ul>
                            <p>{event?.short_description}</p>
                            <div className="mt-10">
                              <Link
                                href={`/events/${event?.event_id}`}
                                className="btn btn-dark btn-sm mt-10"
                              >
                                Details
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
