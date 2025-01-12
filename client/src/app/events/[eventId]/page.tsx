"use client";

import CountdownTimer from '@/CoundownTimer/CoundownTimer'
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react'

const events = [
  {
    "id": "events1",
    "title": "Business Conference 2025",
    "reg_start_date": "2025-01-01",
    "reg_end_date": "2025-01-31",
    "session_start_date": "2025-02-01",
    "session_end_date": "2025-02-03",
    "place": "Dhaka",
    "short_description": "A premier event for business professionals to network and learn about the latest trends in the industry.",
    "full_description": "This conference brings together industry leaders to discuss emerging trends, innovative solutions, and the future of business. Engage in thought-provoking sessions and workshops designed to enhance your skills and broaden your knowledge.",
    "pre_requisities": "Basic understanding of business operations.",
    "terms_and_condition": "Registration fees are non-refundable. Event access requires proof of registration.",
    "event_type": "online",
    "poster": "https://cdn.pixabay.com/photo/2024/02/20/09/56/network-connections-8585083_1280.jpg",
    "price": 56.78,
    "discount_price": 45.67
  },
  {
    "id": "events2",
    "title": "Tech Expo 2025",
    "reg_start_date": "2025-03-01",
    "reg_end_date": "2025-03-20",
    "session_start_date": "2025-03-25",
    "session_end_date": "2025-03-27",
    "place": "Silicon Valley",
    "short_description": "Explore cutting-edge technology and innovations at the Tech Expo 2025.",
    "full_description": "Discover the latest advancements in AI, robotics, and sustainable technology. Meet tech leaders and innovators from around the world in this three-day event packed with exhibitions, keynotes, and networking opportunities.",
    "pre_requisities": "Interest in technology and innovation.",
    "terms_and_condition": "Attendees must adhere to event guidelines and provide ID at check-in.",
    "event_type": "offline",
    "poster": "https://cdn.pixabay.com/photo/2021/10/11/17/54/technology-6701504_1280.jpg",
    "price": 120.00,
    "discount_price": 100.00
  },
  {
    "id": "events3",
    "title": "Creative Arts Workshop",
    "reg_start_date": "2025-04-01",
    "reg_end_date": "2025-04-15",
    "session_start_date": "2025-04-20",
    "session_end_date": "2025-04-22",
    "place": "Paris",
    "short_description": "A hands-on workshop for artists and creators to explore new techniques and ideas.",
    "full_description": "This workshop offers sessions on painting, sculpture, and digital art creation. Gain inspiration and learn from seasoned artists in an inspiring environment.",
    "pre_requisities": "Basic knowledge of artistic techniques.",
    "terms_and_condition": "Participants must bring their own art supplies. Registration is final.",
    "event_type": "offline",
    "poster": "https://cdn.pixabay.com/photo/2017/06/29/23/25/oxford-2456589_1280.jpg",
    "price": 75.50,
    "discount_price": 65.00
  },
  {
    "id": "events4",
    "title": "Health and Wellness Retreat",
    "reg_start_date": "2025-05-01",
    "reg_end_date": "2025-05-20",
    "session_start_date": "2025-05-25",
    "session_end_date": "2025-05-28",
    "place": "Bali",
    "short_description": "Recharge and rejuvenate with our immersive wellness retreat.",
    "full_description": "Experience yoga, meditation, and personalized health sessions in a serene setting. This retreat focuses on mental and physical well-being, designed for individuals seeking a holistic lifestyle.",
    "pre_requisities": "Open to anyone with an interest in wellness.",
    "terms_and_condition": "Retreat fees include accommodation and meals. Travel expenses are not covered.",
    "event_type": "offline",
    "poster": "https://cdn.pixabay.com/photo/2020/04/04/13/41/corona-5002341_1280.jpg",
    "price": 200.00,
    "discount_price": 180.00
  },
  {
    "id": "events5",
    "title": "Hacking Bootcamp 2025",
    "reg_start_date": "2025-06-01",
    "reg_end_date": "2025-06-30",
    "session_start_date": "2025-07-05",
    "session_end_date": "2025-07-10",
    "place": "Online",
    "short_description": "A week-long intensive bootcamp to boost your coding skills.",
    "full_description": "Join expert developers and instructors to learn web development, machine learning, and data analysis. Build projects and enhance your portfolio with real-world coding experience.",
    "pre_requisities": "Basic knowledge of programming.",
    "terms_and_condition": "Participants must have access to a computer with an internet connection.",
    "event_type": "online",
    "poster": "https://cdn.pixabay.com/photo/2024/09/19/17/34/ai-generated-9059345_960_720.png",
    "price": 150.00,
    "discount_price": 130.00
  },
  {
    "id": "events6",
    "title": "Photography Masterclass",
    "reg_start_date": "2025-07-15",
    "reg_end_date": "2025-07-31",
    "session_start_date": "2025-08-05",
    "session_end_date": "2025-08-07",
    "place": "New York",
    "short_description": "Learn the art of photography from seasoned professionals.",
    "full_description": "Enhance your photography skills through hands-on sessions and live demonstrations. Explore portrait, landscape, and wildlife photography techniques.",
    "pre_requisities": "Participants must bring their own DSLR or mirrorless camera.",
    "terms_and_condition": "Event fees are non-refundable. Adhere to session timings and schedules.",
    "event_type": "offline",
    "poster": "https://cdn.pixabay.com/photo/2024/04/18/14/04/vietnam-8704397_960_720.jpg",
    "price": 100.00,
    "discount_price": 85.00
  }
];

