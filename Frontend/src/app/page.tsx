"use client";
import Image from "next/image";
import {
  Search,
  MapPin,
  Calendar,
  Star,
  ShieldCheck,
  Zap,
  Leaf,
} from "lucide-react";
import BikeCard from "@/components/Cards/BikeCard";
import { bikes } from "@/assets/data";
import { toast } from "react-toastify";

export default function Home() {
  const handleClickApp = () => {
    toast.info("App will be available soon! , Thanks for your patience.");
  };
  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm"></header>

      <main>
        <section className="bg-gradient-to-b from-blue-50 to-slate-50 py-20 md:py-32">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-4">
                Your City, Your Ride.
                <br />
                <span className="text-blue-600">Instantly.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto md:mx-0">
                Unlock the freedom of two wheels. Find and rent the perfect bike
                in seconds with Bikely.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <a
                  href="/bikes"
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 transform"
                >
                  Find a Bike
                </a>
                <a
                  href="#how-it-works"
                  className="bg-white text-slate-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-slate-100 transition-transform hover:scale-105 transform"
                >
                  How It Works
                </a>
              </div>
            </div>
            <div>
              <Image
                src="/hero-bike.png"
                alt="Woman riding a bike through a city"
                width={600}
                height={500}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </section>
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">
              Get Rolling in 3 Easy Steps
            </h2>
            <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
              Renting a bike has never been this simple. Follow these steps and
              you'll be on your way.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Find a Bike</h3>
                <p className="text-slate-500">
                  Use our interactive map to find available bikes near your
                  location.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  2. Book Your Ride
                </h3>
                <p className="text-slate-500">
                  Select your bike, choose your rental duration, and confirm
                  your booking securely.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Unlock & Go!</h3>
                <p className="text-slate-500">
                  Scan the QR code on the bike with our app to unlock it and
                  start your journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="features" className="py-20 bg-slate-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Why Bikely?</h2>
              <p className="text-slate-600 mt-2">
                We provide more than just a bike; we provide a better way to
                move.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-600 text-white p-3 rounded-full">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Safety First</h3>
                  <p className="text-slate-500 mt-1">
                    All our bikes undergo regular maintenance checks, and we
                    provide a helmet with every rental.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-600 text-white p-3 rounded-full">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Instant Access</h3>
                  <p className="text-slate-500 mt-1">
                    No queues, no waiting. Our app-based system gets you on a
                    bike in under a minute.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-600 text-white p-3 rounded-full">
                  <Leaf size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Eco-Friendly</h3>
                  <p className="text-slate-500 mt-1">
                    Reduce your carbon footprint one ride at a time. Enjoy a
                    clean, green way to travel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="bikes" className="py-20">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">Explore Our Fleet</h2>
            <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
              From speedy road bikes to comfortable cruisers, we have the
              perfect ride for any adventure.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bikes.map((bike) => (
                <BikeCard key={bike.name} bike={bike} />
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-blue-50">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-12">
              What Our Riders Are Saying
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">
                  "Bikely is a game-changer! The app is super intuitive and I
                  found a bike within minutes. Highly recommend for exploring
                  the city."
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src="/user1.jpg"
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Sarah L.</p>
                    <p className="text-sm text-slate-500">Urban Explorer</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">
                  "The electric bikes are amazing. My daily commute is now
                  faster, cheaper, and way more fun. The process was seamless."
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src="/user2.jpg"
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Mike T.</p>
                    <p className="text-sm text-slate-500">Daily Commuter</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">
                  "As a tourist, this was the best way to see the sights.
                  Affordable prices and bikes available everywhere. Excellent
                  service!"
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src="/user3.avif"
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Jessica P.</p>
                    <p className="text-sm text-slate-500">Weekend Tourist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-blue-600 text-white rounded-xl shadow-2xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Ride?</h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                Download the Bikely app today and join thousands of happy
                riders. Your next adventure is just a tap away.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a
                  href="#"
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-slate-100 transition-transform hover:scale-105 transform"
                  onClick={handleClickApp}
                >
                  Download for iOS
                </a>
                <a
                  href="#"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-white hover:text-blue-600 transition-all hover:scale-105 transform"
                  onClick={handleClickApp}
                >
                  Download for Android
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Bikely</h3>
            <p className="text-sm">
              Freedom on two wheels. <br /> Making cities more accessible and
              fun.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/about-us"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a href="/bikes" className="hover:text-white transition-colors">
                  Our Bikes
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a href="/press" className="hover:text-white transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {/* Replace with actual icons */}
              <a href="#" className="hover:text-white transition-colors">
                FB
              </a>
              <a href="#" className="hover:text-white transition-colors">
                TW
              </a>
              <a href="#" className="hover:text-white transition-colors">
                IG
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 border-t border-slate-700 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} Bikely Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
