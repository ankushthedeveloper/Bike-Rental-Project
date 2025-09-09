import React from "react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12 px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center">
          Contact Us
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          We'd love to hear from you! Fill out the form below and we'll get back
          to you soon.
        </p>
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Message
            </label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your message..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
        <div className="mt-8 text-center text-gray-500 text-sm">
          Or email us directly at{" "}
          <a
            href="mailto:support@bikely.com"
            className="text-blue-600 underline"
          >
            support@bikely.com
          </a>
        </div>
      </div>
    </div>
  );
}