const EventDetailsPage = () => {
  const { eventId } = useParams<{ eventId: string }>();

  console.log('eventId', eventId);

  const event = events?.find((event) => event.id === eventId);

  if (!event) {
    return <div>No Event Info Right Now</div>
  }
  return (
    <section>
      <div
        className="inner-header divider parallax layer-overlay overlay-dark-5"
        style={{
          backgroundImage: `url('${event.poster}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="container pt-70 pb-20">
          <div className="section-content">
            <div className="row">
              <div className="col-md-12 items-center">
                <h2 className="title text-white">{event?.title}</h2>
                <div className="text-white py-6">
                  <CountdownTimer offerTill={event?.reg_end_date} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-10">
        <div className="row">
          <div className="col-lg-8">
            <h3 className='text-2xl font-bold'>Event Details</h3>
            <p className='mb-4'>{event.short_description}</p>
            <p>{event.full_description}</p>

            <div className='my-5'>
            <h4 className='text-lg font-bold'>Registration Schedule</h4>
            <p>
              <strong>Start:</strong> {event.reg_start_date} <br />
              <strong>End:</strong> {event.reg_end_date}
            </p>
            </div>
            <div className='my-5'>
            <h4 className='text-lg font-bold'>Event Schedule</h4>
            <p>
              <strong>Start:</strong> {event.session_start_date} <br />
              <strong>End:</strong> {event.session_end_date}
            </p>
            </div>

            <div className="my-5">
            <h4 className='text-lg font-bold'>Location</h4>
            <p>{event.place}</p>
            </div>

           <div className="my-5">
           <h4 className='text-lg font-bold'>Prerequisites</h4>
           <p>{event.pre_requisities}</p>
           </div>

            <h4 className='text-lg font-bold'>Terms & Conditions</h4>
            <p>{event.terms_and_condition}</p>
          </div>

          <div className="col-lg-4">
            <div className="bg-light p-4 shadow">
              <Image
                src={event.poster}
                alt={event.title}
                width={400}
                height={300}
                className="w-full rounded mb-4"
              />
              <p className='flex justify-between items-center'>
               <div>
               <p> <strong>Price:</strong> ${event.price}</p>
               <p><strong className='text-green-600'>Discount Price:</strong> ${event.discount_price}</p>
               </div>
              <div>
              <p className='text-indigo-600 font-semibold'>{event.event_type}</p>
              </div>
              </p>
              <a href="#" className="btn btn-primary w-full mt-3">
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventDetailsPage