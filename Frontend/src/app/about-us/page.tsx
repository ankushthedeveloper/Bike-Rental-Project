import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          About Bikely
        </h1>
        <p className="text-gray-700 mb-6 text-center text-lg">
          Bikely is your trusted bike rental partner, making urban mobility
          easy, affordable, and eco-friendly. Whether you need a bike for a
          quick ride, a day out, or a longer adventure, we have you covered!
        </p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            Our Mission
          </h2>
          <p className="text-gray-600">
            To empower people to explore their cities and communities in a
            sustainable way, while providing top-quality bikes and excellent
            customer service.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Wide range of bikes for every need</li>
            <li>Easy online booking and flexible rental plans</li>
            <li>Affordable pricing and transparent policies</li>
            <li>Friendly support and maintenance</li>
            <li>Eco-conscious and community-driven</li>
          </ul>
        </div>
        <div className="text-center text-gray-500 text-sm">
          Ready to ride?{" "}
          <span className="text-blue-600 font-semibold">
            Join Bikely today!
          </span>
        </div>
      </div>
    </div>
  );
}
