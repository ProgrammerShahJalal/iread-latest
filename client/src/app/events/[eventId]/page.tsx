import CountdownTimer from "@/CoundownTimer/CoundownTimer";
import { photoGallary } from "@/data/events";
import ImageGallery from "@/home/ImageGallary";
import Image from "next/image";
import Link from "next/link";
import { getEvents } from "../../../api/eventApi";
import { getFaqs } from "../../../api/faqApi";
import EventFaqCard from "./EventFaqCard";
import EventEnrollProcess from "../../../components/EventEnrollProcess";
import moment from "moment/moment";
import { getSettingValue } from "../../../api/settingValuesApi";

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_BACKEND_LIVE_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL;
    

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const { eventId } = await params; // ✅ Await params before using

  if (!eventId) {
    return <div className="py-24 text-center">Invalid event request.</div>;
  }
  const settingImages = await getSettingValue('Event Gallary');
  const staticImages = photoGallary?.map((image) => image.image);

  let imageUrls: string[];
  try {
    // Parse settingImages.value if it's a string, otherwise use it directly
    const parsedImages = settingImages?.value
      ? typeof settingImages.value === 'string'
        ? JSON.parse(settingImages.value)
        : settingImages.value
      : staticImages;

    // Ensure imageUrls is an array of strings and prepend BASE_URL for relative paths
    imageUrls = Array.isArray(parsedImages)
      ? parsedImages.map((path) =>
          path.startsWith('http') ? path : `${BASE_URL}/${path}`
        )
      : staticImages;
  } catch (error) {
    console.error('Error parsing settingImages.value:', error);
    imageUrls = staticImages;
  }
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

    // console.log("event", moment(event?.reg_end_date).format("LLL"));
    // Check if registration end date has passed
    const isRegistrationOpen = moment().isBefore(moment(event.reg_end_date));
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
                      offerTill={moment(event?.reg_end_date).format("LLL")}
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
                      {event.categories?.length > 0
                        ? event.categories
                            .map((category: any) => category.title)
                            .join(", ")
                        : "N/A"}
                    </span>
                  </li>
                  <li>
                    Tags:{" "}
                    <span className="text-theme-color-2">
                      {event.tags?.length > 0
                        ? event.tags.map((tag: any) => tag.title).join(", ")
                        : "N/A"}
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
                  <strong>Start:</strong>{" "}
                  {moment(event.reg_start_date).format("MMMM Do YYYY")} <br />
                  <strong>End:</strong>{" "}
                  {moment(event.reg_end_date).format("MMMM Do YYYY")}
                </p>
              </div>
              <div className="my-5">
                <h4 className="text-lg font-bold">Event Schedule</h4>
                <p>
                  <strong>Start:</strong>{" "}
                  {moment(event?.session_start_date_time).format(
                    "MMMM Do YYYY, h:mm A"
                  )}{" "}
                  <br />
                  <strong>End:</strong>{" "}
                  {moment(event?.session_end_date_time).format(
                    "MMMM Do YYYY, h:mm A"
                  )}
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
                {/* Only show enrollment process if registration is still open */}
                {isRegistrationOpen ? (
                  <EventEnrollProcess
                    eventId={Number(event.event_id)}
                    eventPrice={Number(event.discount_price)}
                  />
                ) : (
                  <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p className="font-bold">Registration Closed</p>
                    <p>This event&apos;s registration period has ended.</p>
                  </div>
                )}
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
              <h4 className="text-lg font-bold mb-4">Our Events Gallery</h4>
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
