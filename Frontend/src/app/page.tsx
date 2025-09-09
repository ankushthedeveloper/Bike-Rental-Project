import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-8 pb-20">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
        <Image
          src="/bike.png"
          alt="Bikely Hero"
          width={300}
          height={300}
          className="mb-6"
        />
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4 text-center">
          Welcome to Bikely
        </h1>
        <p className="text-gray-700 text-lg mb-8 text-center">
          Discover the easiest way to rent bikes in your city. Fast, affordable,
          and eco-friendly rides for everyone!
        </p>
        <div className="flex gap-4">
          <a
            href="/bikes"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            Browse Bikes
          </a>
          <a
            href="/about-us"
            className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-50 transition"
          >
            Learn More
          </a>
        </div>
      </div>
      <footer className="mt-12 text-gray-500 text-sm text-center">
        &copy; {new Date().getFullYear()} Bikely. All rights reserved.
      </footer>
    </div>
  );
}
