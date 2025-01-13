import React from 'react';

const ContactPage = () => {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center my-10 p-4">
      <h1 className="text-4xl font-bold text-[#202C45] mb-4">Contact Us</h1>
      <p className="text-lg text-gray-700 text-center mb-6">
        We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
      </p>

      <form className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Message Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#202C45]"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#202C45] text-white font-semibold rounded-lg px-4 py-2 hover:bg-[#2b3a5a] transition duration-200"
        >
          Send Message
        </button>
      </form>

      {/* Additional Contact Information */}
      <div className="mt-8 text-center">
        <p className="text-gray-700">
          Email us at <a href="mailto:support@iread.com" className="text-blue-600 underline">support@iread.com</a>
        </p>
        <p className="text-gray-700">
          Call us at <a href="tel:+123456789" className="text-blue-600 underline">+1 234 567 89</a>
        </p>
        <p className="text-gray-700">
          Visit us at <span className="font-medium">123 Learning Street, Knowledge City, Educationland</span>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
