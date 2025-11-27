"use client";

import EventCards from "@/components/EventCard";
import Banner from "./../components/Banner";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/FeaturedEvents";


export default function Home() {
  return (
    <div className="bg-gray-50">
      <Banner />
      <div className="flex flex-col lg:flex-row  max-w-7xl mx-auto">

        <div className="lg:w-1/2 w-full bg-amber-50 p-5">
          <EventCards />
        </div>

        <div className="lg:w-1/2 w-full bg-lime-50 p-5">
          <Testimonials />
        </div>

      </div>
      <div className=" px-4 max-w-7xl mx-auto bg-fuchsia-50">
        <Features></Features>
      </div>

    </div>
  );
}