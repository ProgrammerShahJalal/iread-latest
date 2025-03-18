import CountdownTimer from "@/CoundownTimer/CoundownTimer";
import { photoGallary } from "@/data/events";
import ImageGallery from "@/home/ImageGallary";
import Image from "next/image";
import Link from "next/link";
import { getEvents } from "../../../api/eventApi";
import { getFaqs } from "../../../api/faqApi";
import EventFaqCard from "./EventFaqCard";
import EventEnrollProcess from "../../../components/EventEnrollProcess";

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};

const formatDateTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true, // Use 12-hour format (set to false for 24-hour format)
  };
  return date.toLocaleString("en-GB", options);
};

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const { eventId } = await params; // ✅ Await params before using

  if (!eventId) {
    return <div className="py-24 text-center">Invalid event request.</div>;
  }
  const imageUrls = photoGallary?.map((image) => image.image);

  try {
    const events = await getEvents();
    const faqs = await getFaqs();
    const event = events.find(
      (event: any) => event.event_id === Number(eventId)
    );

    const eventFaqs = faqs.filter(
      (faq: any) => faq.event_id === Number(eventId)
    );

    if (!event) {
      return (
        <div className="py-24 text-center">
          <h2 className="font-semibold my-12">No Event Found</h2>
        </div>
      );
    }




    return (
      <section>
        <div
          className="inner-header divider parallax layer-overlay overlay-dark-5"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/${event.poster})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="container pt-70 pb-20">
            <div className="section-content">
              <div className="row">
                <div className="col-md-12 items-center">
                  <h2 className="title text-white">{event?.title}</h2>
                  <div className="text-white py-6">
                    <CountdownTimer
                      offerTill={formatDate(event?.reg_end_date)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container my-10">
          <div className="row">
            <div className="col-lg-8">
              <div className="entry-meta pl-15">
                <ul className="list-inline my-6">
                  <li>
                    Categories:{" "}
                    <span className="text-theme-color-2">
                      {event.categories
                        ?.map((category: any) => category.title)
                        .join(", ")}
                    </span>
                  </li>
                  <li>
                    Tags:{" "}
                    <span className="text-theme-color-2">
                      {event.tags?.map((tag: any) => tag.title).join(", ")}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="post-content mt-10">
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: event.full_description }}
                />
              </div>

              <div className="my-5">
                <h4 className="text-lg font-bold">Registration Schedule</h4>
                <p>
                  <strong>Start:</strong> {formatDate(event.reg_start_date)}{" "}
                  <br />
                  <strong>End:</strong> {formatDate(event.reg_end_date)}
                </p>
              </div>
              <div className="my-5">
                <h4 className="text-lg font-bold">Event Schedule</h4>
                <p>
                  <strong>Start:</strong>{" "}
                  {formatDateTime(event.session_start_date_time)} <br />
                  <strong>End:</strong>{" "}
                  {formatDateTime(event.session_end_date_time)}
                </p>
              </div>

              <div className="my-5">
                <h4 className="text-lg font-bold">Location</h4>
                <p>{event.place}</p>
              </div>

              <div className="my-5">
                <h4 className="text-lg font-bold">Prerequisites</h4>
                <p>{event.pre_requisities}</p>
              </div>

              <h4 className="text-lg font-bold">Terms & Conditions</h4>
              <p>{event.terms_and_conditions}</p>
            </div>

            <div className="col-lg-4">
              <div className="bg-light p-4 shadow">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${event.poster}`}
                  alt={event.title}
                  width={400}
                  height={300}
                  className="w-full rounded mb-4"
                />
                <div className="flex justify-between items-center">
                  <div>
                    <p>
                      {" "}
                      <strong>Price:</strong> ${event.price}
                    </p>
                    <p>
                      <strong className="text-green-600">
                        Discount Price:
                      </strong>{" "}
                      ${event.discount_price}
                    </p>
                  </div>
                  <div>
                    <p className="text-indigo-600 font-semibold">
                      {event.event_type}
                    </p>
                  </div>
                </div>
                <EventEnrollProcess eventId={event.event_id} eventPrice={event.discount_price}/>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto py-8 px-4 my-10">
            {eventFaqs?.length > 0 && (
              <h1 className="text-3xl font-bold text-center mb-6">
                Frequently Asked Questions
              </h1>
            )}

            <div className="grid grid-cols-1 gap-y-5">
              {eventFaqs.map((faq: any) => (
                <EventFaqCard key={faq.faq_id} faq={faq} />
              ))}
            </div>
          </div>

          <div className="my-10">
            <div>
              <h4 className="text-lg font-bold mb-4">Photo Gallery</h4>
              <ImageGallery images={imageUrls} />
            </div>
          </div>
        </div>
      </section>
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
