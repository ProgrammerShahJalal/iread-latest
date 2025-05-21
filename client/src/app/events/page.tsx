import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getEvents } from "../../api/eventApi";
import { Event } from "@/types/event";
import moment from "moment/moment";
import { Pagination } from "../../components/Pagination";

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const EventsPage = async ({ searchParams }: PageProps) => {
  // Await searchParams to resolve the Promise
  const resolvedSearchParams = await searchParams;
  const { page } = resolvedSearchParams;

  const currentPage = typeof page === 'string' ? Number(page) : Array.isArray(page) ? Number(page[0]) : 1;
  const itemsPerPage = 6;

  // Get all events from the server
  const allEvents = await getEvents();

  // Calculate pagination values
  const totalCount = allEvents.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Get events for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const eventsData = allEvents.slice(startIndex, endIndex);

  if (allEvents?.length === 0) {
    return (
      <>
        <section
          className="inner-header"
          style={{
            backgroundImage: 'url("/frontend/images/event/eventbg.jpg")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container pt-70 pb-20">
            <div className="section-content">
              <div className="row pt-14">
                <div className="col-md-12">
                  <h2 className="title text-white">Events</h2>
                  <div className="mt-16 mb-20"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="w-96 h-[50vh] mx-auto">
          <h3 className="text-center font-semibold text-lg mt-20">No Blogs Found!</h3>
        </div>
      </>
    );
  }

  return (
    <section>
      <div className="min-h-[100vh] bg-[#E2E8F0]">
            <section
              className="inner-header"
              style={{
                backgroundImage: 'url("/frontend/images/event/eventbg.jpg")',
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="container">
                <h2 className="title text-white">Events</h2>
              </div>
            </section>
            <div className="container">
              <section id="upcoming-events">
                <div className="container pb-50 pt-80">
                  <div className="section-content">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {eventsData?.map((event: Event) => (
                        <div key={event.event_id} className="flex flex-col h-full">
                          <div className="bg-light rounded-lg overflow-hidden shadow-md flex flex-col h-full">
                            <div className="relative h-48 w-full">
                              <Image
                                className="object-cover"
                                alt={event.title}
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${event.poster}`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                              <h5 className="md:text-lg font-semibold mb-2 line-clamp-2">
                                <Link href={`/events/${event?.event_id}`}>
                                  {event.title?.length > 50
                                    ? `${event.title.slice(0, 50)}...`
                                    : event.title}
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
                              <p className="md:text-sm text-gray-700 mb-4 line-clamp-3 flex-grow">
                                {event.short_description?.length > 150
                                  ? `${event.short_description.slice(0, 150)}...`
                                  : event.short_description}
                              </p>
                              <div className="mt-auto">
                                <Link
                                  href={`/events/${event?.event_id}`}
                                  className="inline-block bg-gray-800 hover:bg-gray-700 text-white md:text-sm py-2 px-4 rounded transition duration-200"
                                >
                                  Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="mt-12">
                        <Pagination
                          root={'events'}
                          currentPage={currentPage}
                          totalPages={totalPages}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
    </section>
  );
};

export default EventsPage;
