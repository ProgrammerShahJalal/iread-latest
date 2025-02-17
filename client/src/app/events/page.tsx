import { events } from '@/data/events';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { getEvents } from '../../api/eventApi';

const EventsPage = async() => {
    

  let eventsData: Event[] = await getEvents();

// console.log('events', eventsData);
//  console.log('events', events);
    return (
        <section>

            <div className="">

                <div className="section-content">
                    <div className="row">
                        <section
                            className="inner-header divider parallax layer-overlay overlay-dark-5"
                            data-bg-img="/frontend/images/event/eventbg.jpg"

                            style={{
                                backgroundImage: 'url("/frontend/images/event/eventbg.jpg")',
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <div className="container pt-70 pb-20">
                                {/* Section Content */}
                                <div className="section-content">
                                    <div className="row pt-14">
                                        <div className="col-md-12">
                                            <h2 className="title text-white">Events</h2>
                                            <div className="mt-16 mb-20">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="container">
                            <section
                                id="upcoming-events"
                                className="divider parallax layer-overlay overlay-white-8"
                                data-bg-img="/frontend/images/event/bg1.jpg"
                                style={{
                                    backgroundImage: 'url("/frontend/images/event/bg1.jpg")',
                                    backgroundPosition: "50% 2px"
                                }}
                            >
                                <div className="container pb-50 pt-80">
                                    <div className="section-content">
                                        <div className="row">
                                            {
                                                events?.map((event) => {
                                                    return (
                                                        <>
                                                            <div className="col-sm-6 col-md-4 col-lg-4">
                                                                <div className="schedule-box maxwidth500 bg-light mb-30">
                                                                    <div className="thumb">
                                                                        <Image
                                                                            className="w-full rounded mb-4"
                                                                            alt=""
                                                                            src={event?.poster}
                                                                            width={400}
                                                                            height={300}
                                                                            
                                                                        />

                                                                    </div>
                                                                    <div className="schedule-details clearfix p-15 pt-10">
                                                                        <h5 className="font-16 title">
                                                                            <Link href={`/events/${event?.id}`}>{event?.title}</Link>

                                                                        </h5>
                                                                        <ul className="list-inline font-11 mb-20">
                                                                            <li>
                                                                                <i className="fa fa-calendar mr-5" /> {event?.session_start_date}
                                                                            </li>
                                                                            <li>
                                                                                <i className="fa fa-map-marker mr-5" /> {event?.place}
                                                                            </li>
                                                                        </ul>
                                                                        <p>
                                                                            {event?.short_description}
                                                                        </p>
                                                                        <div className="mt-10">
                                                                            <Link
                                                                                className="btn btn-dark btn-theme-colored btn-sm mt-10 mr-5"
                                                                                href={`/events/${event?.id}#form`}
                                                                            >
                                                                                Register
                                                                            </Link>
                                                                            <Link href={`/events/${event?.id}`} className="btn btn-dark btn-sm mt-10">
                                                                                Details
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default EventsPage;