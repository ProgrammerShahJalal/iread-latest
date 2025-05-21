"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

interface ContactFormProps {
  greetingTitle?: { value: string } | '';
  contactPhone1?: { value: string } | '';
  contactPhone2?: { value: string } | '';
  contactPhone3?: { value: string } | '';
  contactEmail1?: { value: string } | '';
  contactEmail2?: { value: string } | '';
  contactEmail3?: { value: string } | '';
  address?: { value: string } | '';
}

const ContactForm: React.FC<ContactFormProps> = ({
  greetingTitle,
  contactPhone1,
  contactPhone2,
  contactPhone3,
  contactEmail1,
  contactEmail2,
  contactEmail3,
  address,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Helper function to safely extract value
  const getValue = (prop: { value: string } | '' | undefined): string => {
    return typeof prop === 'object' && prop?.value ? prop.value : 'N/A';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        {
          from_name: form.name,
          to_name: "IREAD",
          from_email: form.email,
          to_email: getValue(contactEmail1)|| "iread.hello@gmail.com", 
          from_phone: form.phone,
          to_phone: getValue(contactPhone1) || "+880 1303 856 860",
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Thank you. We'll get back to you soon.");
          setForm({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          toast.error("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="my-12 container">
      <h1 className="text-4xl text-center font-bold text-[#202C45] mb-8">
        Contact Us
      </h1>
      <div className="container">
        <div className="row mb-60 bg-deep">
          <div className="col-sm-12 col-md-4">
            <div className="contact-info text-center pt-60 pb-60 border-right">
              <i className="fa fa-phone font-36 mb-10 text-theme-colored" />
              <h4>Phone</h4>
              <h6 className="text-gray">
              {getValue(contactPhone1)}, {getValue(contactPhone2)}, {getValue(contactPhone3)}
              </h6>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="contact-info text-center pt-60 pb-60 border-right">
              <i className="fa fa-map-marker font-36 mb-10 text-theme-colored" />
              <h4>Address</h4>
              <h6 className="text-gray">{getValue(address)}</h6>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="contact-info text-center pt-60 pb-60">
              <i className="fa fa-envelope font-36 mb-10 text-theme-colored" />
              <h4>Email</h4>
              <h6 className="text-gray">
              {getValue(contactEmail1)}, {getValue(contactEmail2)}, {getValue(contactEmail3)}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center my-5 p-4">
        <p className="text-2xl md:text-lg text-gray-700 text-center mb-6">
        {getValue(greetingTitle)}
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              required
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#202C45]"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#202C45] text-white font-semibold rounded-lg px-4 py-2 hover:bg-[#2b3a5a] transition duration-200"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

