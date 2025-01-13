"use client";

import CountdownTimer from '@/CoundownTimer/CoundownTimer'
import { events, photoGallary } from '@/data/events';
import ImageGallery from '@/home/ImageGallary';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react'





const EventDetailsPage = () => {
  const { eventId } = useParams<{ eventId: string }>();


  const event = events?.find((event) => event.id === eventId);

  if (!event) {
    return <div>No Event Info Right Now</div>
  }

  const imageUrls = photoGallary?.map((image) => image.image);


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
              <div className='flex justify-between items-center'>
                <div>
                  <p> <strong>Price:</strong> ${event.price}</p>
                  <p><strong className='text-green-600'>Discount Price:</strong> ${event.discount_price}</p>
                </div>
                <div>
                  <p className='text-indigo-600 font-semibold'>{event.event_type}</p>
                </div>
              </div>
              <a href="#form" className="btn bg-[#202C45] text-white w-full mt-3">
                Register Now
              </a>
            </div>
          </div>
        </div>

  <div id='form' className="container-fluid">
  <div className="section-title">
    <div className="row">
      <div className="mt-24 col-md-6 col-md-offset-3 text-center">
        <h3 className="title text-2xl font-semibold text-[#202C45]">Registration Form</h3>
      </div>
    </div>
  </div>
  <div className="row mt">
    <div className="col-md-6 col-md-offset-3">
      <form
        id="booking-form"
        name="booking-form"
        action="includes/event-register.php"
        method="post"
        encType="multipart/form-data"
      >
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Name"
                name="register_name"
                required={true}
                className="form-control"
                aria-required="true"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Email"
                name="register_email"
                className="form-control"
                required={true}
                aria-required="true"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Phone"
                name="register_phone"
                className="form-control"
                required={true}
                aria-required="true"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Ticket types</label>
              <select
                name="ticket_type"
                className="form-control valid"
                aria-invalid="false"
              >
                <option>One Person</option>
                <option>Two Person</option>
                <option>Family Pack</option>
                <option>Premium</option>
              </select>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Event types</label>
              <select
                name="event_type"
                className="form-control valid"
                aria-invalid="false"
              >
                <option>Event 1</option>
                <option>Event 2</option>
                <option>Event 3</option>
                <option>All package</option>
              </select>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group text-center">
              <input
                name="form_botcheck"
                className="form-control"
                type="hidden"
                defaultValue=""
              />
              <button
                data-loading-text="Please wait..."
                className="btn btn-dark btn-theme-colored btn-sm btn-block mt-20 pt-10 pb-10"
                type="submit"
              >
                Register now
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* Job Form Validation*/}
    </div>
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
  )
}

export default EventDetailsPage